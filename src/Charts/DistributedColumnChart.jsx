import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const getFinalSLA = (selectedSector, sectorVendors) => {
  let finalObj = {};

  if (selectedSector.includes("Sector 1") || !selectedSector.length) {
    finalObj = { ...finalObj, ...sectorVendors[0] };
  }

  if (selectedSector.includes("Sector 2") || !selectedSector.length) {
    finalObj = { ...finalObj, ...sectorVendors[1] };
  }

  if (selectedSector.includes("Sector 3") || !selectedSector.length) {
    finalObj = { ...finalObj, ...sectorVendors[2] };
  }

  return finalObj;
};

const DistributedColumnChart = ({
  tentage,
  sanitization,
  wastes,
  selectedSector,
}) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const sector1Vendors = { "vendor 1": 91, "vendor 3": 70 };
    const sector2Vendors = { "vendor 2": 60, "vendor 5": 64 };
    const sector3Vendors = { "vendor 3": 45, "vendor 6": 63 };

    // if (
    //   ()
    // ) {
    const sectorVendors = [sector1Vendors, sector2Vendors, sector3Vendors];
    const finalObj = getFinalSLA(selectedSector, sectorVendors);

    setData(() => Object.values(finalObj));
    setCategories(() => Object.keys(finalObj));
    // }
    // else if (tentage && sanitization) {
    //   const data = [92, 70, 82, 94];
    //   setData(() => data);

    //   const categories = ["vendor 1", "vendor 2", "vendor 3", "vendor 4"];
    //   setCategories((prev) => categories);
    // } else if (sanitization && wastes) {
    //   const data = [82, 94, 76, 94];
    //   setData(() => data);

    //   const categories = ["vendor 3", "vendor 4", "vendor 5", "vendor 6"];
    //   setCategories(() => categories);
    // } else if (tentage && wastes) {
    //   const data = [92, 70, 76, 94];
    //   setData(() => data);

    //   const categories = ["vendor1", "vendor 2", "vendor 5", "vendor 6"];
    //   setCategories(() => categories);
    // } else if (tentage) {
    //   const data = [92, 70];
    //   setData(() => data);

    //   const categories = ["vendor 1", "vendor 2"];
    //   setCategories((prev) => categories);
    // } else if (sanitization) {
    //   const data = [82, 94];
    //   setData(() => data);

    //   const categories = ["vendor 3", "vendor 4"];
    //   setCategories(() => categories);
    // } else if (wastes) {
    //   const data = [76, 94];
    //   setData(() => data);

    //   const categories = ["vendor 5", "vendor 6"];
    //   setCategories(() => categories);
    // }
  }, [tentage, sanitization, wastes, selectedSector]);

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
        Performance SLA Compliance
        <div className="w-10/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="w-full">
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
