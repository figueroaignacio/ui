import * as p from '@clack/prompts';
import kleur from 'kleur';
import { api } from '../lib/api';

export async function listCommand() {
  const s = p.spinner();
  s.start('Consulting NachUI registry...');

  try {
    const components = await api.getComponents();
    s.stop('Registry loaded successfully.');

    if (components.length === 0) {
      p.log.warn('There are no components in the registry yet.');
      return;
    }

    console.log('');
    p.log.step(kleur.cyan('Available components:'));

    components.forEach((c) => {
      console.log(`  ${kleur.green('→')} ${kleur.bold(c.name)} ${kleur.gray(`(${c.slug})`)}`);
      if (c.dependencies.length > 0) {
        console.log(`    ${kleur.dim(`Deps: ${c.dependencies.join(', ')}`)}`);
      }
    });
    console.log('');

    p.note(`To install one, run:\n${kleur.cyan(`pnpm dlx nachui add <slug>`)}`, 'Tip');
  } catch {
    s.stop(kleur.red('Error connecting to the API.'));
    p.log.error('Make sure the API is running on the correct port.');
  }
}
