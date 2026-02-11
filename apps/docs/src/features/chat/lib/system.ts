import type { Message } from '../../../lib/definitions';
import { detectLanguage } from './ai-language-detector';
import { getCachedContext } from './cache-manager';
import { buildEnrichedContext, findRelevantComponents, findRelevantDocs } from './context-loader';
import { SYSTEM_PROMPTS } from './prompts';

type Language = 'en' | 'es';

function getLastUserMessage(messages: Message[]): string {
  const lastUserMsg = messages.filter((m) => m.role === 'user').pop();
  return lastUserMsg?.content || '';
}

export async function getSystemPrompt(messages: Message[]): Promise<string> {
  let lang: Language = 'en';

  try {
    lang = detectLanguage(messages) as Language;
  } catch (error) {
    console.warn('Language detection failed, defaulting to "en"');
  }

  const basePrompt = SYSTEM_PROMPTS[lang];
  const lastMessage = getLastUserMessage(messages);

  if (!requiresTechnicalContext(lastMessage)) {
    return basePrompt;
  }

  try {
    const { components, docsEn, docsEs } = await getCachedContext();
    const docs = lang === 'en' ? docsEn : docsEs;

    if (components.length === 0 && docs.length === 0) {
      return basePrompt;
    }

    const relevantComponents = findRelevantComponents(components, lastMessage);
    const relevantDocs = findRelevantDocs(docs, lastMessage);

    if (relevantComponents.length === 0 && relevantDocs.length === 0) {
      return basePrompt;
    }

    const enrichedContext = buildEnrichedContext(relevantComponents, relevantDocs, lastMessage);

    return `${basePrompt}\n\n${enrichedContext}`;
  } catch (error) {
    console.error('Error loading context:', error);
    return basePrompt;
  }
}

function requiresTechnicalContext(message: string): boolean {
  const technicalKeywords = [
    'component',
    'componente',
    'button',
    'botón',
    'boton',
    'input',
    'card',
    'modal',
    'dropdown',
    'accordion',
    'tabs',
    'tab',
    'code',
    'codigo',
    'example',
    'ejemplo',
    'uso',
    'use',
    'usar',
    'how',
    'cómo',
    'como',
    'install',
    'instalar',
    'copy',
    'copiar',
    'props',
    'api',
    'documentation',
    'documentacion',
    'docs',
    'callout',
    'breadcrumb',
    'collapsible',
    'dialog',
    'sheet',
    'timeline',
    'tooltip',
    'files',
    'dark mode',
    'modo oscuro',
    'theming',
    'tema',
    'icon',
    'icono',
    'variant',
    'variante',
  ];

  const normalized = message.toLowerCase();
  return technicalKeywords.some((keyword) => normalized.includes(keyword));
}
