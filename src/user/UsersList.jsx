import React, { useState } from "react";
import { Table, Image, Button } from "antd";
import { Link } from "react-router-dom";
import UserRegistrationForm from "./UserRegistrationForm";
import CommonTable from "../commonComponents/CommonTable";
import CommonDivider from "../commonComponents/CommonDivider";

const data = [
  {
    name: "Sudarshan",
    email: "sudarshanmane2110@gmail.com",
    contactNumber: "9370105149",
    age: 24,
    gender: "Male",
    address: "Opposite of incometax department, behind s kumar wadewale",
    username: "sudarshan",
    password: "123456",
    assignRole: "mis",
    assignCenter: "center1",
    image: "blob:http://localhost:3000/4c04d16c-b3de-45d0-ab3c-54de81e1fdc4",
  },
];

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
  const usersLocal = JSON.parse(localStorage.getItem("userRegistration")) || [];
  const [isUserList, setIsUserList] = useState(false);
  const [userList, setUserList] = useState(usersLocal);

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
            columns={columns}
            dataSource={[...userList, ...userList, ...userList, ...userList]}
          ></CommonTable>
        </>
      )}
      {isUserList && <UserRegistrationForm></UserRegistrationForm>}
    </div>
  );
};

export default UserList;
