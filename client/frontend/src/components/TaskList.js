import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const TaskList = ({ id, title, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
      <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[50px]">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskList;
