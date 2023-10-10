import React, { useState, useEffect } from 'react';
import './StartTimer.css';

function StartTimer() {
  const [hours, setHours] = useState(Number(localStorage.getItem('hours')) || 0);
  const [time, setTime] = useState(Number(localStorage.getItem('time')) || 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    // Save hours and time in local storage
    localStorage.setItem('hours', hours);
    localStorage.setItem('time', time);
  }, [hours, time]);
  
  const handleStart = () => {
    setIsRunning(true);
  }

  const handleStop = () => {
    setIsRunning(false);
  }

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setHours(0); 
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return (
    <div className="timer-container">
      <div className ="timer">{formatTime(time)}</div>
      {isRunning ? (
        <button className="stop-button" onClick={handleStop}>Stop</button>
      ) : (
        <>
          <button className="start-button" onClick={handleStart}>Start</button>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default StartTimer;