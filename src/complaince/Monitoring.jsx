import React from "react";
import { Table, Input, Button, Select, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const Monitoring = () => {
  const columns = [
    {
      title: "Sr No.",
      dataIndex: "srNo",
      key: "srNo",
    },
    {
      title: "Assets Id",
      dataIndex: "assetsId",
      key: "assetsId",
    },
    {
      title: "Assets Name",
      dataIndex: "assetsName",
      key: "assetsName",
    },
    {
      title: "Assets Code",
      dataIndex: "assetsCode",
      key: "assetsCode",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="link">
          <Link to="/monitoring-report">View Monitoring Data</Link>
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      srNo: "1",
      assetsId: "84873",
      assetsName: "Table",
      assetsCode: "Table0039",
      unit: "Option 1",
      group: "Option 2",
      vendor: "Option 2",
    },
    {
      key: "2",
      srNo: "2",
      assetsId: "84874",
      assetsName: "Tant Office Furniture",
      assetsCode: "9748873874",
      unit: "Option 2",
      group: "Option 2",
      vendor: "Option 2",
    },
  ];

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold">Monitoring</div>
      </div>

      <div className="mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Input placeholder="Enter Assets Code" size="large" className="rounded-none" />
          </Col>
          <Col span={12}>
            <Input placeholder="Enter Vendor" size="large" className="rounded-none" />
          </Col>
        </Row>

        <Button type="primary" className="mt-3 rounded-none" size="large">
          Search
        </Button>
      </div>

      <div className="mt-5">
        <h4>Assets List</h4>
        <div className="mb-3 flex items-center">
          <span>Show </span>
          <Select defaultValue="10" style={{ width: 120 }} className="mx-2 rounded-none">
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
          <span> entries</span>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          }}
          className="rounded-none"
        />
      </div>
    </div>
  );
};

export default Monitoring;
