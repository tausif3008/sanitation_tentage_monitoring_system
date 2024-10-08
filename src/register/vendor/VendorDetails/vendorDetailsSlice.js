// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const vendorDetailsSlice = createSlice({
  name: "vendorDetailsSlice",
  initialState: {
    vendorDetailsUpdateEl: null,
    isUpdated: false,
    sectorQuant: [1],
  },
  reducers: {
    setUpdateVendorDetailsEl: (state, action) => {
      state.vendorDetailsUpdateEl = action.payload.updateElement;
    },

    setVendorDetailsListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },

    setSectorQuant: (state, action) => {
      state.sectorQuant = action.payload;
    },

    addSectorQuant: (state, action) => {
      state.sectorQuant = [...state.sectorQuant, ...action.payload];
    },
  },
});

export const {
  setUpdateVendorDetailsEl,
  setVendorDetailsListIsUpdated,
  setSectorQuant,
  addSectorQuant,
} = vendorDetailsSlice.actions;
export default vendorDetailsSlice.reducer;
