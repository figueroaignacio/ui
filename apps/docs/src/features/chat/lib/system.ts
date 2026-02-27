import type { Message } from '../../../lib/definitions';
import { getCachedContext } from './cache-manager';
import { buildEnrichedContext, findRelevantComponents, findRelevantDocs } from './context-loader';
import { SYSTEM_PROMPT } from './prompts';

function getLastUserMessage(messages: Message[]): string {
  return messages.filter((m) => m.role === 'user').pop()?.content ?? '';
}

export async function getSystemPrompt(messages: Message[]): Promise<string> {
  const lastMessage = getLastUserMessage(messages);

  if (!requiresTechnicalContext(lastMessage)) {
    return SYSTEM_PROMPT;
  }

  try {
    const { components, docs } = await getCachedContext();

    if (components.length === 0 && docs.length === 0) {
      return SYSTEM_PROMPT;
    }

    const relevantComponents = findRelevantComponents(components, lastMessage);
    const relevantDocs = findRelevantDocs(docs, lastMessage);

    if (relevantComponents.length === 0 && relevantDocs.length === 0) {
      return SYSTEM_PROMPT;
    }

    const enrichedContext = buildEnrichedContext(relevantComponents, relevantDocs, lastMessage);
    return `${SYSTEM_PROMPT}\n\n${enrichedContext}`;
  } catch (error) {
    console.error('Error loading context:', error);
    return SYSTEM_PROMPT;
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
