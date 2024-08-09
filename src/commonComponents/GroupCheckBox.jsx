import { Checkbox } from "antd";
import React from "react";

const GroupCheckBox = ({ setShowDashboardFor }) => {
  const onChange = (checkedValues) => {
    const details = [];

    if (checkedValues.includes("Tentage")) {
      details.push({
        title: "Tentage",
        value: {
          label: "Toilets",
          total: 1000,
          ok: "500",
          average: "300",
          bad: "200",
        },
      });
    }

    if (checkedValues.includes("Sanitization")) {
      details.push({
        title: "Sanitization",
        value: {
          label: "Tentage",
          total: 900,
          ok: "400",
          average: "300",
          bad: "200",
        },
      });
    }

    if (checkedValues.includes("Wastes")) {
      details.push({
        title: "Wastes",
        value: {
          label: "Sanitization",
          total: 8000,
          ok: "300",
          average: "300",
          bad: "200",
        },
      });
    }
    setShowDashboardFor(() => {
      return {
        dashboards: checkedValues.length,
        names: details,
      };
    });
  };

  const plainOptions = ["Tentage", "Sanitization", "Wastes"];

  return (
    <div>
      <Checkbox.Group options={plainOptions} onChange={onChange} />
    </div>
  );
};

export default GroupCheckBox;
