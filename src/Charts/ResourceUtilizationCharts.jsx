import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const getResourceCount = (sectors, selectedSectors) => {
  const finalObj = { Tentage: 0, Sanitization: 0, Wastes: 0, Bins: 0 };

  if (selectedSectors.includes("Sector 1") || !selectedSectors.length) {
    finalObj.Tentage += sectors[0].Tentage;
    finalObj.Sanitization += sectors[0].Sanitization;
    finalObj.Wastes += sectors[0].Wastes;
    finalObj.Bins += sectors[0].Bins; // Add Bins
  }

  if (selectedSectors.includes("Sector 2") || !selectedSectors.length) {
    finalObj.Tentage += sectors[1].Tentage;
    finalObj.Sanitization += sectors[1].Sanitization;
    finalObj.Wastes += sectors[1].Wastes;
    finalObj.Bins += sectors[1].Bins; // Add Bins
  }

  if (selectedSectors.includes("Sector 3") || !selectedSectors.length) {
    finalObj.Tentage += sectors[2].Tentage;
    finalObj.Sanitization += sectors[2].Sanitization;
    finalObj.Wastes += sectors[2].Wastes;
    finalObj.Bins += sectors[2].Bins; // Add Bins
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
  bins, // Add bins to props
  selectedSectors,
}) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (
      (!tentage && !sanitization && !wastes && !bins) ||
      (tentage && sanitization && wastes && bins)
    ) {
      const sector1 = {
        Tentage: 600,
        Sanitization: 500,
        Wastes: 800,
        Bins: 100,
      };
      const sector2 = {
        Tentage: 270,
        Sanitization: 350,
        Wastes: 300,
        Bins: 50,
      };
      const sector3 = {
        Tentage: 330,
        Sanitization: 250,
        Wastes: 400,
        Bins: 80,
      };

      const sector1Resources = {
        Tentage: 900 - sector1.Tentage,
        Sanitization: 1000 - sector1.Sanitization,
        Wastes: 1100 - sector1.Wastes,
        Bins: 200 - sector1.Bins, // Add Bins
      };

      const sector2Resources = {
        Tentage: 300 - sector2.Tentage,
        Sanitization: 400 - sector2.Sanitization,
        Wastes: 320 - sector2.Wastes,
        Bins: 100 - sector2.Bins, // Add Bins
      };
      const sector3Resources = {
        Tentage: 350 - sector3.Tentage,
        Sanitization: 300 - sector3.Sanitization,
        Wastes: 500 - sector3.Wastes,
        Bins: 150 - sector3.Bins, // Add Bins
      };

      const sectors = [sector1, sector2, sector3];
      const resources = [sector1Resources, sector2Resources, sector3Resources];

      const finalObj = removeKeys(
        getResourceCount(sectors, selectedSectors),
        ""
      );
      const finalObjNot = removeKeys(
        getResourceCount(resources, selectedSectors),
        ""
      );

      setData(() => [
        {
          name: "Resources Utilized",
          data: Object.values(finalObj),
        },
        {
          name: "Resources Not Utilized",
          data: Object.values(finalObjNot),
        },
      ]);
      setCategories(() => Object.keys(finalObj));
    } else if (tentage && sanitization && bins) {
      // Update logic for specific conditions involving Bins
      // ...
    } else if (tentage && wastes && bins) {
      // Update logic for specific conditions involving Bins
      // ...
    } else if (sanitization && bins) {
      // Update logic for specific conditions involving Bins
      // ...
    } else if (wastes && bins) {
      // Update logic for specific conditions involving Bins
      // ...
    } else if (tentage) {
      // Logic for tentage only
      // ...
    } else if (sanitization) {
      // Logic for sanitization only
      // ...
    } else if (wastes) {
      // Logic for wastes only
      // ...
    }
  }, [tentage, sanitization, wastes, bins, selectedSectors]);

  const series = data;

  const options = {
    chart: {
      type: "bar",
      stacked: true, // Enable stacking of columns
      toolbar: {
        show: false, // Hide the toolbar/menu
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Keep bars vertical
        borderRadius: 4, // Rounded corners
        columnWidth: "60%", // Adjust the width of the columns
      },
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
    fill: {
      opacity: 1,
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"], // Add color for Bins
    dataLabels: {
      enabled: true, // Show data labels on each bar
      formatter: function (val) {
        return val; // Custom label format
      },
    },
  };

  return (
    <div className="">
      <div className="text-xl font-semibold text-center -mb-2 mt-1 ">
        Resource Utilization
        <div className="w-10/12 m-auto">
          <Divider className="m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="w-full ">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={330}
        />
      </div>
    </div>
  );
};

export default ResourceUtilizationCharts;
