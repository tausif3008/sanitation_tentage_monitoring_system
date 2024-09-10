import { Button, DatePicker, Form, Input } from "antd";
import React from "react";

const FacilityDetailsForm = () => {
  const onFinish = (values) => {};
  return (
    <div
      className="p-3 rounded bg-yellow-50 bg-[#FF95000D]"
      style={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-6 gap-2">
          <Form.Item noStyle name="facility_id">
            <Input size="large" placeholder="Facility ID" />
          </Form.Item>

          <Form.Item noStyle name="location">
            <Input size="large" placeholder="Location" />
          </Form.Item>

          <Form.Item noStyle name="type">
            <Input size="large" placeholder="Type" />
          </Form.Item>

          <Form.Item noStyle name="status">
            <Input size="large" placeholder="Status" />
          </Form.Item>

          <Form.Item noStyle name="schedule">
            <DatePicker size="large" placeholder="Schedule" />
          </Form.Item>

          <Form.Item noStyle name="vendor">
            <Input size="large" placeholder="Vendor" />
          </Form.Item>

          <div className="col-span-6 flex justify-end ">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-32 bg-orange-400 font-semibold"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FacilityDetailsForm;
