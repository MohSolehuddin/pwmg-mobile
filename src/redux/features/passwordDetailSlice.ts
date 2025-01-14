import passwordInterface from "@/src/interfaces/passwordInterfaces";
import { createSlice } from "@reduxjs/toolkit";

const passwordDetailSlice = createSlice({
  name: "todos",
  initialState: {
    selectedPasswordDetail: null as passwordInterface | null,
  },
  reducers: {
    setSelectedPasswordDetail: (state, action) => {
      state.selectedPasswordDetail = action.payload;
    },
  },
});

export const { setSelectedPasswordDetail } = passwordDetailSlice.actions;
export default passwordDetailSlice.reducer;
