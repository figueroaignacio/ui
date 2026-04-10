import * as p from '@clack/prompts';
import kleur from 'kleur';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';
import { detectPackageManager, getInstallCommand } from '../lib/package-manager.js';

export async function addCommand(componentSlug: string) {
  const s = p.spinner();
  s.start(`Searching for ${kleur.cyan(componentSlug)}...`);

  try {
    const component = await api.getComponent(componentSlug);
    s.stop(`Component ${kleur.green(componentSlug)} found.`);

    const targetDir = path.join(process.cwd(), 'src/components/ui');
    const targetPath = path.join(targetDir, `${componentSlug}.tsx`);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, component.code);
    p.note(kleur.gray(`Created at: ${targetPath}`), 'File installed');

    if (component.dependencies?.length > 0) {
      const pkgPath = path.join(process.cwd(), 'package.json');

      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const allInstalled = { ...pkg.dependencies, ...pkg.devDependencies };

        const missingDeps = component.dependencies.filter((dep) => !allInstalled[dep]);

        if (missingDeps.length > 0) {
          p.log.warn(`Missing: ${kleur.yellow(missingDeps.join(', '))}`);

          const shouldInstall = await p.confirm({
            message: `Do you want to install them?`,
            initialValue: true,
          });

          if (shouldInstall && !p.isCancel(shouldInstall)) {
            const agent = detectPackageManager();
            const installCmd = getInstallCommand(agent, missingDeps);

            p.log.info(`Running: ${kleur.dim(installCmd)}`);

            try {
              execSync(installCmd, { stdio: 'inherit' });
              p.log.success(kleur.green('Dependencies installed.'));
            } catch {
              p.log.error('Install failed. Please run it manually.');
            }
          }
        }
      }
    }

    p.outro(kleur.bgGreen().black(' NachUI ') + ' Done!');
  } catch {
    s.stop(kleur.red('Error getting component.'));
    p.log.error('Check your API or slug.');
  }
}
