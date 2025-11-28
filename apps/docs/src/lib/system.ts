import { detectLanguage } from './ai-language-detector';
import type { Message } from './definitions';
import { SYSTEM_PROMPTS } from './prompts';

type Language = 'en' | 'es';

export async function getSystemPrompt(messages: Message[]): Promise<string> {
  let lang: Language = 'en';

  try {
    lang = detectLanguage(messages) as Language;

    return [SYSTEM_PROMPTS[lang]].filter(Boolean).join('\n\n');
  } catch (error) {
    console.warn('⚠️ Using base prompt (Payload unavailable):', error);

    return SYSTEM_PROMPTS[lang];
  }
}
