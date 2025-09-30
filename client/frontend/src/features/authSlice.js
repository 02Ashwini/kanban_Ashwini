import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const { data } = await API.post("/auth/login", formData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
});

export const registerUser = createAsyncThunk("auth/register", async (formData) => {
  const { data } = await API.post("/auth/register", formData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: JSON.parse(localStorage.getItem("user")) || null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
