import { capitalize } from "./capitalize"

describe('capitalize', () => {
  it('should capitalize lowercase word correctly', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should capitalize only first word in sentence', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('should capitalize one-letter word', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should preserve already capitalized words', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should preserve other uppercase letters', () => {
    expect(capitalize('hellO wOrld!')).toBe('HellO wOrld!');
  });

  it('should ignore any character instead of lowercase letter', () => {
    ['1', '#', '!', '"'].forEach((letter) => {
      expect(capitalize(letter)).toBe(letter);
    });
  });

  it('should ignore empty string', () => {
    expect(capitalize('')).toBe('');
  });
});
