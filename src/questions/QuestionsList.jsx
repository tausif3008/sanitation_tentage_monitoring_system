import React, { useState, useEffect } from "react";
import { Table, message } from "antd";

const BASE_URL = "https://kumbhtsmonitoring.in/php-api/";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10; // Number of records per page

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${BASE_URL}questions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "YunHu873jHds83hRujGJKd873",
            "x-api-version": "1.0.1",
            "x-platform": "Web",
            "x-access-token": localStorage.getItem("sessionToken") || "",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Sort questions in descending order by ID
          const sortedQuestions = data.data.listings.sort(
            (a, b) => b.question_id - a.question_id
          );
          setQuestions(sortedQuestions);

          // Set total number of records
          const total = data.data.paging[0]?.totalrecords || 0;
          setTotalRecords(total);
        } else {
          message.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        message.error(`Failed to fetch questions: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "question_id",
      key: "question_id",
    },
    {
      title: "Asset Type", // New column for Asset Type
      dataIndex: "asset_type", // Assuming this is the correct field from the API response
      key: "asset_type",
    },
    {
      title: "Question (English)",
      dataIndex: "question_en",
      key: "question_en",
    },
    {
      title: "Question (Hindi)",
      dataIndex: "question_hi",
      key: "question_hi",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <h2 className="text-xl font-bold mb-4">Question List</h2>
      <Table
        dataSource={questions}
        columns={columns}
        loading={loading}
        rowKey="question_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalRecords, // Display total count in pagination
          showTotal: (total) => `Total ${total} questions`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default QuestionsList;
