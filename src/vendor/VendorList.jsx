import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CommonTable from "../commonComponents/CommonTable";
import CommonDivider from "../commonComponents/CommonDivider";
import URLS from "../urils/URLS";
import { useParams } from "react-router";
import { getData } from "../Fetch/Axios";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import VendorRegistrationForm from "./VendorRegistrationForm";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250,
  },

  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Pin",
    dataIndex: "pin",
    key: "pin",
  },
  {
    title: "Country",
    dataIndex: "country_name",
    key: "country_name",
  },
  {
    title: "State",
    dataIndex: "state_name",
    key: "state_name",
  },
  {
    title: "City",
    dataIndex: "city_name",
    key: "city_name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 170,
  },

  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (status) => (
  //     <Tag color={status === "1" ? "green" : "red"}>
  //       {status === "1" ? "Active" : "Inactive"}
  //     </Tag>
  //   ),
  // },
];

const VendorList = () => {
  const [isList, setIsList] = useState(false);

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);

  const params = useParams();

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.vendors.path + "&";
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const extraHeaders = { "x-api-version": URLS.users.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;
      setUpdated(false);
      setLoading(false);

      const list = data.users.map((el, index) => {
        return {
          ...el,
          action: (
            <div className="flex gap-2">
              <Button
                className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
                key={el.name + index}
                onClick={() => {
                  setUpdateDetails(el);
                }}
              >
                <EditOutlined></EditOutlined>
              </Button>
              <Link to={"/vendor/add-vendor-details/" + el.user_id}>
                <Button
                  className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
                  key={el.name + index}
                  onClick={() => {
                    setUpdateDetails(el);
                  }}
                >
                  <PlusOutlined></PlusOutlined> Details
                </Button>
              </Link>
            </div>
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

  useEffect(() => {
    getDetails();
  }, [params, updated]);

  return (
    <div className="">
      {!isList && !updateDetails && (
        <>
          <CommonDivider
            label={"Vendor List"}
            compo={
              <Button
                className="bg-orange-300 mb-1"
                onClick={() => setIsList(true)}
              >
                Add Vendor
              </Button>
            }
          ></CommonDivider>

          <CommonTable
            columns={columns}
            uri={"vendor"} // react uri
            details={details}
            loading={loading}
          ></CommonTable>
        </>
      )}

      {(isList || updateDetails) && (
        <VendorRegistrationForm
          setIsList={setIsList}
          updateDetails={updateDetails}
          setUpdateDetails={setUpdateDetails}
          setUpdated={setUpdated}
        />
      )}
    </div>
  );
};

export default VendorList;
