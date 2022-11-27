import { Input, Layout, message, Table, Tag, DatePicker, Switch } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useCallback, useEffect, useState } from "react";
import { getTasksWithFilters } from "../backend/api";
import { SUCCESS } from "../constants/constants";
import useAuth from "../hooks/useAuth";
import { covertTime } from "../utils/utils";

const getTitleSearchProps = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
  }) => (
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
  filterIcon: (filtered) => <div>search Icon</div>,
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
});

const getDateSearchprops = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <div>
      <DatePicker.RangePicker
        allowEmpty={[false, true]}
        onChange={(dates) => {
          console.log(dates, "Dates");
          setSelectedKeys(dates ? [dates] : []);
          confirm();
        }}
      />
    </div>
  ),
  filterIcon: (filtered) => <div>date Icon</div>,
  onFilter: (value, record) => {
    const startDate = value[0]?.valueOf();
    const endDate = value[1]?.valueOf();
    if (!endDate) return value === startDate;
    return value <= endDate && value >= startDate;
  },
});

const getStatusSearchProps = (dataIndex) => ({
    filters: [
        {
          text: 'Completed',
          value: true,
        },
        {
          text: 'Pending',
          value: false,
        },
      ],
      onFilter: (value, record) => record[dataIndex] === value,
      filterMultiple: false
});

const columns = [
  {
    title: "Titile",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend", "ascend"],
    ...getTitleSearchProps("title"),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (value) => {
      return <div>{covertTime(value)}</div>;
    },
    sorter: true,
    sortDirections: ["descend", "ascend"],
    ...getDateSearchprops("dueDate"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a,b) =>  Number(a.status) - Number(b.status),
    sortDirections: ["descend", "ascend", "descend"],
    render: (value) => {
      const color = value ? "green" : "red";
      return (
        <div>
          <Tag color={color}>{value ? "Completed" : "Pending"}</Tag>
        </div>
      );
    },
    ...getStatusSearchProps('status')
  },
];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({});
  const { user } = useAuth();

  const getReports = useCallback(async () => {
    const resp = await getTasksWithFilters(user.id, filters);
    console.log("res", resp);
    message[resp.type](resp.data.message);
    if (resp.type === SUCCESS) {
      setReports(resp.data.data);
    }
  }, [filters, user.id]);

  useEffect(() => {
    getReports();
  }, [filters, getReports]);

  return (
    <Layout className="site-layout">
      <Content className="site-layout-background reports-container">
        <Table dataSource={reports} columns={columns} />
      </Content>
    </Layout>
  );
};
export default Reports;
