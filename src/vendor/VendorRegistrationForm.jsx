import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const BASE_URL = "https://kumbhtsmonitoring.in/php-api/";

const VendorRegistrationForm = () => {
  const [form] = Form.useForm();
  const [assetTypes, setAssetTypes] = useState([]);
  const [filteredAssetTypes, setFilteredAssetTypes] = useState([]);

  useEffect(() => {
    // Fetch asset types from the API
    const fetchAssetTypes = async () => {
      try {
        const response = await fetch(`${BASE_URL}asset-types`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          },
        });
        const data = await response.json();

        if (data.success) {
          setAssetTypes(data.data.assettypes);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching asset types:", error);
        message.error("Failed to fetch asset types");
      }
    };

    fetchAssetTypes();
  }, []);

  const handleMainTypeChange = (value, fieldKey) => {
    // Filter asset types based on the selected main type
    const filtered = assetTypes.filter(
      (asset) => asset.asset_main_type === value
    );
    setFilteredAssetTypes(filtered);

    // Clear the asset type dropdown when main type changes
    form.setFieldsValue({
      vendorDetails: {
        [fieldKey]: { assetType: null },
      },
    });
  };

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    try {
      const response = await fetch(`${BASE_URL}users/entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YunHu873jHds83hRujGJKd873",
          "x-api-version": "1.0.1",
          "x-platform": "Web",
          "x-access-token": localStorage.getItem("sessionToken") || "",
        },
        body: JSON.stringify({
          ...values,
          user_type_id: 8, // Set user_type_id for vendor registration
        }),
      });

      const data = await response.json();

      if (data.success) {
        message.success("Vendor registered successfully!");
        form.resetFields();
      } else {
        message.error(data.message || "Vendor registration failed");
      }
    } catch (error) {
      console.error("Error registering vendor:", error);
      message.error("Failed to register vendor");
    }
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
            rules={[{ required: false, message: "Please enter address" }]}
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
                    name={[name, "assetMainType"]}
                    fieldKey={[fieldKey, "assetMainType"]}
                    label={<div className="font-semibold">Asset Main Type</div>}
                    rules={[
                      {
                        required: true,
                        message: "Please select an asset main type",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Asset Main Type"
                      className="rounded-none"
                      onChange={(value) =>
                        handleMainTypeChange(value, fieldKey)
                      }
                    >
                      <Option value="Sanitation">Sanitation</Option>
                      <Option value="Tentage">Tentage</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "assetType"]}
                    fieldKey={[fieldKey, "assetType"]}
                    label={<div className="font-semibold">Asset Type</div>}
                    rules={[
                      {
                        required: true,
                        message: "Please select an asset type",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select an asset type"
                      className="rounded-none"
                    >
                      {filteredAssetTypes.map((type) => (
                        <Option key={type.asset_type_id} value={type.name}>
                          {type.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "contractNumber"]}
                    fieldKey={[fieldKey, "contractNumber"]}
                    label={<div className="font-semibold">Contract Number</div>}
                    rules={[
                      {
                        required: true,
                        message: "Please select a contract number",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select contract number"
                      className="rounded-none"
                    >
                      <Option value="CN001">CN001</Option>
                      <Option value="CN002">CN002</Option>
                      <Option value="CN003">CN003</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "managerContact1"]}
                    fieldKey={[fieldKey, "managerContact1"]}
                    label={
                      <div className="font-semibold">Manager Contact 1</div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter manager contact number 1",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit contact number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter manager contact number 1"
                      className="rounded-none"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "managerContact2"]}
                    fieldKey={[fieldKey, "managerContact2"]}
                    label={
                      <div className="font-semibold">Manager Contact 2</div>
                    }
                    rules={[
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit contact number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter manager contact number 2 (optional)"
                      className="rounded-none"
                    />
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
                    label={<div className="font-semibold">Allocation Date</div>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the date of allocation",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Select allocation date"
                      className="w-full rounded-none"
                    />
                  </Form.Item>

                  <Form.Item label=" ">
                    <Button
                      danger
                      type="dashed"
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                      className="w-full"
                    >
                      Remove Vendor Details
                    </Button>
                  </Form.Item>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Vendor Details
              </Button>
            </>
          )}
        </Form.List>

        <Divider className="bg-d9 h-2/3 mt-1"></Divider>
        <Form.Item className="mt-2">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-d9 text-white rounded-none"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VendorRegistrationForm;
