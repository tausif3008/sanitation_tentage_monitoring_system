import { Divider, Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import toiletLogo from "../assets/MonitoringImages/Dashboard/toiletLogo.png";
import waste from "../assets/MonitoringImages/Dashboard/waste.png";
import tentage from "../assets/MonitoringImages/Dashboard/tentage.png";
const formatter = (value) => <CountUp end={value} separator="," />;

const StackedColumnChart = ({ sectors, showDashboardFor }) => {
  const content = showDashboardFor.names;

  return (
    <div className="h-full w-full border">
      {showDashboardFor.dashboards === 3 && (
        <div className="border h-full flex flex-col p-2">
          <SingleSanitization
            content={content[0]}
            logo={tentage}
            className="border-y  border-dashed border-gray-400 bg-pink-200"
          ></SingleSanitization>
          <SingleSanitization
            content={content[1]}
            logo={toiletLogo}
            className="border-b  border-dashed border-gray-400 bg-green-200"
          ></SingleSanitization>
          <SingleSanitization
            content={content[2]}
            logo={waste}
            className="border-b  border-dashed border-gray-400 bg-yellow-100"
          ></SingleSanitization>
        </div>
      )}

      {showDashboardFor.dashboards === 2 && (
        <div className="flex items-center w-full justify-center h-full">
          <div className="flex flex-col w-full m-2 items-center justify-center h-fit gap-2">
            <SingleSanitization
              content={content[0]}
              matrices={showDashboardFor.dashboards}
              className="bg-green-200"
            ></SingleSanitization>
            <SingleSanitization
              content={content[1]}
              className="bg-yellow-100"
              matrices={showDashboardFor.dashboards}
            ></SingleSanitization>
          </div>
        </div>
      )}
      {showDashboardFor.dashboards === 1 && (
        <div className="h-full">
          <SingleSanitization
            matrices={showDashboardFor.dashboards}
            content={content[0]}
          ></SingleSanitization>
        </div>
      )}
    </div>
  );
};

const SingleSanitization = ({ matrices = 3, className, content }) => {
  const statistics = (center = false) => {
    return (
      <div
        className={`flex flex-col ${
          center ? "justify-end items-end" : "justify-center  items-center "
        } mr-2 w-full`}
      >
        <Statistic value={content.value.total} formatter={formatter} />
        <span className="text-2xl">{content.title}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center w-full justify-center h-full">
      <div
        className={`w-full h-full ${className} ${
          matrices === 3 && "grid grid-cols-2 justify-between"
        } ${
          matrices === 1 && "flex flex-col justify-center items-center  p-2"
        } ${
          matrices === 2 &&
          "grid grid-cols-2 border justify-center items-center"
        }`}
      >
        {matrices !== 1 && (
          <div
            className={`flex flex-col w-full ${
              matrices === 2
                ? "justify w-fit items-center ml-2"
                : " justify-center items-center "
            } ${className}`}
          >
            {statistics()}
          </div>
        )}
        {matrices === 1 && (
          <div
            className={` bg-pink-100 flex justify-between items-center w-full`}
          >
            <img
              src={
                content.title === "Sanitization"
                  ? toiletLogo
                  : content.title === "Tentage"
                  ? tentage
                  : waste
              }
              alt=""
              className={`h-12 ${content.title === "Wastes" ? "h-8" : ""}`}
            />
            {statistics(true)}
          </div>
        )}
        <div className={"flex flex-col w-full text-sm text-center"}>
          <div className="bg-green-500 text-white px-4 py-1 ">
            Ok - {content.value.ok}
          </div>
          <div className="bg-yellow-400 text-white px-4 py-1">
            Average - {content.value.average}
          </div>
          <div className="bg-red-500 text-white px-4 py-1">
            Bad - {content.value.bad}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedColumnChart;
