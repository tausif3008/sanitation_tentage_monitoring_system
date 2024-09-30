import React from "react";
import ReactApexChart from "react-apexcharts";

const Tippers = () => {
  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#F0F0F0", // Color of the non-remaining 22%
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#F0F0F0	",
            opacity: 1,
            blur: 4,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      colors: ["#ff9900"], // Set the color of the radial bar to orange
    },
    labels: ["Average Results"],
  };

  const series = [78]; // Percentage value for the radial bar

  return (
    <div className="w-full border flex justify-center text-start p-2 flex-col">
      <div className=" font-semibold -mt-0">120</div>
      <div className="text-lg">Tippers</div>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={160}
      />
      <div className="text-sm text-gray-400 -mt-2 text-center">
        108 Tippers are fully functional
      </div>
    </div>
  );
};

export default Tippers;
