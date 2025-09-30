import Board from "../models/Board.js";

// Create Board
export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Boards
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Board
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (board.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await board.remove();
    res.json({ message: "Board removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
