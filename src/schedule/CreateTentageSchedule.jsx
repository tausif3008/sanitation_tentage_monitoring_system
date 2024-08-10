import React from "react";
import { Form, Select, Button, Row, Col, TimePicker } from "antd";

const { Option } = Select;

const CreateTentageSchedule = () => {
  const onFinish = (values) => {
    console.log("Form Values: ", values);
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-3">
      <div className="w-full max-w-3xl bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Tentage Schedule</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="cleaner"
            label="Select Cleaner"
            rules={[{ required: true, message: "Please select a cleaner" }]}
          >
            <Select placeholder="Select Cleaner">
              <Option value="cleaner1">Cleaner 1</Option>
              <Option value="cleaner2">Cleaner 2</Option>
              {/* Add more cleaners as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            name="timesPerDay"
            label="How many times a Day"
            rules={[{ required: true, message: "Please select the number of times" }]}
          >
            <Select placeholder="Select Frequency">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Form.Item>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Schedule Times</h3>
            {[...Array(5)].map((_, index) => (
              <Row gutter={16} key={index}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <Col span={3} key={`${day}-${index}`}>
                    <Form.Item
                      label={index === 0 ? day : ''}
                      name={`${day.toLowerCase()}_${index}`}
                    >
                      <TimePicker.RangePicker
                        format="HH:mm"
                        minuteStep={15}
                        placeholder={['Start', 'End']}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            ))}
          </div>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateTentageSchedule;
