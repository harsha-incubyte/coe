import { describe, it, expect } from 'vitest';
import { fizzBuzz } from '@/lib/fizzbuzz';

describe('FizzBuzz', () => {
    it('returns "1" for the number 1', () => {
        expect(fizzBuzz(1)).toBe('1');
    });

    it('returns "Fizz" for the number 3', () => {
        expect(fizzBuzz(3)).toBe('Fizz');
    });

    it('returns "Buzz" for the number 5', () => {
        expect(fizzBuzz(5)).toBe('Buzz');
    });

    it('returns "FizzBuzz" for the number 15', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
});
