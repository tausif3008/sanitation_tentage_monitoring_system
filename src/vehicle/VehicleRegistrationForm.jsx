import React, { useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const VehicleRegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);

    const localVehicleRegistration =
      JSON.parse(localStorage.getItem("vehicleRegistration")) || [];

    localVehicleRegistration.push(JSON.parse(JSON.stringify(values)));

    localStorage.setItem(
      "vehicleRegistration",
      JSON.stringify(localVehicleRegistration)
    );
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between ">
        <div className="font-bold">Vehicle Registration</div>
        <div className="text-xs">All * marks fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            label={<div className="font-semibold">Vehicle Type</div>}
            name="vehicleType"
            rules={[
              { required: true, message: "Please select a vehicle type" },
            ]}
            className="mb-4"
          >
            <Select placeholder="Select vehicle type" className="rounded-none ">
              <Option value="car">Car</Option>
              <Option value="bike">Bike</Option>
              <Option value="truck">Truck</Option>
              <Option value="bus">Bus</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Vehicle Name</div>}
            name="vehicleName"
            rules={[
              { required: true, message: "Please enter the vehicle name" },
            ]}
            className="mb-4"
          >
            <Input placeholder="Enter vehicle name" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Vehicle Number</div>}
            name="vehicleNumber"
            rules={[
              { required: true, message: "Please enter the vehicle number" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter vehicle number"
              className="rounded-none "
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">RC Details</div>}
            name="rcDetails"
            rules={[{ required: true, message: "Please enter RC details" }]}
            className="mb-4"
          >
            <Input.TextArea
              rows={1}
              placeholder="Enter RC details"
              className="rounded-none "
            />
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

export default VehicleRegistrationForm;
