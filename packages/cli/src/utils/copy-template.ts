import fs from 'fs-extra';
import path from 'path';
import { ensureDirectoryExists } from './fs-helpers.js';
import { logger } from './logger.js';

interface CopyTemplateOptions {
  src: string;
  dest: string;
  force?: boolean;
  description: string;
}

export async function copyTemplate({
  src,
  dest,
  force,
  description,
}: CopyTemplateOptions): Promise<void> {
  if (!fs.existsSync(src)) {
    throw new Error(`Template not found at ${src}`);
  }

  if (fs.existsSync(dest) && !force) {
    logger.warn(`${description} already exists. Use --force to overwrite.`);
    return;
  }

  await ensureDirectoryExists(path.dirname(dest));
  await fs.copy(src, dest, { overwrite: force });
  logger.success(`Created ${description}`);
}
