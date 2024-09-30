import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import CountryStateCity from "../../commonComponents/CountryStateCity";
import optionsMaker from "../../urils/OptionMaker";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { AssetContext } from "./AssetContext";

const AssetTypeForm = () => {
  const { setIsListUpdateDetails, isListUpdateDetails } =
    useContext(AssetContext);

  const { Option } = Select;

  const assetMainTypes = [
    { value: "Sanitation", label: "Sanitation" },
    { value: "Tentage", label: "Tentage" },
  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isListUpdateDetails.updateDetails) {
      form.setFieldsValue(isListUpdateDetails.updateDetails);
    }
  }, [
    form,
    location,
    isListUpdateDetails.updateDetails,
    isListUpdateDetails.isList,
    isListUpdateDetails.updated,
  ]);

  useEffect(() => {
    return () => {
      setIsListUpdateDetails((prev) => {
        return { ...prev, updateDetails: false, isList: false, updated: false };
      });
    };
  }, [location, navigate, setIsListUpdateDetails]);

  const onFinish = async (values) => {
    setLoading(true);

    values.status = 1;
    values.questions = 0;

    if (isListUpdateDetails.updateDetails) {
      values.asset_type_id = isListUpdateDetails.updateDetails.asset_type_id;
      values.questions = isListUpdateDetails.updateDetails.questions;
    }

    const res = await postData(getFormData(values), URLS.assetTypeEntry.path, {
      version: URLS.register.version,
    });

    if (res) {
      setLoading(false);

      if (res.data.success) {
        form.resetFields();
        setIsListUpdateDetails((prev) => {
          return { ...prev, updated: true };
        });
        navigate("/asset-type-list");
      }

      if (isListUpdateDetails.updateDetails) {
        setIsListUpdateDetails((prev) => {
          return {
            ...prev,
            updateDetails: false,
            updated: true,
          };
        });

        navigate("/asset-type-list");
      }
    }
  };

  return (
    <div className="mt-3">
      <div className="mx-auto p-3 bg-white shadow-md rounded-lg mt-3 w-full">
        <div className="flex gap-2 items-center">
          <Button
            className="bg-gray-200 rounded-full w-9 h-9"
            onClick={() => {
              setIsListUpdateDetails((prev) => {
                return {
                  ...prev,
                  updateDetails: false,
                  isList: false,
                };
              });
              navigate("/asset-type-list");
            }}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
          <div className="text-d9 text-2xl  w-full flex items-end justify-between ">
            <div className="font-bold">
              {isListUpdateDetails.updateDetails
                ? "Update Asset Type"
                : "Add Asset Type"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>
        <Divider className="bg-d9 h-2/3 mt-1"></Divider>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
            {/* Asset Type Dropdown */}
            <Form.Item
              name="asset_main_type"
              label={<div className="font-semibold">Asset Main Type</div>}
              rules={[
                { required: true, message: "Please select an asset main type" },
              ]}
            >
              <Select
                placeholder="Select asset main type"
                className="rounded-none"
              >
                {assetMainTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Asset Sub Type Textbox */}
            <Form.Item
              name="name"
              label={<div className="font-semibold">Asset Type Name</div>}
              rules={[
                { required: true, message: "Please enter an asset type" },
              ]}
            >
              <Input
                placeholder="Enter asset type name"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <div className="font-semibold">Asset Type Description</div>
              }
            >
              <Input
                placeholder="Asset type description"
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
                {isListUpdateDetails.updateDetails ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AssetTypeForm;
