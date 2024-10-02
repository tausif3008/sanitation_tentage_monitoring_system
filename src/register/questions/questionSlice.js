// slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questionSlice",
  initialState: {
    questionUpdateEl: null,
    isUpdated: false,
  },

  reducers: {
    setUpdateQuestionEl: (state, action) => {
      state.questionUpdateEl = action.payload.updateElement;
    },
    setQuestionListIsUpdated: (state, action) => {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const { setUpdateQuestionEl, setQuestionListIsUpdated } =
  questionSlice.actions;

export default questionSlice.reducer;
