import { describe, it, expect } from 'vitest';

describe('Vitest sanity test', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true);
  });

  it('jsdom environment is working', () => {
    expect(document).toBeDefined();
  });

  it('jest-dom matchers are working', () => {
    const el = document.createElement('div');
    el.textContent = 'hello';
    expect(el).toHaveTextContent('hello');
  });
});
