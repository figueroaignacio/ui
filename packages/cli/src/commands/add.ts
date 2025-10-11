import { Command } from 'commander';
import fs from 'fs';
import { copy } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function addCommand(program: Command) {
  const TEMPLATE_DIR = path.join(__dirname, '../../templates/components');

  program
    .command('add <component>')
    .description('Agrega un componente a tu proyecto')
    .action(async (component: string) => {
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
}
