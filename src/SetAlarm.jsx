import React, { useState, useEffect } from 'react';
import TimeIsUp from './TimeIsUp';
import './SetAlarm.css'; // Add CSS file

function SetAlarm() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(true);

  const handleSetAlarm = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsInputVisible(false);
  }

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => Math.max(0, prevTime - 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0 && isRunning) {
      setTimeUp(true);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleCancelAlarm = () => {
    setIsRunning(false);
    setTimeUp(false);
    setTimeLeft(0);
    setIsInputVisible(true);
  }

  const handleReturn = () => {
    setTimeUp(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
    setIsRunning(false);
    setIsInputVisible(true);
  }

  return (
    <div>
      {timeUp ? (
        <TimeIsUp onReturn={handleReturn} />
      ) : (
        <div>
          {isInputVisible && (
            <div className="alarm-input">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                min="0"
                max="23"
                className="alarm-field" // Add class for styling
              />
              <span>:</span>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                min="0"
                max="59"
                className="alarm-field" // Add class for styling
              />
              <span>:</span>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                min="0"
                max="59"
                className="alarm-field" // Add class for styling
              />
            </div>
          )}
          {isInputVisible && <button className="alarm-button" onClick={handleSetAlarm}>Start Alarm</button>}
          {isRunning && <div className="alarm-text">{formatTime(timeLeft)}</div>}
          {isRunning && <button className="alarm-button" onClick={handleCancelAlarm}>Cancel Alarm</button>}
        </div>
      )}
    </div>
  );
}

export default SetAlarm;
