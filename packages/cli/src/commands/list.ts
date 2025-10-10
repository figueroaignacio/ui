import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function listCommand(program: Command) {
  const TEMPLATE_DIR = path.join(process.cwd(), 'templates/components');

  program
    .command('list')
    .description('Lista los componentes disponibles')
    .action(() => {
      if (!fs.existsSync(TEMPLATE_DIR)) {
        logger.error('No se encontró la carpeta de plantillas.');
        return;
      }

      const components = fs
        .readdirSync(TEMPLATE_DIR)
        .filter((file) => file.endsWith('.tsx'))
        .map((file) => file.replace('.tsx', ''));

      if (components.length === 0) {
        logger.warn('No hay componentes disponibles actualmente.');
        return;
      }

      logger.info('Componentes disponibles:');
      components.forEach((c) => console.log(' -', c));
    });
}
