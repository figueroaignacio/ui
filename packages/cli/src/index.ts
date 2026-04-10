import * as p from '@clack/prompts';
import { Command } from 'commander';
import kleur from 'kleur';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program.name('nachui').description('CLI de NachUI').version('0.0.1');

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' NachUI CLI '));
    await addCommand(component);
  });

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    console.log('');
    p.intro(kleur.bgCyan().black(' NachUI CLI '));
    await listCommand();
  });

program
  .command('update')
  .description('Update an installed component')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' NachUI CLI '));
    await updateCommand(component);
  });

program
  .command('remove')
  .description('Remove an installed component')
  .argument('<component>', 'component slug')
  .action(async (component) => {
    console.log('');
    p.intro(kleur.bgCyan().black(' NachUI CLI '));
    await removeCommand(component);
  });

program.parse();
