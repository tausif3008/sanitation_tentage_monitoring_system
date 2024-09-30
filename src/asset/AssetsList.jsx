import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Modal, Image } from "antd";
import { useNavigate } from "react-router-dom";
import CommonDivider from "../commonComponents/CommonDivider";

const { Search } = Input;

const AssetsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://kumbhtsmonitoring.in/php-api/asset/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          }
        });

        const result = await response.json();

        if (response.ok && result.data && Array.isArray(result.data.listings)) {
          const transformedData = result.data.listings.map((item, index) => ({
            key: item.assets_id,
            srNo: index + 1,
            ...item,
          }));
          setData(transformedData);
          setFilteredData(transformedData);
        } else {
          message.error(result.message || "Failed to fetch assets. Data format may not be an array.");
        }
      } catch (error) {
        message.error("Error fetching assets: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAssets();
  }, []);

  const handleSearch = (value) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleQRCodeClick = (qrCode) => {
    if (qrCode) {
      setQrCodeUrl(
        `https://kumbhtsmonitoring.in/php-api/${qrCode}`
      );
      setIsModalVisible(true);
    } else {
      message.warning("QR Code not available.");
    }
  };

  const handleNewAssetClick = () => {
    navigate("/asset-registration"); // Navigate to the Asset Registration page
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "Asset Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "QR Value",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Vendor Asset Code",
      dataIndex: "vendor_asset_code",
      key: "vendor_asset_code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Asset Type",
      dataIndex: "asset_type_name",
      key: "asset_type_name",
    },
    {
      title: "Location (Lat, Long)",
      render: (text, record) => `${record.latitude || 'N/A'}, ${record.longitude || 'N/A'}`,
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "QR Code",
      render: (text, record) => (
        <Button type="link" onClick={() => handleQRCodeClick(record.qr_code)}>
          View QR Code
        </Button>
      ),
      key: "qrCode",
    },
    {
      title: "Photo",
      render: (text, record) => (
        record.photo ? (
          <Image
            width={50}
            src={`https://kumbhtsmonitoring.in/php-api/${record.photo}`}
            alt="Assets Photo"
          />
        ) : (
          "No Image"
        )
      ),
      key: "photo",
    },
    {
      title: "Tagged At",
      dataIndex: "tagged_at",
      key: "tagged_at",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <div>
      <h1>Assets List</h1>
      <CommonDivider />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Search
          placeholder="Search by asset name"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          onClick={handleNewAssetClick}
        >
          Add New Asset
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="key"
      />
      <Modal
        visible={isModalVisible}
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
