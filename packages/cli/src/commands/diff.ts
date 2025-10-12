import { Command } from 'commander';

// Node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Utils
import pc from 'picocolors';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DiffOptions {
  path?: string;
}

export function diffCommand(program: Command): void {
  program
    .command('diff <component>')
    .description('Show differences between installed component and template')
    .option('-p, --path <path>', 'Custom component path', 'components/ui')
    .action(async (component: string, options: DiffOptions): Promise<void> => {
      try {
        const TEMPLATE_DIR = path.join(__dirname, '../templates/components');
        const templatePath = path.join(TEMPLATE_DIR, `${component}.tsx`);
        const installedPath = path.join(
          process.cwd(),
          options.path || 'components/ui',
          `${component}.tsx`,
        );

        if (!fs.existsSync(templatePath)) {
          logger.error(`Template not found for component: ${component}`);
          process.exit(1);
        }

        if (!fs.existsSync(installedPath)) {
          logger.error(`Component not installed: ${component}`);
          logger.info(`Install it first with: i7a add ${component}`);
          process.exit(1);
        }

        const templateContent = await fs.readFile(templatePath, 'utf-8');
        const installedContent = await fs.readFile(installedPath, 'utf-8');

        if (templateContent === installedContent) {
          logger.success(`Component "${component}" is up to date with template! ✓`);
          return;
        }

        logger.info(`Comparing ${component}:\n`);
        console.log(pc.gray('Template:   '), templatePath);
        console.log(pc.gray('Installed:  '), installedPath);
        console.log('');

        const templateLines = templateContent.split('\n').length;
        const installedLines = installedContent.split('\n').length;

        console.log(pc.yellow('⚠ Files differ'));
        console.log(pc.gray('Template lines:  '), templateLines);
        console.log(pc.gray('Installed lines: '), installedLines);
        console.log(pc.gray('Line difference: '), Math.abs(templateLines - installedLines));
        console.log('');

        logger.info('To update to template version, run:');
        logger.info(pc.cyan(`  i7a update ${component}`));
      } catch (err) {
        logger.error('An error occurred while comparing components:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}
