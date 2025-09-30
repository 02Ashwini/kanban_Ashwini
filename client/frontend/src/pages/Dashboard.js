// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards, createBoard } from "../features/boardSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.boards);
  const [newBoard, setNewBoard] = useState("");

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreate = () => {
    if (newBoard.trim()) {
      dispatch(createBoard(newBoard));
      setNewBoard("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Boards</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newBoard}
              onChange={(e) => setNewBoard(e.target.value)}
              placeholder="New Board Title"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCreate}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((board) => (
            <div
              key={board._id}
              onClick={() => navigate(`/board/${board._id}`)}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl cursor-pointer transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{board.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Members: {board.members?.length || 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
