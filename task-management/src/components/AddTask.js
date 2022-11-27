import { Button, DatePicker, Form, Input, message } from "antd";
import React from "react";
import { addTask } from "../backend/api";
import useAuth from "../hooks/useAuth";
//Todo: styling and need to diable date before current date
const AddTask = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const onFinish = (values) => {
    const { title, dueDate} = values
    console.log("Success:", values)
    const data = { title, dueDate: dueDate?.valueOf(), userId:user.id };
    addTask(data)
      .then((res) => {
        message[res.type](res.data.message);
        form.resetFields()
      })
      .catch(() => {
        message.error("Oops! something went wrong");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="add-task-container site-layout-background">
      <Form
        name="addTask"
        form={form}
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please add Title of your task!",
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate">
          <DatePicker  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddTask;
