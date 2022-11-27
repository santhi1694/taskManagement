import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout, message, Table, Tag, DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { getTasksWithFilters } from "../backend/api";
import { ACTIVE_COLOR, SORT_DIRECTIONS, SUCCESS } from "../constants/constants";
import useAuth from "../hooks/useAuth";
import { covertTime, getStartStamp, isSameDate } from "../utils/utils";

// customized fitler for Title with input box
const getTitleSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm()}
        style={{
          marginBottom: 8,
          display: "block",
        }}
      />
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? ACTIVE_COLOR : undefined }} />
  ),
  // filter data with text startWith of title of task
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().startsWith(value.toLowerCase()),
});

//customized filter for due date with date and range picker
const getDateSearchprops = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    confirm,
  }) => (
    <div>
      <DatePicker.RangePicker
        allowEmpty={[false, true]}
        onChange={(dates) => {
          setSelectedKeys(dates ? [dates] : []);
          confirm();
        }}
      />
    </div>
  ),
  filterIcon: (filtered) => (
    <CalendarOutlined style={{ color: filtered ? ACTIVE_COLOR : undefined }} />
  ),
  // if start date given return data with same date, if not return data with given range
  onFilter: (value, record) => {
    if (!record.dueDate) {
      return null;
    }
    const dueDate = record.dueDate.valueOf();
    const startDate = value[0]?.valueOf();
    const endDate = value[1]?.valueOf();
    const startStamp = getStartStamp(startDate);
    if (!endDate) {
      return isSameDate(startStamp, dueDate);
    }
    const endRange = getStartStamp(endDate);
    return dueDate <= endRange && dueDate >= startStamp;
  },
});
// customized filter options for status
const getStatusSearchProps = (dataIndex) => ({
  filters: [
    {
      text: "Completed",
      value: true,
    },
    {
      text: "Pending",
      value: false,
    },
  ],
  // filter data which is equal to selected status
  onFilter: (value, record) => record[dataIndex] === value,
  filterMultiple: false,
});

// configuration of columns for report
const columns = [
  {
    title: "Titile",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: SORT_DIRECTIONS,
    ...getTitleSearchProps("title"),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (value) => {
      return <div>{covertTime(value)}</div>;
    },
    sorter: (a, b, order) => {
      return a.dueDate - b.dueDate;
    },
    sortDirections: SORT_DIRECTIONS,
    ...getDateSearchprops("dueDate"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => Number(a.status) - Number(b.status),
    sortDirections: SORT_DIRECTIONS,
    render: (value) => {
      const color = value ? "green" : "red";
      return (
        <div>
          <Tag color={color}>{value ? "Completed" : "Pending"}</Tag>
        </div>
      );
    },
    ...getStatusSearchProps("status"),
  },
];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getReports = async () => {
      if (user.id) {
        const resp = await getTasksWithFilters(user.id);
        message[resp.type](resp.data.message);
        if (resp.type === SUCCESS) {
          setReports(resp.data.data);
        }
      }
    };
    getReports();
  }, []);

  return (
    <Layout className="site-layout">
      <Content className="site-layout-background reports-container card">
        <Table dataSource={reports} columns={columns} rowKey="id" />
      </Content>
    </Layout>
  );
};
export default Reports;
