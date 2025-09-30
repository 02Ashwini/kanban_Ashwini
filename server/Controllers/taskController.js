import Task from "../models/Task.js";
import Board from "../models/Board.js";

// Create Task
export const createTask = async (req, res) => {
  const { title, description, boardId, status } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    const task = await Task.create({
      title,
      description,
      board: boardId,
      createdBy: req.user._id,
      status: status || "todo",   // ✅ allow modal to set column, fallback to "todo"
      order: 0,                   // ✅ tasks get order 0 (can be updated later)
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Tasks by Board
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId }).sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.assignedTo = req.body.assignedTo || task.assignedTo;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move Task (Drag & Drop with Order Shifting)
export const moveTask = async (req, res) => {
  try {
    const { status, order } = req.body;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // ✅ Step 1: Shift other tasks in the same board + status
    await Task.updateMany(
      { board: task.board, status, order: { $gte: order } },
      { $inc: { order: 1 } }
    );

    // ✅ Step 2: Update moved task
    task.status = status;
    task.order = order;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


