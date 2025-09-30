// import React from "react";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import TaskCard from "./TaskCard";

// const TaskList = ({ id, title, tasks }) => {
//   return (
//     <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
//       <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
//       <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
//         <div className="space-y-3 min-h-[50px]">
//           {tasks.map((task) => (
//             <TaskCard key={task._id} task={task} />
//           ))}
//         </div>
//       </SortableContext>
//     </div>
//   );
// };

// export default TaskList;
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskList = ({ id, title, tasks, onAdd }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col max-h-[80vh]"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
        <button
          onClick={onAdd}
          className="text-indigo-600 hover:text-indigo-800 font-bold"
        >
          +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <p className="text-sm text-gray-400 italic">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
