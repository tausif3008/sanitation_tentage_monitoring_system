// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const vendorDetailsSlice = createSlice({
  name: "vendorDetailsSlice",
  initialState: {
    vendorDetailsUpdateEl: null,
    isUpdated: false,
  },
  reducers: {
    setUpdateVendorDetailsEl: (state, action) => {
      state.vendorDetailsUpdateEl = action.payload.updateElement;
    },

    setVendorDetailsListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateVendorDetailsEl, setVendorDetailsListIsUpdated } =
  vendorDetailsSlice.actions;
export default vendorDetailsSlice.reducer;
