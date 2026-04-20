import React, { useState } from 'react';
import { fizzBuzz } from '@/lib/fizzbuzz';
import { Heading, Input } from '@/design-system/atoms';
import * as S from './FizzBuzzUI.styles';

const FizzBuzzUI: React.FC = () => {
  const [limit, setLimit] = useState<number | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLimit(isNaN(val) ? '' : val);
  };

  const generateSequence = () => {
    if (typeof limit !== 'number' || limit < 1) return [];
    return Array.from({ length: limit }, (_, i) => {
      const num = i + 1;
      const res = fizzBuzz(num);
      return { num, res };
    });
  };

  return (
    <S.Container>
      <Heading $level={2}>FizzBuzz Generator</Heading>
      <Input
        label="FizzBuzz length"
        hideLabel
        type="number"
        min="1"
        value={limit === '' ? '' : limit}
        onChange={handleInputChange}
        placeholder="Enter a number"
        aria-label="FizzBuzz length"
      />

      <S.Sequence>
        {generateSequence().map(({ num, res }) => (
          <S.Item 
            key={num} 
            $type={res.toLowerCase() as 'fizz' | 'buzz' | 'fizzbuzz' | undefined}
            title={`Number ${num}`}
          >
            {res}
          </S.Item>
        ))}
      </S.Sequence>
    </S.Container>
  );
};

export default FizzBuzzUI;

