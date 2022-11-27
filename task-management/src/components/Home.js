import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import AddTask from "./AddTask";
import AppHeader from "./AppHeader";
import TaskList from "./TaskList";
// layout added for home page with header and contents
const Home = () => {
  return (
    <Layout className="site-layout">
      <Header>
        <AppHeader />
      </Header>
      <Layout>
        <Content>
          <TaskList />
          <AddTask />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
