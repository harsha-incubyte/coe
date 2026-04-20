import { useState } from 'react';
import * as S from './CounterUI.styles';
import { Heading } from '@/design-system/atoms/Heading';

export default function CounterUI() {
  const [count, setCount] = useState(0);

  return (
    <S.CounterContainer>
      <Heading $level={2}>Counter</Heading>
      <S.CounterDisplay>
        <span key={count} data-testid="count-display">{count}</span>
      </S.CounterDisplay>
      <S.ControlsContainer>
        <S.AnimatedButton
          $variant="danger"
          $size="lg"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </S.AnimatedButton>
        <S.AnimatedButton
          $variant="accent"
          $size="lg"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </S.AnimatedButton>
      </S.ControlsContainer>
      <S.ResetContainer>
        <S.AnimatedButton
          $variant="ghost"
          $size="md"
          onClick={() => setCount(0)}
        >
          Reset
        </S.AnimatedButton>
      </S.ResetContainer>
    </S.CounterContainer>
  );
}

