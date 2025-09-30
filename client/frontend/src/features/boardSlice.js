// src/features/boardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";
import toast from "react-hot-toast";

// Fetch all boards
export const fetchBoards = createAsyncThunk("boards/fetch", async () => {
  const { data } = await API.get("/boards");
  return data;
});

// Create a new board
export const createBoard = createAsyncThunk("boards/create", async (title, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/boards", { title });
    toast.success("Board created ✅");
    return data;
  } catch (error) {
    toast.error("Failed to create board ❌");
    return rejectWithValue(error.response?.data || error.message);
  }
});

const boardSlice = createSlice({
  name: "boards",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default boardSlice.reducer;
