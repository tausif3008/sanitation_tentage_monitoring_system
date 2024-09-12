import { Table, Tooltip } from "antd";
import React from "react";

const TypeList = () => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (el) => {
        return (
          <div className="flex justify-between w-full">
            <span>{el}</span>
            <Tooltip
              title={<div className="text-black">Toilet with septic tank</div>}
              placement="bottomLeft"
              color={"white"}
            >
              <span className="font-semibold w-4 h-4 rounded-full text-white bg-yellow-400 flex text-center justify-center align-items-center p-1">
                i
              </span>
            </Tooltip>
          </div>
        );
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
      type: "Type 2",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 3",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 4",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 5",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 6",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 7",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 8",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 9",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
    {
      key: "1",
      type: "Type 10",
      total: "6000",
      age: 32,
      functional: "5000",
      res_time: "1.5 min",
    },
  ];
  return (
    <div className="rounded-md">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 400, y: 350 }}
      ></Table>
    </div>
  );
};

export default TypeList;
