import { Checkbox, Table } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { getTasks, updateTaskStatus } from "../backend/api";
import useAuth from "../hooks/useAuth";
import { covertTime } from "../utils/utils";

//Todo : date conversion
const columns = [
  {
    title: "Serial Number",
    dataIndex: "title",
    key: "serialNum",
    render: (_val, _row, index) => <div>{`(${index + 1})`}</div>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "age",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (value) => {
      return <div>{covertTime(value)}</div>;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value, record) => {
      return (
        <Checkbox
          onChange={(event) =>
            updateTaskStatus(record.id, event.target.checked)
          }
          checked={value}
        />
      );
    },
  },
];
const TaskList = () => {
  const { user } = useAuth();
  const allTasks = useLiveQuery(() => getTasks(user.id));
  console.log("alltasks", allTasks);
  return (
    <div className="site-layout-background task-list-container card">
      <Table dataSource={allTasks} columns={columns} rowKey="id" />
    </div>
  );
};
export default TaskList;
