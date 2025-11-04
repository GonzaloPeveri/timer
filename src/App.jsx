import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaCog } from "react-icons/fa";
import './App.css';

function App() {
  const initialMinutes = 10;
  const initialSeconds = 0;
  const [seconds, setSeconds] = useState(initialMinutes * 60 + initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [showSecondsParagraph, setShowSecondsParagraph] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning === true) {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            return 0;
          }
          return prevSeconds - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <>
      <h1 style={{ marginBottom: showSecondsParagraph ? '0px' : '34px' }}>Timer</h1>
      {showSecondsParagraph && <p>{seconds}</p>}
      <TextareaNumbers role="minutes" number={seconds} setNumber={setSeconds} maxNumber="999" maxlength="3" isRunning={isRunning} />
      <p className="colon">:</p>
      <TextareaNumbers role="seconds" number={seconds} setNumber={setSeconds} maxNumber="59" maxlength="2" isRunning={isRunning} />
      {/*<Buttons isRunning={isRunning} setIsRunning={setIsRunning} />*/}
    </>
  );
}

function TextareaNumbers({ role, number, setNumber, maxNumber, isRunning }) {
  let value = "";
  let shownValue;
  if (role === "minutes") {
    value = Math.floor(number / 60);
  }
  if (role === "seconds") {
    value = number % 60;
  }
  shownValue = String(value).padStart(2, "0");

  const handleChange = (e) => {
    let numericValue = e.target.value.replace(/[^0-9\n]/g, "");
    numericValue = parseInt(numericValue);
    if (numericValue > maxNumber) { numericValue = maxNumber };
    if (role === "seconds") {
      const minutes = Math.floor(number / 60);
      console.log()
      setNumber(minutes * 60 + parseInt(numericValue));
    }
    if (role === "minutes") {
      const bareSeconds = parseInt(number) % 60;
      setNumber(numericValue * 60 + bareSeconds);
    }
  }

  const handleFocus = (e) => {

  }

  return (
    <div className="textarea-container">
      <textarea className="timer-textarea" value={shownValue} onChange={handleChange} onFocus={handleFocus} />
    </div>

  )
}

function Buttons({ isRunning, setIsRunning }) {

  const handlePlay = () => {
    setIsRunning(!isRunning);
  }

  return (
    <div className="buttons">
      <div>
        <button onClick={handlePlay}><FaPlay /></button>
        <button><FaCog /></button>
        {/*
        <button><FaPlay size={60} color="green" /> Play</button>
        <button><FaPause size={60} color="green" /> Pause</button>
        <button><FaStop size={60} color="green" /> Stop</button>
        <button><FaCog size={60} color="green" /> Settings</button>
        */}
      </div>
    </div>
  )
}

export default App