import { Layout, Table, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { covertTime } from "../utils/utils";
const columns = [
    {
      title: "Titile",
      dataIndex: "title",
      key: "title",
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
      dataIndex: "id",
      key: "id",
      render: (value) => {
        const color = value ? 'green': 'amber'
        return (
          <div>
            <Tag color={color}>
            {value ? 'Completed' : 'Pending'}
            </Tag>
          </div>
        );
      },
    },
  ];

const Reports = () => {
    return (
        <Layout className="site-layout">
        <Content className="site-layout-background reports-container">
          <Table dataSource={[]} columns={columns}/>          
        </Content>
      </Layout>
    )
}
export default Reports