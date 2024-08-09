import { Divider } from "antd";
import React from "react";

const CommonDivider = ({ label }) => {
  return (
    <>
      <div className="text-green-700 font-semibold text-2xl mt-3 ">{label}</div>
      <Divider className="bg-green-500 mt-0 mb-3" />
    </>
  );
};

export default CommonDivider;
