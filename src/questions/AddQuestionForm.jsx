import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";

const { Option } = Select;
const BASE_URL = "https://kumbhtsmonitoring.in/php-api/";

const AddQuestionForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // Set default values for action, sla, and status
    values.action = 1;
    values.sla = 1;
    values.status = 1;

    console.log("Form Values:", values);

    try {
      const response = await fetch(`${BASE_URL}questions/entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YunHu873jHds83hRujGJKd873",
          "x-api-version": "1.0.1",
          "x-platform": "Web",
          "x-access-token": localStorage.getItem("sessionToken") || "",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.success) {
        message.success("Question added successfully");
        form.resetFields();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error adding question:", error);
      message.error("Failed to add question");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Add Question</div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Question (English)"
          name="question_en"
          rules={[
            { required: true, message: "Please enter the question in English" },
          ]}
        >
          <Input
            placeholder="Enter question in English"
            className="rounded-none"
          />
        </Form.Item>

        <Form.Item
          label="Question (Hindi)"
          name="question_hi"
          rules={[
            { required: true, message: "Please enter the question in Hindi" },
          ]}
        >
          <Input
            placeholder="Enter question in Hindi"
            className="rounded-none"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter description"
            className="rounded-none"
          />
        </Form.Item>

        <Form.Item
          label="Is Image"
          name="is_image"
          rules={[{ required: true, message: "Please select an option" }]}
        >
          <Select
            placeholder="Select if image is required"
            className="rounded-none"
          >
            <Option value={0}>No</Option>
            <Option value={1}>Yes</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-fit rounded-none bg-5c"
          >
            Add Question
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddQuestionForm;
