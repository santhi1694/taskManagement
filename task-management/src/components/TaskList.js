import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { getTasks } from "../backend/api";
import useAuth from "../hooks/useAuth";
const TaskList = () => {
  const { user } = useAuth();
  const allTasks = useLiveQuery(() => getTasks(user.id));
  console.log("alltasks", allTasks);
  return (
    <div className="site-layout-background task-list-container">task list</div>
  );
};
export default TaskList;
