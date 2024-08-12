import React from "react";
import { Row, Col, Button, Table, Image, Tag } from "antd";

const MonitoringReport = () => {
  const assetDetails = [
    { label: "Assets Name", value: "Table" },
    { label: "Assets Code", value: "Table0039" },
    { label: "Assets Description", value: "Table 6 by 8 ft" },
    { label: "Assets Unit", value: "Option 1" },
    { label: "Assets Group", value: "Option 2" },
    { label: "Assets Vendor", value: "Option 2" },
    {
      label: "Qr Code",
      value: <Image width={100} src="path_to_qr_code_image" alt="QR Code" />,
    },
    {
      label: "Photo",
      value: <Image width={100} src="path_to_photo_image" alt="Photo" />,
    },
    { label: "Latitude", value: "18.5110776" },
    { label: "Longitude", value: "81.888215" },
  ];

  const renderResponse = (text) => (
    <Tag
      color={text === "Yes" ? "green" : "red"}
      style={{ width: 50, textAlign: "center" }}
    >
      {text}
    </Tag>
  );

  const dateColumns = [
    {
      title: "Date/Question",
      dataIndex: "question",
      key: "question",
      width: 300,
    },
    ...Array.from({ length: 31 }, (_, i) => ({
      title: `${String(i + 1).padStart(2, "0")}-Aug-2024`,
      dataIndex: `day${i + 1}`,
      key: `day${i + 1}`,
      render: renderResponse,
    })),
  ];

  const questionData = [
    {
      key: "1",
      question: "A. Manpower Deployment",
      day1: "Yes",
      day2: "Yes",
      day3: "Yes",
      day4: "Yes",
      day5: "Yes",
      day6: "Yes",
      day7: "Yes",
      day8: "Yes",
      day9: "Yes",
      day10: "Yes",
      day11: "Yes",
      day12: "Yes",
    },
    {
      key: "2",
      question: "1. Is manpower deployment as per agreement?",
      day1: "Yes",
      day2: "No",
      day3: "Yes",
      day4: "No",
      day5: "Yes",
      day6: "Yes",
      day7: "No",
      day8: "Yes",
      day9: "No",
      day10: "Yes",
      day11: "Yes",
      day12: "No",
    },
    {
      key: "3",
      question: "2. Do cleaners ensure wearing of PPE?",
      day1: "No",
      day2: "Yes",
      day3: "Yes",
      day4: "No",
      day5: "Yes",
      day6: "No",
      day7: "Yes",
      day8: "Yes",
      day9: "No",
      day10: "Yes",
      day11: "Yes",
      day12: "No",
    },
    {
      key: "4",
      question: "B. Cleaning and Sanitation",
      day1: "Yes",
      day2: "Yes",
      day3: "Yes",
      day4: "Yes",
      day5: "Yes",
      day6: "Yes",
      day7: "Yes",
      day8: "Yes",
      day9: "Yes",
      day10: "Yes",
      day11: "Yes",
      day12: "Yes",
    },
    {
      key: "5",
      question: "3. Are the toilets cleaned for usage?",
      day1: "Yes",
      day2: "No",
      day3: "Yes",
      day4: "Yes",
      day5: "No",
      day6: "Yes",
      day7: "Yes",
      day8: "No",
      day9: "Yes",
      day10: "No",
      day11: "Yes",
      day12: "Yes",
    },
    //... Add more questions and responses as needed
  ];

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Monitoring Report</div>
      </div>
      <div className="mt-4">
        <Row gutter={[16, 16]} className="mb-4">
          {assetDetails.map((item, index) => (
            <Col span={12} key={index}>
              <strong>{item.label}:</strong> {item.value}
            </Col>
          ))}
        </Row>

        <Table
          columns={dateColumns}
          dataSource={questionData}
          pagination={false}
          scroll={{ x: true }}
          bordered
          className="rounded-none"
        />

        <div className="flex justify-end">
          <Button type="primary" className="mt-4 rounded-none bg-5c">
            Save Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringReport;
