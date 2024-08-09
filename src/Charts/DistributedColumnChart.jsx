import { Divider } from "antd";
import React from "react";
import ReactApexChart from "react-apexcharts";

const DistributedColumnChart = () => {
  const series = [
    {
      name: "Performance",
      data: [
        91, 60, 70, 64, 45,
        // 69, 80
      ],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        distributed: true, // Distribute each column
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Hide legend if not needed
    },
    xaxis: {
      categories: [
        "ven 1",
        "ven 2",
        "ven 3",
        "ven 4",
        "ven 5",
        // "ven 6",
        // "ven 7",
      ],
      labels: {
        style: {
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            // "#546E7A",
            // "#26A69A",
          ],
          fontSize: "12px",
        },
      },
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      // "#546E7A",
      // "#26A69A",
    ],
  };

  return (
    <div className="">
      <div className="text-xl font-semibold text-center -mb-3 mt-1 ">
        Performance SLA Compliance{" "}
        <div className="w-10/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="w-10/12">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={230}
        />
      </div>
    </div>
  );
};

export default DistributedColumnChart;
