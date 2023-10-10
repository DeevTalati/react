import React, { useState } from 'react';
import './TimerOptions.css'; // Import your CSS file
import StartTimer from './StartTimer';
import SetAlarm from './SetAlarm';

function TimerOptions() {
  const [selectedOption, setSelectedOption] = useState('startTimer');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }

  return (
    <div className="timer-options-container">
      <div className="timer-navigation">
        <button 
          className={selectedOption === 'startTimer' ? 'active' : ''}
          onClick={() => handleOptionClick('startTimer')}
        > Start Timer
        </button>
        <button 
          className={selectedOption === 'setAlarm' ? 'active' : ''}
          onClick={() => handleOptionClick('setAlarm')}
        >
          Set Alarm
        </button>
      </div>
      <div className="selected-option">
        {selectedOption === 'startTimer' && <StartTimer />}
        {selectedOption === 'setAlarm' && <SetAlarm />}
      </div>
    </div>
  );
}

export default TimerOptions;
