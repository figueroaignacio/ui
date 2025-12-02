import { detectLanguage } from './ai-language-detector';
import { getCachedContext } from './cache-manager';
import { buildEnrichedContext, findRelevantComponents, findRelevantDocs } from './context-loader';
import type { Message } from './definitions';
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
    console.warn('⚠️  Language detection failed, defaulting to "en":', error);
  }

  const basePrompt = SYSTEM_PROMPTS[lang];
  const lastMessage = getLastUserMessage(messages);

  if (!requiresTechnicalContext(lastMessage)) {
    return basePrompt;
  }

  try {
    const { components, docsEn, docsEs } = await getCachedContext();
    const docs = lang === 'en' ? docsEn : docsEs;

    const relevantComponents = findRelevantComponents(components, lastMessage);
    const relevantDocs = findRelevantDocs(docs, lastMessage);

    if (relevantComponents.length === 0 && relevantDocs.length === 0) {
      return basePrompt;
    }

    const enrichedContext = buildEnrichedContext(relevantComponents, relevantDocs);

    return `${basePrompt}\n\n${enrichedContext}`;
  } catch (error) {
    console.warn('⚠️  Could not load context, using base prompt:', error);
    return basePrompt;
  }
}

function requiresTechnicalContext(message: string): boolean {
  const technicalKeywords = [
    'component',
    'componente',
    'button',
    'botón',
    'input',
    'card',
    'modal',
    'dropdown',
    'accordion',
    'tabs',
    'code',
    'example',
    'ejemplo',
    'uso',
    'use',
    'how',
    'cómo',
    'install',
    'instalar',
    'copy',
    'copiar',
  ];

  const normalized = message.toLowerCase();
  return technicalKeywords.some((keyword) => normalized.includes(keyword));
}
