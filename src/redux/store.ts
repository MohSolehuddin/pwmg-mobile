import { configureStore } from "@reduxjs/toolkit";
import passwordDetailReducer from "./features/passwordDetailSlice";
import passwordsReducer from "./features/passwordSlice";
export const store = configureStore({
  reducer: {
    passwordDetail: passwordDetailReducer,
    passwords: passwordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
