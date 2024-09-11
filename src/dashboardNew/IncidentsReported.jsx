import React from "react";
import DashboardTitle from "./DashboardTitle";
import ReactApexChart from "react-apexcharts";

const IncidentsReported = () => {
  const chartOptions = {
    chart: {
      type: "donut",
      height: "100%",
    },
    labels: ["A", "B", "C", "D"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          // size: "60%", // Adjust this size to control the space for text
        },
      },
    },

    colors: ["#4CD78E", "#6FD9A6", "#92E3BF", "#B6EAD8"], // Lighter shades of #28C76F
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        if (opts.seriesIndex === 0) {
          return "";
        }
        return "";
      },
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        colors: ["#000"],
      },
      dropShadow: {
        enabled: false,
      },
    },
  };

  const chartSeries = [40, 20, 25, 15];

  return (
    <div
      className="pie-chart flex flex-col h-full"
      style={{ width: "100%", height: "100%" }}
    >
      <DashboardTitle title="Incidents Reported" />
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={220}
      />
      <div className="flex justify-center items-center text-center font-semibold p-2 mt-auto">
        Number of sanitation related incidents reported in last 24hrs
      </div>
    </div>
  );
};

export default IncidentsReported;
