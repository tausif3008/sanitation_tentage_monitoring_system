import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import CommonTable from "../../../commonComponents/CommonTable";
import CommonDivider from "../../../commonComponents/CommonDivider";
import URLS from "../../../urils/URLS";
import { useNavigate, useParams } from "react-router";
import { getData } from "../../../Fetch/Axios";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import VendorDetailsForm from "./VendorDetailsForm";
import { Link } from "react-router-dom";
import { ListFormContextVendorDetails } from "./ListFormContextVendorDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  setUpdateVendorDetailsEl,
  setVendorDetailsListIsUpdated,
} from "./vendorDetailsSlice";

const columns = [
  {
    title: "Main Type",
    dataIndex: "main_type",
    key: "main_type",
  },
  {
    title: "Asset Type",
    dataIndex: "asset_type",
    key: "asset_type",
  },
  {
    title: "Contract Number",
    dataIndex: "contract_number",
    key: "contract_number",
  },
  {
    title: "Manager Contact 1",
    dataIndex: "manager_contact_1",
    key: "manager_contact_1",
  },
  {
    title: "Manager Contact 2",
    dataIndex: "manager_contact_2",
    key: "manager_contact_2",
  },
  {
    title: "Work Order Number",
    dataIndex: "work_order_number",
    key: "work_order_number",
  },
  {
    title: "Date of Allocation",
    dataIndex: "date_of_allocation",
    key: "date_of_allocation",
  },
  {
    title: "Total Allotted Quantity",
    dataIndex: "total_allotted_quantity",
    key: "total_allotted_quantity",
  },
  {
    title: "Proposed Sectors",
    dataIndex: "proposed_sectors",
    key: "proposed_sectors",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 80,
  },
];

const VendorDetails = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const params = useParams();

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.vendorDetails.path + params.id + "&";
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const res = await getData(uri, {
      "x-api-version": URLS.vendorDetails.version,
    });

    if (res) {
      const data = res.data;
      setLoading(false);

      const list = data.userdetails.map((el, index) => {
        return {
          ...el,
          action: (
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                dispatch(setUpdateVendorDetailsEl({ updateElement: el }));
                navigate("/vendor/add-vendor-details-form/" + params.id);
              }}
            >
              <EditOutlined></EditOutlined>
            </Button>
          ),
        };
      });

      setDetails(() => {
        return {
          list,
          pageLength: data.paging[0].length,
          currentPage: data.paging[0].currentPage,
          totalRecords: data.paging[0].totalrecords,
        };
      });
    }
  };

  const isUpdatedSelector = useSelector(
    (state) => state.vendorDetailsUpdateEl?.isUpdated
  );

  useEffect(() => {
    dispatch(setUpdateVendorDetailsEl({ updateElement: null }));
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      getDetails();
      if (isUpdatedSelector) {
        dispatch(setVendorDetailsListIsUpdated({ isUpdated: false }));
      }
    } else {
      navigate("/vendor");
    }
  }, [params, isUpdatedSelector]);

  return (
    <div className="">
      <>
        <div className="flex gap-2 items-center ">
          <Link to="/vendor">
            <Button className="bg-gray-200 rounded-full w-9 h-9">
              <ArrowLeftOutlined />
            </Button>
          </Link>
          <div className="w-full">
            <CommonDivider
              label={"Vendor Details"}
              compo={
                <Button
                  className="bg-orange-300 mb-1"
                  onClick={() => {
                    navigate("/vendor/add-vendor-details-form/" + params.id);
                  }}
                >
                  Add Details
                </Button>
              }
            ></CommonDivider>
          </div>
        </div>

        <CommonTable
          columns={columns}
          uri={"vendor/add-details/" + params.id} // react url
          details={details}
          loading={loading}
        ></CommonTable>
      </>
    </div>
  );
};

export default VendorDetails;
