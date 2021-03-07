import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../components/TasksTracker/types";

// Use ID (string) as key for quick search a Task
// Use name as key instead?
const initialState: Record<string, Task> = {};

interface AddTaskType {
  task: Task;
}
interface AddTaskByTextType {
  name: string;
  categoryID?: string;
  description?: string;
}
interface UpdateTaskType {
  id: string;
  data: {
    name?: string;
    categoryID?: string;
    description?: string;
  };
}
interface RemoveTaskType {
  id: string;
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskType>) => {
      state = { ...state, [action.payload.task.id]: action.payload.task };
    },
    addTaskByText: (state, action: PayloadAction<AddTaskByTextType>) => {
      const { name, categoryID, description } = action.payload;
      const newTask = new Task(name, categoryID, description);
      // if (name in state === false) state = { ...state, [name]: newTask };
      state = { ...state, [newTask.id]: newTask };
    },
    updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
      const { name, categoryID, description } = action.payload.data;
      const id = action.payload.id;
      state = {
        ...state,
        [id]: {
          ...state[id],
          name: name ? name : state[id].name,
          categoryID: categoryID ? categoryID : state[id].categoryID,
          description: description ? description : state[id].description,
        },
      };
    },
    removeTask: (state, action: PayloadAction<RemoveTaskType>) => {
      delete state[action.payload.id];
    },
  },
});

export const { addTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
