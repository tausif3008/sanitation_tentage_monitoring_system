import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function generateAllSeries(
  data,
  tentage,
  sanitization,
  bins,
  wastes,
  selectedSectors
) {
  const allSeries = { tentage: [], sanitization: [], wastes: [], bins: [] };

  const series = [
    {
      name: "Good",
      data: [20, 30, 25, 40],
    },
    {
      name: "Average",
      data: [40, 30, 35, 30],
    },
    {
      name: "Poor",
      data: [40, 40, 40, 30],
    },
  ];

  for (const el of data) {
    if (selectedSectors.includes(el.sector)) {
      if (tentage) {
        allSeries.tentage.push(Object.values(el.sections.tentage));
      } else {
        allSeries.tentage.push([0, 0, 0, 0]);
      }

      if (sanitization) {
        allSeries.sanitization.push(Object.values(el.sections.sanitization));
      } else {
        allSeries.sanitization.push([0, 0, 0, 0]);
      }

      if (wastes) {
        allSeries.wastes.push(Object.values(el.sections.wastes));
      } else {
        allSeries.wastes.push([0, 0, 0, 0]);
      }

      if (bins) {
        allSeries.bins.push(Object.values(el.sections.bins));
      } else {
        allSeries.bins.push([0, 0, 0, 0]);
      }
    }
  }

  let vals = [];

  for (const el in allSeries) {
    const avg = [0, 0, 0, 0];

    for (let i = 0; i < allSeries[el].length; i++) {
      if (allSeries[el][i][0]) {
        for (let j = 0; j < allSeries[el][i].length; j++) {
          avg[j] = avg[j] + allSeries[el][i][j];
        }
      }
    }

    for (let k = 0; k < avg.length; k++) {
      avg[k] = Math.floor(avg[k] / 4);
    }

    vals.push(avg);
  }

  return vals;
}

const RatingChart = ({
  tentage,
  sanitization,
  bins,
  wastes,
  selectedSectors,
}) => {
  const [series, setSeries] = useState([
    {
      name: "Good",
      data: [20, 30, 25, 40],
    },
    {
      name: "Average",
      data: [40, 30, 35, 30],
    },
    {
      name: "Poor",
      data: [40, 40, 40, 30],
    },
  ]);

  useEffect(() => {
    const tentData = [
      {
        sector: "Sector 1",
        sections: {
          tentage: { good: 30, average: 20, poor: 30 },
          sanitization: { good: 26, average: 30, poor: 30 },
          wastes: { good: 25, average: 40, poor: 40 },
          bins: { good: 32, average: 39, poor: 25 },
        },
      },
      {
        sector: "Sector 2",
        sections: {
          tentage: { good: 16, average: 32, poor: 55 },
          sanitization: { good: 25, average: 16, poor: 35 },
          wastes: { good: 26, average: 30, poor: 30 },
          bins: { good: 25, average: 25, poor: 26 },
        },
      },
      {
        sector: "Sector 3",
        sections: {
          tentage: { good: 65, average: 26, poor: 30 },
          sanitization: { good: 60, average: 25, poor: 55 },
          wastes: { good: 30, average: 20, poor: 30 },
          bins: { good: 26, average: 36, poor: 30 },
        },
      },
    ];

    const allSeries = generateAllSeries(
      tentData,
      tentage,
      sanitization,
      bins,
      wastes,
      selectedSectors
    );

    setSeries(() => [
      {
        name: "Good",
        data: [
          allSeries[0][0],
          allSeries[1][0],
          allSeries[2][0],
          allSeries[3][0],
        ],
      },
      {
        name: "Average",
        data: [
          allSeries[0][1],
          allSeries[1][1],
          allSeries[2][1],
          allSeries[3][1],
        ],
      },
      {
        name: "Poor",
        data: [
          allSeries[0][2],
          allSeries[1][2],
          allSeries[2][2],
          allSeries[3][2],
        ],
      },
    ]);
  }, [tentage, sanitization, bins, wastes, selectedSectors]);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Horizontal bars
        barHeight: "50%", // Height of the bars
        borderRadius: 4, // Rounded corners for bars
      },
    },
    xaxis: {
      categories: ["Sanitization", "Tentage", "Wastes", "Bins"],
      labels: {
        formatter: function (val) {
          return val + "%"; // Label format with percentage
        },
        style: {
          fontSize: "14px", // Font size for labels
          colors: ["#000"], // Text color
        },
      },
      axisBorder: {
        show: false, // Hide the axis border
      },
      axisTicks: {
        show: false, // Hide the axis ticks
      },
      grid: {
        show: false, // Hide the gridlines
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px", // Font size for labels
          colors: ["#000"], // Text color
        },
      },
      axisBorder: {
        show: true, // Hide the axis border
      },
      axisTicks: {
        show: true, // Hide the axis ticks
      },
      grid: {
        show: true, // Hide the gridlines
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#FF4560", "#00E396", "#008FFB"], // Colors for the bars
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%"; // Display percentage on bars
      },
      style: {
        fontSize: "12px",
        colors: ["#fff"], // White text color for data labels
      },
    },
  };

  return (
    <div>
      <div className="text-xl font-semibold text-center h-full -mb-3 mt-1 ">
        Users Feedback
        <div className="w-10/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={330}
      />
    </div>
  );
};

export default RatingChart;
