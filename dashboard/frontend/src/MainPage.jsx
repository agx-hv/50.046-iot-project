import './mainPage.css';
import Train from './components/Train/Train.jsx';
import mockTrainData from './mockTrainData.json';
import { ReactComponent as RightArrow} from './images/right-arrow.svg';
import { useEffect, useState } from 'react';

function MainPage() {
  const instructionList=  ['Select number of lights on for each carriage on both trains',
                            'Click “Submit” button to set the initial number of lights',
                            'Click “Simulate” button to run the crowd distribution on the lights'
                          ];

  // UPDATE THE SUBS DATA TO REFLECT THE TRAIN COLOR

  // Separate state for each train
  const [train1Data, setTrain1Data] = useState([
    { carriageId: 1, filledSeats: 0 },
    { carriageId: 2, filledSeats: 0 },
  ]);

  const [train2Data, setTrain2Data] = useState([
    { carriageId: 1, filledSeats: 0 },
    { carriageId: 2, filledSeats: 0 },
  ]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log('Message received:', message);

      if (message === 'stop') {
        console.log('Simulation has stopped!');
      }

      const { trainId, carriageId, filledSeats } = message;

      if (trainId === 0) {
        setTrain1Data((prevData) =>
          prevData.map((carriage) =>
            carriage.carriageId === carriageId
              ? { ...carriage, filledSeats }
              : carriage
          )
        );
      } else if (trainId === 1) {
        setTrain2Data((prevData) =>
          prevData.map((carriage) =>
            carriage.carriageId === carriageId
              ? { ...carriage, filledSeats }
              : carriage
          )
        );
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleUpdateSeatsTrain1 = (carriageId, newFilledSeats) => {
    setTrain1Data((prevData) =>
      prevData.map((carriage) =>
        carriage.carriageId === carriageId
          ? { ...carriage, filledSeats: newFilledSeats }
          : carriage
      )
    );
  };

  const handleUpdateSeatsTrain2 = (carriageId, newFilledSeats) => {
    setTrain2Data((prevData) =>
      prevData.map((carriage) =>
        carriage.carriageId === carriageId
          ? { ...carriage, filledSeats: newFilledSeats }
          : carriage
      )
    );
  };

  const handleSubmit = () => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection opened, sending data...');

      const train1Seats = train1Data.map(carriage => carriage.filledSeats).join('');
      // const train2Seats = train2Data.map(carriage => carriage.filledSeats).join('');
      // const combinedMessage = train1Seats + train2Seats;

      // Send the message to the WebSocket server
      // ws.send(combinedMessage);
      socket.send(train1Seats);
      console.log('Submitted:', train1Seats);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
  };

  const handleStart = () => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection opened, sending data...');
      console.log('Sending "start" message to WebSocket server');
      socket.send('start');
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
  };

  return (
    <div className='Mainpage'>
      <div className='header'>
        <h1 className='title'>TEAM 7</h1>
        <p className='description'>Use real-time data to show dynamic visual of two trains, demonstrating how load distribution is balanced over the carriages in each train.</p>
      </div>

      <div className='instructions-container'>
        <p className='instructions-title'>Instructions:</p>
        <ul className='list'>{instructionList.map((instr) => <li>{instr}</li>)}</ul>
      </div>

      <div className='content'>
        <div className='train-container'>
          <h2 className="train-title">TRAIN 1</h2>
            <Train
              carriages={train1Data}
              onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeatsTrain1(carriageId, newFilledSeats)}
            />
        </div>
        <div className="train-container">
          <h2 className="train-title">TRAIN 2</h2>
          <Train
            carriages={train2Data}
            onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeatsTrain2(carriageId, newFilledSeats)}
          />
        </div>
      </div>

      <div className='buttons'>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
        <RightArrow />
        <button className='simulate-button' onClick={handleStart}>Simulate</button>
      </div>
    </div>
  );
}

export default MainPage;
