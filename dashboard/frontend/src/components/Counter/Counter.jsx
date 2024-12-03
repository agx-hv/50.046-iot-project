import React, { useState } from 'react';
import './counter.css';

const Counter = ({ initialValue = 0, min = 0, max = 8, onCountChange }) => {
  // onCountChange -> pass updated value
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className="counter">
      <button className="counter-button" onClick={decrement}>−</button>
      <span className="counter-value">{count}</span>
      <button className="counter-button" onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
