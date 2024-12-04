import React, { useEffect, useState } from 'react';
import './counter.css';

const Counter = ({ initialValue = 0, min = 0, max = 8, onCountChange, disabled }) => {
  // onCountChange -> pass updated value
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const increment = () => {
    if (count < max && !disabled) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  const decrement = () => {
    if (count > min && !disabled) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className="counter">
      <button className="counter-button" onClick={decrement} disabled={disabled}>−</button>
      <span className="counter-value">{count}</span>
      <button className="counter-button" onClick={increment} disabled={disabled}>+</button>
    </div>
  );
};

export default Counter;
