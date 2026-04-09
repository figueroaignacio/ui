import * as p from '@clack/prompts';
import kleur from 'kleur';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';

export async function updateCommand(componentSlug: string) {
  const s = p.spinner();

  const targetDir = path.join(process.cwd(), 'src/components/ui');
  const targetPath = path.join(targetDir, `${componentSlug}.tsx`);

  if (!fs.existsSync(targetPath)) {
    p.log.error(kleur.red(`The component "${componentSlug}" is not installed in your project.`));
    p.log.info(`Try using: ${kleur.cyan(`pnpm dlx nachui add ${componentSlug}`)}`);
    return;
  }

  s.start(`Searching for updates for ${kleur.cyan(componentSlug)}...`);

  try {
    const component = await api.getComponent(componentSlug);
    s.stop(`Latest version of ${kleur.green(componentSlug)} obtained.`);

    const confirm = await p.confirm({
      message: `Are you sure you want to update ${kleur.bold(componentSlug)}? This will overwrite your local changes.`,
      initialValue: false,
    });

    if (p.isCancel(confirm) || !confirm) {
      p.outro(kleur.yellow('Update cancelled.'));
      return;
    }

    fs.writeFileSync(targetPath, component.code);

    p.note(kleur.gray(`File updated at: ${targetPath}`), 'Update successful');
    p.outro(kleur.bgBlue().white(' NachUI ') + ' Component updated to the latest version.');
  } catch {
    s.stop(kleur.red('Error updating.'));
    p.log.error('Make sure you have a connection and that the API is active.');
  }
}
