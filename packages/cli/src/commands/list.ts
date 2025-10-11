import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function listCommand(program: Command) {
  program
    .command('list')
    .description('Lista los componentes disponibles en las plantillas del CLI')
    .action(() => {
      const TEMPLATE_DIR = path.join(
        path.dirname(new URL(import.meta.url).pathname),
        '../templates/components',
      );

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
