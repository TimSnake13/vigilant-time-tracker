import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../components/TasksTracker/types";

const initialState: Record<string, Activity[]> = {};

interface addActivityActionType {
  date: string;
  activity: Activity;
}

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<addActivityActionType>) => {
      state = {
        ...state,
        [action.payload.date]: [
          ...state[action.payload.date],
          action.payload.activity,
        ],
      };
    },
  },
});

export const { addActivity } = activitiesSlice.actions;

export default activitiesSlice.reducer;
