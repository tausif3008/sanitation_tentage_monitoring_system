import React, { useEffect, useState } from "react";
import { Table, Image, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import UserRegistrationForm from "./UserRegistrationForm";
import CommonTable from "../../commonComponents/CommonTable";
import CommonDivider from "../../commonComponents/CommonDivider";
import { getData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";

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
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 70,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 80,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Assigned Role",
    dataIndex: "assignRole",
    key: "assignRole",
  },
  {
    title: "Assigned Center",
    dataIndex: "assignCenter",
    key: "assignCenter",
  },
];

const UserList = () => {
  const [isUserList, setIsUserList] = useState(false);
  const [userDetails, setUserDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const params = useParams();

  const getUsers = async () => {
    let uri = URLS.users.path + "/?";
    console.log(uri);
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }
    console.log("seturl == ", uri);

    const extraHeaders = { "x-api-version": URLS.users.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;
      const pagination = data.paging;
      console.log(data, pagination[0]);

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
