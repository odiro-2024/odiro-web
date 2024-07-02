import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loginClicked: boolean;
  enrollClicked: boolean;
  locationClicked: boolean;
}

const initialState: CounterState = {
  loginClicked: false,
  enrollClicked: false,
  locationClicked: false,
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
    toggleLocation: (state) => {
      state.locationClicked = !state.locationClicked;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLogin, toggleEnroll, toggleLocation } =
  counterSlice.actions;

export default counterSlice.reducer;
