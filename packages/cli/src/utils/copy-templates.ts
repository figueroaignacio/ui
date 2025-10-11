import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function copyTemplates() {
  try {
    const src = path.join(__dirname, '../templates');
    const dest = path.join(__dirname, '../../dist/templates');

    if (!fs.existsSync(src)) {
      console.warn(pc.yellow('⚠ No se encontró la carpeta de templates. Se omitirá la copia.'));
      return;
    }

    await fs.remove(dest);
    await fs.copy(src, dest);
    console.log(pc.green('✔ Carpeta templates copiada correctamente a dist.'));
  } catch (err) {
    console.error(pc.red('✖ Error al copiar templates:'), err);
  }
}
