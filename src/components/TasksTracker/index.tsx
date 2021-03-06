import React, { useEffect, useRef, useState } from "react";
import ClockDisplay from "../ClockDisplay";
import moment from "moment";
import { Moment, Task, Activity } from "./types";
import TasksDisplay from "./TasksDisplay";
import useInterval from "../../hooks/useInterval";
import PassedTimeDisplay from "./PassedTimeDisplay";
import CategoriesSelection from "./CategoriesSelection";
import AddCategory from "./AddCategory";
import DayVisualization from "./DayVisualization";

interface UserData {
  categories: string[];
  allTasks: any;
}

/** Do NOT change this format! Used in class Moment in types.ts */
const FORMAT_STYLE = "YYYY-MM-DD HH:mm:ss A";
const LOCAL_STORAGE_KEY = "USER_DATA";

const TasksTracker = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isStarted, setIsStarted] = useState(false);

  const [todaysActivities, setTodaysActivities] = useState<Activity[]>([]);
  const [allActivities, setAllActivities] = useState<
    Record<string, Activity[]>
  >({});

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentMoment, setCurrentMoment] = useState<Moment>();
  const [startMoment, setStartMoment] = useState<Moment>();
  const [stopMoment, setStopMoment] = useState<Moment>();
  const [passedTime, setPassedTime] = useState([0, 0, 0]);

  useInterval(() => {
    const m = new Moment(moment().format(FORMAT_STYLE));
    setCurrentMoment(m);
    // if (m.time.split(":")[2] === "00")
    if (isStarted) calculatePassedTime();
  }, 1000);

  // Load data from localStorage
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) as UserData;
    if (obj) {
      setCategories(obj.categories);
      setAllActivities(obj.allTasks);
      const today = new Moment(moment().format(FORMAT_STYLE)).date;
      if (today) setTodaysActivities(obj.allTasks[today] || []);
    }
  }, []);

  useEffect(() => {
    if (isStarted === false) {
      setStopMoment(currentMoment);
    } else {
      setStopMoment(null);
    }
  }, [isStarted]);

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
   * Using a Task to add an Activity to todaysActivities,
   * update allActivities, reset startMoment & input field
   */
  const AddTodaysActivity = () => {
    // TODO: check user have selected or create a task
    const newTask = new Task(inputRef.current.value, selectedCategory);
    const newActivity = new Activity(
      newTask,
      startMoment,
      currentMoment,
      passedTime
    );
    setTodaysActivities((arr) => {
      const newTodaysActivities = [...arr, newActivity];
      saveOneDayActivities({ dateAllTasks: newTodaysActivities }); // Prevent race condition
      return newTodaysActivities;
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

  const addCategory = (name: string) => {
    if (name) {
      if (categories.indexOf(name) < 0) {
        setCategories((s) => [...s, name]);
        setSelectedCategory(name);
        updateDataInLocalStorage({
          categories: categories,
          allTasks: allActivities,
        });
      } else {
        console.warn("Repeated category, skip add");
      }
    }
  };

  interface saveOneDayActivitiesProps {
    date?: string;
    dateAllTasks?: Activity[];
  }

  const saveOneDayActivities = ({
    date = currentMoment.date,
    dateAllTasks = todaysActivities,
  }: saveOneDayActivitiesProps) => {
    setAllActivities((tasks) => {
      const newAllTasks = { ...tasks, [date]: dateAllTasks };
      updateDataInLocalStorage({
        categories: categories,
        allTasks: newAllTasks,
      });
      return newAllTasks;
    });
  };

  const updateDataInLocalStorage = (userData: UserData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
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
      <AddCategory addCategory={addCategory} />
      <h2>My Activities:</h2>
      <div>
        <input ref={inputRef} placeholder="My finished task is?" />
        <button onClick={AddTodaysActivity} disabled={!isStarted}>
          +
        </button>
      </div>
      <TasksDisplay activities={todaysActivities} />
      <DayVisualization />
    </div>
  );
};

export default TasksTracker;
