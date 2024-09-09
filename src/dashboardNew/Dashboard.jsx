import React from "react";
import LineChartWithArea from "./LineChartWithArea";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 mx-3 mt-3">
      <div className="col-span-3 border">
        <LineChartWithArea></LineChartWithArea>
      </div>
      <div className="w-full border"></div>
    </div>
  );
};

export default Dashboard;
