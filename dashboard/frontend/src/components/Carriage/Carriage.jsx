import React from 'react';
import Seat from '../Seats/Seats.jsx';
import { getSeatColor } from '../../utils.js';
import './carriage.css';

const Carriage = ({ filledSeats, carriageId, showColors }) => {
  const totalSeats = 8;
  // Get seat color based on the number of filled seats
  const seatColor = getSeatColor(filledSeats); 
  const seatsArray = Array.from({ length: totalSeats });

  return (
    <div className={carriageId ===1 ? 'first-carriage' : 'carriage'}>
      <div className={carriageId === 1 ? 'first-seats-container' : 'seats-container'}>
        {seatsArray.map((_, index) => (
            <Seat key={index} color={showColors ? (index < filledSeats ? seatColor : 'gray') : 'gray'} />
        ))}
      </div>
    </div>
  );
};

export default Carriage;