import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider, DatePicker } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getData, postData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { getFormData } from "../../urils/getFormData";
import optionsMaker from "../../urils/OptionMaker";
import { useParams } from "react-router";
import { ListFormContextVendorDetails } from "./ListFormContextVendorDetails";

const dateFormat = "YYYY-MM-DD";

const VendorDetailsForm = () => {
  const { updateDetails, setUpdateDetails, setUpdated, setIsList } = useContext(
    ListFormContextVendorDetails
  );

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userTypes, setUserTypes] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (updateDetails) {
      form.setFieldsValue(updateDetails);
    }
    return () => {
      setUpdateDetails();
      setUpdated(false);
      setIsList(false);
    };
  }, [updateDetails, form]);

  const onFinish = async (values) => {
    setLoading(true);

    values.user_id = params.id;
    if (values.date_of_allocation) {
      values.date_of_allocation = values.date_of_allocation.format(dateFormat);
    }

    if (updateDetails) {
      values.user_detail_id = updateDetails.user_detail_id; //------------- check
    }

    const res = await postData(
      getFormData(values),
      URLS.addVendorDetails.path,
      {
        version: URLS.addVendorDetails.version,
      }
    );

    if (res) {
      setLoading(false);
      if (res.data.success) {
        form.resetFields();
        setUpdated(true);
      }

      if (updateDetails) {
        setUpdateDetails(false);
        //   setUpdated(true);
      }
    }
  };

  useEffect(() => {
    // optionsMaker(
    //   "userType",
    //   "user_type",
    //   "user_type",
    //   setUserTypes,
    //   "",
    //   "user_type_id"
    // );
    // getData(URLS.userType.path, { "x-api-version": URLS.userType.version });
  }, [form]);

  return (
    <div className="mt-3">
      <div className="mx-auto p-3 bg-white shadow-md rounded-lg mt-3 w-full">
        <div className="flex gap-2 items-center">
          <Button
            className="bg-gray-200 rounded-full w-9 h-9"
            onClick={() => {
              setIsList(false);
              setUpdateDetails(false);
            }}
          >
            <ArrowLeftOutlined />
          </Button>

          <div className="text-d9 text-2xl w-full flex items-end justify-between ">
            <div className="font-bold">
              {updateDetails ? "Update Vendor Details" : "Vendor Details"}
            </div>
            <div className="text-xs">All * marks fields are mandatory</div>
          </div>
        </div>

        <Divider className="bg-d9 h-2/3 mt-1" />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ company: "   KASH IT SOLUTION" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
            <Form.Item
              label={<div className="font-semibold">Main Type</div>}
              name="main_type"
              rules={[{ required: true, message: "Please enter main type" }]}
              className="mb-4"
            >
              <Input placeholder="Enter main type" className="rounded-none" />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Sub Type</div>}
              name="sub_type"
              rules={[{ required: true, message: "Please enter sub type" }]}
              className="mb-4"
            >
              <Input placeholder="Enter sub type" className="rounded-none" />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Contract Number</div>}
              name="contract_number"
              rules={[
                { required: true, message: "Please enter contract number" },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter contract number"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Manager Contact 1</div>}
              name="manager_contact_1"
              rules={[
                { required: true, message: "Please enter manager contact 1" },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter manager contact 1"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Manager Contact 2</div>}
              name="manager_contact_2"
              rules={[
                { required: true, message: "Please enter manager contact 2" },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter manager contact 2"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Work Order Number</div>}
              name="work_order_number"
              rules={[
                { required: true, message: "Please enter work order number" },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter work order number"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label="Date of Allocation"
              name="date_of_allocation"
              rules={[
                { required: true, message: "Please select date of allocation" },
              ]}
            >
              <DatePicker
                format={dateFormat} // Display format
                placeholder="Select Date"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="font-semibold">Total Allotted Quantity</div>
              }
              name="total_allotted_quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter total allotted quantity",
                },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter total allotted quantity"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label={<div className="font-semibold">Proposed Sectors</div>}
              name="proposed_sectors"
              rules={[
                { required: true, message: "Please enter proposed sectors" },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Enter proposed sectors"
                className="rounded-none"
              />
            </Form.Item>
          </div>

          <div className="flex justify-end">
            <Form.Item>
              <Button
                // loading={loading}
                type="primary"
                htmlType="submit"
                className="w-fit rounded-none bg-5c"
              >
                {updateDetails ? "Update" : "Register"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VendorDetailsForm;
