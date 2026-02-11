import fs from 'fs/promises';
import path from 'path';

export interface ComponentContext {
  name: string;
  code: string;
  language: 'en' | 'es';
  filePath: string;
}

export interface DocumentationContext {
  title: string;
  content: string;
  language: 'en' | 'es';
  path: string;
}

const WORKSPACE_ROOT = path.resolve(process.cwd(), '../..');
const COMPONENTS_PATH = path.join(WORKSPACE_ROOT, 'packages/ui/src/components');
const DOCS_EN_PATH = path.join(process.cwd(), 'src/content/docs/en');
const DOCS_ES_PATH = path.join(process.cwd(), 'src/content/docs/es');

async function readFilesRecursively(
  dir: string,
  extension: string,
): Promise<Array<{ path: string; content: string }>> {
  const results: Array<{ path: string; content: string }> = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const nested = await readFilesRecursively(fullPath, extension);
        results.push(...nested);
      } else if (entry.name.endsWith(extension)) {
        const content = await fs.readFile(fullPath, 'utf-8');
        results.push({ path: fullPath, content });
      }
    }
  } catch (error) {
    console.error(`Could not read directory ${dir}:`, error);
  }

  return results;
}

export async function loadComponents(): Promise<ComponentContext[]> {
  try {
    const files = await readFilesRecursively(COMPONENTS_PATH, '.tsx');

    return files.map((file) => ({
      name: path.basename(file.path, '.tsx'),
      code: file.content,
      language: 'en' as const,
      filePath: file.path,
    }));
  } catch (error) {
    console.error('Error loading components:', error);
    return [];
  }
}

export async function loadDocumentation(language: 'en' | 'es'): Promise<DocumentationContext[]> {
  const docsPath = language === 'en' ? DOCS_EN_PATH : DOCS_ES_PATH;

  try {
    const files = await readFilesRecursively(docsPath, '.mdx');

    return files.map((file) => {
      const relativePath = path.relative(docsPath, file.path);
      const title = relativePath.replace(/\.mdx$/, '').replace(/\//g, ' > ');

      return {
        title,
        content: file.content,
        language,
        path: relativePath,
      };
    });
  } catch (error) {
    console.error('Error loading documentation:', error);
    return [];
  }
}

export function findRelevantComponents(
  components: ComponentContext[],
  query: string,
): ComponentContext[] {
  const normalizedQuery = query.toLowerCase();
  const queryWords = normalizedQuery.split(/\s+/);

  return components
    .filter((comp) => {
      const normalizedName = comp.name.toLowerCase();
      const codeContent = comp.code.toLowerCase();

      const matchesName = queryWords.some(
        (word) =>
          normalizedName.includes(word) || word.includes(normalizedName) || normalizedName === word,
      );

      const matchesCode = queryWords.some((word) => codeContent.includes(word));

      return matchesName || matchesCode;
    })
    .slice(0, 3);
}

export function findRelevantDocs(
  docs: DocumentationContext[],
  query: string,
): DocumentationContext[] {
  const normalizedQuery = query.toLowerCase();
  const queryWords = normalizedQuery.split(/\s+/).filter((word) => word.length > 2); // Filter out short words like "el", "de", etc.

  return docs
    .filter((doc) => {
      const normalizedTitle = doc.title.toLowerCase();
      const normalizedContent = doc.content.toLowerCase();

      // Check if any query word matches the title or content
      return queryWords.some(
        (word) => normalizedTitle.includes(word) || normalizedContent.includes(word),
      );
    })
    .slice(0, 3); // Increased from 2 to 3 to get more context
}

export function buildEnrichedContext(
  components: ComponentContext[],
  docs: DocumentationContext[],
  query: string = '',
): string {
  let context = '';

  context += '\n\n' + '='.repeat(80) + '\n';
  context += '⚠️  INSTRUCCIONES CRÍTICAS - LEÉ ESTO PRIMERO ⚠️\n';
  context += '='.repeat(80) + '\n\n';
  context += '1. SOLO podés usar el código y props que aparecen ABAJO en este contexto.\n';
  context += '2. Si una prop NO está en la tabla "API Reference", NO EXISTE.\n';
  context += '3. Si un método o feature NO está en los ejemplos, NO LO INVENTES.\n';
  context += '4. Copiá los ejemplos EXACTAMENTE como aparecen en "Usage" o "Examples".\n';
  context += '5. Si no estás 100% seguro, decí: "No veo eso en la documentación actual."\n\n';

  if (components.length > 0) {
    context += '## CÓDIGO FUENTE DE COMPONENTES\n\n';
    context += '⚠️ Este es el código REAL. No asumas que tiene features que no ves acá.\n\n';

    components.forEach((comp, idx) => {
      context += `### ${comp.name}\n\n`;
      context += '```tsx\n' + comp.code + '\n```\n\n';

      const propsMatch = comp.code.match(/interface\s+\w+Props\s*{([^}]+)}/);
      if (propsMatch) {
        context += '**Props Interface:**\n```typescript\n' + propsMatch[0] + '\n```\n\n';
      }

      context += '---\n\n';
    });
  }

  if (docs.length > 0) {
    context += '\n## DOCUMENTACIÓN OFICIAL\n\n';
    context += '⚠️ Esta es la ÚNICA fuente de verdad. No inventes nada fuera de esto.\n\n';

    docs.forEach((doc) => {
      context += `### 📄 ${doc.title}\n\n`;

      // Extract and parse the API Reference section from MDX
      const apiReferenceMatch = doc.content.match(/## API Reference([\s\S]*?)(?=\n##|\n---\n|$)/i);
      if (apiReferenceMatch) {
        context += '#### ✅ PROPS VÁLIDAS (SOLO ESTAS EXISTEN):\n\n';
        context += apiReferenceMatch[0] + '\n\n';
        context += '⚠️ Si una prop no está en esta tabla, NO LA USES.\n\n';
      }

      // Extract usage examples
      const usageMatch = doc.content.match(/## Usage([\s\S]*?)(?=\n##|$)/i);
      if (usageMatch) {
        context += '#### 📖 EJEMPLOS DE USO (COPIÁ ESTOS):\n\n';
        context += usageMatch[0].slice(0, 1000) + '\n\n';
      }

      // Extract examples section
      const examplesMatch = doc.content.match(/## Examples([\s\S]*?)(?=\n## API Reference|$)/i);
      if (examplesMatch) {
        context += '#### 💡 MÁS EJEMPLOS:\n\n';
        context += examplesMatch[0].slice(0, 1500) + '\n\n';
      }

      // If no specific sections found, show truncated content
      if (!apiReferenceMatch && !usageMatch && !examplesMatch) {
        context += doc.content.slice(0, 2000);
        if (doc.content.length > 2000) {
          context += '\n\n_(truncado)_\n';
        }
      }

      context += '\n' + '-'.repeat(80) + '\n\n';
    });
  }

  if (components.length === 0 && docs.length === 0) {
    context += '\n⚠️ NO SE ENCONTRÓ DOCUMENTACIÓN PARA: "' + query + '"\n\n';
    context += '🚫 NO INVENTES NADA. Solo podés:\n';
    context += '  1. Decir que no tenés esa información\n';
    context += '  2. Sugerir componentes similares que SÍ existen\n';
    context += '  3. Explicar conceptos generales de React/Next.js (sin código específico)\n\n';
  }

  context += '\n' + '='.repeat(80) + '\n';
  context += '⚠️  RECORDATORIO FINAL ⚠️\n';
  context += '='.repeat(80) + '\n';
  context += 'Solo usá lo que está ARRIBA. No asumas. No inventes. No extrapoles.\n';
  context += '='.repeat(80) + '\n\n';

  return context;
}
