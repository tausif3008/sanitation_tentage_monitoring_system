import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import loginImage from "../assets/Images/loginImage.jpg";
import { useNavigate } from "react-router";
import { DICT } from "../urils/dictionary";

const Login = () => {
  const localLang = localStorage.getItem("lang");
  const [lang, setLang] = useState(localLang || "en");

  const [form] = Form.useForm();
  form.setFieldsValue({ username: "Ramesh", password: "1234" });

  localStorage.setItem(
    "userCredentials",
    JSON.stringify({ username: "Ramesh", password: "1234" })
  );

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values, localStorage.getItem("userCredentials"));
    if (localStorage.getItem("userCredentials") === JSON.stringify(values)) {
      localStorage.setItem("loggedIn", true);
      message.success("Login Successful.");
      setTimeout(() => {
        navigate("/welcome-to-lost-and-found-2025");
      }, 1000);
    } else {
      message.success("Something went wrong.");
    }
  };

  return (
    <div className="flex m-auto bg-gray-100">
      <div className="h-screen m-auto flex w-10/12  flex-col justify-center">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full h-96 shadow-xl ">
          <div className="w-full h-96 hidden md:flex">
            <img src={loginImage} alt="" className="w-full h-full" />
          </div>
          <div className="flex h-full flex-col w-full items-center justify-center">
            <div className="text-center font-merriweather p-2 font-semibold text-lg flex flex-col items-center w-full m-auto justify-center">
              <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-center">
                <div className="flex flex-col">
                  <div className="text-orange-500">{DICT.title1[lang]}</div>
                  <hr className="mt-1 mb-1 text-yellow-900" />
                  <div className="text-green-800">{DICT.title2[lang]}</div>
                </div>
              </div>
              <div className="w-10/12 m-auto">
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
                      className="eems-ant-input-border"
                      prefix={<UserOutlined></UserOutlined>}
                      placeholder="User Name"
                      size="large"
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
                      className="eems-ant-input-border"
                      prefix={<LockOutlined></LockOutlined>}
                      placeholder="Password"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item noStyle>
                    <div className="flex justify-end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-orange-400 text-white "
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
