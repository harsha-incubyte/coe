import { describe, it, expect } from 'vitest';
import { fizzBuzz } from './fizzbuzz';

describe('FizzBuzz', () => {
    it('returns "1" for the number 1', () => {
        expect(fizzBuzz(1)).toBe('1');
    });

    it('returns "Fizz" for the number 3', () => {
        expect(fizzBuzz(3)).toBe('Fizz');
    });
});
