const storeName = "reduxState";

export const saveState = (state) => {
  try {
    localStorage.setItem(storeName, JSON.stringify(state));
  } catch (err) {
    console.log("saveState failed");
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storeName);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.log("No local data found");
    return undefined;
  }
};
