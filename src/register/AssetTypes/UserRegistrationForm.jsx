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

const UserRegistrationForm = () => {
  const { updateDetails, setUpdateDetails, setUpdated, setIsList } =
    useContext(AssetContext);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (updateDetails) {
      form.setFieldsValue(updateDetails);
    }
  }, [updateDetails, form, location, setUpdateDetails, setIsList, setUpdated]);

  useEffect(() => {
    return () => {
      setUpdateDetails();
      setUpdated(false);
      setIsList(false);
    };
  }, [location, navigate, setUpdateDetails, setUpdated, setIsList]);

  const onFinish = async (values) => {
    setLoading(true);

    values.status = 1;

    if (updateDetails) {
      values.user_id = updateDetails.user_id;
    }

    const res = await postData(getFormData(values), URLS.register.path, {
      version: URLS.register.version,
    });

    if (res) {
      setLoading(false);
      if (res.data.success) {
        form.resetFields();
        setUpdated(true);
        navigate("/users");
      }
      if (updateDetails) {
        setUpdateDetails(false);
        setUpdated(true);
        navigate("/users");
      }
    }
  };

  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    optionsMaker(
      "userType",
      "user_type",
      "user_type",
      setUserTypes,
      "",
      "user_type_id"
    );

    getData(URLS.userType.path, { "x-api-version": URLS.userType.version });
  }, [form]);

  return (
    <div className="mt-3">
      <div className="mx-auto p-3 bg-white shadow-md rounded-lg mt-3 w-full">
        <div className="flex gap-2 items-center">
          <Button
            className="bg-gray-200 rounded-full w-9 h-9"
            onClick={() => {
              setIsList(false);
              setUpdateDetails(false);
              navigate("/users");
            }}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
          <div className="text-d9 text-2xl  w-full flex items-end justify-between ">
            <div className="font-bold">
              {updateDetails ? "Update Asset Type" : "Add Asset Type"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>
        <Divider className="bg-d9 h-2/3 mt-1"></Divider>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
            {/* Asset Type Dropdown */}
            <Form.Item
              name="assetMainType"
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
              name="assetType"
              label={<div className="font-semibold">Asset Type</div>}
              rules={[
                { required: true, message: "Please enter an asset type" },
              ]}
            >
              <Input placeholder="Enter asset type" className="rounded-none" />
            </Form.Item>

            {/* Asset Type Description Textbox */}
            <Form.Item
              name="assetTypeDescription"
              label={
                <div className="font-semibold">Asset Type Description</div>
              }
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
    </div>
  );
};

export default UserRegistrationForm;
