import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: Number, default: 0 }, // for drag-drop ordering
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
