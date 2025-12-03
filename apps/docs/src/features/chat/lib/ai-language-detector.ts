import type { Message } from './definitions';
import type { Language } from './prompts';

const SPANISH_INDICATORS = [
  'hola',
  'qué',
  'como',
  'por favor',
  'gracias',
  'sí',
  'no',
  'cuál',
  'cuándo',
  'dónde',
  'quién',
  'buenos',
  'días',
  'tardes',
  'ayuda',
  'información',
] as const;

const EXTRA_ES_INDICATORS = ['¿', '¡', 'ñ'];

export function detectLanguage(messages: Message[]): Language {
  const userMessages = messages.filter((m) => m.role === 'user');

  if (userMessages.length === 0) return 'en';

  const lastMessage = userMessages.at(-1)!.content.toLowerCase();

  const hasSpanish =
    SPANISH_INDICATORS.some((w) => lastMessage.includes(w)) ||
    EXTRA_ES_INDICATORS.some((c) => lastMessage.includes(c));

  return hasSpanish ? 'es' : 'en';
}
