import passwordInterface from "@/src/interfaces/passwordInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "passwords",
  initialState: {
    passwords: [] as passwordInterface[],
  },
  reducers: {
    setPasswords: (state, action) => {
      state.passwords = action.payload;
    },
    addNewPasswords: (state, action) => {
      state.passwords = [...state.passwords, action.payload];
    },
    deletePasswords: (state, action) => {
      state.passwords = state.passwords.filter(
        (item) => item.id != action.payload
      );
    },
    updatePasswords: (state, action) => {
      state.passwords = state.passwords.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    loadMorePasswords: (state, action) => {
      state.passwords = [...state.passwords, ...action.payload];
    },
  },
});

export const {
  setPasswords,
  addNewPasswords,
  deletePasswords,
  loadMorePasswords,
  updatePasswords,
} = passwordSlice.actions;
export default passwordSlice.reducer;
