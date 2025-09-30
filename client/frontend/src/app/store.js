import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import boardReducer from "../features/boardSlice";
import taskReducer from "../features/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    tasks: taskReducer,
  },
});

export default store;
