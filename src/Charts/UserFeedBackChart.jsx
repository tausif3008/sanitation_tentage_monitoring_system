import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const UserFeedBackChart = ({
  totalCats,
  selectedSectors,
  tentage,
  sanitization,
  wastes,
}) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const dataBySectors = [
      {
        cat: "tentage",
        info: {
          sectors: [
            { sector: "Sector 1", users: 500 },
            { sector: "Sector 2", users: 400 },
            { sector: "Sector 3", users: 600 },
          ],
        },
      },
      {
        cat: "sanitization",
        info: {
          sectors: [
            { sector: "Sector 1", users: 700 },
            { sector: "Sector 2", users: 400 },
            { sector: "Sector 3", users: 600 },
          ],
        },
      },
      {
        cat: "wastes",
        info: {
          sectors: [
            { sector: "Sector 1", users: 1000 },
            { sector: "Sector 2", users: 400 },
            { sector: "Sector 3", users: 700 },
          ],
        },
      },
    ];

    let data = { tentage: 0, sanitization: 0, wastes: 0 };

    for (const el of dataBySectors) {
      if (tentage && el.cat === "tentage") {
        for (const element of el.info.sectors) {
          if (selectedSectors.includes(element.sector)) {
            data.tentage = data.tentage + element.users;
          }
        }
      }

      if (sanitization && el.cat === "sanitization") {
        for (const element of el.info.sectors) {
          if (selectedSectors.includes(element.sector)) {
            data.sanitization = data.sanitization + element.users;
          }
        }
      }

      if (wastes && el.cat === "wastes") {
        for (const element of el.info.sectors) {
          if (selectedSectors.includes(element.sector)) {
            data.wastes = data.wastes + element.users;
          }
        }
      }
    }

    const categories = [];
    if (data.tentage) {
      categories.push("Tentage");
    }

    if (data.sanitization) {
      categories.push("Sanitization");
    }
    if (data.wastes) {
      categories.push("Wastes");
    }

    const nums = [];

    for (const el of categories) {
      nums.push(data[el.toLowerCase()]);
    }

    setCategories(() => categories);
    setData(() => nums);
  }, [tentage, sanitization, wastes, selectedSectors]);

  const series = [
    {
      name: "Performance",
      data,
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
      categories: categories,
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
      "#546E7A",
      // "#26A69A",
    ],
  };

  return (
    <div className="">
      <div className="text-xl font-semibold text-center -mb-3 mt-1 ">
        Users Feedback
        <div className="w-10/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          width={totalCats === 3 ? "" : totalCats === 2 ? 250 : 200}
          height={230}
        />
      </div>
    </div>
  );
};

export default UserFeedBackChart;
