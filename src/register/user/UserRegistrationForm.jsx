import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import CountryStateCity from "../../commonComponents/CountryStateCity";
import optionsMaker from "../../urils/OptionMaker";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UserRegistrationForm = ({
  setIsUserList,
  updateDetails,
  setUpdateDetails,
  setUpdated,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateDetails) {
      form.setFieldsValue(updateDetails);
    }
  }, [updateDetails, form]);

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
      }
      if (updateDetails) {
        setUpdateDetails(false);
        setUpdated(true);
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
              setIsUserList(false);
              setUpdateDetails(false);
            }}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
          <div className="text-d9 text-2xl  w-full flex items-end justify-between ">
            <div className="font-bold">
              {updateDetails ? "Update User Details" : "User Registration"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>
        <Divider className="bg-d9 h-2/3 mt-1"></Divider>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ company: "KASH IT SOLUTION" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
            <Form.Item
              label={<div className="font-semibold">User Name</div>}
              name="name"
              rules={[{ required: true, message: "Please first name" }]}
              className="mb-4"
            >
              <Input placeholder="Enter name" className="rounded-none " />
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
              name="phone"
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

            <CountryStateCity
              form={form}
              country_id={updateDetails?.country_id}
              state_id={updateDetails?.state_id}
              city_id={updateDetails?.city_id}
            ></CountryStateCity>

            <Form.Item
              label={<div className="font-semibold">Address</div>}
              name="address"
              className="mb-6"
            >
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Company</div>}
              name="company"
              rules={[{ required: true, message: "Please enter the company" }]}
              className="mb-4"
            >
              <Input placeholder="Company Name" className="rounded-none " />
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
              name="user_type_id"
              label={<div className="font-semibold">User Type</div>}
              rules={[{ required: true, message: "Please select User Type" }]}
              className="mb-4"
            >
              <Select
                placeholder="Select a User Type"
                className="rounded-none"
                options={userTypes}
              ></Select>
            </Form.Item>
          </div>

          <div className="flex justify-end">
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="w-fit rounded-none bg-5c"
              >
                {updateDetails ? "Update" : "Register"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
const { TextArea } = Input;
