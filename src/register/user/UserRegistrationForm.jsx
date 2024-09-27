import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import CountryStateCity from "../../commonComponents/CountryStateCity";
import optionsMaker from "../../urils/OptionMaker";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";

const UserRegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [selectedVillageId, setSelectedVillageId] = useState();

  const onFinish = async (values) => {
    setLoading(true);
    if (values.city_id) {
      values.city_id = JSON.parse(values.city_id).city_id;
    }

    if (values.country_id) {
      values.country_id = JSON.parse(values.country_id).country_id;
    }

    if (values.state_id) {
      values.state_id = JSON.parse(values.state_id).state_id;
    }
    values.status = 1;

    const res = await postData(getFormData(values), URLS.register.path, {
      version: URLS.register.version,
    });

    if (res) {
      setLoading(false);
      if (res.data.success) {
        form.resetFields();
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
      false,
      "user_type_id"
    );

    getData(URLS.userType.path, { "x-api-version": URLS.userType.version });

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
            setSelectedVillageId={setSelectedVillageId}
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
            label={<div className="font-semibold">Role</div>}
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
