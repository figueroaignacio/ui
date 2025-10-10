#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import { copy } from 'fs-extra';
import path from 'path';
import { logger } from './utils/logger.js';

const program = new Command();
program.name('i7a').description('CLI oficial para agregar componentes i7a UI').version('0.1.0');

const TEMPLATE_DIR = path.resolve(__dirname, '../templates/components');

program
  .command('add <component>')
  .description('Agrega un componente a tu proyecto')
  .action(async (component) => {
    const src = path.join(TEMPLATE_DIR, `${component}.tsx`);
    const dest = path.join(process.cwd(), `components/ui/${component}.tsx`);

    if (!fs.existsSync(src)) {
      logger.error(`El componente "${component}" no existe en las plantillas.`);
      return;
    }

    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await copy(src, dest);
    logger.success(`Componente "${component}" agregado en components/ui/${component}.tsx`);
  });

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

program.parse();
