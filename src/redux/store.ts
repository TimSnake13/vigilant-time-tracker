import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const preloadedState = loadState();
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState,
});
store.subscribe(
  throttle(() => saveState({ counter: store.getState().counter }), 1000)
); // Only store data once per 1s max

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
