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

  const [trainData, setTrainData] = useState(mockTrainData)

  const handleUpdateSeats = (trainId, carriageId, newFilledSeats) => {
    // Update the specific carriage's filled seats in the corresponding train
    // THIS WILL CHANGE ACCORDING TO JSON FILE
    const updatedTrainData = trainData.map(train =>
      train.trainId === trainId
        ? {
            ...train,
            carriages: train.carriages.map(carriage =>
              carriage.carriageId === carriageId
                ? { ...carriage, filledSeats: newFilledSeats }
                : carriage
            ),
          }
        : train
    );
  
    setTrainData(updatedTrainData); 
  };

  // Log trainData after it's updated
  useEffect(() => {
    console.log("Updated trainData: ", trainData);
  }, [trainData]);

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
          <h2 className='train-title'>TRAIN 1</h2>
          <Train 
            carriages={trainData[0].carriages}
            onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeats(0, carriageId, newFilledSeats)}  
          />
        </div>
        <div className='train-container'>
          <h2 className='train-title'>TRAIN 2</h2>
          <Train 
            carriages={trainData[1].carriages} 
            onUpdateSeats={(carriageId, newFilledSeats) => handleUpdateSeats(1, carriageId, newFilledSeats)} 
          />
        </div>
      </div>

      <div className='buttons'>
        <button className='submit-button'>Submit</button>
        <RightArrow />
        <button className='simulate-button'>Simulate</button>
      </div>
    </div>
  );
}

export default MainPage;
