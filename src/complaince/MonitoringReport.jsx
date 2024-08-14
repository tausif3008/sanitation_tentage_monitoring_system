import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image, Tag, message } from "antd";
import { useParams } from "react-router-dom";

const MonitoringReport = () => {
  const { id } = useParams(); // Extract id from the URL
  const { assetId } = useParams(); // Extract assetId from URL parameters
  const [assetDetails, setAssetDetails] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssetData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://192.168.1.141:8001/get-asset-quetion/${id}/`);

        const result = await response.json();

        if (response.ok && result.data) {
          // Assuming the first item in the data array is the relevant asset
          const asset = result.data[0];
          
          // Set asset details
          setAssetDetails([
            { label: "Assets Name", value: "Table" }, // Replace with actual data
            { label: "Assets Code", value: "Table0039" }, // Replace with actual data
            { label: "Assets Description", value: "Table 6 by 8 ft" }, // Replace with actual data
            { label: "Assets Unit", value: "Option 1" }, // Replace with actual data
            { label: "Assets Group", value: "Option 2" }, // Replace with actual data
            { label: "Assets Vendor", value: "Option 2" }, // Replace with actual data
            {
              label: "Qr Code",
              value: <Image width={100} src="path_to_qr_code_image" alt="QR Code" />,
            },
            {
              label: "Photo",
              value: <Image width={100} src="path_to_photo_image" alt="Photo" />,
            },
            { label: "Latitude", value: "18.5110776" }, // Replace with actual data
            { label: "Longitude", value: "81.888215" }, // Replace with actual data
          ]);

          // Transform API data to match table format
          const questions = asset.assetdata.map((item, index) => ({
            key: item.id,
            question: item.question,
            day1: item.answer ? "Yes" : "No",
            // Add other days if needed, based on your API data or requirements
          }));

          setQuestionData(questions);
        } else {
          message.error(result.message || "Failed to load asset details");
        }
      } catch (error) {
       
        message.error(error.message || "An error occurred while fetching the asset details");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [assetId]); // Dependency array includes assetId to refetch data when assetId changes

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
    // Assuming you need columns for 12 days, adjust as needed
    ...Array.from({ length: 12 }, (_, i) => ({
      title: `${String(i + 1).padStart(2, "0")}-Aug-2024`,
      dataIndex: `day${i + 1}`,
      key: `day${i + 1}`,
      render: renderResponse,
    })),
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
          loading={loading}
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
