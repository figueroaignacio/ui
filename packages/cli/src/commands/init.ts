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

    const isNext =
      fs.existsSync(path.join(cwd, 'next.config.mjs')) ||
      fs.existsSync(path.join(cwd, 'next.config.js'));

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
    const tokenBlock = `\n\n${tokenIdentifier}\n${sanitizedCss}`;

    if (fs.existsSync(absoluteCssPath)) {
      const content = fs.readFileSync(absoluteCssPath, 'utf8');

      if (!content.includes(tokenIdentifier)) {
        fs.appendFileSync(absoluteCssPath, tokenBlock);
      } else {
        const parts = content.split(tokenIdentifier);
        const newContent = parts[0] + tokenIdentifier + '\n' + sanitizedCss;
        fs.writeFileSync(absoluteCssPath, newContent.trim());
        p.log.info(kleur.blue('Styles updated in your existing CSS file.'));
      }
    } else {
      fs.mkdirSync(path.dirname(absoluteCssPath), { recursive: true });
      fs.writeFileSync(absoluteCssPath, `${tokenIdentifier}\n${sanitizedCss}`);
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
        p.log.warn(`Missing required utilities: ${kleur.yellow(missingDeps.join(', '))}`);

        const shouldInstall = await p.confirm({
          message: 'Install clsx and tailwind-merge?',
          initialValue: true,
        });

        if (shouldInstall && !p.isCancel(shouldInstall)) {
          const instSpinner = p.spinner();
          instSpinner.start('Installing core dependencies...');
          try {
            const agent = detectPackageManager();
            const installCmd = getInstallCommand(agent, missingDeps);
            execSync(installCmd, { stdio: 'ignore' });
            instSpinner.stop(kleur.green('Core dependencies installed.'));
          } catch {
            instSpinner.stop(kleur.red('Failed to install automatically.'));
            p.log.info(
              `Please run manually: ${kleur.cyan(`npm install ${missingDeps.join(' ')}`)}`,
            );
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

    p.outro(
      kleur.bgGreen().black(' NachUI ') +
        ' Ready! Try adding a component: ' +
        kleur.cyan('nachui add button'),
    );
  } catch (error) {
    s.stop(kleur.red('Init failed.'));
    console.error(kleur.red('\nDetails:'), error);
  }
}
