import React, { useState, useEffect } from 'react';
import './App.css'; // Create App.css file if not already present
import TimerOptions from './TimerOptions';
import ControlPanel from './ControlPanel';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = time.toLocaleDateString(undefined, options);

  return (
    <div className="clock">
      <div className="time">{formattedTime}</div>
      <div className="date">{formattedDate}</div>
    </div>
  );
}

function DateDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = time.toLocaleDateString(undefined, options);

  return (
    <div className="date">
      {formattedDate}
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('clock');

  const handleLeftButtonClick = () => {
    setCurrentScreen('left');
  }

  const handleRightButtonClick = () => {
    setCurrentScreen('right');
  }

  const handleHomeButtonClick = () => {
    setCurrentScreen('clock');
  }

  return (
    <div className="App">
      <div className="border">
        {currentScreen === 'clock' && <Clock />}
        {currentScreen === 'left' && <TimerOptions />}
        {currentScreen === 'right' && <ControlPanel />}
        <div className="overlay">
          {(currentScreen === 'left' || currentScreen === 'right') && (
            <button className="home-button"onClick={handleHomeButtonClick}>Home Screen</button>
          )}
          {currentScreen === 'clock' && (
            <div>
              <button className="left-button" onClick={handleLeftButtonClick}>Timer Options</button>
              <button className="right-button" onClick={handleRightButtonClick}>Control Panel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


