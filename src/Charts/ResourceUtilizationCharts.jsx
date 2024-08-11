import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const getResourceCount = (sectors, selectedSectors) => {
  const finalObj = { Tentage: 0, Sanitization: 0, Wastes: 0 };

  if (selectedSectors.includes("Sector 1") || !selectedSectors.length) {
    finalObj.Tentage = finalObj.Tentage + sectors[0].Tentage;
    finalObj.Sanitization = finalObj.Sanitization + sectors[0].Sanitization;
    finalObj.Wastes = finalObj.Wastes + sectors[0].Wastes;
  }

  if (selectedSectors.includes("Sector 2") || !selectedSectors.length) {
    finalObj.Tentage = finalObj.Tentage + sectors[1].Tentage;
    finalObj.Sanitization = finalObj.Sanitization + sectors[1].Sanitization;
    finalObj.Wastes = finalObj.Wastes + sectors[1].Wastes;
  }

  if (selectedSectors.includes("Sector 3") || !selectedSectors.length) {
    finalObj.Tentage = finalObj.Tentage + sectors[2].Tentage;
    finalObj.Sanitization = finalObj.Sanitization + sectors[2].Sanitization;
    finalObj.Wastes = finalObj.Wastes + sectors[2].Wastes;
  }
  return finalObj;
};

const removeKeys = (obj, keys) => {
  for (const el of keys) {
    delete obj[el];
  }

  return obj;
};

const ResourceUtilizationCharts = ({
  totalCats,
  tentage,
  sanitization,
  wastes,
  selectedSectors,
}) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (
      (!tentage && !sanitization && !wastes) ||
      (tentage && sanitization && wastes)
    ) {
      const sector1 = { Tentage: 600, Sanitization: 500, Wastes: 800 };
      const sector2 = { Tentage: 270, Sanitization: 350, Wastes: 300 };
      const sector3 = { Tentage: 330, Sanitization: 250, Wastes: 400 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = getResourceCount(sectors, selectedSectors);

      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (tentage && sanitization) {
      const sector1 = { Tentage: 600, Sanitization: 500, Wastes: 0 };
      const sector2 = { Tentage: 270, Sanitization: 350, Wastes: 0 };
      const sector3 = { Tentage: 330, Sanitization: 250, Wastes: 0 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Wastes",
      ]);

      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (sanitization && wastes) {
      const sector1 = { Tentage: 0, Sanitization: 500, Wastes: 800 };
      const sector2 = { Tentage: 0, Sanitization: 350, Wastes: 300 };
      const sector3 = { Tentage: 0, Sanitization: 250, Wastes: 400 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Tentage",
      ]);

      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (tentage && wastes) {
      const sector1 = { Tentage: 600, Sanitization: 0, Wastes: 800 };
      const sector2 = { Tentage: 270, Sanitization: 0, Wastes: 300 };
      const sector3 = { Tentage: 330, Sanitization: 0, Wastes: 400 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Sanitization",
      ]);
      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (tentage) {
      const sector1 = { Tentage: 600, Sanitization: 0, Wastes: 0 };
      const sector2 = { Tentage: 270, Sanitization: 0, Wastes: 0 };
      const sector3 = { Tentage: 330, Sanitization: 0, Wastes: 0 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Sanitization",
        "Wastes",
      ]);
      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (sanitization) {
      const sector1 = { Tentage: 0, Sanitization: 500, Wastes: 0 };
      const sector2 = { Tentage: 0, Sanitization: 350, Wastes: 0 };
      const sector3 = { Tentage: 0, Sanitization: 250, Wastes: 0 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Tentage",
        "Wastes",
      ]);

      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    } else if (wastes) {
      const sector1 = { Tentage: 0, Sanitization: 0, Wastes: 800 };
      const sector2 = { Tentage: 0, Sanitization: 0, Wastes: 300 };
      const sector3 = { Tentage: 0, Sanitization: 0, Wastes: 400 };

      const sectors = [sector1, sector2, sector3];

      const finalObj = removeKeys(getResourceCount(sectors, selectedSectors), [
        "Sanitization",
        "Tentage",
      ]);

      setData(() => Object.values(finalObj));
      setCategories(() => Object.keys(finalObj));
    }
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
        Resource Utilization
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

export default ResourceUtilizationCharts;
