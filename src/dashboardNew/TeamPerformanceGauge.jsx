import React from "react";
import ReactApexChart from "react-apexcharts";

const TeamPerformanceGauge = () => {
  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 15,
          size: "60%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            color: "#6c757d",
            offsetY: -10,
            text: "Weekly Performance",
          },
          value: {
            show: true,
            fontSize: "24px",
            color: "#333",
            formatter: (val) => `${val}%`,
          },
          total: {
            show: false,
            label: "70%",
            color: "#6c757d",
            formatter: function (w) {
              return "280 tasks out of 320";
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Alpha"],
    colors: ["#FFA500"], // Orange color for the bar
  };

  const series = [78]; // Percentage value for the radial bar
  
  return (
    <div className="w-5/12 flex justify-center text-center flex-col">
      <div className=" font-semibold">Team Alpha</div>
      <div className="text-lg ">Weekly Performance</div>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
};

export default TeamPerformanceGauge;
