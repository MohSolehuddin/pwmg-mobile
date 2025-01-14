import { configureStore } from "@reduxjs/toolkit";
import passwordDetailReducer from "./features/passwordDetailSlice";
export const store = configureStore({
  reducer: {
    passwordDetail: passwordDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
