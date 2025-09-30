// // src/features/boardSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../api/axios";
// import toast from "react-hot-toast";

// // Fetch all boards
// export const fetchBoards = createAsyncThunk("boards/fetch", async () => {
//   const { data } = await API.get("/boards");
//   return data;
// });

// // Create a new board
// export const createBoard = createAsyncThunk("boards/create", async (title, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post("/boards", { title });
//     toast.success("Board created ✅");
//     return data;
//   } catch (error) {
//     toast.error("Failed to create board ❌");
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// const boardSlice = createSlice({
//   name: "boards",
//   initialState: { list: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBoards.fulfilled, (state, action) => {
//         state.list = action.payload;
//       })
//       .addCase(createBoard.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       });
//   },
// });

// export default boardSlice.reducer;
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
export const createBoard = createAsyncThunk(
  "boards/create",
  async (title, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/boards", { title });
      toast.success("Board created ✅");
      return data;
    } catch (error) {
      toast.error("Failed to create board ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Invite a member to a board
export const inviteMember = createAsyncThunk(
  "boards/inviteMember",
  async ({ boardId, memberEmail }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/boards/${boardId}/invite`, { email: memberEmail });
      toast.success("Member invited ✅");
      return data;
    } catch (error) {
      toast.error("Failed to invite member ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove a member from a board
export const removeMember = createAsyncThunk(
  "boards/removeMember",
  async ({ boardId, memberId }, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/boards/${boardId}/members/${memberId}`);
      toast.success("Member removed ✅");
      return { boardId, memberId };
    } catch (error) {
      toast.error("Failed to remove member ❌");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        // Optional: Update state if needed
        const board = state.list.find(b => b.id === action.payload.boardId);
        if (board) board.members.push(action.payload.member);
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        const board = state.list.find(b => b.id === action.payload.boardId);
        if (board) board.members = board.members.filter(m => m.id !== action.payload.memberId);
      });
  },
});


export default boardSlice.reducer;
