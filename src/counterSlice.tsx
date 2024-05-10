import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loginClicked: boolean;
  enrollClicked: boolean;
}

const initialState: CounterState = {
  loginClicked: false,
  enrollClicked: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.loginClicked = !state.loginClicked;
    },
    toggleEnroll: (state) => {
      state.enrollClicked = !state.enrollClicked;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLogin, toggleEnroll } = counterSlice.actions;

export default counterSlice.reducer;
