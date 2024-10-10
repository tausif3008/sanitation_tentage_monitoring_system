import React, { useContext, useEffect, useState } from "react";
import { Button, Image, message, Modal, Table } from "antd";
import CommonTable from "../../commonComponents/CommonTable";
import CommonDivider from "../../commonComponents/CommonDivider";
import URLS from "../../urils/URLS";
import { useNavigate, useParams } from "react-router";
import { getData } from "../../Fetch/Axios";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setAssetListIsUpdated, setUpdateAssetEl } from "./AssetsSlice";
import CommonSearchForm from "../../commonComponents/CommonSearchForm";

const AssetsList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const isUpdatedSelector = useSelector(
    (state) => state.assetsSlice?.isUpdated
  );

  const params = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState();

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.assetList.path + "/?";
    if (params.page) {
      uri = uri + params.page;
    }

    if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    if (searchQuery) {
      uri = uri + searchQuery;
    }

    const extraHeaders = { "x-api-version": URLS.assetTypes.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;
      setLoading(false);

      const list = data.listings.map((el, index) => {
        return {
          ...el,
          action: (
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                dispatch(setUpdateAssetEl({ updateElement: el }));
                navigate("/asset-registration");
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
      dispatch(setAssetListIsUpdated({ isUpdated: false }));
    }
  }, [params, isUpdatedSelector, searchQuery]);

  const handleQRCodeClick = (qrCode) => {
    if (qrCode) {
      setQrCodeUrl(`https://kumbhtsmonitoring.in/php-api/${qrCode}`);
      setIsModalVisible(true);
    } else {
      message.warning("QR Code not available.");
    }
  };

  const columns = [
    {
      title: "Asset Type",
      dataIndex: "asset_type_name",
      key: "asset_type_name",
      width: 220,
    },
    {
      title: "Vendor Asset Code",
      dataIndex: "vendor_asset_code",
      key: "vendor_asset_code",
    },
    {
      title: "Location (Lat, Long)",
      render: (text, record) =>
        `${record.latitude || "N/A"}, ${record.longitude || "N/A"}`,
      key: "location",
    },
    {
      title: "QR Code",
      render: (text, record) => (
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => handleQRCodeClick(record.qr_code)}
        >
          {record.code ? record.code : "No QR Value"}
        </div>
      ),
      key: "qrCode",
    },
    {
      title: "Photo",
      width: 100,
      render: (text, record) =>
        record.photo ? (
          <Image
            width={60}
            height={60}
            src={`https://kumbhtsmonitoring.in/php-api/${record.photo}`}
            alt="Assets Photo"
          />
        ) : (
          "No Image"
        ),
      key: "photo",
    },
    {
      title: "Tagged At",
      dataIndex: "tagged_at",
      key: "tagged_at",
    },
  ];

  useEffect(() => {
    dispatch(setUpdateAssetEl({ updateElement: null }));
  }, []);

  return (
    <div className="">
      <CommonDivider
        label={"Asset List"}
        compo={
          <Button
            className="bg-orange-300 mb-1"
            onClick={() => {
              navigate("/asset-registration");
            }}
          >
            Add Asset
          </Button>
        }
      ></CommonDivider>

      {/* <CommonSearchForm
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        fields={[{ name: "name", label: "Asset" }]}
        dropFields={[
          {
            name: "asset_main_type_id",
            label: "Main Asset Type",
            options: [
              {
                label: "Sanitation",
                value: "1",
              },
              {
                label: "Tentage",
                value: "2",
              },
            ],
          },
        ]}
      ></CommonSearchForm> */}

      <div className="h-3"></div>

      <CommonTable
        columns={columns}
        uri={"asset-list"}
        details={details}
        loading={loading}
        scroll={{ x: 1000, y: 400 }}
      ></CommonTable>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title="QR Code"
      >
        {qrCodeUrl ? (
          <Image src={qrCodeUrl} alt="QR Code" />
        ) : (
          <p>No QR Code available</p>
        )}
      </Modal>
    </div>
  );
};

export default AssetsList;
