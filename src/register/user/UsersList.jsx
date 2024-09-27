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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title: "Image",
  //   dataIndex: "image",
  //   key: "image",
  //   render: (text) => <Image src={text} alt="User Image" width={100} />,
  // },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact Number",
    dataIndex: "phone",
    key: "contactNumber",
  },

  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (val) => {
      if (val === "undefine") {
        return "-";
      }
    },
  },

  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "User Type",
    dataIndex: "user_type",
    key: "user_type",
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
      const pagination = data.paging;
      console.log(data, pagination[0]);
      setLoading(false);

      setUserDetails(() => {
        return {
          list: data.users,
          pageLength: data.paging[0].length,
          currentPage: data.paging[0].currentPage,
          totalRecords: data.paging[0].totalrecords,
        };
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [params]);

  return (
    <div className="">
      {!isUserList && (
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
            uri={URLS.users.path}
            columns={columns}
            details={userDetails}
            setUserDetails={setUserDetails}
          ></CommonTable>
        </>
      )}
      {isUserList && <UserRegistrationForm></UserRegistrationForm>}
    </div>
  );
};

export default UserList;
