import { Table } from "antd";
import React from "react";

const CommonTable = ({ columns, dataSource }) => {
  return (
    <Table
      columns={columns}
      bordered
      scroll={{ x: 1600, y: 400 }}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default CommonTable;
