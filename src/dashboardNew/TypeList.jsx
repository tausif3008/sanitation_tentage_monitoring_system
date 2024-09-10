import { Table } from "antd";
import React from "react";

const TypeList = () => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (el) => {
        return <div className=" w-10">{el}</div>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (el) => {
        return <div className="">{el}</div>;
      },
    },
    {
      title: "Functional",
      dataIndex: "functional",
      key: "functional",
      render: (el) => {
        return <div className="">{el}</div>;
      },
    },
    {
      title: "Response Time",
      dataIndex: "res_time",
      key: "res_time",
      render: (el) => {
        return <div className="">{el}</div>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 1",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 300 }}
      ></Table>
    </div>
  );
};

export default TypeList;
