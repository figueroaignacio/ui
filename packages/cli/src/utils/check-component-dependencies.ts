import fs from 'fs-extra';

export async function checkComponentDependencies(componentPath: string): Promise<string[]> {
  const content = await fs.readFile(componentPath, 'utf-8');
  const dependencies: string[] = [];

  const commonDeps = [
    { pattern: /lucide-react/g, name: 'lucide-react' },
    { pattern: /class-variance-authority/g, name: 'class-variance-authority' },
    { pattern: /clsx/g, name: 'clsx' },
    { pattern: /tailwind-merge/g, name: 'tailwind-merge' },
  ];

  commonDeps.forEach(({ pattern, name }) => {
    if (pattern.test(content) && !dependencies.includes(name)) {
      dependencies.push(name);
    }
  });

  return dependencies;
}
