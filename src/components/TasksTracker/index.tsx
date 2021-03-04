import React, { useEffect, useRef, useState } from "react";
import ClockDisplay from "../ClockDisplay";
import moment from "moment";
import Task, { Moment } from "./types";
import TasksDisplay from "./TasksDisplay";
import useInterval from "../../hooks/useInterval";
import PassedTimeDisplay from "./PassedTimeDisplay";

/** Do NOT change this format! Used in class Moment in types.ts */
const FORMAT_STYLE = "YYYY-MM-DD HH:mm:ss A"; //

const TasksTracker = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isActive, setIsActive] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState([]);

  const [currentMoment, setCurrentMoment] = useState<Moment>();
  const [startMoment, setStartMoment] = useState<Moment>();
  const [passedTime, setPassedTime] = useState("");

  // Basic Clock:
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentMoment(new Moment(moment().format(FORMAT_STYLE)));
      }, 1000);
    } else {
      clearTimeout(interval);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [isActive]);

  // Test:
  const [passedSec, setPassedSec] = useState(0);
  useInterval(
    () => {
      setPassedSec(passedSec + 1);
      // console.log(startMoment);
    },
    isStarted ? 1000 : null
  );

  // TODO: 1. Button => trigger calculate pass time show on screen perfectly
  // TODO: 3. task CRUD ops

  const AddTodaysTask = () => {
    const newTask = new Task(
      inputRef.current.value,
      startMoment,
      currentMoment
    );
    setTodaysTasks((arr) => [...arr, newTask]);
  };

  const toggleIsStarted = () => {
    setIsStarted((s) => {
      if (s === false) {
        // If starting:
        setStartMoment(currentMoment);
      } else {
        // If stopping:
        // setPassedSec(0);
      }
      return !s;
    });
  };

  return (
    <div>
      <button onClick={toggleIsStarted}>{isStarted ? "Stop" : "Start"}</button>
      <div>Start At: {startMoment?.time}</div>

      <PassedTimeDisplay passedSec={passedSec} />

      <div>
        <input ref={inputRef} placeholder="My finished task is?" />
        <button onClick={AddTodaysTask} disabled={!isStarted}>
          +
        </button>
      </div>

      <ClockDisplay
        currentDate={currentMoment?.date}
        currentTime={currentMoment?.time}
      />
      <TasksDisplay tasks={todaysTasks} />
    </div>
  );
};

export default TasksTracker;
