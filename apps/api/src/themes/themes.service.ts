import { Injectable, NotFoundException } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';

@Injectable()
export class ThemesService {
  getThemeConfig(theme: string = 'default') {
    const themePath = path.resolve(process.cwd(), 'src/themes/css', `${theme}.css`);

    if (!fs.existsSync(themePath)) {
      throw new NotFoundException(`Theme "${theme}" not found`);
    }

    const css = fs.readFileSync(themePath, 'utf8');
    const utils = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

    const config = {
      $schema: 'https://nach-ui.vercel.app/schema.json',
      style: 'oklch',
      tailwind: {
        config: 'tailwind.config.ts',
        baseColor: 'zinc',
      },
      aliases: {
        components: '@/components/ui',
        utils: '@/lib/utils',
      },
    };

    return { css, config, utils };
  }

  getAllThemes() {
    const themePath = path.resolve(process.cwd(), 'src/themes/css');
    const themes = fs.readdirSync(themePath);
    return themes.map((theme) => theme.replace('.css', ''));
  }
}
