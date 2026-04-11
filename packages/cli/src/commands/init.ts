import * as p from '@clack/prompts';
import kleur from 'kleur';
import fs from 'node:fs';
import path from 'node:path';
import { api } from '../lib/api.js';

export async function initCommand() {
  p.intro(kleur.bgCyan().black(' NachUI - Initialization '));
  const s = p.spinner();

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
    const cwd = process.cwd();
    const isNext =
      fs.existsSync(path.join(cwd, 'next.config.mjs')) ||
      fs.existsSync(path.join(cwd, 'next.config.js'));

    let cssRelativePath = isNext ? 'src/app/globals.css' : 'src/index.css';

    if (!fs.existsSync(path.join(cwd, cssRelativePath))) {
      const fallback = isNext ? 'app/globals.css' : 'index.css';
      if (fs.existsSync(path.join(cwd, fallback))) {
        cssRelativePath = fallback;
      }
    }

    const finalConfig = {
      ...config,
      tailwind: { ...config.tailwind, css: cssRelativePath },
    };

    fs.writeFileSync(path.join(cwd, 'nachui.json'), JSON.stringify(finalConfig, null, 2));

    const absoluteCssPath = path.join(cwd, cssRelativePath);
    const sanitizedCss = css.replace(/@source\s+['"][^'"]+['"];\n/g, '');

    if (fs.existsSync(absoluteCssPath)) {
      const content = fs.readFileSync(absoluteCssPath, 'utf8');
      if (!content.includes('/* NachUI Tokens */')) {
        fs.appendFileSync(absoluteCssPath, `\n\n/* NachUI Tokens */\n${sanitizedCss}`);
      } else {
        p.log.warn('NachUI tokens already exist in your CSS. Skipping injection.');
      }
    } else {
      fs.mkdirSync(path.dirname(absoluteCssPath), { recursive: true });
      fs.writeFileSync(absoluteCssPath, `/* NachUI Tokens */\n${sanitizedCss}`);
    }

    const utilsRelativePath = config.aliases.utils.replace('@/', 'src/') + '.ts';
    const utilsPath = path.join(cwd, utilsRelativePath);

    if (!fs.existsSync(path.dirname(utilsPath))) {
      fs.mkdirSync(path.dirname(utilsPath), { recursive: true });
    }

    fs.writeFileSync(utilsPath, utils);

    p.note(
      `Theme: ${kleur.cyan(selectedTheme as string)}\n` +
        `Config: nachui.json\n` +
        `Styles: ${cssRelativePath}\n` +
        `Utils: ${utilsRelativePath}`,
      'Setup successful',
    );

    p.outro(
      kleur.bgGreen().black(' NachUI ') + ' Ready to go! Try: ' + kleur.cyan('nachui add button'),
    );
  } catch (error) {
    s.stop(kleur.red('Init failed.'));
    console.error(kleur.red('\nDetails:'), error);
  }
}
