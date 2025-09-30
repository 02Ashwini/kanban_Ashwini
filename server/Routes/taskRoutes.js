import express from "express";
import {
  createTask,
  
  updateTask,
  deleteTask,
  moveTask,
} from "../Controllers/taskController.js";
import { getTasks } from "../Controllers/taskController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:boardId", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.put("/move/:id", protect, moveTask);

export default router;
