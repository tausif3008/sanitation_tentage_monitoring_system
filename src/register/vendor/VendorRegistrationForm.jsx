import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";
import optionsMaker from "../../urils/OptionMaker";
import CountryStateCity from "../../commonComponents/CountryStateCity";
import { ListFormContextVendor } from "./ListFormContextVendor";
import { useLocation, useNavigate } from "react-router";

const { TextArea } = Input;

const VendorRegistrationForm = () => {
  const { updateDetails, setUpdateDetails, setUpdated, setIsList } = useContext(
    ListFormContextVendor
  );

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (updateDetails) {
      form.setFieldsValue(updateDetails);
    }

    return () => {
      setUpdateDetails();
      setUpdated(false);
      setIsList(false);
    };
  }, [updateDetails, form, location, setUpdateDetails, setIsList, setUpdated]);

  const onFinish = async (values) => {
    setLoading(true);

    values.status = 1;
    values.user_type_id = 8;

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
        //   setUpdated(true);
        navigate("/vendor");
      }
    }
  };

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
    getData(URLS.vendorUsers.path + 8, {
      "x-api-version": URLS.vendorUsers.version,
    });
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
              navigate("/vendor");
            }}
          >
            <ArrowLeftOutlined />
          </Button>

          <div className="text-d9 text-2xl w-full flex items-end justify-between ">
            <div className="font-bold">
              {updateDetails ? "Update Vendor Details" : "Vendor Registration"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>

        <Divider className="bg-d9 h-2/3 mt-1" />

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
              rules={[{ required: true, message: "Please enter name" }]}
              className="mb-4"
            >
              <Input placeholder="Enter name" className="rounded-none" />
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
              <Input placeholder="Enter email" className="rounded-none" />
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
                className="rounded-none"
              />
            </Form.Item>

            <CountryStateCity
              form={form}
              country_id={updateDetails?.country_id}
              state_id={updateDetails?.state_id}
              city_id={updateDetails?.city_id}
            />

            <Form.Item
              label={<div className="font-semibold">Address</div>}
              name="address"
              className="mb-6"
              rules={[{ required: true, message: "Please enter the address" }]}
            >
              <TextArea rows={1} />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Company</div>}
              name="company"
              rules={[{ required: true, message: "Please enter the company" }]}
              className="mb-4"
            >
              <Input placeholder="Company Name" className="rounded-none" />
            </Form.Item>
            <Form.Item
              label={<div className="font-semibold">Password</div>}
              name="password"
              rules={[
                { required: true, message: "Please enter the password" },
                {
                  min: 7,
                  message: "Password must be at least 6 characters long",
                },
              ]}
              className="mb-4"
            >
              <Input.Password
                placeholder="Enter password"
                className="rounded-none"
              />
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

export default VendorRegistrationForm;
