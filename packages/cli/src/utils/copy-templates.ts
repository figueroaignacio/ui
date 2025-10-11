import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function copyTemplates() {
  try {
    const projectRoot = path.join(__dirname, '../..');
    const src = path.join(projectRoot, 'templates');
    const dest = path.join(projectRoot, 'dist/templates');

    console.log(pc.cyan('📁 Copiando templates...'));
    console.log(pc.gray('   Desde:'), src);
    console.log(pc.gray('   Hacia:'), dest);

    if (!fs.existsSync(src)) {
      console.error(pc.red('✖ No se encontró la carpeta templates en la raíz del proyecto'));
      console.log(
        pc.yellow('💡 Asegúrate de que exista templates/ en la raíz con tus componentes'),
      );
      process.exit(1);
    }

    const componentsPath = path.join(src, 'components');
    if (!fs.existsSync(componentsPath)) {
      console.error(pc.red('✖ No se encontró templates/components/'));
      process.exit(1);
    }

    const components = fs.readdirSync(componentsPath).filter((f) => f.endsWith('.tsx'));
    console.log(pc.blue(`📦 Encontrados ${components.length} componentes:`), components.join(', '));

    await fs.remove(dest);
    await fs.copy(src, dest);

    console.log(pc.green('✔ Templates copiados exitosamente a dist/templates'));
  } catch (err) {
    console.error(pc.red('✖ Error al copiar templates:'), err);
    process.exit(1);
  }
}
