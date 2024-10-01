// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const assetTypeSlice = createSlice({
  name: "assetTypeSlice",
  initialState: {
    assetUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateAssetEl: (state, action) => {
      state.assetUpdateEl = action.payload.updateElement;
    },

    setAssetTypeListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateAssetEl, setAssetTypeListIsUpdated } =
  assetTypeSlice.actions;
export default assetTypeSlice.reducer;
