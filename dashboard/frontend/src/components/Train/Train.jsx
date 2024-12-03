import React from 'react';
import Carriage from '../Carriage/Carriage.jsx';
import Counter from '../Counter/Counter.jsx';
import './train.css';

const Train = ({ carriages, onUpdateSeats }) => {
  const handleCountChange = (carriageId, newFilledSeats) => {
    onUpdateSeats(carriageId, newFilledSeats); // Update train data with the new filled seats
  };

  return (
    <div className="train">
      {carriages.map((carriage) =>
      <div key={carriage.carriageId} className="carriage-container">
        <p className='carriage-label'>carriage {carriage.carriageId + 1}</p>
        <Carriage 
          key={carriage.carriageId} 
          filledSeats={carriage.filledSeats} 
          carriageId={carriage.carriageId}
        />
        <Counter initialValue={carriage.filledSeats} min={0} max={8}
          onCountChange={(newFilledSeats) => handleCountChange(carriage.carriageId, newFilledSeats)} />
      </div>
      )}
    </div>
  );
};

export default Train;