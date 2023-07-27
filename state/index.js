import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  linkName: "home",
  menuOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLinkName(state, action) {
      state.linkName = action.payload;
    },
    setMenuOpen(state, action) {
      state.menuOpen = state.menuOpen === false ? true : false;
    },
  },
});

export const { setMode, setLinkName, setMenuOpen } = authSlice.actions;
export default authSlice.reducer;
