// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import assetTypeSlice from "./../register/AssetType/AssetTypeSlice";
import vendorSlice from "./../register/vendor/vendorSlice";
import vendorDetailsSlice from "./../register/vendor/VendorDetails/vendorDetailsSlice";
import userSlice from "./../register/user/userSlice";
import questionSlice from "./../register/questions/questionSlice";
import monitoringSlice from "./../complaince/monitoringSlice";

const rootReducer = combineReducers({
  assetTypeUpdateEl: assetTypeSlice,
  vendorSlice: vendorSlice,
  vendorDetailsSlice: vendorDetailsSlice,
  userSlice: userSlice,
  questionSlice: questionSlice,
  monitoringSlice: monitoringSlice,
});

export default rootReducer;
