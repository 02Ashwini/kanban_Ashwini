// src/components/CreateTaskModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/taskSlice";

const CreateTaskModal = ({ isOpen, onClose, boardId, initialStatus = "todo" }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", description: "", status: initialStatus });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      await dispatch(createTask({
        title: form.title,
        description: form.description,
        boardId,
        status: form.status, // optional - your model supports 'status'
      })).unwrap();
      setForm({ title: "", description: "", status: initialStatus });
      onClose();
    } catch (err) {
      console.error("Create task failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Task</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description (optional)"
            rows={4}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex items-center justify-between gap-3">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
