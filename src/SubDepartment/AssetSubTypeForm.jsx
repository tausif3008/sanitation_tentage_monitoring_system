import React, { useState } from "react";
import { Form, Input, Button, Select, Divider, message } from "antd";

const { Option } = Select;

const assetTypes = [
  { value: "sanitation", label: "Sanitation" },
  { value: "tentage", label: "Tentage" },
];

const AssetSubTypeForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    // Prepare data for API with default values for questions and status
    const apiData = {
      name: values.assetType, // Assuming 'name' is the asset type (dropdown selection)
      asset_sub_type: values.assetSubType, // Assuming this is for asset sub-type
      description: values.assetTypeDescription || "", // Optional description
      questions: 0, // default value
      status: 1, // default value
    };

    console.log("API Data:", apiData);

    try {
      setLoading(true);

      // Call the API to add the asset sub-type
      const response = await fetch(
        "https://kumbhtsmonitoring.in/php-api/asset-types/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          },
          body: JSON.stringify(apiData),
        }
      );

      console.log("API Response:", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("API Result:", result); // Log the parsed result

      // Check if the API returned success
      if (result.success) {
        message.success("Asset Sub Type added successfully!");
        form.resetFields();
      } else {
        message.error(
          result.message || "Failed to add asset sub type. Please try again."
        );
      }
    } catch (error) {
      console.error("Error adding asset sub type:", error);
      message.error("Failed to add asset sub type. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Asset Sub Type Registration</div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
          {/* Asset Type Dropdown */}
          <Form.Item
            name="assetType"
            label={<div className="font-semibold">Asset Type</div>}
            rules={[{ required: true, message: "Please select an asset type" }]}
          >
            <Select placeholder="Select asset type" className="rounded-none">
              {assetTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Asset Sub Type Textbox */}
          <Form.Item
            name="assetSubType"
            label={<div className="font-semibold">Asset Sub Type</div>}
            rules={[
              { required: true, message: "Please enter an asset sub type" },
            ]}
          >
            <Input
              placeholder="Enter asset sub type"
              className="rounded-none"
            />
          </Form.Item>

          {/* Asset Type Description Textbox */}
          <Form.Item
            name="assetTypeDescription"
            label={<div className="font-semibold">Asset Type Description</div>}
          >
            <Input
              placeholder="Enter asset type description (optional)"
              className="rounded-none"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit rounded-none bg-5c"
              loading={loading} // Show loading spinner during API call
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AssetSubTypeForm;
