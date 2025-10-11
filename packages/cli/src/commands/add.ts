import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

export function addCommand(program: Command) {
  // Resuelve la ruta del paquete CLI (no del proyecto del usuario)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const TEMPLATE_DIR = path.join(__dirname, '..', 'templates', 'components');

  program
    .command('add <component>')
    .description('Agrega un componente UI desde las plantillas internas del CLI')
    .action(async (component) => {
      const srcPath = path.join(TEMPLATE_DIR, `${component}.tsx`);
      const destPath = path.join(process.cwd(), 'components', 'ui', `${component}.tsx`);

      // Verifica que las plantillas existan
      if (!(await fs.pathExists(TEMPLATE_DIR))) {
        logger.error(`No se encontró el directorio de plantillas en: ${TEMPLATE_DIR}`);
        return;
      }

      // Verifica que el componente exista
      if (!(await fs.pathExists(srcPath))) {
        const available =
          (await fs.readdir(TEMPLATE_DIR))
            .filter((f) => f.endsWith('.tsx'))
            .map((f) => f.replace('.tsx', ''))
            .join(', ') || 'ninguno';
        logger.error(`El componente "${component}" no existe en las plantillas.`);
        logger.info(`Componentes disponibles: ${available}`);
        return;
      }

      // Crea la carpeta destino si no existe
      await fs.ensureDir(path.dirname(destPath));

      // Copia el archivo
      await fs.copy(srcPath, destPath);

      logger.success(
        `✅ Componente "${component}" agregado correctamente en: components/ui/${component}.tsx`,
      );
    });
}
