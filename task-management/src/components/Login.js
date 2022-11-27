import React from "react";
import { Button, Form, Input, message } from "antd";
import useAuth from "../hooks/useAuth";
import { ERROR } from "../constants/constants";
import { UserOutlined } from "@ant-design/icons";

const Login = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    login(values)
      .then((response) => {
        if (response.type === ERROR) {
          form.resetFields(["password"]);
        }
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Something went wrong!");
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="login-header">
            <UserOutlined />
            Login
          </h1>
          <Form
            name="basic"
            form={form}
            className="mt-3"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-btn"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
