import { Command } from 'commander';

// Node
import fs from 'fs-extra';
import path from 'path';

// Utils
import { logger } from '../utils/logger.js';

interface RemoveOptions {
  path?: string;
  force?: boolean;
}

export function removeCommand(program: Command): void {
  program
    .command('remove <component>')
    .alias('rm')
    .description('Remove a component from your project')
    .option('-p, --path <path>', 'Custom component path', 'components/ui')
    .option('-f, --force', 'Skip confirmation prompt', false)
    .action(async (component: string, options: RemoveOptions): Promise<void> => {
      try {
        const componentPath = path.join(
          process.cwd(),
          options.path || 'components/ui',
          `${component}.tsx`,
        );

        if (!fs.existsSync(componentPath)) {
          logger.error(`Component "${component}" not found at ${componentPath}`);
          process.exit(1);
        }

        if (!options.force) {
          logger.warn(`About to remove: ${path.relative(process.cwd(), componentPath)}`);
          logger.info('Use --force flag to skip this confirmation.');

          logger.error('Please use --force flag to confirm removal.');
          process.exit(1);
        }

        await fs.remove(componentPath);
        logger.success(`Component "${component}" removed successfully!`);
      } catch (err) {
        logger.error('An error occurred while removing the component:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}
