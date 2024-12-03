export const getSeatColor = (filledSeats) => {
    // red -> 8
    if (filledSeats === 8) return 'red';
    // orange -> 6-7
    if (filledSeats >= 6) return 'orange';
    // yellow -> 3-5
    if (filledSeats >= 3) return 'yellow';
    // green -> 0-2
    return 'green';
  };