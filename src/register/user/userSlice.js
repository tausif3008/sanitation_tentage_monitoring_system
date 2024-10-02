// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateUserEl: (state, action) => {
      state.userUpdateEl = action.payload.updateElement;
    },

    setUserListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateUserEl, setUserListIsUpdated } = userSlice.actions;
export default userSlice.reducer;
