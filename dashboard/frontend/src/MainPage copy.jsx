import './mainPage.css';
import Train from './components/Train/Train.jsx';
import { ReactComponent as RightArrow} from './images/right-arrow.svg';
import { useEffect, useState } from 'react';

function MainPage() {
  const instructionList=  ['Select number of lights on for each carriage on both trains',
                            'Click “Submit” button to set the initial number of lights',
                            'Click “Simulate” button to run the crowd distribution on the lights'
                          ];

  const [train1Data, setTrain1Data] = useState([
    { carriageId: 1, filledSeats: 0 },
    { carriageId: 2, filledSeats: 0 },
  ]);

  const [train2Data, setTrain2Data] = useState([
    { carriageId: 1, filledSeats: 0 },
    { carriageId: 2, filledSeats: 0 },
  ]);

  // button states at train1
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSimulateDisabled, setIsSimulateDisabled] = useState(true);
  const [isCounterDisabled, setIsCounterDisabled] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Message received:', message);

      if (message === 'stop') {
        console.log('Simulation has stopped!');
        // enable buttons and counter after distribution finisehd
        setIsSubmitDisabled(false);
        setIsSimulateDisabled(false);
        setIsCounterDisabled(false);
      } else {
        const parsedMessage = JSON.parse(message);
        console.log("Parsed message:", parsedMessage);

        const { trainId, carriageId, filledSeats } = parsedMessage;
        console.log("trainId: ", trainId, "carriageId: ", carriageId, "filledSeats: ", filledSeats);

        // Update train data only when 'showColors' is true
        if (showColors) {
          if (trainId === 1) {
            setTrain1Data((prevData) =>
              prevData.map((carriage) =>
                carriage.carriageId === carriageId
                  ? { ...carriage, filledSeats }
                  : carriage
              )
            );
          } else if (trainId === 2) {
            setTrain2Data((prevData) =>
              prevData.map((carriage) =>
                carriage.carriageId === carriageId
                  ? { ...carriage, filledSeats }
                  : carriage
              )
            );
          }
        }
        setIsDataReceived(true);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [showColors]);

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

  // log when trainData is updated
  useEffect(() => {
    console.log('Updated Train 1 Data:', train1Data);
    console.log('Updated Train 2 Data:', train2Data);
  }, [train1Data, train2Data]);

  const handleSubmit = () => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened, sending data...');

      const train1Seats = train1Data.map(carriage => carriage.filledSeats).join('');
      const train2Seats = train2Data.map(carriage => carriage.filledSeats).join('');
      const combinedMessage = train1Seats + train2Seats;

      // Send the message to the WebSocket server
      ws.send(combinedMessage);
      // ws.send(train1Seats);
      console.log('Submitted:', combinedMessage);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
    
    setIsSubmitDisabled(true);
    setIsSimulateDisabled(false);
    setIsCounterDisabled(true);
  };

  const handleStart = () => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened, sending data...');
      console.log('Sending "start" message to Websocket server');
      ws.send('start');
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };

    setIsSubmitDisabled(true);
    setIsSimulateDisabled(true);
    setIsCounterDisabled(true);
    setShowColors(true);
    setIsDataReceived(false);
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
            isDisabled={isCounterDisabled}
            showColors={showColors && isDataReceived}
          />
          <div className='train-buttons'>
            <button className='submit-button' onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
            <button className='simulate-button' onClick={handleStart} disabled={isSimulateDisabled}>Simulate</button>
          </div>
        </div>
        <div className="train-container">
          <h2 className="train-title">TRAIN 2</h2>
          <Train
            carriages={train2Data}
            onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeatsTrain2(carriageId, newFilledSeats)}
            isDisabled={isCounterDisabled}
            showColors={showColors && isDataReceived}
          />
          <div className='train-buttons'>
            <button className='submit-button' onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
            <button className='simulate-button' onClick={handleStart} disabled={isSimulateDisabled}>Simulate</button>
          </div>
        </div>
      </div>

      {/* <div className='buttons'>
        <button className='submit-button' onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
        <RightArrow />
        <button className='simulate-button' onClick={handleStart} disabled={isSimulateDisabled}>Simulate</button>
      </div> */}
    </div>
  );
}

export default MainPage;
