import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initCommand(program: Command): void {
  program
    .command('init')
    .description('Inicializa el proyecto con utils y styles')
    .action(async (): Promise<void> => {
      try {
        const projectRoot = process.cwd();
        const TEMPLATE_DIR = path.join(__dirname, '../templates');

        const cnSrc = path.join(TEMPLATE_DIR, 'utils/cn.ts');
        const cnDest = path.join(projectRoot, 'utils/cn.ts');

        if (!fs.existsSync(cnSrc)) {
          logger.error(`No se encontró la plantilla en ${cnSrc}`);
          return;
        }

        await fs.copy(cnSrc, cnDest);
        logger.success('utils/cn.ts creado correctamente.');

        const cssSrc = path.join(TEMPLATE_DIR, 'styles/globals.css');
        const cssDest = path.join(projectRoot, 'styles/globals.css');

        if (!fs.existsSync(cssSrc)) {
          logger.error(`No se encontró la plantilla en ${cssSrc}`);
          return;
        }

        await fs.copy(cssSrc, cssDest);
        logger.success('styles/globals.css creado correctamente.');

        logger.info('Proyecto inicializado correctamente. ¡Listo para usar i7a UI!');
      } catch (err) {
        logger.error('Ocurrió un error al inicializar el proyecto:');
        console.error(err);
      }
    });
}
