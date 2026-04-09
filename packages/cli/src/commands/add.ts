import * as p from '@clack/prompts';
import kleur from 'kleur';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';

export async function addCommand(componentSlug: string) {
  const s = p.spinner();
  s.start(`Searching for ${kleur.cyan(componentSlug)} in the registry...`);

  try {
    const component = await api.getComponent(componentSlug);
    s.stop(`Component ${kleur.green(componentSlug)} found.`);

    const targetDir = path.join(process.cwd(), 'src/components/ui');
    const targetPath = path.join(targetDir, `${componentSlug}.tsx`);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, component.code);

    p.note(kleur.gray(`File created at: ${targetPath}`), 'Installation successful');

    if (component.dependencies && component.dependencies.length > 0) {
      p.log.warn(`This component requires: ${kleur.yellow(component.dependencies.join(', '))}`);
      p.log.info('I will enable automatic installation soon.');
    }

    p.outro(kleur.bgGreen().black(' NachUI ') + ' Process finished.');
  } catch {
    s.stop(kleur.red('Error getting the component.'));
    p.log.error('Check that the API is running and that the slug is correct.');
  }
}
