// slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import assetTypeSlice from "./assetTypeSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  assetTypeSlice,
});

export default rootReducer;
