import { describe, it, expect } from 'vitest';
import { fizzBuzz } from './fizzbuzz';

describe('FizzBuzz', () => {
    it('returns "1" for the number 1', () => {
        expect(fizzBuzz(1)).toBe('1');
    });
});
