import { Index } from '@repo/ui/samples';
import fs from 'fs';
import path from 'path';

export async function getComponentCode(name: string): Promise<{
  item: (typeof Index)[keyof typeof Index] | null;
  code: string | null;
  error?: string;
}> {
  const item = Index[name as keyof typeof Index];

  if (!item) {
    return {
      item: null,
      code: null,
      error: `Error: Componente "${name}" no encontrado en el index.`,
    };
  }

  let code: string | null = null;

  if (item.file) {
    const filePath = path.join(process.cwd(), '../../', item.file);

    try {
      code = await fs.promises.readFile(filePath, 'utf-8');
      code = code.replaceAll(/from ['"](?:\.\.\/)+components\//g, "from '@/components/ui/");
    } catch (error) {
      console.error('❌ Error leyendo archivo:', error);
      return { item, code: null, error: 'Error leyendo el archivo del componente.' };
    }
  }

  return { item, code };
}
