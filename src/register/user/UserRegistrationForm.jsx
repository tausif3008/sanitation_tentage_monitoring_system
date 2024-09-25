import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UserRegistrationForm = () => {
  const [form] = Form.useForm();

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = ({ fileList }) => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        setPreviewImage(base64String); // Use the base64 string for preview
      };
    } else {
      setPreviewImage(null);
    }
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
    values.image = previewImage;

    const localUserRegistration =
      JSON.parse(localStorage.getItem("userRegistration")) || [];

    localUserRegistration.push(JSON.parse(JSON.stringify(values)));

    localStorage.setItem(
      "userRegistration",
      JSON.stringify(localUserRegistration)
    );
  };

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl  flex items-end justify-between ">
        <div className="font-bold">User Registration</div>
        <div className="text-xs">All * marks fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ companyName: "KASH IT SOLUTION" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            label={<div className="font-semibold">First Name</div>}
            name="name"
            rules={[{ required: true, message: "Please first name" }]}
            className="mb-4"
          >
            <Input placeholder="Enter name" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">First Name</div>}
            name="name"
            rules={[{ required: true, message: "Please last name" }]}
            className="mb-4"
          >
            <Input placeholder="Last name" className="rounded-none " />
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
            label={<div className="font-semibold">Age</div>}
            name="age"
            rules={[{ required: true, message: "Please enter the age" }]}
            className="mb-4"
          >
            <InputNumber
              placeholder="Enter age"
              className="rounded-none w-full"
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Gender</div>}
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
            className="mb-4"
          >
            <Select placeholder="Select Gender" className="rounded-none ">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>{" "}
          <Form.Item
            label={<div className="font-semibold">Address</div>}
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
            className="mb-6"
          >
            <TextArea rows={1} />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Username</div>}
            name="username"
            rules={[{ required: true, message: "Please enter the username" }]}
            className="mb-4"
          >
            <Input placeholder="Enter Username" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Password</div>}
            name="password"
            rules={[
              { required: true, message: "Please enter the password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
            className="mb-4"
          >
            <Input.Password
              placeholder="Enter password"
              className="rounded-none "
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Role</div>}
            name="assignRole"
            rules={[{ required: true, message: "Please select a role" }]}
            className="mb-4"
          >
            <Select placeholder="Select a role" className="rounded-none ">
              <Option value="admin">Admin</Option>
              <Option value="mis">MIS Officer</Option>
              <Option value="vendor">Vendor</Option>
              <Option value="supervisor">Supervisor</Option>
              <Option value="driver">Driver</Option>
              <Option value="monitoring_agent">Monitoring Agent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Assign Center</div>}
            name="assignCenter"
            rules={[{ required: true, message: "Please select a center" }]}
            className="mb-6"
          >
            <Select placeholder="Select a center" className="rounded-none ">
              <Option value="center1">Center 1</Option>
              <Option value="center2">Center 2</Option>
              <Option value="center3">Center 3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              //   listType="picture-card"
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>

            {/* {previewImage && (
              <Form.Item label="Image Preview">
                <Image
                  src={previewImage}
                  alt="Uploaded Image"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )} */}
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

export default UserRegistrationForm;
const { TextArea } = Input;
