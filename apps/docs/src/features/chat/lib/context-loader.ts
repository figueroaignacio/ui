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

  return docs
    .filter((doc) => {
      const normalizedTitle = doc.title.toLowerCase();
      const normalizedContent = doc.content.toLowerCase();

      return (
        normalizedTitle.includes(normalizedQuery) || normalizedContent.includes(normalizedQuery)
      );
    })
    .slice(0, 2);
}

export function buildEnrichedContext(
  components: ComponentContext[],
  docs: DocumentationContext[],
  query: string = '',
): string {
  let context = '';

  context += '\n\n' + '='.repeat(60) + '\n';
  context += 'CONTEXTO DEL PROYECTO - USA ESTE CÓDIGO EXACTAMENTE\n';
  context += '='.repeat(60) + '\n\n';

  if (components.length > 0) {
    context += '## COMPONENTES DISPONIBLES\n\n';
    context += '**IMPORTANTE**: Usa estos componentes EXACTAMENTE como están definidos.\n';
    context += 'NO inventes props que no existan. NO asumas APIs diferentes.\n\n';

    components.forEach((comp, idx) => {
      context += `### ${comp.name}\n\n`;
      context += '```tsx\n' + comp.code + '\n```\n\n';

      const propsMatch = comp.code.match(/interface\s+\w+Props\s*{([^}]+)}/);
      if (propsMatch) {
        context += '**Props:**\n```typescript\n' + propsMatch[0] + '\n```\n\n';
      }

      context += '---\n\n';
    });
  }

  if (docs.length > 0) {
    context += '\n## DOCUMENTACIÓN RELEVANTE\n\n';
    docs.forEach((doc) => {
      context += `### ${doc.title}\n\n`;
      context += doc.content.slice(0, 2000);
      if (doc.content.length > 2000) {
        context += '\n\n_(truncado)_\n';
      }
      context += '\n\n---\n\n';
    });
  }

  if (components.length === 0 && docs.length === 0) {
    context += '\nNo se encontró contexto específico del proyecto para: "' + query + '"\n';
    context += 'Responde con conocimiento general.\n\n';
  }

  return context;
}
