import { Divider, Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import toiletLogo from "../assets/MonitoringImages/Dashboard/toiletLogo.png";
const formatter = (value) => <CountUp end={value} separator="," />;

const StackedColumnChart = ({ showDashboardFor }) => {
  const content = showDashboardFor.names;

  return (
    <div className="h-full w-full border">
      {showDashboardFor.dashboards === 3 && (
        <div className="border h-full flex flex-col p-2 ">
          <SingleSanitization
            content={content[0]}
            className="border-y-2  border-dashed border-gray-300"
          ></SingleSanitization>
          <SingleSanitization
            content={content[1]}
            className="border-b-2  border-dashed border-gray-300"
          ></SingleSanitization>
          <SingleSanitization
            content={content[2]}
            className="border-b-2  border-dashed border-gray-300"
          ></SingleSanitization>
        </div>
      )}

      {showDashboardFor.dashboards === 2 && (
        <div className="flex items-center w-full justify-center h-full">
          <div className="flex flex-col w-full m-2 items-center justify-center h-fit gap-2">
            <SingleSanitization
              content={content[0]}
              matrices={showDashboardFor.dashboards}
            ></SingleSanitization>
            <SingleSanitization
              content={content[1]}
              matrices={showDashboardFor.dashboards}
            ></SingleSanitization>
          </div>
        </div>
      )}
      {showDashboardFor.dashboards === 1 && (
        <div className=" border-black h-full">
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
  const statistics = (
    <div className="flex flex-col items-center justify-center mr-2 w-full">
      <Statistic value={content.value.total} formatter={formatter} />
      <span className="text-2xl">{content.title}</span>
    </div>
  );

  return (
    <div className="flex items-center w-full justify-center h-full">
      <div
        className={`w-full bg-sky-100 h-full ${className} ${
          matrices === 3 && "grid grid-cols-2 justify-between"
        } ${
          matrices === 1 &&
          "flex flex-col justify-center items-center  p-2 border border-green-500"
        } ${
          matrices === 2 &&
          "grid grid-cols-2 border border-gray-700 justify-center items-center"
        }`}
      >
        {matrices !== 1 && (
          <div
            className={`bg-sky-100 flex flex-col w-full ${
              matrices === 2
                ? "justify w-fit items-center ml-2"
                : " justify-center items-center "
            }`}
          >
            {statistics}
          </div>
        )}
        {matrices === 1 && (
          <div
            className={` bg-teal-400 flex justify-between items-center w-full`}
          >
            <img src={toiletLogo} alt="" className="h-12" srcset="" />
            {statistics}
          </div>
        )}

        <div className={"flex flex-col w-full text-sm text-center"}>
          <div className="bg-green-800 text-white px-4 py-1 ">
            Ok - {content.value.ok}
          </div>
          <div className="bg-yellow-500 text-white px-4 py-1">
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
