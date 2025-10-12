import { Command } from 'commander';

// Node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Utils
import pc from 'picocolors';
import { logger } from '../utils/logger.js';
import { getAllComponents } from '../utils/templates-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ListOptions {
  installed?: boolean;
  json?: boolean;
}

export function listCommand(program: Command): void {
  program
    .command('list')
    .description('List available components from CLI templates')
    .option('-i, --installed', 'Show only installed components', false)
    .option('--json', 'Output as JSON', false)
    .action((options: ListOptions): void => {
      try {
        const TEMPLATE_DIR = path.join(__dirname, '../templates/components');
        const PROJECT_COMPONENTS_DIR = path.join(process.cwd(), 'components/ui');

        if (!fs.existsSync(TEMPLATE_DIR)) {
          logger.error('Templates directory not found in CLI package.');
          process.exit(1);
        }

        const availableComponents = getAllComponents(TEMPLATE_DIR);

        if (availableComponents.length === 0) {
          logger.warn('No components available in CLI templates.');
          return;
        }

        // Check which components are installed
        const installedComponents = fs.existsSync(PROJECT_COMPONENTS_DIR)
          ? fs
              .readdirSync(PROJECT_COMPONENTS_DIR)
              .filter((file) => file.endsWith('.tsx'))
              .map((file) => file.replace('.tsx', ''))
          : [];

        const componentsToShow = options.installed
          ? availableComponents.filter((c) => installedComponents.includes(c))
          : availableComponents;

        if (options.json) {
          console.log(
            JSON.stringify(
              {
                available: availableComponents,
                installed: installedComponents,
                showing: componentsToShow,
              },
              null,
              2,
            ),
          );
          return;
        }

        // Display components
        if (options.installed) {
          logger.info(`Installed components (${componentsToShow.length}):`);
        } else {
          logger.info(`Available components (${componentsToShow.length}):`);
        }

        console.log('');
        componentsToShow.forEach((component) => {
          const isInstalled = installedComponents.includes(component);
          const status = isInstalled ? pc.green('✓') : pc.gray('○');
          const name = isInstalled ? pc.green(component) : pc.white(component);
          console.log(`  ${status} ${name}`);
        });

        console.log('');
        logger.info('Legend: ✓ = installed, ○ = not installed');

        if (!options.installed && installedComponents.length > 0) {
          logger.info(
            `\nTo see only installed components, use: ${pc.cyan('i7a list --installed')}`,
          );
        }
      } catch (err) {
        logger.error('An error occurred while listing components:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}
