import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program.name('i7a').description('CLI oficial para agregar componentes i7a UI').version('0.1.0');

initCommand(program);
addCommand(program);
listCommand(program);

program.parse();
