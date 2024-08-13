import React, { useState } from "react";
import { Divider, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const columns = (searchText, setSearchText) => [
  {
    title: "Section",
    dataIndex: "section",
    key: "section",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Asset Name",
    dataIndex: "assetName",
    key: "assetName",
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
  },
  {
    title: "Asset Code",
    dataIndex: "assetCode",
    key: "assetCode",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search Asset Code`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <a onClick={() => confirm()} style={{ width: "100%" }}>
            Search
          </a>
          <a onClick={() => clearFilters()} style={{ width: "100%" }}>
            Reset
          </a>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record.assetCode.toString().toLowerCase().includes(value.toLowerCase()),
  },
];

const getSectorWiseData = (selectedSectors, tentage, sanitization, wastes) => {
  const data = [
    {
      key: "1",
      section: "Tentage",
      assetName: "Table",
      sector: "Sector 1",
      assetCode: "table101",
    },
    {
      key: "2",
      section: "Tentage",
      assetName: "Table",
      sector: "Sector 2",
      assetCode: "table102",
    },
    {
      key: "3",
      section: "Tentage",
      assetName: "Table",
      sector: "Sector 3",
      assetCode: "table103",
    },
    {
      key: "4",
      section: "Sanitation",
      assetName: "Water Tank",
      sector: "Sector 1",
      assetCode: "watertank101",
    },
    {
      key: "5",
      section: "Sanitation",
      assetName: "Water Tank",
      sector: "Sector 2",
      assetCode: "watertank102",
    },
    {
      key: "6",
      section: "Sanitation",
      assetName: "Water Tank",
      sector: "Sector 3",
      assetCode: "watertank103",
    },
    {
      key: "7",
      section: "Wastes",
      assetName: "Bin",
      sector: "Sector 1",
      assetCode: "bin101",
    },
    {
      key: "8",
      section: "Wastes",
      assetName: "Bin",
      sector: "Sector 2",
      assetCode: "bin102",
    },
    {
      key: "9",
      section: "Wastes",
      assetName: "Bin",
      sector: "Sector 3",
      assetCode: "bin103",
    },
  ].filter((el) => {
    if (selectedSectors.includes(el.sector)) {
      if (tentage && el.section === "Tentage") {
        return el;
      } else if (sanitization && el.section === "Sanitation") {
        return el;
      } else if (wastes && el.section === "Wastes") {
        return el;
      }
    }
    return false;
  });
  return data;
};

const Assets = ({ selectedSectors, tentage, sanitization, wastes }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="text-xl font-semibold text-center mt-1">
        Asset Details
        <div className="w-11/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>
      <div className="px-2 text-sm">
        <Table
          style={{ fontSize: "10px" }}
          pagination={false}
          bordered
          scroll={{ y: 280 }}
          columns={columns(searchText, setSearchText)}
          dataSource={getSectorWiseData(
            selectedSectors,
            tentage,
            sanitization,
            wastes
          )}
        />
      </div>
    </>
  );
};

export default Assets;
