import React from "react";
import { Form, Input, Button, Select, Divider, message } from "antd";

const { Option } = Select;

const departments = [
  { value: "sanitation", label: "Sanitation" },
  { value: "tentage", label: "Tentage" },
];

const SubDepartmentForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    // Prepare data for API
    const apiData = {
      name: values.subDepartmentName,
      description: values.subDepartmentDescription,
      questions: 0, // default value
      status: 1, // default value
    };

    try {
      // Call the API to add the asset type
      const response = await fetch(
        "https://kumbhtsmonitoring.in/php-api/asset-types/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Show success message
      message.success("Sub Department added successfully!");

      // Store in localStorage
      const localSubDepartmentRegistration =
        JSON.parse(localStorage.getItem("subDepartmentRegistration")) || [];

      localSubDepartmentRegistration.push(values);

      localStorage.setItem(
        "subDepartmentRegistration",
        JSON.stringify(localSubDepartmentRegistration)
      );

      // Reset the form
      form.resetFields();
    } catch (error) {
      console.error("Error adding sub department:", error);
      message.error("Failed to add sub department. Please try again.");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Sub Department Registration</div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
          {/* Department Selection */}
          <Form.Item
            name="department"
            label={<div className="font-semibold">Department</div>}
            rules={[{ required: true, message: "Please select a department" }]}
          >
            <Select placeholder="Select department" className="rounded-none">
              {departments.map((dept) => (
                <Option key={dept.value} value={dept.value}>
                  {dept.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Sub Department Name */}
          <Form.Item
            name="subDepartmentName"
            label={<div className="font-semibold">Sub Department Name</div>}
            rules={[
              { required: true, message: "Please enter a sub department name" },
            ]}
          >
            <Input
              placeholder="Enter sub department name"
              className="rounded-none"
            />
          </Form.Item>

          {/* Sub Department Description */}
          <Form.Item
            name="subDepartmentDescription"
            label={
              <div className="font-semibold">Sub Department Description</div>
            }
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input placeholder="Enter description" className="rounded-none" />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit rounded-none bg-5c"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SubDepartmentForm;
