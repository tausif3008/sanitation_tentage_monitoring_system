import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image, Tag, message } from "antd";
import { useParams } from "react-router-dom";
import CommonDivider from "../commonComponents/CommonDivider";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getData } from "../Fetch/Axios";
import URLS from "../urils/URLS";

const MonitoringReport = ({ data }) => {
  const [assetDetails, setAssetDetails] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const assetInfoSelector = useSelector(
    (state) => state.monitoringSlice?.assetInfo
  );

  useEffect(() => {
    if (assetInfoSelector) {
      const fetchAssetData = async () => {
        setLoading(true);
        try {
          const result = getData(URLS.monitoring);
          if (result.data) {
            const asset = result.data[0];
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
            const date = new Date(asset.date_created);
            const options = { day: "2-digit", month: "short", year: "numeric" };
            const formattedDate = date.toLocaleDateString("en-GB", options);
            // Transform API data to match table format
            const questions = asset.assetdata.map((item, index) => {
              return {
                key: item.id,
                question: item.question,
                day1: item.answer ? "Yes" : "No",
                dataCreated: formattedDate,
                answer: item.answer ? (
                  <Tag color="green">
                    <div className="font-semibold">Yes</div>
                  </Tag>
                ) : (
                  <Tag color="red">
                    <div className="font-semibold">No</div>
                  </Tag>
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
            "Please add monitoring details by scanning the QR code."
          );
        } finally {
          setLoading(false);
        }
      };
    }
  }, []); // Dependency array includes assetId to refetch data when assetId changes

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
      width: 90,
    },
    {
      title: "Date",
      dataIndex: "dataCreated",
      key: "question",
      width: 120,
    },
    // Assuming you need columns for 12 days, adjust as needed
  ];

  return (
    <div className="mx-auto p-3 bg-white shadow-md rounded-lg w-full mt-3">
      <CommonDivider
        label={"Monitoring Report"}
        compo={
          <Button
            className="mb-2 bg-green-400"
            // onClick={() => setsetAssetInfo(null)}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined> Assets Monitoring Listing
          </Button>
        }
      ></CommonDivider>
      <div className="mt-4">
        <div className="flex gap-3">
          {assetDetails.map((item, index) => (
            <div span={12} key={index}>
              <strong>{item.label}:</strong> {item.value}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col text-center font-semibold">
            <span>QR Code</span>
            <Image
              width={130}
              // src={"http://filemanagement.metaxpay.in:8001" + data.qrCodeUrl}
              alt="QR Code"
            />
          </div>
          <div className="flex flex-col text-center font-semibold">
            <span>Asset Image</span>
            <Image
              width={125}
              height={125}
              // src={"http://filemanagement.metaxpay.in:8001" + data.img}
            ></Image>
          </div>
        </div>
        <Table
          columns={dateColumns}
          dataSource={questionData}
          pagination={false}
          scroll={{ x: true, y: 350 }}
          bordered
          className="rounded-none"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MonitoringReport;
