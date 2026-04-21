import * as p from '@clack/prompts';
import kleur from 'kleur';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';

export async function updateCommand(componentSlug: string) {
  const s = p.spinner();

  const configPath = path.join(process.cwd(), 'nachui.json');

  if (!fs.existsSync(configPath)) {
    p.log.error(kleur.red("Error: nachui.json not found. Please run 'nachui init' first."));
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  const targetBaseDir = config.aliases.components.replace('@/', 'src/');
  const targetPath = path.join(process.cwd(), targetBaseDir, `${componentSlug}.tsx`);

  if (!fs.existsSync(targetPath)) {
    p.log.error(
      kleur.red(`The component "${componentSlug}" is not installed in ${targetBaseDir}.`),
    );
    p.log.info(`Try using: ${kleur.cyan(`nachui add ${componentSlug}`)}`);
    return;
  }

  s.start(`Fetching latest code for ${kleur.cyan(componentSlug)}...`);

  try {
    const component = await api.getComponent(componentSlug);
    s.stop(`Latest version of ${kleur.green(componentSlug)} fetched.`);

    const confirm = await p.confirm({
      message: `Update ${kleur.bold(componentSlug)}? This will ${kleur.red('overwrite')} your local changes.`,
      initialValue: false,
    });

    if (p.isCancel(confirm) || !confirm) {
      p.outro(kleur.yellow('Update cancelled.'));
      return;
    }

    fs.writeFileSync(targetPath, component.code);

    p.note(kleur.gray(`Location: ${targetPath}`), 'Update successful');
    p.outro(
      kleur.bgBlue().white(' NachUI ') + ' Component updated to the latest registry version.',
    );
  } catch {
    s.stop(kleur.red('Error updating.'));
    p.log.error('Check your internet connection or if the component slug is correct.');
  }
}
