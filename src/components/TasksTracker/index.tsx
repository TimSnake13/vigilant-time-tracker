import React, { useEffect, useRef, useState } from "react";
import ClockDisplay from "../ClockDisplay";
import moment from "moment";
import Task, { Moment } from "./types";
import TasksDisplay from "./TasksDisplay";
import useInterval from "../../hooks/useInterval";
import PassedTimeDisplay from "./PassedTimeDisplay";
import CategoriesSelection from "./CategoriesSelection";
import AddCategory from "./AddCategory";

/** Do NOT change this format! Used in class Moment in types.ts */
const FORMAT_STYLE = "YYYY-MM-DD HH:mm:ss A";
const LOCAL_STORAGE_KEY = "allTasks";

const TasksTracker = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isStarted, setIsStarted] = useState(false);

  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState({});

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentMoment, setCurrentMoment] = useState<Moment>();
  const [startMoment, setStartMoment] = useState<Moment>();
  const [passedTime, setPassedTime] = useState([0, 0, 0]);

  useInterval(() => {
    try {
      const m = new Moment(moment().format(FORMAT_STYLE));
      setCurrentMoment(m);
      // if (m.time.split(":")[2] === "00")
      if (isStarted) calculatePassedTime();
    } catch (e) {
      console.error(e);
    }
  }, 1000);

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (obj) {
      setAllTasks(obj);
      const today = new Moment(moment().format(FORMAT_STYLE)).date;
      if (today && obj[today]) setTodaysTasks(obj[today]);
    }
  }, []);

  /**
   * Update passedTime by using currentMoment.time & startMoment.time
   */
  const calculatePassedTime = () => {
    if (currentMoment && startMoment) {
      const [cHour, cMin, cSec] = currentMoment.time.split(":").map(Number);
      const [sHour, sMin, sSec] = startMoment.time.split(":").map(Number);

      let h = cHour - sHour;
      if (h < 0) {
        h = 24 + h;
      }
      let m = cMin - sMin;
      if (m < 0) {
        h -= 1;
        m = 60 + m;
      }
      let s = cSec - sSec;
      if (s < 0) {
        m -= 1;
        s = 60 + s;
      }

      setPassedTime([h, m, s]);
    }
  };

  /**
   * Add a Task to todaysTasks, update allTasks, reset startMoment & input field
   */
  const AddTodaysTask = () => {
    const newTask = new Task(
      inputRef.current.value,
      selectedCategory,
      startMoment,
      currentMoment,
      passedTime
    );
    setTodaysTasks((arr) => {
      const newTodaysTasks = [...arr, newTask];
      saveOneDayTasks({ dateAllTasks: newTodaysTasks }); // Prevent race condition
      return newTodaysTasks;
    });
    setStartMoment(currentMoment);
    inputRef.current.value = "";
  };

  // TODO: CRUD ops in tasks

  const handleToggleIsStarted = () => {
    setIsStarted((s) => {
      if (s === false) {
        // If starting:
        setStartMoment(currentMoment);
      }
      return !s;
    });
  };

  interface saveOneDayTasksProps {
    date?: string;
    dateAllTasks?: Task[];
  }

  const saveOneDayTasks = ({
    date = currentMoment.date,
    dateAllTasks = todaysTasks,
  }: saveOneDayTasksProps) => {
    setAllTasks((tasks) => {
      const newAllTasks = { ...tasks, [date]: dateAllTasks };
      updateLocalStorageAllTasks(newAllTasks);
      return newAllTasks;
    });
  };

  const updateLocalStorageAllTasks = (newAllTasks) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAllTasks));
  };

  return (
    <div>
      <ClockDisplay
        currentDate={currentMoment?.date}
        currentTime={currentMoment?.time}
      />
      <button onClick={handleToggleIsStarted}>
        {isStarted ? "Stop" : "Start"}
      </button>
      <div>Start At: {startMoment?.time}</div>
      <PassedTimeDisplay passedTime={passedTime} />

      <h2>Categories</h2>
      <CategoriesSelection
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AddCategory categories={categories} setCategories={setCategories} />
      <h2>My Tasks:</h2>
      <div>
        <input ref={inputRef} placeholder="My finished task is?" />
        <button onClick={AddTodaysTask} disabled={!isStarted}>
          +
        </button>
      </div>
      <TasksDisplay tasks={todaysTasks} />
    </div>
  );
};

export default TasksTracker;
