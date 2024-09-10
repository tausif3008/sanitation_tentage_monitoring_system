import React from "react";
import LineChartWithArea from "./LineChartWithArea";
import TypeList from "./TypeList";
import MapData from "./MapData";
import FacilityDetails from "./FacilityDetails";
import CleanlinessScoreGauge from "./CleanlinessScoreGauge";
import ResponseTimeChart from "./ResponseTimeChart";
import IncidentsReported from "./IncidentsReported";
import DashboardCalender from "./DashboardCalender";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 mx-3 mt-3 gap-2 ">
      <div className="col-span-3 border shadow-md ">
        <LineChartWithArea></LineChartWithArea>
      </div>
      <div className="w-full border shadow-md bg-white">
        <TypeList></TypeList>
      </div>
      <div className="col-span-4 shadow-md bg-white">
        <FacilityDetails></FacilityDetails>
      </div>
      <div className="col-span-4 shadow-md bg-white">
        <MapData></MapData>
      </div>
      <div className="col-span-1 border">
        <CleanlinessScoreGauge></CleanlinessScoreGauge>
      </div>
      <div className="col-span-1 border">
        <IncidentsReported></IncidentsReported>
      </div>
      <div className="col-span-2 border">
        <ResponseTimeChart></ResponseTimeChart>
      </div>
      <div className="col-span-4">
        <DashboardCalender></DashboardCalender>
      </div>
    </div>
  );
};

export default Dashboard;
