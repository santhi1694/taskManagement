import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { places } from "../constants/constants";
import useAuth from "../hooks/useAuth";
const { HOME, REPORTS } = places;
const items = [
  {
    key: "home",
    label: <NavLink to={HOME}>Home Page</NavLink>,
  },
  {
    key: "reports",
    label: <NavLink to={REPORTS}>Business Reports</NavLink>,
  },
];
const AppHeader = () => {
  const { logout } = useAuth();

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className="app-header">
      <Space>
        <Dropdown
          menu={{
            items: [
              ...items,
              { key: "logout", label: <div onClick={onLogout}>Log out</div> },
            ],
          }}
        >
          <MenuOutlined className="menu-icon" />
        </Dropdown>
        <h1> Task Management </h1>
      </Space>
    </div>
  );
};
export default AppHeader;
