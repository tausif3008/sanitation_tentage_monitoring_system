// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import assetTypeSlice from "./../register/AssetType/AssetTypeSlice";

const rootReducer = combineReducers({
  assetTypeUpdateEl: assetTypeSlice,
});

export default rootReducer;
