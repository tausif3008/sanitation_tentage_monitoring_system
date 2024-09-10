import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import MapData from "./MapData";

const LineChartWithArea = () => {
  const [data, setData] = useState([
    {
      type: "Type 1",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 2",
      "Toilet With Septic Tank": 550,
      "Fully Functional": 550,
      "Cleanliness Index": 550,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 3",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 4",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 5",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 6",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 7",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 8",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
    {
      type: "Type 9",
      "Toilet With Septic Tank": 530,
      "Fully Functional": 520,
      "Cleanliness Index": 520,
      "Avg. Response Time": "1.30 hrs",
      "Incident Reported": 5,
    },
  ]);

  const chartData = {
    series: [
      {
        name: "Total",
        data: [54000, 53000, 55000, 52000, 54000, 51000, 53000, 55000, 52000], // Replace with your actual data
      },
      {
        name: "Operational",
        data: [51330, 52000, 50000, 48000, 53000, 49000, 47000, 49000, 51000], // Replace with your actual data
      },
    ],
    options: {
      chart: {
        type: "area", // Set chart type to 'area'
        height: 350,
        toolbar: {
          show: true,
        },
      },
      fill: {
        type: "solid", // Solid fill
        opacity: 0.4, // Adjust opacity as needed (higher value for more solid color)
      },
      stroke: {
        curve: "smooth", // Smooth curve for the lines
        width: 2, // Line width
      },
      colors: ["#10B981", "#3B82F6"], // Line colors, also applied to the fill automatically
      title: {
        text: "Sanitation",
        align: "left",
      },
      xaxis: {
        categories: [
          "Type 1",
          "Type 2",
          "Type 3",
          "Type 4",
          "Type 5",
          "Type 6",
          "Type 7",
          "Type 8",
          "Type 9",
        ],
        // title: {
        //   text: "Facility Type",
        // },
      },
      // yaxis: {
      //   title: {
      //     text: "Number of Facilities",
      //   },
      // },
      tooltip: {
        // shared: false, // Disable shared tooltip
        y: {
          formatter: (val, opts) => {
            const dataPointIndex = opts.dataPointIndex;

            // Replace these values with actual data as needed
            const facilityDetails = data[dataPointIndex];

            return `
            <div style="border-radius: 5px; padding: 3px; width:200px ">
              <div>
                <div style="display: flex; justify-content: space-between; gap-2">
                  <span>Toilet with septic tank</span>
                  <span>${facilityDetails["Toilet With Septic Tank"]}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Fully Functional</span>
                  <span>${facilityDetails["Fully Functional"]}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Cleanliness Index</span>
                  <span>${facilityDetails["Cleanliness Index"]}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Avg. Response time</span>
                  <span style="">${facilityDetails["Avg. Response Time"]}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Incident reported</span>
                  <span>${facilityDetails["Incident Reported"]}</span>
                </div>
              </div>
            </div>`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <div className="pr-2 pt-1">
        <style>
          {`
          .apexcharts-tooltip-text-y-label {
            display: none !important;
          }
        `}
        </style>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={360}
        />
      </div>
    </div>
  );
};

export default LineChartWithArea;
