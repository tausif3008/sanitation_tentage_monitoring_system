import React, { useEffect, useState } from "react";
import { Table, Image, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import UserRegistrationForm from "./UserRegistrationForm";
import CommonTable from "../../commonComponents/CommonTable";
import CommonDivider from "../../commonComponents/CommonDivider";
import { getData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { useDispatch } from "react-redux";
import { increment } from "../../Redux/counterSlice";
import { EditOutlined } from "@ant-design/icons";
const getVal = (val) => {
  if (val === "undefined" || val === null) {
    return "-";
  } else {
    return val;
  }
};

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
  },
  {
    title: "Country",
    dataIndex: "country_name",
    key: "country_name",
    render: getVal,
  },
  {
    title: "State",
    dataIndex: "state_name",
    key: "state_name",
    render: getVal,
  },
  {
    title: "City",
    dataIndex: "city_name",
    key: "city_type",
    render: getVal,
  },
  {
    title: "User Type",
    dataIndex: "user_type",
    key: "user_type",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 300,
    key: "address",
    render: (val) => {
      if (val === "undefined") {
        return "-";
      } else {
        return val;
      }
    },
  },

  {
    title: "User Type",
    dataIndex: "user_type",
    key: "user_type",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
  },
];

const UserList = () => {
  const [isUserList, setIsUserList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);

  const params = useParams();

  const getUsers = async () => {
    setLoading(true);

    let uri = URLS.users.path + "/?";
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
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                setUpdateDetails(el);
              }}
            >
              <EditOutlined></EditOutlined>
            </Button>
          ),
        };
      });

      setUserDetails(() => {
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
    getUsers();
  }, [params, updated]);

  return (
    <div className="">
      {!isUserList && !updateDetails && (
        <>
          <CommonDivider
            label={"User List"}
            compo={
              <Button
                onClick={() => setIsUserList(true)}
                className="bg-orange-300 mb-1"
              >
                Add User
              </Button>
            }
          ></CommonDivider>

          <CommonTable
            loading={loading}
            uri={"users"}
            columns={columns}
            details={userDetails}
            setUserDetails={setUserDetails}
          ></CommonTable>
        </>
      )}

      {(isUserList || updateDetails) && (
        <UserRegistrationForm
          setUpdated={setUpdated}
          updateDetails={updateDetails}
          setUpdateDetails={setUpdateDetails}
          setIsUserList={setIsUserList}
        ></UserRegistrationForm>
      )}
    </div>
  );
};

export default UserList;
