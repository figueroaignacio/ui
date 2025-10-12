import fs from 'fs-extra';
import path from 'path';

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export async function readFileSafe(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export async function writeFileSafe(filePath: string, content: string): Promise<boolean> {
  try {
    await ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export function getFilesWithExtension(dirPath: string, extension: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(extension))
    .map((file) => file.replace(extension, ''));
}

export async function createBackup(filePath: string): Promise<string> {
  const backupPath = `${filePath}.backup`;
  await fs.copy(filePath, backupPath);
  return backupPath;
}
