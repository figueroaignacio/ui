import { describe, expect, it } from 'vitest';
import { getQueryWords } from './get-query-words';

describe('getQueryWords', () => {
  it('filters out English stop words', () => {
    const result = getQueryWords('how to use the button');
    expect(result).toEqual(['button']);
  });

  it('filters out Spanish stop words', () => {
    const result = getQueryWords('como usar el boton');
    expect(result).toEqual(['como', 'usar', 'boton']);
  });

  it('filters words shorter than 3 characters', () => {
    const result = getQueryWords('go to ai');
    expect(result).toEqual([]);
  });

  it('handles mixed stop words and short words', () => {
    const result = getQueryWords('what is the way to do it');
    expect(result).toEqual(['what', 'way']);
  });

  it('returns empty array for only stop words', () => {
    const result = getQueryWords('the a an is de la el en');
    expect(result).toEqual([]);
  });

  it('handles empty query', () => {
    const result = getQueryWords('');
    expect(result).toEqual([]);
  });

  it('handles whitespace-only query', () => {
    const result = getQueryWords('   ');
    expect(result).toEqual([]);
  });

  it('preserves meaningful words', () => {
    const result = getQueryWords('dialog focus trap accessibility');
    expect(result).toEqual(['dialog', 'focus', 'trap', 'accessibility']);
  });
});
