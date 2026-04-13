import React, { useState } from 'react';
import { fizzBuzz } from '@/lib/fizzbuzz';
import '@/components/FizzBuzz/FizzBuzzUI.css';

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
    <div className="fizzbuzz-container">
      <h2 className="fizzbuzz-title">FizzBuzz Generator</h2>
      <input
        type="number"
        min="1"
        value={limit === '' ? '' : limit}
        onChange={handleInputChange}
        placeholder="Enter a number"
        className="fizzbuzz-input"
        aria-label="FizzBuzz length"
      />
      <div className="fizzbuzz-sequence">
        {generateSequence().map(({ num, res }) => (
          <span 
            key={num} 
            className={`fizzbuzz-item ${res.toLowerCase()}`}
            title={`Number ${num}`}
          >
            {res}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FizzBuzzUI;
