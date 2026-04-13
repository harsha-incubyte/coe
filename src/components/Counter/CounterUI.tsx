import { useState } from 'react';
import '@/components/Counter/CounterUI.css';

export default function CounterUI() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2 className="counter-title">Counter</h2>
      <div className="counter-display">
        <span key={count} data-testid="count-display">{count}</span>
      </div>
      <div className="counter-controls">
        <button
          onClick={() => setCount(count - 1)}
          className="counter-button btn-decrement"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="counter-button btn-increment"
        >
          Increment
        </button>
      </div>
      <br />
      <div className="counter-reset">
        <button
          onClick={() => setCount(0)}
          className="counter-button btn-reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
