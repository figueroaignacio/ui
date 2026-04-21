import * as p from '@clack/prompts';
import { Command } from 'commander';
import kleur from 'kleur';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program
  .name('mateui')
  .description('MateUI CLI - Add, update, remove and list components')
  .version('1.0.8');

program
  .command('init')
  .description('Initialize MateUI in your project')
  .action(async () => {
    console.log('');
    p.intro(kleur.bgCyan().black(' MateUI CLI '));
    await initCommand();
  });

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' MateUI CLI '));
    await addCommand(component);
  });

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    console.log('');
    p.intro(kleur.bgCyan().black(' MateUI CLI '));
    await listCommand();
  });

program
  .command('update')
  .description('Update an installed component')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' MateUI CLI '));
    await updateCommand(component);
  });

program
  .command('remove')
  .description('Remove an installed component')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' MateUI CLI '));
    await removeCommand(component);
  });

program.parse();
