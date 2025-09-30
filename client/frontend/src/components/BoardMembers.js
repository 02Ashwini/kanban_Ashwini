import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { inviteMember, removeMember } from "../features/boardSlice";

const BoardMembers = ({ board }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    if (email.trim()) {
      dispatch(inviteMember({ boardId: board._id, email }));
      setEmail("");
    }
  };

  const handleRemove = (memberId) => {
    dispatch(removeMember({ boardId: board._id, memberId }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Members
      </h3>
      <div className="flex gap-2 mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Invite by email"
          className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleInvite}
          className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700"
        >
          Invite
        </button>
      </div>

      <ul className="space-y-2">
        {board.members?.map((member) => (
          <li
            key={member._id}
            className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2"
          >
            <span className="text-gray-700">{member.email}</span>
            <button
              onClick={() => handleRemove(member._id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardMembers;
