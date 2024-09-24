import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AppError = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="p-3 flex justify-center items-center border rounded flex-col flex-wrap ">
        <span className="mb-2">Page Not Found</span>
        <Link to="/">
          <Button className="bg-lime-500 font-semibold">Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default AppError;
