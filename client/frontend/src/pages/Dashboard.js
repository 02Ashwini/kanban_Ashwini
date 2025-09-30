// // src/pages/Dashboard.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBoards, createBoard } from "../features/boardSlice";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { list } = useSelector((state) => state.boards);
//   const [newBoard, setNewBoard] = useState("");

//   useEffect(() => {
//     dispatch(fetchBoards());
//   }, [dispatch]);

//   const handleCreate = () => {
//     if (newBoard.trim()) {
//       dispatch(createBoard(newBoard));
//       setNewBoard("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="max-w-5xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Your Boards</h2>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={newBoard}
//               onChange={(e) => setNewBoard(e.target.value)}
//               placeholder="New Board Title"
//               className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={handleCreate}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//             >
//               Create
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {list.map((board) => (
//             <div
//               key={board._id}
//               onClick={() => navigate(`/board/${board._id}`)}
//               className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl cursor-pointer transition"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">{board.title}</h3>
//               <p className="text-sm text-gray-500 mt-2">
//                 Members: {board.members?.length || 1}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards, createBoard } from "../features/boardSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.boards);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Your Boards
          </h2>
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

        {loading ? (
          <p className="text-gray-500">Loading boards...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {list.map((board) => (
              <div
                key={board._id}
                onClick={() => navigate(`/board/${board._id}`)}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {board.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {board.members?.length || 1} Member(s)
                </p>
              </div>
            ))}

            <div
              onClick={() =>
                document
                  .querySelector("input[placeholder='New Board Title']")
                  ?.focus()
              }
              className="flex items-center justify-center bg-white/60 backdrop-blur-lg border-2 border-dashed border-indigo-300 rounded-2xl p-6 hover:border-indigo-500 cursor-pointer transition"
            >
              <span className="text-indigo-600 font-medium">
                + New Board
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
