import React from "react";
import { NotificationFilled, SearchOutlined } from "@ant-design/icons";
import { Badge, Select } from "antd";

const NavHead = ({ lang, dict }) => {
  const myDate = new Date();

  // Format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = myDate.toLocaleDateString("en-GB", options);

  return (
    <div
      className="relative top-0 mx-3 bg-orange-400"
    >
      <div className="font-merriweather flex justify-around w-full m-auto p-2 px-4">
        <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-between">
          <div
            className="text-sm font-thin p-1 flex justify-center items-center rounded"
            style={{ background: "#EBECED", fontFamily: "Notino, sans-serif" }}
          >
            {formattedDate}
          </div>
          <div className="text-white font-nutino">Kumbh Mela 2025</div>
          <div className="flex gap-2">
            <div>
              <Select
                className="rounded-md"
                defaultValue={"en"}
                options={[
                  { label: "ENG", value: "en" },
                  { label: "Hindi", value: "hn" },
                ]}
              ></Select>
            </div>
            <div className=" bg-white flex justify-center items-center rounded w-12">
              <div className="">
                <Badge size="small" status="success" offset={[7, 0]} count={5}>
                  <NotificationFilled className="text-black"></NotificationFilled>
                </Badge>
              </div>
            </div>
            <div className=" bg-white flex justify-center items-center rounded w-12 px-3">
              <div className="">
                <SearchOutlined className="text-black"></SearchOutlined>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHead;
