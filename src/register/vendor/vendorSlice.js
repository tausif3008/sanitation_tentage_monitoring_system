// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState: {
    vendorUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateVendorEl: (state, action) => {
      state.vendorUpdateEl = action.payload.updateElement;
    },

    setVendorListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateVendorEl, setVendorListIsUpdated } =
  vendorSlice.actions;
export default vendorSlice.reducer;
