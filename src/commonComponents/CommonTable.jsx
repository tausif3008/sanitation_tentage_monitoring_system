import { Pagination, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const CommonTable = ({ columns, uri, details, loading }) => {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber, per_page) => {
    let path = uri + "/page=" + pageNumber + "&per_page=" + per_page;
    navigate(path);
  };

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        bordered
        scroll={{ x: 1600, y: 400 }}
        dataSource={details.list || []}
        pagination={false}
      />
      <Pagination
        className="mt-2"
        align="end"
        showSizeChanger
        showQuickJumper
        current={details.currentPage}
        total={details.totalRecords}
        pageSize={details.pageLength}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CommonTable;
