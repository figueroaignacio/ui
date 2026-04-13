import * as p from '@clack/prompts';
import kleur from 'kleur';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';
import { detectPackageManager, getInstallCommand } from '../lib/package-manager.js';

export async function initCommand() {
  p.intro(kleur.bgCyan().black(' NachUI - Initialization '));
  const s = p.spinner();
  const cwd = process.cwd();

  try {
    s.start('Fetching available themes...');
    const themes = await api.getThemes();
    s.stop(kleur.green('Themes loaded.'));

    const selectedTheme = await p.select({
      message: 'Select a theme for your project:',
      options: themes.map((t) => ({
        value: t,
        label: t.charAt(0).toUpperCase() + t.slice(1),
      })),
      initialValue: 'default',
    });

    if (p.isCancel(selectedTheme)) {
      p.cancel('Operation cancelled.');
      return;
    }

    s.start(`Downloading ${kleur.cyan(selectedTheme as string)} assets...`);
    const { css, config, utils } = await api.getTheme(selectedTheme as string);
    s.stop(kleur.green(`Assets for ${selectedTheme} ready.`));

    const nextConfigFiles = ['next.config.mjs', 'next.config.js', 'next.config.ts'];
    const isNext = nextConfigFiles.some((file) => fs.existsSync(path.join(cwd, file)));

    let cssRelativePath = '';

    if (isNext) {
      const nextPaths = [
        'src/app/globals.css',
        'app/globals.css',
        'src/pages/globals.css',
        'pages/globals.css',
      ];
      cssRelativePath =
        nextPaths.find((p) => fs.existsSync(path.join(cwd, p))) ||
        (fs.existsSync(path.join(cwd, 'src')) ? 'src/app/globals.css' : 'app/globals.css');
    } else {
      const vitePaths = ['src/index.css', 'index.css', 'src/main.css', 'main.css'];
      cssRelativePath =
        vitePaths.find((p) => fs.existsSync(path.join(cwd, p))) ||
        (fs.existsSync(path.join(cwd, 'src')) ? 'src/index.css' : 'index.css');
    }

    const finalConfig = {
      ...config,
      tailwind: { ...config.tailwind, css: cssRelativePath },
    };
    fs.writeFileSync(path.join(cwd, 'nachui.json'), JSON.stringify(finalConfig, null, 2));

    const absoluteCssPath = path.join(cwd, cssRelativePath);
    const sanitizedCss = css.replace(/@source\s+['"][^'"]+['"];\n/g, '');
    const tokenIdentifier = '/* NachUI Tokens */';

    let newContent = '';
    if (fs.existsSync(absoluteCssPath)) {
      const content = fs.readFileSync(absoluteCssPath, 'utf8');

      if (content.includes(tokenIdentifier)) {
        const parts = content.split(tokenIdentifier);
        newContent = parts[0].trim() + '\n\n' + tokenIdentifier + '\n' + sanitizedCss;
      } else {
        newContent = content.trim() + '\n\n' + tokenIdentifier + '\n' + sanitizedCss;
      }
    } else {
      newContent = tokenIdentifier + '\n' + sanitizedCss;
    }

    fs.mkdirSync(path.dirname(absoluteCssPath), { recursive: true });
    fs.writeFileSync(absoluteCssPath, newContent.trim());

    const garbageIndex = path.join(cwd, 'index.css');
    if (isNext && fs.existsSync(garbageIndex) && cssRelativePath !== 'index.css') {
      fs.unlinkSync(garbageIndex);
      p.log.info(kleur.gray('Cleaned up accidental index.css from root.'));
    }

    const utilsRelativePath = config.aliases.utils.replace('@/', 'src/') + '.ts';
    const utilsPath = path.join(cwd, utilsRelativePath);

    if (!fs.existsSync(path.dirname(utilsPath))) {
      fs.mkdirSync(path.dirname(utilsPath), { recursive: true });
    }
    fs.writeFileSync(utilsPath, utils);

    const utilsDeps = ['clsx', 'tailwind-merge'];
    const pkgPath = path.join(cwd, 'package.json');

    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const installedDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const missingDeps = utilsDeps.filter((dep) => !installedDeps[dep]);

      if (missingDeps.length > 0) {
        p.log.warn(`Missing core utilities: ${kleur.yellow(missingDeps.join(', '))}`);

        const shouldInstall = await p.confirm({
          message: 'Install clsx and tailwind-merge?',
          initialValue: true,
        });

        if (shouldInstall && !p.isCancel(shouldInstall)) {
          const instSpinner = p.spinner();
          instSpinner.start('Installing dependencies...');
          try {
            const agent = detectPackageManager();
            const installCmd = getInstallCommand(agent, missingDeps);
            execSync(installCmd, { stdio: 'ignore' });
            instSpinner.stop(kleur.green('Dependencies installed.'));
          } catch {
            instSpinner.stop(kleur.red('Failed to install automatically.'));
            p.log.info(`Run: ${kleur.cyan(`npm install ${missingDeps.join(' ')}`)}`);
          }
        }
      }
    }

    p.note(
      `Theme: ${kleur.cyan(selectedTheme as string)}\n` +
        `Config: nachui.json\n` +
        `Styles: ${cssRelativePath}\n` +
        `Utils: ${utilsRelativePath}`,
      'Setup complete',
    );

    p.outro(kleur.bgGreen().black(' NachUI ') + ' Ready to go!');
  } catch (error) {
    s.stop(kleur.red('Init failed.'));
    console.error(kleur.red('\nDetails:'), error);
  }
}
