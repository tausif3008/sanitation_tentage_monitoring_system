// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const monitoringSlice = createSlice({
  name: "monitoringSlice",
  initialState: {
    monitoringUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateMonitoringEl: (state, action) => {
      state.monitoringUpdateEl = action.payload.updateElement;
    },

    setMonitoringListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateMonitoringEl, setMonitoringListIsUpdated } =
  monitoringSlice.actions;
export default monitoringSlice.reducer;
