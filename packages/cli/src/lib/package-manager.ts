import fs from 'node:fs';
import path from 'node:path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function detectPackageManager(): PackageManager {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) {
    return 'bun';
  }

  return 'npm';
}

export function getInstallCommand(agent: PackageManager, dependencies: string[]): string {
  const deps = dependencies.join(' ');

  switch (agent) {
    case 'pnpm':
      return `pnpm add ${deps}`;
    case 'yarn':
      return `yarn add ${deps}`;
    case 'bun':
      return `bun add ${deps}`;
    default:
      return `npm install ${deps}`;
  }
}
