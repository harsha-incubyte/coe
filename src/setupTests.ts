import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
import { server } from './lib/msw/server';

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, 
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
