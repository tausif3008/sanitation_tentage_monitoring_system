import React from "react";
import { Form, Input, Button, Select, Divider, DatePicker } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

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
      <div className="text-d9 text-2xl flex items-end justify-between">
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
            <Input.TextArea rows={1} placeholder="Enter address" />
          </Form.Item>
        </div>

        <Form.List name="vendorDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 mb-3"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "department"]}
                    fieldKey={[fieldKey, "department"]}
                    label={<div className="font-semibold">Department</div>}
                    rules={[
                      { required: true, message: "Please select a department" },
                    ]}
                  >
                    <Select
                      placeholder="Select department"
                      className="rounded-none"
                    >
                      <Option value="sanitation">Sanitation</Option>
                      <Option value="tentage">Tentage</Option>
                      {/* Add more options as required */}
                    </Select>
                  </Form.Item>

                  {/* Change Sub Department to Department Type */}
                  <Form.Item
                    {...restField}
                    name={[name, "departmentType"]}
                    fieldKey={[fieldKey, "departmentType"]}
                    label={<div className="font-semibold">Department Type</div>}
                    rules={[
                      {
                        required: true,
                        message: "Please select department type",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select department type"
                      className="rounded-none"
                    >
                      <Option value="operational">Operational</Option>
                      <Option value="administrative">Administrative</Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "workOrderNumber"]}
                    fieldKey={[fieldKey, "workOrderNumber"]}
                    label={
                      <div className="font-semibold">Work Order Number</div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter work order number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter work order number"
                      className="rounded-none"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "dateOfAllocation"]}
                    fieldKey={[fieldKey, "dateOfAllocation"]}
                    label={
                      <div className="font-semibold">Date of Allocation</div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select date of allocation",
                      },
                    ]}
                  >
                    <DatePicker className="w-full rounded-none" />
                  </Form.Item>

                  {/* Add Total Allotted Quantity */}
                  <Form.Item
                    {...restField}
                    name={[name, "totalAllottedQuantity"]}
                    fieldKey={[fieldKey, "totalAllottedQuantity"]}
                    label={
                      <div className="font-semibold">
                        Total Allotted Quantity
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter allotted quantity",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Please enter a valid number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter total allotted quantity"
                      className="rounded-none"
                    />
                  </Form.Item>

                  {/* Add Proposed Location/Sectors for Deployment */}
                  <Form.Item
                    {...restField}
                    name={[name, "proposedLocationSectors"]}
                    fieldKey={[fieldKey, "proposedLocationSectors"]}
                    label={
                      <div className="font-semibold">
                        Proposed Location/Sectors for Deployment
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter proposed location/sectors",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={1}
                      placeholder="Enter proposed location/sectors"
                      className="rounded-none"
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    className="text-red-500 cursor-pointer mt-8"
                  />
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Department Details
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
