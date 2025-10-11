import { Command } from 'commander';
import fs from 'fs';
import { copy } from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function addCommand(program: Command) {
  program
    .command('add <component>')
    .description('Agrega un componente a tu proyecto')
    .option('-d, --debug', 'Mostrar información de debug')
    .action(async (component: string, options: { debug?: boolean }) => {
      // Desde dist/cli.js -> dist/ -> raíz del paquete -> templates/
      // Como todo está bundleado en dist/cli.js, __dirname es dist/
      const TEMPLATE_DIR = path.join(__dirname, '../templates/components');
      const src = path.join(TEMPLATE_DIR, `${component}.tsx`);
      const dest = path.join(process.cwd(), `components/ui/${component}.tsx`);

      if (options.debug) {
        console.log(pc.cyan('\n🔍 Debug Info:'));
        console.log(pc.gray('  __dirname:'), __dirname);
        console.log(pc.gray('  __filename:'), __filename);
        console.log(pc.gray('  TEMPLATE_DIR:'), TEMPLATE_DIR);
        console.log(pc.gray('  src:'), src);
        console.log(pc.gray('  dest:'), dest);

        const packageRoot = path.join(__dirname, '..');
        console.log(pc.gray('  Package root:'), packageRoot);

        if (fs.existsSync(packageRoot)) {
          const contents = fs.readdirSync(packageRoot);
          console.log(pc.gray('  Contents of package root:'), contents);

          const templatesPath = path.join(packageRoot, 'templates');
          if (fs.existsSync(templatesPath)) {
            console.log(pc.green('  ✓ templates/ existe'));
            const templateContents = fs.readdirSync(templatesPath);
            console.log(pc.gray('    Contents:'), templateContents);

            if (fs.existsSync(TEMPLATE_DIR)) {
              console.log(pc.green('  ✓ templates/components/ existe'));
              const components = fs.readdirSync(TEMPLATE_DIR);
              console.log(pc.gray('    Components:'), components);
            } else {
              console.log(pc.red('  ✗ templates/components/ NO existe'));
            }
          } else {
            console.log(pc.red('  ✗ templates/ NO existe en el paquete'));
          }
        }
        console.log('');
      }

      if (!fs.existsSync(src)) {
        logger.error(`El componente "${component}" no existe en las plantillas.`);
        logger.info(`Usa --debug para ver más información: i7a add ${component} --debug`);
        return;
      }

      await fs.promises.mkdir(path.dirname(dest), { recursive: true });
      await copy(src, dest);
      logger.success(`Componente "${component}" agregado en components/ui/${component}.tsx`);
    });
}
