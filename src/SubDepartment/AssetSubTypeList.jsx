import React, { useEffect, useState } from "react";
import { Table, message, Divider, Input, Button } from "antd";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Import xlsx for Excel generation

const BASE_URL = "https://kumbhtsmonitoring.in/php-api/";

const AssetSubTypeList = () => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}asset-types`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          },
        });
        const data = await response.json();

        if (data.success) {
          setAssetTypes(data.data.assettypes);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = assetTypes.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "asset_type_id",
      key: "asset_type_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (text === "1" ? "Active" : "Inactive"),
    },
  ];

  // Function to download the filtered data as an Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // Convert data to a sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sub Departments"); // Append sheet to workbook

    // Set column names (optional, based on the `columns` field)
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["ID", "Name", "Description", "Questions", "Status"]],
      { origin: "A1" }
    );

    // Write and download the Excel file
    XLSX.writeFile(workbook, "SubType_List.xlsx");
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Sub Type List</div>
        <div className="flex items-center gap-4">
          <Link to="/asset-sub-type-registration">
            <Button type="primary">Add New Asset Sub Type</Button>
          </Link>
          <Button type="default" onClick={downloadExcel}>
            Download Excel
          </Button>
        </div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>

      <div className="mb-4">
        <Input
          placeholder="Search by Name or Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowKey="asset_type_id" // Use the unique key for each row
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AssetSubTypeList;
