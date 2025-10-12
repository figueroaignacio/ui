import fs from 'fs';
import path from 'path';

export function getTemplatePath(baseDir: string, component: string, extension = '.tsx'): string {
  return path.join(baseDir, `${component}${extension}`);
}

export function getAllComponents(templatesDir: string): string[] {
  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  return fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => file.replace('.tsx', ''))
    .sort();
}

export function componentExists(templatesDir: string, component: string): boolean {
  const componentPath = getTemplatePath(templatesDir, component);
  return fs.existsSync(componentPath);
}

export interface ComponentMetadata {
  name: string;
  hasDefaultExport: boolean;
  imports: string[];
  dependencies: string[];
}

export function getComponentMetadata(componentPath: string): ComponentMetadata | null {
  if (!fs.existsSync(componentPath)) {
    return null;
  }

  const content = fs.readFileSync(componentPath, 'utf-8');
  const lines = content.split('\n');

  const imports = lines
    .filter((line) => line.trim().startsWith('import'))
    .map((line) => line.trim());

  const dependencies = [
    ...new Set(
      imports
        .map((imp) => {
          const match = imp.match(/from ['"]([^'"]+)['"]/);
          return match ? match[1] : null;
        })
        .filter(
          (dep): dep is string => dep !== null && !dep.startsWith('.') && !dep.startsWith('@/'),
        ),
    ),
  ];

  const hasDefaultExport = /export default/.test(content);
  const name = path.basename(componentPath, '.tsx');

  return {
    name,
    hasDefaultExport,
    imports,
    dependencies,
  };
}

export function validateTemplateStructure(baseDir: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!fs.existsSync(baseDir)) {
    errors.push(`Template directory does not exist: ${baseDir}`);
    return { valid: false, errors };
  }

  const componentsDir = path.join(baseDir, 'components');
  const utilsDir = path.join(baseDir, 'utils');
  const stylesDir = path.join(baseDir, 'styles');

  if (!fs.existsSync(componentsDir)) {
    errors.push('Missing components directory');
  }

  if (!fs.existsSync(utilsDir)) {
    errors.push('Missing utils directory');
  }

  if (!fs.existsSync(stylesDir)) {
    errors.push('Missing styles directory');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
