import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import loginImage from "../assets/Images/loginImage.jpg";
import { useNavigate } from "react-router";
import { DICT } from "../urils/dictionary";
import { loginFetch } from "../Fetch/Axios";
import "./login.css";

const Login = () => {
  const localLang = localStorage.getItem("lang");
  const [lang, setLang] = useState(localLang || "en");
  const [canProceed, setCanProceed] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("platform", "Web");
    formData.append("password", values.password);
    setLoading(true);

    const res = await loginFetch(formData, setCanProceed);
    // localStorage.setItem(res);
    console.log(res);

    if (res) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const sessionToken = localStorage.getItem("sessionToken");
      if (sessionToken) {
        clearInterval(intervalId);
        navigate("/dashboard");
      }
    });
  }, [canProceed, navigate]);

  useEffect(() => {
    form.setFieldsValue({ username: "9017827198", password: "1234" });

    return () => {
      form.resetFields();
    };
  }, [form]);

  return (
    <div className="flex m-auto bg-gray-100">
      <div className="h-screen m-auto flex w-10/12  flex-col justify-center">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full h-96 shadow-xl ">
          <div className="w-full h-96 hidden md:flex">
            <img src={loginImage} alt="" className="w-full h-full" />
          </div>
          <div className="flex h-full flex-col w-full items-center">
            <div className="text-center font-merriweather p-2 font-semibold text-lg flex flex-col items-center w-full m-auto justify-center">
              <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-center">
                <div className="flex flex-col">
                  <div className="text-orange-500">{DICT.title1[lang]}</div>
                  <hr className="mt-1 mb-1 text-yellow-900" />
                  <div className="text-green-800">{DICT.title2[lang]}</div>
                </div>
              </div>
              <div className="w-10/12">
                <Form
                  form={form}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your username!",
                      },
                    ]}
                    style={{ marginTop: "15px" }}
                  >
                    <Input
                      autoComplete="off"
                      prefix={<UserOutlined></UserOutlined>}
                      placeholder="User Name"
                      className="rounded-none"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      autoComplete="off"
                      prefix={<LockOutlined></LockOutlined>}
                      placeholder="Password"
                      className="rounded-none"
                    />
                  </Form.Item>
                  <Form.Item noStyle>
                    <div className="flex justify-end">
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="bg-orange-400 text-white"
                      >
                        Login
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
