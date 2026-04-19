import { useState } from 'react';
import * as S from './CounterUI.styles';

export default function CounterUI() {
  const [count, setCount] = useState(0);

  return (
    <S.CounterContainer>
      <S.CounterTitle>Counter</S.CounterTitle>
      <S.CounterDisplay>
        <span key={count} data-testid="count-display">{count}</span>
      </S.CounterDisplay>
      <S.ControlsContainer>
        <S.CounterButton
          $variant="decrement"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </S.CounterButton>
        <S.CounterButton
          $variant="increment"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </S.CounterButton>
      </S.ControlsContainer>
      <S.ResetContainer>
        <S.CounterButton
          $variant="reset"
          onClick={() => setCount(0)}
        >
          Reset
        </S.CounterButton>
      </S.ResetContainer>
    </S.CounterContainer>
  );
}
