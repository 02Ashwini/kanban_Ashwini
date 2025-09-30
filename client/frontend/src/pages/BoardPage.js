// // src/pages/BoardPage.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTasks, moveTask } from "../features/taskSlice";
// import Navbar from "../components/Navbar";
// import TaskList from "../components/TaskList";
// import CreateTaskModal from "../components/CreateTaskModal";

// import {
//   DndContext,
//   closestCorners,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";

// const BoardPage = () => {
//   const { id: boardId } = useParams();
//   const dispatch = useDispatch();
//   const { list } = useSelector((state) => state.tasks);
//   const [tasks, setTasks] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalStatus, setModalStatus] = useState("todo");

//   useEffect(() => {
//     dispatch(fetchTasks(boardId));
//   }, [dispatch, boardId]);

//   useEffect(() => {
//     setTasks(list);
//   }, [list]);

//   const sensors = useSensors(useSensor(PointerSensor));

//   // helper: return array of tasks for a status
//   const tasksByStatus = (status) => tasks.filter((t) => t.status === status).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     // active.id and over.id are task._id strings
//     const activeTask = tasks.find((t) => t._id === active.id);
//     const overTask = tasks.find((t) => t._id === over.id);

//     if (!activeTask) return;

//     // destination status
//     const destStatus = overTask ? overTask.status : activeTask.status;

//     // build source and destination arrays
//     const sourceList = tasksByStatus(activeTask.status);
//     const destList = tasksByStatus(destStatus);

//     // find indices
//     const oldIndex = sourceList.findIndex((t) => t._id === activeTask._id);

//     // determine newIndex relative to destList
//     let newIndex;
//     if (overTask && overTask.status === destStatus) {
//       newIndex = destList.findIndex((t) => t._id === overTask._id);
//     } else {
//       newIndex = destList.length; // drop to end
//     }

//     // if moving inside same list and same index -> nothing
//     if (activeTask.status === destStatus && oldIndex === newIndex) return;

//     // remove active from tasks and insert into dest position
//     const filtered = tasks.filter((t) => t._id !== activeTask._id);

//     // compute new tasks array: insert activeTask with updated status and tentative order
//     const updatedActive = { ...activeTask, status: destStatus, order: newIndex };
//     // insert into filtered at correct absolute position
//     // Build new array by mapping statuses to arrays then flattening in a stable order (todo, in-progress, done)
//     const statuses = ["todo", "in-progress", "done"];
//     const grouped = {
//       todo: [],
//       "in-progress": [],
//       done: [],
//     };

//     // insert updatedActive into dest list at position newIndex relative
//     // first push all tasks except active into grouped arrays (they keep their order)
//     filtered.forEach((t) => grouped[t.status].push(t));

//     // then insert updatedActive into grouped[destStatus] at newIndex
//     grouped[destStatus].splice(newIndex, 0, updatedActive);

//     // rebuild tasks preserving relative ordering of lists (optional)
//     const rebuilt = [].concat(grouped.todo, grouped["in-progress"], grouped.done);

//     setTasks(rebuilt);

//     // send update to backend: include status and order (you can also send boardId if needed)
//     dispatch(moveTask({ id: activeTask._id, updates: { status: destStatus, order: newIndex } }));
//   };

//   const openCreateModal = (status) => {
//     setModalStatus(status);
//     setModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Board</h2>
//           <div className="flex gap-2">
//             <button onClick={() => openCreateModal("todo")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
//               + Add Task (To Do)
//             </button>
//             <button onClick={() => openCreateModal("in-progress")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
//               + Add Task (In Progress)
//             </button>
//             <button onClick={() => openCreateModal("done")} className="px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition">
//               + Add Task (Done)
//             </button>
//           </div>
//         </div>

//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCorners}
//           onDragEnd={handleDragEnd}
//         >
//           <div className="flex gap-6 overflow-x-auto pb-6">
//             <TaskList id="todo" title="To Do" tasks={tasksByStatus("todo")} />
//             <TaskList id="in-progress" title="In Progress" tasks={tasksByStatus("in-progress")} />
//             <TaskList id="done" title="Done" tasks={tasksByStatus("done")} />
//           </div>
//         </DndContext>
//       </div>

//       <CreateTaskModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         boardId={boardId}
//         initialStatus={modalStatus}
//       />
//     </div>
//   );
// };

// export default BoardPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, moveTask } from "../features/taskSlice";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";
import BoardMembers from "../components/BoardMembers";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const BoardPage = () => {
  const { id: boardId } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.tasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("todo");
const { list: boards } = useSelector((state) => state.boards); // list of all boards
const [selectedBoardId, setSelectedBoardId] = useState(null); // track which board is open

const currentBoard = boards.find(board => board.id === selectedBoardId);
  useEffect(() => {
    dispatch(fetchTasks(boardId));
  }, [dispatch, boardId]);

  const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus = (status) =>
    list.filter((t) => t.status === status).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeTask = list.find((t) => t._id === active.id);
    const overTask = list.find((t) => t._id === over.id);
    if (!activeTask) return;

    const destStatus = overTask ? overTask.status : activeTask.status;
    if (activeTask.status === destStatus) return;

    dispatch(moveTask({ id: activeTask._id, updates: { status: destStatus, order: 0 } }));
  };

  const openCreateModal = (status) => {
    setModalStatus(status);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-50">
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Board</h2>

        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <BoardMembers board={currentBoard} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <TaskList id="todo" title="To Do" tasks={tasksByStatus("todo")} onAdd={() => openCreateModal("todo")} />
              <TaskList id="in-progress" title="In Progress" tasks={tasksByStatus("in-progress")} onAdd={() => openCreateModal("in-progress")} />
              <TaskList id="done" title="Done" tasks={tasksByStatus("done")} onAdd={() => openCreateModal("done")} />
            </div>
          </DndContext>
        )}
      </div>

      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        boardId={boardId}
        initialStatus={modalStatus}
      />
    </div>
  );
};

export default BoardPage;
