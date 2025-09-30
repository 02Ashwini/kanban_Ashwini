import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../features/taskSlice";

const TaskDetailsModal = ({ isOpen, onClose, task, boardId }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
  });
  const [editMode, setEditMode] = useState(false);

  if (!isOpen || !task) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await dispatch(updateTask({ id: task._id, updates: form }));
    setEditMode(false);
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTask({ id: task._id, boardId }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Title */}
        {editMode ? (
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full text-xl font-bold border-b p-2 focus:outline-none"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
        )}

        {/* Description */}
        <div className="mt-4">
          {editMode ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-600">{task.description || "No description"}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
