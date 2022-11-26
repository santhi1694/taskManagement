import React from 'react';
import { Button,  Form, Input, message } from 'antd';
import useAuth from '../hooks/useAuth';
import { ERROR } from '../constants/constants';

const Login = () => {
  const { login, } = useAuth();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    login(values).then(response => {
      if(response.type === ERROR) {
        form.resetFields(['password'])
      }
    }).catch(() => {
      message.error('Something went wrong!')
    })
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login-container'>
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 6,
      }}
      className="login-form"
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
            message: 'Please input your username!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;