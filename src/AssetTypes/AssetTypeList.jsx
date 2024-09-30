import React, { useEffect, useState } from "react";
import { Table, message, Divider, Input, Button, Modal } from "antd"; // Import Modal for popup
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Import xlsx for Excel generation

const BASE_URL = "https://kumbhtsmonitoring.in/php-api/";

const AssetTypeList = () => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]); // To store questions for the selected asset type
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedAssetType, setSelectedAssetType] = useState(null); // Currently selected asset type for viewing questions

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

  const fetchQuestions = async (assetTypeId) => {
    try {
      const response = await fetch(
        `${BASE_URL}questions?asset_type_id=${assetTypeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          },
        }
      );
      const data = await response.json();

      if (data.success && data.data.listings.length > 0) {
        setQuestions(data.data.listings);
      } else {
        setQuestions([]); // If no questions are found
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      message.error("Failed to fetch questions");
    }
  };

  const showModal = async (assetTypeId) => {
    setSelectedAssetType(assetTypeId);
    await fetchQuestions(assetTypeId); // Fetch questions for the asset type
    setIsModalVisible(true); // Show the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
    setQuestions([]); // Clear the questions when modal closes
  };

  const filteredData = assetTypes
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .reverse(); // Reversing the data to show the latest record first

  // Define the columns in the order you want
  const columns = [
    {
      title: "Sr No",
      key: "index",
      render: (text, record, index) => index + 1, // Create a serial number
    },
    {
      title: "Main Type", // Asset main type
      dataIndex: "asset_main_type",
      key: "asset_main_type",
    },
    {
      title: "Name", // Asset name
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description", // Asset description
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total Quantity", // Total quantity
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Questions", // Number of questions
      dataIndex: "questions",
      key: "questions",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record.asset_type_id)}>
          View Questions
        </Button>
      ),
    },
    {
      title: "Status", // Asset status (Active/Inactive)
      dataIndex: "status",
      key: "status",
      render: (text) => (text === "1" ? "Active" : "Inactive"),
    },
  ];

  // Function to download the filtered data as an Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // Convert data to a sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asset Type"); // Append sheet to workbook

    // Set column names in the same order as the table columns
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Sr No",
          "Main Type",
          "Name",
          "Description",
          "Quantity",
          "Questions",
          "Status",
        ],
      ],
      { origin: "A1" }
    );

    // Write and download the Excel file
    XLSX.writeFile(workbook, "AssetType_List.xlsx");
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Asset Type List</div>
        <div className="flex items-center gap-4">
          <Link to="/asset-type-registration">
            <Button type="primary">Add New Asset Type</Button>
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
        pagination={{
          pageSize: 20,
          showTotal: (total) => `Total ${total} items`, // Display the total count
        }}
      />

      {/* Modal for showing questions */}
      <Modal
        title={`Questions for Asset Type ID: ${selectedAssetType}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800} // Adjust width if necessary
      >
        {questions.length > 0 ? (
          <Table
            dataSource={questions}
            rowKey="question_id"
            pagination={false} // Disable pagination for the modal table
            columns={[
              {
                title: "Question (EN)",
                dataIndex: "question_en",
                key: "question_en",
              },
              {
                title: "Question (HI)",
                dataIndex: "question_hi",
                key: "question_hi",
              },
            ]}
          />
        ) : (
          <p>No questions found for this asset type.</p>
        )}
      </Modal>
    </div>
  );
};

export default AssetTypeList;
