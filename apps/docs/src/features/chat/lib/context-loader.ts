import fs from 'fs/promises';
import path from 'path';

export interface ComponentContext {
  name: string;
  code: string;
  filePath: string;
}

export interface DocumentationContext {
  title: string;
  content: string;
  path: string;
}

const WORKSPACE_ROOT = path.resolve(process.cwd(), '../..');
const COMPONENTS_PATH = path.join(WORKSPACE_ROOT, 'packages/ui/src/components');

const STOP_WORDS = new Set([
  'modo',
  'ingeniería',
  'ingenieria',
  'inversa',
  'para',
  'explica',
  'cuándo',
  'cuando',
  'usarlo',
  'por',
  'qué',
  'que',
  'mejores',
  'prácticas',
  'practicas',
  'alternativas',
  'este',
  'esta',
  'componente',
  'component',
  'reverse',
  'engineering',
  'mode',
  'how',
  'use',
  'why',
  'best',
  'practices',
  'de',
  'la',
  'el',
  'en',
  'con',
  'para',
  'las',
  'los',
  'un',
  'una',
]);

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
      filePath: file.path,
    }));
  } catch (error) {
    console.error('Error loading components:', error);
    return [];
  }
}

export async function loadDocumentation(): Promise<DocumentationContext[]> {
  try {
    const { allDocs } = await import('content-collections');
    return allDocs
      .filter((doc) => doc.locale === 'en' && doc.published)
      .map((doc) => ({
        title: doc.title,
        content: doc.raw,
        path: doc.slugAsParams,
      }));
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
  const queryWords = normalizedQuery
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word) && word.length > 2);

  if (queryWords.length === 0) return [];

  return components
    .map((comp) => {
      const normalizedName = comp.name.toLowerCase();
      const codeContent = comp.code.toLowerCase();
      let score = 0;

      queryWords.forEach((word) => {
        if (normalizedName === word) score += 100;
        else if (normalizedName.includes(word)) score += 50;

        if (codeContent.includes(word)) score += 5;
      });

      return { comp, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.comp)
    .slice(0, 3);
}

export function findRelevantDocs(
  docs: DocumentationContext[],
  query: string,
): DocumentationContext[] {
  const normalizedQuery = query.toLowerCase();
  const queryWords = normalizedQuery
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word) && word.length > 2);

  if (queryWords.length === 0) return [];

  return docs
    .map((doc) => {
      const normalizedTitle = doc.title.toLowerCase();
      const normalizedContent = doc.content.toLowerCase();
      let score = 0;

      queryWords.forEach((word) => {
        if (normalizedTitle === word) score += 100;
        else if (normalizedTitle.includes(word)) score += 50;

        if (normalizedContent.includes(word)) score += 5;
      });

      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.doc)
    .slice(0, 3);
}

export function buildEnrichedContext(
  components: ComponentContext[],
  docs: DocumentationContext[],
  query: string = '',
): string {
  let context = '';

  context += '\n\n' + '='.repeat(80) + '\n';
  context += '⚠️  CRITICAL INSTRUCTIONS - READ THIS FIRST ⚠️\n';
  context += '='.repeat(80) + '\n\n';
  context += '1. ONLY use code and props that appear BELOW in this context.\n';
  context += '2. If a prop is NOT in the "API Reference" table, IT DOES NOT EXIST.\n';
  context += '3. If a method or feature is NOT in the examples, DO NOT INVENT IT.\n';
  context += '4. Copy examples EXACTLY as they appear in "Usage" or "Examples".\n';
  context +=
    '5. If you are not 100% sure, say: "I don\'t see that in the current documentation."\n\n';

  if (components.length > 0) {
    context += '## COMPONENT SOURCE CODE\n\n';
    context += '⚠️ This is the REAL code. Do not assume features you do not see here.\n\n';

    components.forEach((comp) => {
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
    context += '\n## OFFICIAL DOCUMENTATION\n\n';
    context += '⚠️ This is the ONLY source of truth. Do not invent anything outside this.\n\n';

    docs.forEach((doc) => {
      context += `### 📄 ${doc.title}\n\n`;

      const apiReferenceMatch = doc.content.match(/## API Reference([\s\S]*?)(?=\n##|\n---\n|$)/i);
      if (apiReferenceMatch) {
        context += '#### ✅ VALID PROPS (ONLY THESE EXIST):\n\n';
        context += apiReferenceMatch[0] + '\n\n';
        context += '⚠️ If a prop is not in this table, DO NOT USE IT.\n\n';
      }

      const usageMatch = doc.content.match(/## Usage([\s\S]*?)(?=\n##|$)/i);
      if (usageMatch) {
        context += '#### 📖 USAGE EXAMPLES (COPY THESE):\n\n';
        context += usageMatch[0].slice(0, 1000) + '\n\n';
      }

      const examplesMatch = doc.content.match(/## Examples([\s\S]*?)(?=\n## API Reference|$)/i);
      if (examplesMatch) {
        context += '#### 💡 MORE EXAMPLES:\n\n';
        context += examplesMatch[0].slice(0, 1500) + '\n\n';
      }

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
    context += '\n⚠️ NO DOCUMENTATION FOUND FOR: "' + query + '"\n\n';
    context += '🚫 DO NOT INVENT ANYTHING. You can only:\n';
    context += '  1. Say you do not have that information\n';
    context += '  2. Suggest similar components that do exist\n';
    context += '  3. Explain general React/Next.js concepts (without specific code)\n\n';
  }

  context += '\n' + '='.repeat(80) + '\n';
  context += '⚠️  FINAL REMINDER ⚠️\n';
  context += '='.repeat(80) + '\n';
  context += 'Only use what is ABOVE. Do not assume. Do not invent. Do not extrapolate.\n';
  context += '='.repeat(80) + '\n\n';

  return context;
}
