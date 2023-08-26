import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/RichpanelSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
