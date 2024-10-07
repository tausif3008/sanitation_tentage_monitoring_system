// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const assetsSlice = createSlice({
  name: "assetsSlice",
  initialState: {
    assetUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateAssetEl: (state, action) => {
      state.assetUpdateEl = action.payload.updateElement;
    },

    setAssetListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateAssetEl, setAssetListIsUpdated } =
  assetsSlice.actions;
export default assetsSlice.reducer;
