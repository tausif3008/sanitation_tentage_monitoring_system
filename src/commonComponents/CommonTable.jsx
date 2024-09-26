import { Pagination, Table } from "antd";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const CommonTable = ({
  columns,
  dataSource,
  uri,
  setUserDetails,
  pageLength = 25,
  currentPage = 1,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (pageNumber, per_page) => {
    console.log(pageNumber, per_page);
    let path = uri + "?page=" + pageNumber + "&per_page=" + per_page;
    console.log(path);
    navigate(path);
  };

  return (
    <div>
      <Table
        columns={columns}
        bordered
        scroll={{ x: 1600, y: 400 }}
        dataSource={dataSource}
        pagination={false}
      />

      <Pagination
        showQuickJumper
        className="mt-2"
        align="end"
        current={currentPage}
        total={100}
        pageSize={pageLength}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CommonTable;
