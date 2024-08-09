import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  loginClicked: boolean;
  signupClicked: boolean;
  locationClicked: boolean;
}

const initialState: CounterState = {
  loginClicked: false,
  signupClicked: false,
  locationClicked: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.loginClicked = !state.loginClicked;
    },
    toggleSignup: (state) => {
      state.signupClicked = !state.signupClicked;
    },
    toggleLocation: (state) => {
      state.locationClicked = !state.locationClicked;
    },
  },
});

export const { toggleLogin, toggleSignup, toggleLocation } =
  counterSlice.actions;

export default counterSlice.reducer;
