import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function listCommand(program: Command): void {
  program
    .command('list')
    .description('Lista los componentes disponibles en las plantillas del CLI')
    .action((): void => {
      const TEMPLATE_DIR = path.join(__dirname, '../templates/components');

      if (!fs.existsSync(TEMPLATE_DIR)) {
        logger.error('No se encontró la carpeta de plantillas en el CLI.');
        return;
      }

      const components = fs
        .readdirSync(TEMPLATE_DIR)
        .filter((file) => file.endsWith('.tsx'))
        .map((file) => file.replace('.tsx', ''));

      if (components.length === 0) {
        logger.warn('No hay componentes disponibles actualmente en las plantillas del CLI.');
        return;
      }

      logger.info('Componentes disponibles en el CLI:');
      components.forEach((c) => console.log(' -', c));
    });
}
