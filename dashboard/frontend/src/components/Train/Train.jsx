import React from 'react';
import Carriage from '../Carriage/Carriage.jsx';
import Counter from '../Counter/Counter.jsx';
import './train.css';

const Train = ({ carriages, onUpdateSeats, isDisabled, showColors}) => {
  const handleCountChange = (carriageId, newFilledSeats) => {
    onUpdateSeats(carriageId, newFilledSeats); // Update train data with the new filled seats
  };

  return (
    <div className="train">
      {carriages.map((carriage) =>
      <div key={carriage.carriageId} className="carriage-container">
        <p className='carriage-label'>carriage {carriage.carriageId}</p>
        <Carriage 
          key={carriage.carriageId} 
          filledSeats={carriage.filledSeats} 
          carriageId={carriage.carriageId}
          showColors={showColors}
        />
        <Counter initialValue={carriage.filledSeats} min={0} max={8}
          onCountChange={(newFilledSeats) => handleCountChange(carriage.carriageId, newFilledSeats)}
          disabled={isDisabled}
        />
      </div>
      )}
    </div>
  );
};

export default Train;