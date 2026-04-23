import fs from 'fs/promises';
import path from 'path';

import { BRICK_REGISTRY } from '@repo/ui/registry';

type BrickCategoryKey = keyof typeof BRICK_REGISTRY;

export async function getBrickSourceCode(
  category: string,
  brickId: string,
): Promise<{ code: string | null; error?: string }> {
  const categoryBricks = BRICK_REGISTRY[category as BrickCategoryKey];

  if (!categoryBricks) {
    return { code: null, error: `Unknown brick category "${category}".` };
  }

  const relativePath = (categoryBricks as Record<string, string>)[brickId];

  if (!relativePath) {
    return { code: null, error: `Brick "${brickId}" not found in category "${category}".` };
  }

  // Registry paths are relative to monorepo root
  const absolutePath = path.join(process.cwd(), '..', '..', relativePath);

  try {
    const code = await fs.readFile(absolutePath, 'utf-8');
    return { code };
  } catch {
    return { code: null, error: `Could not read source for brick "${brickId}".` };
  }
}
