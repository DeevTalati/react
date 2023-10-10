import React, { useState, useEffect } from 'react';
import './TimeIsUp.css';

function TimeIsUp({ onReturn }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 500); // Toggle visibility every 0.5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timeisup"> {/* Added the 'clock' class */}
      {isVisible && <h2>Time's Up!</h2>}
      <button className="go-back-button" onClick={onReturn}>Go Back</button>
    </div>
  );
}

export default TimeIsUp;