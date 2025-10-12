import { Command } from 'commander';

// Node
import path from 'path';
import { fileURLToPath } from 'url';

// Utils
import { copyTemplate } from '../utils/copy-template.js';
import { ensureDirectoryExists } from '../utils/fs-helpers.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InitOptions {
  force?: boolean;
  typescript?: boolean;
}

export function initCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize project with utilities and styles')
    .option('-f, --force', 'Overwrite existing files', false)
    .option('--typescript', 'Use TypeScript templates (default)', true)
    .action(async (options: InitOptions): Promise<void> => {
      try {
        const projectRoot = process.cwd();
        const TEMPLATE_DIR = path.join(__dirname, '../templates');

        logger.info('Initializing i7a UI project...');

        await copyTemplate({
          src: path.join(TEMPLATE_DIR, 'utils/cn.ts'),
          dest: path.join(projectRoot, 'utils/cn.ts'),
          force: options.force,
          description: 'utils/cn.ts',
        });

        await copyTemplate({
          src: path.join(TEMPLATE_DIR, 'styles/globals.css'),
          dest: path.join(projectRoot, 'styles/globals.css'),
          force: options.force,
          description: 'styles/globals.css',
        });

        await ensureDirectoryExists(path.join(projectRoot, 'components/ui'));
        logger.success('Created components/ui directory');

        logger.success('\n✨ Project initialized successfully!');
        logger.info('\nNext steps:');
        logger.info('  1. Add components with: i7a add <component>');
        logger.info('  2. List available components: i7a list');
      } catch (err) {
        logger.error('An error occurred while initializing the project:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}
