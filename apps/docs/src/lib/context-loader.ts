import fs from 'fs/promises';
import path from 'path';

export interface ComponentContext {
  name: string;
  code: string;
  language: 'en' | 'es';
}

export interface DocumentationContext {
  title: string;
  content: string;
  language: 'en' | 'es';
  path: string;
}

const COMPONENTS_PATH = path.join(process.cwd(), '../../packages/ui/src/components');
const DOCS_EN_PATH = path.join(process.cwd(), 'src/content/en');
const DOCS_ES_PATH = path.join(process.cwd(), 'src/content/es');

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
    console.warn(`⚠️  Could not read directory ${dir}:`, error);
  }

  return results;
}

export async function loadComponents(): Promise<ComponentContext[]> {
  const files = await readFilesRecursively(COMPONENTS_PATH, '.tsx');

  return files.map((file) => ({
    name: path.basename(file.path, '.tsx'),
    code: file.content,
    language: 'en',
  }));
}

export async function loadDocumentation(language: 'en' | 'es'): Promise<DocumentationContext[]> {
  const docsPath = language === 'en' ? DOCS_EN_PATH : DOCS_ES_PATH;
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

      return queryWords.some(
        (word) =>
          normalizedName.includes(word) || word.includes(normalizedName) || normalizedName === word,
      );
    })
    .slice(0, 2);
}

export function findRelevantDocs(
  docs: DocumentationContext[],
  query: string,
): DocumentationContext[] {
  const normalizedQuery = query.toLowerCase();

  return docs
    .filter((doc) => {
      const normalizedTitle = doc.title.toLowerCase();
      const normalizedContent = doc.content.toLowerCase().slice(0, 500);

      return (
        normalizedTitle.includes(normalizedQuery) || normalizedContent.includes(normalizedQuery)
      );
    })
    .slice(0, 1);
}

export function buildEnrichedContext(
  components: ComponentContext[],
  docs: DocumentationContext[],
): string {
  let context = '';

  if (components.length > 0) {
    context += '\n\n## AVAILABLE COMPONENTS (use exactly as shown):\n\n';
    components.forEach((comp) => {
      context += `### ${comp.name}\n\`\`\`tsx\n${comp.code}\n\`\`\`\n\n`;
    });
  }

  if (docs.length > 0) {
    context += '\n\n## RELEVANT DOCUMENTATION:\n\n';
    docs.forEach((doc) => {
      context += `### ${doc.title}\n${doc.content.slice(0, 1200)}\n\n`;
    });
  }

  return context;
}
