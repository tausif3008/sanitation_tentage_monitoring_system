import React, { useContext, useEffect, useState } from "react";
import { Button, message, Modal, Table } from "antd";
import { useNavigate, useParams } from "react-router";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import URLS from "../urils/URLS";
import { getData } from "../Fetch/Axios";
import {
  setAssetTypeListIsUpdated,
  setUpdateAssetEl,
} from "../register/AssetType/AssetTypeSlice";
import CommonDivider from "../commonComponents/CommonDivider";
import CommonTable from "../commonComponents/CommonTable";
import QRCode from "qrcode.react";
import {
  setMonitoringListIsUpdated,
  setUpdateMonitoringEl,
} from "./monitoringSlice";

const Monitoring = () => {
  const [updated, setUpdated] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const isUpdatedSelector = useSelector(
    (state) => state.monitoringSlice?.isUpdated
  );

  const params = useParams();
  const navigate = useNavigate();

  // qr
  const [qrCodeData, setQrCodeData] = useState(""); // State for QR code data
  const [qrCodeUrl, setQrCodeUrl] = useState(""); // State for QR code image URL

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.monitoring.path + "/?";
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const extraHeaders = { "x-api-version": URLS.monitoring.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;
      setUpdated(false);
      setLoading(false);

      const list = data.listings.map((el, index) => {
        return {
          ...el,
          action: (
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                dispatch(setUpdateMonitoringEl({ updateElement: el }));
                navigate("/asset-type-registration");
              }}
            >
              <EditOutlined></EditOutlined>
            </Button>
          ),
        };
      });

      setDetails(() => {
        return {
          list,
          pageLength: data.paging[0].length,
          currentPage: data.paging[0].currentpage,
          totalRecords: data.paging[0].totalrecords,
        };
      });
    }
  };

  useEffect(() => {
    getDetails();
    if (isUpdatedSelector) {
      dispatch(setMonitoringListIsUpdated({ isUpdated: false }));
    }
  }, [params, isUpdatedSelector]);

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  // qr code
  useEffect(() => {
    dispatch(setUpdateMonitoringEl({ updateElement: null }));
  }, [dispatch]);

  const showQrCode = (record) => {
    setQrCodeData(record.assetsCode); // Set the QR code data (can be the assetsCode or any other data)
    setQrCodeUrl(record.qrCodeUrl); // Set the QR code URL
    setIsModalVisible(true); // Show the modal
  };

  const columns = [
    {
      title: "Assets Name",
      dataIndex: "assetsName",
      key: "assetsName",
    },
    {
      title: "Assets Code",
      dataIndex: "assetsCode",
      key: "assetsCode",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => showQrCode(record)}>
            QR
          </Button>
          <Button
            type="link"
            // onClick={() => setsetAssetInfo(record)}
          >
            View Monitoring
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <CommonDivider
        label={"Monitoring"}
        // compo={
        //   <Button
        //     className="bg-orange-300 mb-1"
        //     onClick={() => {
        //       navigate("/asset-type-registration");
        //     }}
        //   >
        //     Add Monitoring
        //   </Button>
        // }
      ></CommonDivider>
      <CommonTable
        columns={columns}
        uri={"monitoring"}
        details={details}
        loading={loading}
        scroll={{ x: 800, y: 400 }}
      ></CommonTable>
      <Modal
        width={300}
        title="QR Code"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{ textAlign: "center" }}
          className="flex justify-center items-center"
        >
          {qrCodeUrl ? (
            <img
              src={"http://filemanagement.metaxpay.in:8001" + qrCodeUrl}
              alt="QR Code"
              style={{ maxWidth: "200px" }}
            />
          ) : (
            <QRCode value={qrCodeData} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Monitoring;
