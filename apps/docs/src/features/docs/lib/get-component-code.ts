import { COMPONENT_REGISTRY, DEMO_REGISTRY } from '@repo/ui/registry';
import fs from 'fs';
import path from 'path';

type ComponentCodeResult = {
  code: string | null;
  filePath: string | null;
  error?: string;
};

/**
 * Get source code for a component
 */
export async function getComponentSourceCode(componentName: string): Promise<ComponentCodeResult> {
  const componentPath = COMPONENT_REGISTRY[componentName as keyof typeof COMPONENT_REGISTRY];

  if (!componentPath) {
    return {
      code: null,
      filePath: null,
      error: `Component "${componentName}" not found in registry.`,
    };
  }

  const filePath = path.join(process.cwd(), '../../', componentPath);

  try {
    const code = await fs.promises.readFile(filePath, 'utf-8');
    return { code, filePath: componentPath };
  } catch (error) {
    console.error('❌ Error reading component file:', error);
    return {
      code: null,
      filePath: componentPath,
      error: 'Error reading the component file.',
    };
  }
}

/**
 * Get source code for a demo
 */
export async function getDemoCode(
  componentName: string,
  demoName: string,
): Promise<ComponentCodeResult> {
  const componentDemos = DEMO_REGISTRY[componentName as keyof typeof DEMO_REGISTRY];

  if (!componentDemos) {
    return {
      code: null,
      filePath: null,
      error: `No demos found for component "${componentName}".`,
    };
  }

  const demoPath = componentDemos[demoName as keyof typeof componentDemos];

  if (!demoPath) {
    return {
      code: null,
      filePath: null,
      error: `Demo "${demoName}" not found for component "${componentName}".`,
    };
  }

  const filePath = path.join(process.cwd(), '../../', demoPath);

  try {
    let code = await fs.promises.readFile(filePath, 'utf-8');
    // Update import paths to use @/components/ui/
    code = code.replaceAll(/from ['"]\.\.\/\.\.\/components\//g, "from '@/components/ui/");
    return { code, filePath: demoPath };
  } catch (error) {
    console.error('❌ Error reading demo file:', error);
    return {
      code: null,
      filePath: demoPath,
      error: 'Error reading the demo file.',
    };
  }
}
