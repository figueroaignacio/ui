import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { diffCommand } from './commands/diff.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';
import { updateCommand } from './commands/update.js';
import { logger } from './utils/logger.js';

const program = new Command();

program
  .name('i7a')
  .description('Official CLI for managing i7a UI components')
  .version('0.1.0')
  .configureOutput({
    outputError: (str, write) => write(logger.error(str)),
  });

initCommand(program);
addCommand(program);
listCommand(program);
removeCommand(program);
updateCommand(program);
diffCommand(program);

// Handle unknown commands
program.on('command:*', () => {
  logger.error('Invalid command. Use --help to see available commands.');
  process.exit(1);
});

// Parse arguments
program.parse();
