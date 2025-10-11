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
  const TEMPLATE_DIR = path.join(__dirname, '../templates/components');

  program
    .command('add <component>')
    .description('Agrega un componente a tu proyecto')
    .action(async (component: string) => {
      console.log(pc.cyan('\n🔍 Debug Info:'));
      console.log(pc.gray('  __dirname:'), __dirname);
      console.log(pc.gray('  TEMPLATE_DIR:'), TEMPLATE_DIR);
      console.log(pc.gray('  Buscando:'), `${component}.tsx`);

      const src = path.join(TEMPLATE_DIR, `${component}.tsx`);
      const dest = path.join(process.cwd(), `components/ui/${component}.tsx`);

      console.log(pc.gray('  Ruta completa src:'), src);
      console.log(pc.gray('  Existe?:'), fs.existsSync(src));

      if (fs.existsSync(TEMPLATE_DIR)) {
        const files = fs.readdirSync(TEMPLATE_DIR);
        console.log(pc.gray('  Archivos disponibles:'), files.join(', '));
      } else {
        console.log(pc.red('  ✖ La carpeta de templates no existe!'));
      }

      if (!fs.existsSync(src)) {
        logger.error(`El componente "${component}" no existe en las plantillas.`);
        logger.info(`Ruta buscada: ${src}`);
        return;
      }

      await fs.promises.mkdir(path.dirname(dest), { recursive: true });
      await copy(src, dest);
      logger.success(`Componente "${component}" agregado en components/ui/${component}.tsx`);
    });
}
