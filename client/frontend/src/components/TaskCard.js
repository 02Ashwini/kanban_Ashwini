// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const TaskCard = ({ task }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: task._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-grab"
//     >
//       <h4 className="font-semibold text-gray-800">{task.title}</h4>
//       {task.description && (
//         <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//       )}
//     </div>
//   );
// };

// export default TaskCard;
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import TaskDetailsModal from "./TaskDetailsModal";
import { useParams } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const { id: boardId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      >
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1 truncate">
            {task.description}
          </p>
        )}
      </div>

      <TaskDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        task={task}
        boardId={boardId}
      />
    </>
  );
};

export default TaskCard;
