import React, { useState, useRef, useEffect } from "react";
import "./StopWatch.css";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdPauseCircleOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { FaRegCircleStop } from "react-icons/fa6";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  const [lapCount, setLapCount] = useState(1);
  const [lapsedArray, setLapsedArray] = useState([]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLapCount(1);
    setLapsedArray((la) => []);
  }

  function lap() {
    if (isRunning) {
      const newLap = { id: lapCount, lapTime: formatDate() };
      setLapsedArray((la) => [newLap, ...la]);
      setLapCount(lc => lc+1);
    }
  }

  function formatDate() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliSeconds = Math.floor((elapsedTime % 1000) / 10);

    return `${paddZero(minutes)} : ${paddZero(seconds)} : ${paddZero(
      milliSeconds
    )}`;
  }

  function paddZero(time) {
    return time < 10 ? "0" + time : time;
  }

  return (
    <>
      <h1 className="timer-title">Stop Watch</h1>
      <div className="container">
        <div className="timer">
          <div className="time">{formatDate()}</div>
          <div className="timer-options">
            <FaRegCircleStop onClick={lap} className="timer-button timer-lap" />
            {isRunning ? (
              <MdPauseCircleOutline
                onClick={stop}
                className="timer-button timer-stop"
              />
            ) : (
              <IoPlayCircleOutline
                onClick={start}
                className="timer-button timer-start"
              />
            )}
            <GrPowerReset
              onClick={reset}
              className="timer-button timer-reset"
            />
          </div>
        </div>

        <ul className="time-lapses">
          {lapsedArray.map((lapItem) => {
            return (
              <li key={lapItem.id} className="lap">
                <div className="id">{lapItem.id}</div>
                <div className="lap-time">{lapItem.lapTime}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StopWatch;
