import React, { useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const VendorRegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);

    const localVendorRegistration =
      JSON.parse(localStorage.getItem("vendorRegistration")) || [];

    localVendorRegistration.push(JSON.parse(JSON.stringify(values)));

    localStorage.setItem(
      "vendorRegistration",
      JSON.stringify(localVendorRegistration)
    );
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl  flex items-end justify-between ">
        <div className="font-bold">Vendor Registration</div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            label={<div className="font-semibold">Vendor Name</div>}
            name="vendorName"
            rules={[{ required: true, message: "Please enter vendor name" }]}
            className="mb-4"
          >
            <Input placeholder="Enter vendor name" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Department</div>}
            name="department"
            rules={[{ required: true, message: "Please enter department" }]}
            className="mb-4"
          >
            <Input placeholder="Enter department" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Sub Department</div>}
            name="subDepartment"
            rules={[{ required: true, message: "Please enter sub department" }]}
            className="mb-4"
          >
            <Input
              placeholder="Enter sub department"
              className="rounded-none "
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Contact Number</div>}
            name="contactNumber"
            rules={[
              { required: true, message: "Please enter the contact number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit contact number",
              },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter contact number"
              className="rounded-none "
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Email ID</div>}
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            className="mb-4"
          >
            <Input placeholder="Enter email" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Address</div>}
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
            className="mb-6"
          >
            <TextArea rows={1} placeholder="Enter address" />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit rounded-none bg-5c"
            >
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default VendorRegistrationForm;
