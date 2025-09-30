// import Board from "../models/Board.js";

// // Create Board
// export const createBoard = async (req, res) => {
//   try {
//     const board = await Board.create({
//       title: req.body.title,
//       owner: req.user._id,
//       members: [req.user._id],
//     });
//     res.status(201).json(board);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get User Boards
// export const getBoards = async (req, res) => {
//   try {
//     const boards = await Board.find({ members: req.user._id });
//     res.json(boards);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Board
// export const deleteBoard = async (req, res) => {
//   try {
//     const board = await Board.findById(req.params.id);
//     if (!board) return res.status(404).json({ message: "Board not found" });

//     if (board.owner.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     await board.remove();
//     res.json({ message: "Board removed" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import Board from "../models/Board.js";
import User from "../models/User.js";

// Invite member by email
export const inviteMember = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { email } = req.body;

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (board.members.includes(user._id))
      return res.status(400).json({ message: "User already a member" });

    board.members.push(user._id);
    await board.save();

    res.json({ message: "Member added", board });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove member
export const removeMember = async (req, res) => {
  try {
    const { boardId, memberId } = req.params;

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    board.members = board.members.filter((id) => id.toString() !== memberId);
    await board.save();

    res.json({ message: "Member removed", board });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
