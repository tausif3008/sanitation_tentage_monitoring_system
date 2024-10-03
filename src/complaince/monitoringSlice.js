// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const monitoringSlice = createSlice({
  name: "monitoringSlice",
  initialState: {
    monitoringUpdateEl: null,
    assetInfo: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateMonitoringEl: (state, action) => {
      state.monitoringUpdateEl = action.payload.updateElement;
    },
    setAssetInfo: (state, action) => {
      state.assetInfo = action.payload;
    },
    setMonitoringListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const {
  setUpdateMonitoringEl,
  setMonitoringListIsUpdated,
  setAssetInfo,
} = monitoringSlice.actions;
export default monitoringSlice.reducer;
