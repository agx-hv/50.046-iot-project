import './mainPage.css';
import Train from './components/Train/Train.jsx';
import { useEffect, useState } from 'react';

function MainPage() {
  const instructionList=  ['Select the number of lights to turn on for each carriage on both trains.',
                            'Click the "Submit" button to set the initial number of lights.',
                            'Click the "Simulate" button to run the crowd distribution simulation based on the selected lights.'
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
  const [isSubmitDisabled1, setIsSubmitDisabled1] = useState(false);
  const [isSimulateDisabled1, setIsSimulateDisabled1] = useState(true);
  const [isCounterDisabled1, setIsCounterDisabled1] = useState(false);
  const [showColors1, setShowColors1] = useState(false);
  const [isDataReceived1, setIsDataReceived1] = useState(false);

  // button states at train2
  const [isSubmitDisabled2, setIsSubmitDisabled2] = useState(false);
  const [isSimulateDisabled2, setIsSimulateDisabled2] = useState(true);
  const [isCounterDisabled2, setIsCounterDisabled2] = useState(false);
  const [showColors2, setShowColors2] = useState(false);
  const [isDataReceived2, setIsDataReceived2] = useState(false);

  // Connect to Websocket for Train 1
  useEffect(() => {
    const ws1 = new WebSocket('ws://localhost:8080/train1');

    ws1.onopen = () => {
      console.log('Connected to WebSocket train 1');
    };

    ws1.onmessage = (event) => {
      const message = event.data;
      console.log('Message received:', message);

      if (message === 'stop') {
        console.log('Simulation has stopped!');
        // enable buttons and counter after distribution finisehd
        setIsSubmitDisabled1(false);
        setIsSimulateDisabled1(true);
        setIsCounterDisabled1(false);
      } else {
        const parsedMessage = JSON.parse(message);

        const { trainId, carriageId, filledSeats } = parsedMessage;

        // Update train data only when 'showColors' is true
        if (showColors1) {
          if (trainId === 1) {
            setTrain1Data((prevData) =>
              prevData.map((carriage) =>
                carriage.carriageId === carriageId
                  ? { ...carriage, filledSeats }
                  : carriage
              )
            );
          } 
        }
        setIsDataReceived1(true);
      }
    };

    ws1.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws1.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws1.close();
    };
  }, [showColors1]);

  // Connect to Websocket for Train 1
  useEffect(() => {
    const ws2 = new WebSocket('ws://localhost:8080/train1');

    ws2.open = () => {
      console.log('Connected to WebSocket train 1');
    };

    ws2.onmessage = (event) => {
      const message = event.data;

      if (message === 'stop') {
        console.log('Simulation has stopped!');
        // enable buttons and counter after distribution finished
        setIsSubmitDisabled2(false);
        setIsSimulateDisabled2(true);
        setIsCounterDisabled2(false);
      } else {
        const parsedMessage = JSON.parse(message);

        const { trainId, carriageId, filledSeats } = parsedMessage;

        // Update train data only when 'showColors' is true
        if (showColors2) {
          if (trainId === 2) {
            setTrain2Data((prevData) =>
              prevData.map((carriage) =>
                carriage.carriageId === carriageId
                  ? { ...carriage, filledSeats }
                  : carriage
              )
            );
          } 
        }
        setIsDataReceived2(true);
      }
    };

    ws2.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws2.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws2.close();
    };
  }, [showColors2]);

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

  const handleSubmitTrain1 = () => {
    const ws1 = new WebSocket('ws://localhost:8080');

    ws1.onopen = () => {
      console.log('WebSocket connection opened, sending data...');

      const train1Seats = train1Data.map(carriage => carriage.filledSeats).join('');
      const seat1Data = {
        trainId: '1',
        filledSeats: train1Seats.toString()
      };

      ws1.send(JSON.stringify(seat1Data));
    };

    ws1.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws1.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
    
    setIsSubmitDisabled1(true);
    setIsSimulateDisabled1(false);
    setIsCounterDisabled1(true);
  };

  const handleStartTrain1 = () => {
    const ws1 = new WebSocket('ws://localhost:8080');

    ws1.onopen = () => {
      console.log('WebSocket connection opened, sending data...');
      console.log('Sending "start" message to Websocket server');
      ws1.send('start1');
    }

    ws1.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws1.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };

    setIsSubmitDisabled1(true);
    setIsSimulateDisabled1(true);
    setIsCounterDisabled1(true);
    setShowColors1(true);
    setIsDataReceived1(false);
  };

  const handleSubmitTrain2 = () => {
    const ws2 = new WebSocket('ws://localhost:8080');

    ws2.onopen = () => {
      console.log('WebSocket connection opened, sending data...');

      const train2Seats = train2Data.map(carriage => carriage.filledSeats).join('');
      const seat2Data = {
        trainId: '2',
        filledSeats: train2Seats.toString()
      };

      ws2.send(JSON.stringify(seat2Data));

      console.log('Submitted:', train2Seats);
    };

    ws2.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws2.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
    
    setIsSubmitDisabled2(true);
    setIsSimulateDisabled2(false);
    setIsCounterDisabled2(true);
  };

  const handleStartTrain2 = () => {
    const ws2 = new WebSocket('ws://localhost:8080');

    ws2.onopen = () => {
      console.log('WebSocket connection opened, sending data...');
      console.log('Sending "start" message to Websocket server');
      ws2.send('start2');
    }

    ws2.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws2.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };

    setIsSubmitDisabled2(true);
    setIsSimulateDisabled2(true);
    setIsCounterDisabled2(true);
    setShowColors2(true);
    setIsDataReceived2(false);
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
            isDisabled={isCounterDisabled1}
            showColors={showColors1 && isDataReceived1}
          />
          <div className='train-buttons'>
            <button className='submit-button' onClick={handleSubmitTrain1} disabled={isSubmitDisabled1}>Submit</button>
            <button className='simulate-button' onClick={handleStartTrain1} disabled={isSimulateDisabled1}>Simulate</button>
          </div>
        </div>
        <div className="train-container">
          <h2 className="train-title">TRAIN 2</h2>
          <Train
            carriages={train2Data}
            onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeatsTrain2(carriageId, newFilledSeats)}
            isDisabled={isCounterDisabled2}
            showColors={showColors2 && isDataReceived2}
          />
          <div className='train-buttons'>
            <button className='submit-button' onClick={handleSubmitTrain2} disabled={isSubmitDisabled2}>Submit</button>
            <button className='simulate-button' onClick={handleStartTrain2} disabled={isSimulateDisabled2}>Simulate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
