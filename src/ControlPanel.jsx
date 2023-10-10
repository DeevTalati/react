import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import './ControlPanel.css';

function ControlPanel() {
  const [volume, setVolume] = useState(() => {
    const storedValue = localStorage.getItem('volume');
    return storedValue !== null ? JSON.parse(storedValue) : 50;
  });

  const [height, setHeight] = useState(() => {
    const storedValue = localStorage.getItem('height');
    return storedValue !== null ? JSON.parse(storedValue) : 100;
  });

  const [light1, setLight1] = useState(() => {
    const storedValue = localStorage.getItem('light1');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const [light2, setLight2] = useState(() => {
    const storedValue = localStorage.getItem('light2');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const [brightness, setBrightness] = useState(() => {
    const storedValue = localStorage.getItem('brightness');
    return storedValue !== null ? JSON.parse(storedValue) : 50;
  });

  useEffect(() => {
    const storedVolume = JSON.parse(localStorage.getItem('volume'));
    if (storedVolume !== null) {
      setVolume(storedVolume);
    }
  
    const storedHeight = JSON.parse(localStorage.getItem('height'));
    if (storedHeight !== null) {
      setHeight(storedHeight);
    }

    const storedValue1 = localStorage.getItem('light1');
    if (storedValue1 !== null) {
      setLight1(JSON.parse(storedValue1));
    }
  
    const storedValue2 = localStorage.getItem('light2');
    if (storedValue2 !== null) {
      setLight2(JSON.parse(storedValue2));
    }

    const storedBrightness = JSON.parse(localStorage.getItem('brightness'));
    if (storedBrightness !== null) {
      setBrightness(storedBrightness);
    }
  }, []);

  const handleVolumeChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setVolume(newValue);
    localStorage.setItem('volume', JSON.stringify(newValue));
  }

  const handleHeightChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setHeight(newValue);
    localStorage.setItem('height', JSON.stringify(newValue));
  }

  const handleToggleLight1 = () => {
    setLight1(prev => {
      const newValue = !prev;
      localStorage.setItem('light1', JSON.stringify(newValue));
      return newValue;
    });
  }

  const handleToggleLight2 = () => {
    setLight2(prev => {
      const newValue = !prev;
      localStorage.setItem('light2', JSON.stringify(newValue));
      return newValue;
    });
  }

  const handleBrightnessChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setBrightness(newValue);
    localStorage.setItem('brightness', JSON.stringify(newValue));
  }

  return (
    <div className="control-panel">
      <div className="light-card card">
        <h3 className="custom-font">Right Light</h3>
        <Switch
          checked={light2}
          onChange={handleToggleLight2}
          color="primary"
        />
        <label className="custom-font-label">{light2 ? 'On' : 'Off'}</label>
        {light2 && (
          <div className="brightness-slider-container">
            <h3 className="custom-font">Brightness</h3>
            <div className="brightness-slider-vertical">
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={handleBrightnessChange}
              />
            </div>
            <label className="custom-font-label">{brightness}%</label>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="custom-font">Volume</h3>
        <div className="slider-container">
          <div className="slider-vertical">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
        <label className="custom-font-label">{volume}%</label>
      </div>

      <div className="card">
        <h3 className="custom-font">Height</h3>
        <div className="slider-container">
          <div className="slider-vertical">
            <input
              type="range"
              min="20"
              max="60"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
        </div>
        <label className="custom-font-label">{height} Inches</label>
      </div>

      <div className="light-card card">
        <h3 className="custom-font">Left Light</h3>
        <Switch
          checked={light1}
          onChange={handleToggleLight1}
          color="primary"
        />
        <label className="custom-font-label">{light1 ? 'On' : 'Off'}</label>
        {light1 && (
          <div className="brightness-slider-container">
            <h3 className="custom-font">Brightness</h3>
            <div className="brightness-slider-vertical">
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={handleBrightnessChange}
              />
            </div>
            <label className="custom-font-label">{brightness}%</label>
          </div>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;
