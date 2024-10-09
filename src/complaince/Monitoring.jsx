import React, { useContext, useEffect, useState } from "react";
import { Button, message, Modal, Table } from "antd";
import { useNavigate, useParams } from "react-router";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import URLS from "../urils/URLS";
import { getData } from "../Fetch/Axios";
import {} from "../register/AssetType/AssetTypeSlice";
import CommonDivider from "../commonComponents/CommonDivider";
import CommonTable from "../commonComponents/CommonTable";
import QRCode from "qrcode.react";

import {
  setAssetInfo,
  setMonitoringListIsUpdated,
  setUpdateMonitoringEl,
} from "./monitoringSlice";

const Monitoring = () => {
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

    let uri = URLS.asset.path + "/?";

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

      const list = data.listings.map((el, index) => {
        return {
          ...el,
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
    setQrCodeUrl(record.qr_code); // Set the QR code URL
    setIsModalVisible(true); // Show the modal
  };

  const columns = [
    {
      title: "Assets Type Name",
      dataIndex: "asset_type_name",
      key: "assetsName",
      width: 210,
    },

    {
      title: "Assets Code",
      dataIndex: "code",
      key: "assetsCode",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor",
    },
    {
      title: "Vendor Asset Code",
      dataIndex: "vendor_asset_code",
      key: "vendor_asset_code",
      width: 160,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "assetsName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description_",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 130,

      render: (text, record) => (
        <div className="flex gap-2">
          <div
            className="text-blue-500 cursor-pointer"
            onClick={() => showQrCode(record)}
          >
            QR
          </div>

          <div
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              navigate("/monitoring-report/" + record.assets_id);
              dispatch(setAssetInfo(record));
            }}
          >
            Monitoring
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <CommonDivider
        label={"Assets Monitoring "}
        // compo={
        //   <Button
        //     className="bg-orange-300 mb-1"
        //     onClick={() => {
        //       navigate("/add-update-monitoring");
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
        scroll={{ x: 1400, y: 400 }}
      ></CommonTable>

      <Modal
        width={300}
        title="QR Code"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{ textAlign: "center" }}
          className="flex justify-center items-center"
        >
          {qrCodeUrl ? (
            <img
              src={URLS.baseUrl + "/" + qrCodeUrl}
              alt="QR Code"
              style={{ maxWidth: "200px" }}
            />
          ) : (
            <div>QR Code Not Found</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Monitoring;
