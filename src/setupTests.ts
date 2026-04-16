import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
import { server } from './lib/msw/server';

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
