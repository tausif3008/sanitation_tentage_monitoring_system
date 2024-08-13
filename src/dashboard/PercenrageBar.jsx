import React from "react";

const VerticalPercentageBar = ({ good, average, bad }) => {
  const total = good + average + bad;

  const goodPercentage = (good / total) * 100;
  const averagePercentage = (average / total) * 100;
  const badPercentage = (bad / total) * 100;

  return (
    <div className="w-14 bg-gray-200 rounded-lg overflow-hidden h-28 flex flex-col-reverse">
      <div
        className="bg-green-500 flex w-full justify-center items-center"
        style={{ height: `${goodPercentage}%` }}
      >
        {goodPercentage > 5 && (
          <div className="text-white text-xs p-1">
            {`${goodPercentage.toFixed(0)}%`}
          </div>
        )}
      </div>
      <div
        className="bg-yellow-500 flex w-full justify-center items-center"
        style={{ height: `${averagePercentage}%` }}
      >
        {averagePercentage > 5 && (
          <div className="text-white text-xs p-1">
            {` ${averagePercentage.toFixed(0)}%`}
          </div>
        )}
      </div>
      <div
        className="bg-red-500 flex w-full justify-center items-center"
        style={{ height: `${badPercentage}%` }}
      >
        {badPercentage > 5 && (
          <div className="text-white text-xs p-1">
            {`${badPercentage.toFixed(0)}%`}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalPercentageBar;
