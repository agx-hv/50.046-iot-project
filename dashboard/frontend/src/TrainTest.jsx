import React, { useEffect, useState } from 'react';

const TrainComponent = () => {
  const [train1, setTrain1] = useState(0);
  const [train2, setTrain2] = useState(0);
  const [data, setData] = useState([2, 3, 1, 4, 7, 3]);
  
  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message received:', data);

      // Update train1 and train2 state with received values
      if (data.train2 !== undefined) setTrain2(data.train2);
      if (data.train1 !== undefined) setTrain1(data.train1);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  // Log the updated train values whenever the state changes
  useEffect(() => {
    console.log('Updated Train Status:', { train1, train2 });
  }, [train1, train2]);

  const handleSubmit = () => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Sending data to WebSocket server');
      socket.send(JSON.stringify({ data }));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed after sending data');
    };
  };

  return (
    <div>
      <h2>Train Status</h2>
      <p>Train 1: {train1}</p>
      <p>Train 2: {train2}</p>
      <button onClick={handleSubmit}>submit</button>
      <button>simulate</button>
    </div>
  );
};

export default TrainComponent;
