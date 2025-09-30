// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";
import toast from "react-hot-toast";

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (boardId) => {
  const { data } = await API.get(`/tasks/${boardId}`);
  return { boardId, tasks: data };
});

// Create task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { dispatch, rejectWithValue }) => {
    try {
      await API.post("/tasks", taskData);
      dispatch(fetchTasks(taskData.boardId));
      toast.success("Task created successfully ✅");
      return null;
    } catch (error) {
      toast.error("Failed to create task ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ id, boardId }, { dispatch, rejectWithValue }) => {
    try {
      await API.delete(`/tasks/${id}`);
      dispatch(fetchTasks(boardId));
      toast.success("Task deleted 🗑️");
      return id;
    } catch (error) {
      toast.error("Failed to delete task ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Move task
export const moveTask = createAsyncThunk(
  "tasks/move",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/tasks/move/${id}`, updates);
      toast.success("Task moved 🔄");
      return data;
    } catch (error) {
      toast.error("Failed to move task ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, updates);
      toast.success("Task updated ✏️");
      return data;
    } catch (error) {
      toast.error("Failed to update task ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { list: [], boardId: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload.tasks;
        state.boardId = action.payload.boardId;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.list.findIndex((t) => t._id === action.payload._id);
        if (idx >= 0) state.list[idx] = action.payload;
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const idx = state.list.findIndex((t) => t._id === action.payload._id);
        if (idx >= 0) state.list[idx] = action.payload;
      });
  },
});

export default taskSlice.reducer;
