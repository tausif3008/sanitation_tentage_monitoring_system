import React, { useState } from "react";
import { Table, Button } from "antd";
import VendorRegistrationForm from "../vendor/VendorRegistrationForm"; // Ensure correct path
import CommonTable from "../commonComponents/CommonTable";
import CommonDivider from "../commonComponents/CommonDivider";

const columns = [
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
    key: "vendorName",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Sub Department",
    dataIndex: "subDepartment",
    key: "subDepartment",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const VendorList = () => {
  const vendorsLocal =
    JSON.parse(localStorage.getItem("vendorRegistration")) || [];
  const [isVendorList, setIsVendorList] = useState(false);
  const [vendorList, setVendorList] = useState(vendorsLocal);

  return (
    <div className="">
      {!isVendorList && (
        <>
          <CommonDivider
            label={"Vendor List"}
            compo={
              <Button
                onClick={() => setIsVendorList(true)}
                className="bg-orange-300 mb-1"
              >
                Add Vendor
              </Button>
            }
          ></CommonDivider>
          <CommonTable columns={columns} dataSource={vendorList}></CommonTable>
        </>
      )}
      {isVendorList && (
        <VendorRegistrationForm
          onFinish={(values) => {
            setVendorList([...vendorList, values]);
            localStorage.setItem(
              "vendorRegistration",
              JSON.stringify([...vendorList, values])
            );
            setIsVendorList(false);
          }}
        />
      )}
    </div>
  );
};

export default VendorList;
