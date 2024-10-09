import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Image, Tag, message } from "antd";
import { useParams } from "react-router-dom";
import CommonDivider from "../commonComponents/CommonDivider";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Fetch/Axios";
import URLS from "../urils/URLS";

const MonitoringReport = ({ data }) => {
  const [details, setDetails] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const assetInfoSelector = useSelector(
    (state) => state.monitoringSlice?.assetInfo
  );
  const params = useParams();
  const dispatch = useDispatch();

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.monitoringDetails.path + params.id + "&";

    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const extraHeaders = { "x-api-version": URLS.asset.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;

      setLoading(false);

      // const list = data.listings.map((el, index) => {
      //   return {
      //     ...el,
      //   };
      // });

      // setDetails(() => {
      //   return {
      //     list,
      //     pageLength: data.paging[0].length,
      //     currentPage: data.paging[0].currentpage,
      //     totalRecords: data.paging[0].totalrecords,
      //   };
      // });
    }
  };

  useEffect(() => {
    getDetails();
  }, [params]);

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
          {details.map((item, index) => (
            <div span={12} key={index}>
              <strong>{item.label}:</strong> {item.value}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col text-center font-semibold">
            <span>QR Code</span>
            {URLS.baseUrl + assetInfoSelector.photo}
            <Image
              width={130}
              src={URLS.baseUrl + assetInfoSelector.photo}
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
