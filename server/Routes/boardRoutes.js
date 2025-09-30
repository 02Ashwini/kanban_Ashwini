import express from "express";
import { createBoard, getBoards, deleteBoard } from "../Controllers/boardController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.delete("/:id", protect, deleteBoard);

export default router;
