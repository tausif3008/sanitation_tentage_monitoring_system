// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userDetails: {},
    status: "",
    loading: false,
  },
  reducers: {
    userDetails: (state, action) => {
      return action.payload.userDetails;
    },
  },
});

export const { userDetails } = userSlice.actions;
export default userSlice.reducer;
