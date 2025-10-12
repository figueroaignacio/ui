import pc from 'picocolors';

export const logger = {
  info: (message: string): void => {
    console.log(pc.blue('ℹ'), message);
  },

  success: (message: string): void => {
    console.log(pc.green('✓'), message);
  },

  warn: (message: string): void => {
    console.log(pc.yellow('⚠'), message);
  },

  error: (message: string): void => {
    console.log(pc.red('✗'), message);
  },

  debug: (message: string): void => {
    console.log(pc.gray('🔍'), message);
  },

  blank: (): void => {
    console.log('');
  },
};
