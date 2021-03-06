const data = {
  tasks: {
    "task-1": { id: "task-1", content: "Take something 1" },
    "task-2": { id: "task-2", content: "Take something 2" },
    "task-3": { id: "task-3", content: "Take something 3" },
    "task-4": { id: "task-4", content: "Take something 4" },
    "task-5": { id: "task-5", content: "Take something 5" },
  },
  colums: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Process",
      taskIds: ["task-3", "task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-5"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
export default data;
