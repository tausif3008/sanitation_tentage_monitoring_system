import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import CountryStateCity from "../../commonComponents/CountryStateCity";
import optionsMaker from "../../urils/OptionMaker";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { QuestionContext } from "./QuestionContext";

const UserRegistrationForm = () => {
  const { updateDetails, setUpdateDetails, setUpdated, setIsList } =
    useContext(QuestionContext);

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
      values.question_id = updateDetails.question_id;
    }

    const res = await postData(getFormData(values), URLS.questionsEntry.path, {
      version: URLS.register.version,
    });

    if (res) {
      setLoading(false);
      if (res.data.success) {
        form.resetFields();
        setUpdated(true);
        navigate("/questions");
      }
      if (updateDetails) {
        setUpdateDetails(false);
        setUpdated(true);
        navigate("/questions");
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
              navigate("/questions");
            }}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
          <div className="text-d9 text-2xl  w-full flex items-end justify-between ">
            <div className="font-bold">
              {updateDetails ? "Update Question" : "Add Question"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>
        <Divider className="bg-d9 h-2/3 mt-1"></Divider>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Question (English)"
            name="question_en"
            rules={[
              {
                required: true,
                message: "Please enter the question in English",
              },
            ]}
          >
            <Input
              placeholder="Enter question in English"
              className="rounded-none"
            />
          </Form.Item>
          <Form.Item label="Question (Hindi)" name="question_hi">
            <Input
              placeholder="Enter question in Hindi"
              className="rounded-none"
            />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Form.Item
              label="Is Image"
              name="is_image"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                placeholder="Select if image is required"
                className="rounded-none"
              >
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Action"
              name="action"
              className="rounded-none"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select Action" className="rounded-none">
                <Option value={1}>Mail</Option>
                <Option value={2}>WhatsApp</Option>
                <Option value={3}> Mail & SMS</Option>
                <Option value={4}>WhatsApp</Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="rounded-none"
              label="SLA"
              name="sla"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select SLA" className="rounded-none">
                <Option value={1}>1 Hrs</Option>
                <Option value={2}>2 Hrs</Option>
                <Option value={3}> 3 Hrs</Option>
                <Option value={4}>4 Hrs</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter description"
              className="rounded-none"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex w-full justify-end">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="w-fit rounded-none bg-5c"
              >
                {updateDetails ? "Edit Question" : "Add Question"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
const { Option } = Select;
