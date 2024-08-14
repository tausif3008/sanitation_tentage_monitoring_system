import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image, Tag, message } from "antd";
import { useParams } from "react-router-dom";
import CommonDivider from "../commonComponents/CommonDivider";

const MonitoringReport = ({ data, setsetAssetInfo }) => {
  console.log("data--------", data);

  const { id } = useParams(); // Extract id from the URL
  const [assetDetails, setAssetDetails] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssetData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://filemanagement.metaxpay.in:8001/get-asset-quetion/${data.assetsId}/`
        );

        const result = await response.json();

        if (response.ok && result.data) {
          const asset = result.data[0];

          // Set asset details
          setAssetDetails([
            { label: "Assets Name", value: data.assetsName }, // Replace with actual data
            { label: "Assets Code", value: data.assetsCode }, // Replace with actual data

            // {
            //   label: "Photo",
            //   value: (
            //     <Image width={100} src="path_to_photo_image" alt="Photo" />
            //   ),
            // },
            // { label: "Latitude", value: "18.5110776" }, // Replace with actual data
            // { label: "Longitude", value: "81.888215" }, // Replace with actual data
          ]);

          const date = new Date(data.dataCreated);
          const options = { day: "2-digit", month: "short", year: "numeric" };
          const formattedDate = date.toLocaleDateString("en-GB", options);

          // Transform API data to match table format
          console.log(
            "            answer: result.data[0].assetdata?.answer",
            result.data[0]
          );

          const questions = asset.assetdata.map((item, index) => {
            console.log(
              "logresult.data[0].assetdata[index]",
              result.data[0].assetdata[0],
              result.data[0].assetdata[1]
            );
            return {
              key: item.id,
              question: item.question,
              day1: item.answer ? "Yes" : "No",
              dataCreated: formattedDate,
              answer: result.data[0].assetdata[index - 1]?.answer ? (
                <Tag color="green">Yes</Tag>
              ) : (
                <Tag color="green">No</Tag>
              ),
              // Add other days if needed, based on your API data or requirements
            };
          });

          setQuestionData(questions);
        } else {
          message.error(result.message || "Failed to load asset details");
        }
      } catch (error) {
        message.error(
          error.message || "An error occurred while fetching the asset details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [data, data.assetId]); // Dependency array includes assetId to refetch data when assetId changes

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
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Date",
      dataIndex: "dataCreated",
      key: "question",
    },
    // Assuming you need columns for 12 days, adjust as needed
  ];

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <CommonDivider
        label={"Monitoring Report"}
        compo={
          <Button
            className="mb-2 bg-green-400"
            onClick={() => setsetAssetInfo(null)}
          >
            Asset Listing
          </Button>
        }
      ></CommonDivider>
      <div className="mt-4">
        <Row gutter={[16, 16]} className="mb-4">
          {assetDetails.map((item, index) => (
            <Col span={12} key={index}>
              <strong>{item.label}:</strong> {item.value}
            </Col>
          ))}
        </Row>
        <Image width={100} src={data.qrCodeUrl} alt="QR Code" />
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