import React, { useState } from "react";
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

const AssetRegistrationForm = () => {
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
    values.photo = previewImage;

    const localAssetRegistration =
      JSON.parse(localStorage.getItem("assetRegistration")) || [];

    localAssetRegistration.push(JSON.parse(JSON.stringify(values)));

    localStorage.setItem(
      "assetRegistration",
      JSON.stringify(localAssetRegistration)
    );
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl  flex items-end justify-between ">
        <div className="font-bold">Asset Registration</div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ unit: "Option 1", assetsGroup: "Option 1", vendor: "Option 1" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            label={<div className="font-semibold">Assets Name</div>}
            name="assetsName"
            rules={[{ required: true, message: "Please enter Assets Name" }]}
            className="mb-4"
          >
            <Input placeholder="Enter Assets Name" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Assets Code</div>}
            name="assetsCode"
            rules={[{ required: true, message: "Please enter Assets Code" }]}
            className="mb-4"
          >
            <Input placeholder="Enter Assets Code" className="rounded-none " />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Assets Description</div>}
            name="assetsDescription"
            className="mb-4"
          >
            <TextArea rows={1} placeholder="Enter Assets Description" />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Unit</div>}
            name="unit"
            rules={[{ required: true, message: "Please select a unit" }]}
            className="mb-4"
          >
            <Select placeholder="Select Unit" className="rounded-none ">
              <Option value="Option 1">Option 1</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Assets Group</div>}
            name="assetsGroup"
            rules={[{ required: true, message: "Please select an Assets Group" }]}
            className="mb-4"
          >
            <Select placeholder="Select Assets Group" className="rounded-none ">
              <Option value="Option 1">Option 1</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Vendor</div>}
            name="vendor"
            rules={[{ required: true, message: "Please select a Vendor" }]}
            className="mb-4"
          >
            <Select placeholder="Select Vendor" className="rounded-none ">
              <Option value="Option 1">Option 1</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">QR Code put on the Assets</div>}
            name="qrCode"
            className="mb-4"
          >
            <Input placeholder="Enter QR Code" className="rounded-none " />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Photo of Assets (Geo Tagged)"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Geo Location of Assets: Latitude</div>}
            name="latitude"
            rules={[{ required: true, message: "Please enter Latitude" }]}
            className="mb-4"
          >
            <InputNumber
              placeholder="Enter Latitude"
              className="rounded-none w-full"
            />
          </Form.Item>
          <Form.Item
            label={<div className="font-semibold">Longitude</div>}
            name="longitude"
            rules={[{ required: true, message: "Please enter Longitude" }]}
            className="mb-4"
          >
            <InputNumber
              placeholder="Enter Longitude"
              className="rounded-none w-full"
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

export default AssetRegistrationForm;
const { TextArea } = Input;
