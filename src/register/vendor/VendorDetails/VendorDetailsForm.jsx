import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { postData } from "../../../Fetch/Axios";
import URLS from "../../../urils/URLS";
import { getFormData } from "../../../urils/getFormData";
import optionsMaker from "../../../urils/OptionMaker";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setVendorDetailsListIsUpdated } from "./vendorDetailsSlice";
import dayjs from "dayjs";
import CommonFormDropDownMaker from "../../../commonComponents/CommonFormDropDownMaker";

const { Option } = Select;

const dateFormat = "YYYY-MM-DD";

const VendorDetailsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [assetTypes, setAssetTypes] = useState([]);

  const vendorDetailsUpdateElSelector = useSelector(
    (state) => state.vendorDetailsSlice?.vendorDetailsUpdateEl
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prepopulate form if editing vendor details
  useEffect(() => {
    if (vendorDetailsUpdateElSelector) {
      const updatedDetails = { ...vendorDetailsUpdateElSelector };

      // Ensure the date is a dayjs object
      updatedDetails.date_of_allocation = dayjs(
        updatedDetails.date_of_allocation
      );

      updatedDetails.proposed_sectors =
        updatedDetails.proposed_sectors.split(",");

      form.setFieldsValue(updatedDetails);
    }
  }, [vendorDetailsUpdateElSelector, form]);

  // Populate asset types for selection
  useEffect(() => {
    optionsMaker(
      "vendorAsset",
      "assettypes",
      "name",
      setAssetTypes,
      "",
      "asset_type_id"
    );
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    if (params.id) {
      values.user_id = params.id;
    } else {
      return message.info("Invalid User");
    }

    if (values.date_of_allocation) {
      values.date_of_allocation = values.date_of_allocation.format(dateFormat);
    }

    if (vendorDetailsUpdateElSelector) {
      values.vendor_detail_id = vendorDetailsUpdateElSelector.vendor_detail_id;
    }

    const res = await postData(
      getFormData(values),
      vendorDetailsUpdateElSelector
        ? URLS.editVendorDetails.path
        : URLS.addVendorDetails.path,
      {
        version: URLS.addVendorDetails.version,
      }
    );

    if (res) {
      setLoading(false);
      if (res.data.success) {
        form.resetFields();
        dispatch(setVendorDetailsListIsUpdated({ isUpdated: true }));

        if (vendorDetailsUpdateElSelector) {
          navigate("/vendor/add-vendor-details/" + params.id);
        }
      }
    }
  };

  useEffect(() => {
    if (params.id) {
    } else {
      navigate("/vendor");
    }
  }, [params, navigate]);

  return (
    <div className="mt-3">
      <div className="mx-auto p-3 bg-white shadow-md rounded-lg mt-3 w-full">
        <div className="flex gap-2 items-center">
          <Button
            className="bg-gray-200 rounded-full w-9 h-9"
            onClick={() => {
              if (params.id)
                navigate("/vendor/add-vendor-details/" + params.id);
              else navigate("/vendor");
            }}
          >
            <ArrowLeftOutlined />
          </Button>

          <div className="text-d9 text-2xl w-full flex items-end justify-between ">
            <div className="font-bold">
              {vendorDetailsUpdateElSelector
                ? "Update Vendor Details"
                : "Vendor Details"}
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
            {/* <Form.Item
              label={<div className="font-semibold">Asset Main Type</div>}
              name="main_type"
              rules={[{ required: true, message: "Please enter main type" }]}
              className="mb-4"
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Option value="Sanitation">Sanitation</Option>
                <Option value="Tentage">Tentage</Option>
              </Select>
            </Form.Item> */}

            <CommonFormDropDownMaker
              uri={"assetMainTypePerPage"}
              responseListName="assetmaintypes"
              responseLabelName="name"
              responseIdName="asset_main_type_id"
              selectLabel={"Asset Main Type"}
              selectName={"asset_main_type_id"}
              required={true}
              RequiredMessage={"Main type is required!"}
            ></CommonFormDropDownMaker>

            <Form.Item
              label={<div className="font-semibold">Asset Type</div>}
              name="asset_type_id"
              rules={[{ required: true, message: "Please enter asset type" }]}
              className="mb-4"
            >
              <Select
                showSearch
                placeholder="Select Asset Type"
                optionFilterProp="children"
                style={{ width: 300 }}
              >
                {assetTypes.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
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
                format={dateFormat}
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

            <CommonFormDropDownMaker
              uri={"sectors"}
              responseListName="sectors"
              responseLabelName="name"
              responseIdName="sector_id"
              selectLabel={"Proposed Sectors"}
              selectName={"proposed_sectors"}
              required={true}
              RequiredMessage={"Please enter proposed sectors!"}
              mode={"multiple"}
            ></CommonFormDropDownMaker>
          </div>

          <div className="flex justify-end">
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="w-fit rounded-none bg-5c"
              >
                {vendorDetailsUpdateElSelector ? "Update" : "Register"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VendorDetailsForm;
