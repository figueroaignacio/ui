import { Command } from 'commander';

// Node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Utils
import { logger } from '../utils/logger.js';
import { getAllComponents } from '../utils/templates-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface UpdateOptions {
  all?: boolean;
  path?: string;
  force?: boolean;
}

export function updateCommand(program: Command): void {
  program
    .command('update [component]')
    .description('Update component(s) to the latest version from templates')
    .option('-a, --all', 'Update all installed components', false)
    .option('-p, --path <path>', 'Custom component path', 'components/ui')
    .option('-f, --force', 'Force update without creating backup', false)
    .action(async (component: string | undefined, options: UpdateOptions): Promise<void> => {
      try {
        const TEMPLATE_DIR = path.join(__dirname, '../templates/components');
        const PROJECT_COMPONENTS_DIR = path.join(process.cwd(), options.path || 'components/ui');

        if (!fs.existsSync(TEMPLATE_DIR)) {
          logger.error('Templates directory not found in CLI package.');
          process.exit(1);
        }

        let componentsToUpdate: string[] = [];

        if (options.all) {
          if (!fs.existsSync(PROJECT_COMPONENTS_DIR)) {
            logger.error('No components directory found. Initialize project first with: i7a init');
            process.exit(1);
          }

          const installedComponents = fs
            .readdirSync(PROJECT_COMPONENTS_DIR)
            .filter((file) => file.endsWith('.tsx'))
            .map((file) => file.replace('.tsx', ''));

          const availableComponents = getAllComponents(TEMPLATE_DIR);
          componentsToUpdate = installedComponents.filter((c) => availableComponents.includes(c));

          if (componentsToUpdate.length === 0) {
            logger.info('No components to update.');
            return;
          }
        } else if (component) {
          componentsToUpdate = [component];
        } else {
          logger.error('Please specify a component or use --all flag.');
          logger.info('Usage: i7a update <component> or i7a update --all');
          process.exit(1);
        }

        logger.info(`Updating ${componentsToUpdate.length} component(s)...\n`);

        let updated = 0;
        let failed = 0;

        for (const comp of componentsToUpdate) {
          const src = path.join(TEMPLATE_DIR, `${comp}.tsx`);
          const dest = path.join(PROJECT_COMPONENTS_DIR, `${comp}.tsx`);

          if (!fs.existsSync(src)) {
            logger.warn(`Template not found for component: ${comp}`);
            failed++;
            continue;
          }

          if (!fs.existsSync(dest)) {
            logger.warn(`Component not installed: ${comp}`);
            failed++;
            continue;
          }

          if (!options.force) {
            const backupPath = `${dest}.backup`;
            await fs.copy(dest, backupPath);
            logger.info(`Created backup: ${path.basename(backupPath)}`);
          }

          await fs.copy(src, dest, { overwrite: true });
          logger.success(`Updated: ${comp}`);
          updated++;
        }

        console.log('');
        logger.success(`✨ Update complete! Updated ${updated} component(s).`);

        if (failed > 0) {
          logger.warn(`Failed to update ${failed} component(s).`);
        }

        if (!options.force && updated > 0) {
          logger.info('Backup files created with .backup extension.');
        }
      } catch (err) {
        logger.error('An error occurred while updating components:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}
