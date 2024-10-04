import { createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";

const initialState = {
  data: null,
  error: null,
};

export const assestTypeSlice = createSlice({
  name: "assestTypeSlice",
  initialState,
  reducers: {
    postAdd: (state, action) => {
      state.data = action.payload;
    },
    postErrAdd: (state, action) => {
        state.error = action.payload;
      },
  },
 
});

export const submit = (apiData) => async (dispatch) => {
    console.log(apiData,"apidta");
    
  try {
    const res = await axios({
      method: 'POST',
      url: "https://kumbhtsmonitoring.in/php-api/asset-types/entry",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YunHu873jHds83hRujGJKd873",
        "x-api-version": "1.0.1",
        "x-platform": "Web",
        "x-access-token": localStorage.getItem("sessionToken") || "",
      },
      body: JSON.stringify(apiData),
    });
    dispatch(postAdd(res?.status));
  } catch (error) {
    dispatch(postErrAdd(error?.response?.data?.Error?.Message));
    console.log("In get Login function error", error);
  }
};

export const { postAdd, postErrAdd } = assestTypeSlice.actions;
export default assestTypeSlice.reducer;
