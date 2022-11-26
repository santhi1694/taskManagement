import { Button, DatePicker, Form, Input } from "antd";
import React from "react";
const AddTask = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddTask;
