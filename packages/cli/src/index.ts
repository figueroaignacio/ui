#!/usr/bin/env node
import * as p from '@clack/prompts';
import { Command } from 'commander';
import kleur from 'kleur';
import { addCommand } from './commands/add.js';

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

program.parse();
