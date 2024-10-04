import React from "react";
import { Collapse, Form, Input, Button, Select, notification } from "antd";
import search from "../assets/Dashboard/icon-search.png";
import { generateSearchQuery } from "../urils/getSearchQuery";
const CommonSearchForm = ({
  fields,
  dropFields,
  searchQuery,
  setSearchQuery,
}) => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification({ top: 100 });
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Note",
      duration: 7,
      description: "Please enter some information to perform the search.",
    });
  };

  const onFinishForm = (values) => {
    const searchParams = generateSearchQuery(values);
    if (searchParams === "&") {
      openNotificationWithIcon("info");
    }
    setSearchQuery(searchParams);
  };

  return (
    <div>
      <Collapse
        defaultActiveKey={["1"]}
        size="small"
        className="rounded-none mt-3"
        collapsible={true}
        items={[
          {
            key: 1,
            label: (
              <div className="flex items-center h-full ">
                <img src={search} className="h-5" alt="" />
              </div>
            ),
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinishForm}
                key="1"
              >
                <div className="grid flex-wrap gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-center ">
                  {dropFields &&
                    dropFields.map((el) => {
                      return (
                        <Form.Item
                          name={el.name}
                          label={el.label}
                          layout="vertical"
                        >
                          <Select
                            placeholder="Select Main Type"
                            className="rounded-none"
                          >
                            {el.options.map((opt) => (
                              <Option key={opt.value} value={opt.name}>
                                {opt.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      );
                    })}
                  {fields &&
                    fields.map((el) => {
                      return (
                        <Form.Item
                          name={el.name}
                          label={el.label}
                          layout="vertical"
                          className=""
                        >
                          <Input
                            placeholder={el.label}
                            className="rounded-none w-full"
                          />
                        </Form.Item>
                      );
                    })}
                </div>
                <div className="flex w-full justify-end gap-2 ">
                  <Form.Item noStyle>
                    <Button
                      type="primary"
                      className="rounded-none bg-5c"
                      onClick={() => {
                        form.resetFields();
                        setSearchQuery("&");
                      }}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="rounded-none bg-green-300 text-black"
                    >
                      Search
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            ),
          },
        ]}
      ></Collapse>
      {contextHolder}
    </div>
  );
};

export default CommonSearchForm;
const { Option } = Select;
