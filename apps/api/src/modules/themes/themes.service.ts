import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class ThemesService {
  async getThemeConfig(theme: string = 'default') {
    const themePath = path.resolve(__dirname, 'css', `${theme}.css`);

    if (!existsSync(themePath)) {
      throw new NotFoundException(`Theme "${theme}" not found`);
    }

    const css = await fs.readFile(themePath, 'utf8');
    const utils = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

    const config = {
      $schema: 'https://nachui.vercel.app/schema.json',
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

  async getAllThemes() {
    const themePath = path.resolve(__dirname, 'css');
    const themes = await fs.readdir(themePath);
    return themes.map((theme) => theme.replace('.css', ''));
  }
}
