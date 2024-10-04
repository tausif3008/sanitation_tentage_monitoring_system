import React from "react";
import { Badge, Select } from "antd";
import notificationIcon from "../assets/Dashboard/notification.png";
import calenderIcon from "../assets/Dashboard/calendarIcon.png";
import loginIcon from "../assets/Dashboard/logInIcon.png";
import { useNavigate } from "react-router-dom";
import logOutIcon from "../assets/Dashboard/logOutIcon.png";

const NavHead = ({ lang, dict }) => {
  const myDate = new Date();

  // Format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const navigate = useNavigate();
  const formattedDate = myDate.toLocaleDateString("en-GB", options);
  let token = localStorage.getItem("sessionToken");

  return (
    <div className="relative top-0 mx-3 bg-orange-400 font-nutino">
      <div className="font-merriweather flex justify-around w-full m-auto p-2 px-1 md:px-3">
        <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-between items-center">
          <div className="hidden text-sm bg-white h-8 font-thin p-1 px-2 md:flex gap-1 justify-center items-center rounded">
            <img src={calenderIcon} alt="" />
            <span className="text-xs font-nutino flex justify-center items-center ">
              {formattedDate}
            </span>
          </div>
          <div className="text-white font-nutino">Kumbh Mela 2025</div>
          <div className="flex gap-2">
            <div className="h-full">
              <Select
                className="rounded-md h-8  "
                style={{ width: "59px" }}
                defaultValue={"en"}
                options={[
                  { label: "EN", value: "en" },
                  { label: "HI", value: "hi" },
                ]}
              ></Select>
            </div>
            <div className=" bg-white flex justify-center items-center rounded w-12">
              <div className="flex justify-center items-center">
                <Badge size="small" status="success" offset={[7, 0]} count={5}>
                  <img
                    className="h-5"
                    src={notificationIcon}
                    alt="searchIcon"
                  ></img>
                </Badge>
              </div>
            </div>
            <div
              onClick={() => {
                if (token) {
                  localStorage.clear();
                  setTimeout(() => {
                    navigate("/");
                  }, 200);
                } else {
                  navigate("/login");
                }
              }}
              className="text-sm font-thin p-1 px-2 flex gap-1 justify-center items-center rounded h-8 bg-white"
            >
              <img
                className="h-5"
                src={token ? logOutIcon : loginIcon}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHead;
