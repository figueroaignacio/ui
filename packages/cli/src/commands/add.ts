import { Command } from 'commander';

// Node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Utils
import pc from 'picocolors';
import { checkComponentDependencies } from '../utils/check-component-dependencies.js';
import { ensureDirectoryExists } from '../utils/fs-helpers.js';
import { logger } from '../utils/logger.js';
import { getAllComponents } from '../utils/templates-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AddOptions {
  debug?: boolean;
  force?: boolean;
  path?: string;
}

export function addCommand(program: Command): void {
  program
    .command('add <component>')
    .description('Add a component to your project')
    .option('-d, --debug', 'Show debug information', false)
    .option('-f, --force', 'Overwrite existing component', false)
    .option('-p, --path <path>', 'Custom destination path', 'components/ui')
    .action(async (component: string, options: AddOptions): Promise<void> => {
      try {
        const TEMPLATE_DIR = path.join(__dirname, '../templates/components');
        const src = path.join(TEMPLATE_DIR, `${component}.tsx`);
        const dest = path.join(process.cwd(), options.path || 'components/ui', `${component}.tsx`);

        if (options.debug) {
          printDebugInfo(component, TEMPLATE_DIR, src, dest);
        }

        if (!fs.existsSync(src)) {
          logger.error(`Component "${component}" does not exist in templates.`);
          logger.info('Available components:');
          const available = getAllComponents(TEMPLATE_DIR);
          available.forEach((c) => console.log(`  - ${c}`));
          logger.info(`\nUse --debug flag for more information: i7a add ${component} --debug`);
          process.exit(1);
        }

        if (fs.existsSync(dest) && !options.force) {
          logger.warn(`Component "${component}" already exists at ${dest}`);
          logger.info('Use --force flag to overwrite existing component.');
          process.exit(1);
        }

        await ensureDirectoryExists(path.dirname(dest));

        await fs.copy(src, dest, { overwrite: options.force });

        logger.success(`✨ Component "${component}" added successfully!`);
        logger.info(`Location: ${path.relative(process.cwd(), dest)}`);

        const dependencies = await checkComponentDependencies(src);
        if (dependencies.length > 0) {
          logger.info('\nThis component may require additional dependencies:');
          dependencies.forEach((dep) => console.log(`  - ${dep}`));
        }
      } catch (err) {
        logger.error('An error occurred while adding the component:');
        if (err instanceof Error) {
          logger.error(err.message);
        } else {
          console.error(err);
        }
        process.exit(1);
      }
    });
}

function printDebugInfo(component: string, templateDir: string, src: string, dest: string): void {
  console.log(pc.cyan('\n🔍 Debug Information:'));
  console.log(pc.gray('  Component:'), component);
  console.log(pc.gray('  __dirname:'), __dirname);
  console.log(pc.gray('  __filename:'), __filename);
  console.log(pc.gray('  Template directory:'), templateDir);
  console.log(pc.gray('  Source:'), src);
  console.log(pc.gray('  Destination:'), dest);

  const packageRoot = path.join(__dirname, '..');
  console.log(pc.gray('  Package root:'), packageRoot);

  if (fs.existsSync(packageRoot)) {
    const contents = fs.readdirSync(packageRoot);
    console.log(pc.gray('  Package contents:'), contents);

    const templatesPath = path.join(packageRoot, 'templates');
    if (fs.existsSync(templatesPath)) {
      console.log(pc.green('  ✓ templates/ directory exists'));
      const templateContents = fs.readdirSync(templatesPath);
      console.log(pc.gray('    Contents:'), templateContents);

      if (fs.existsSync(templateDir)) {
        console.log(pc.green('  ✓ templates/components/ directory exists'));
        const components = fs.readdirSync(templateDir);
        console.log(pc.gray('    Available components:'), components);
      } else {
        console.log(pc.red('  ✗ templates/components/ directory does not exist'));
      }
    } else {
      console.log(pc.red('  ✗ templates/ directory does not exist in package'));
    }
  }
  console.log('');
}
