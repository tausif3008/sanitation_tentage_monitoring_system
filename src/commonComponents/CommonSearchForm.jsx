import React from "react";
import { Collapse, Form, Input, Button } from "antd";

const { Panel } = Collapse;

const CommonSearchForm = () => {
  const [form] = Form.useForm();

  const onFinishForm = (values) => {
    console.log("Form 1 values:", values);
  };

  const onFinishForm2 = (values) => {
    console.log("Form 2 values:", values);
  };

  return (
    <Collapse accordion>
      <Form form={form} name="form" layout="vertical" onFinish={onFinishForm}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Form 1
          </Button>
        </Form.Item>
      </Form>
    </Collapse>
  );
};

export default CommonSearchForm;
