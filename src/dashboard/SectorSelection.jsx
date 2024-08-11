import { Checkbox } from "antd";
import React from "react";

const SectorSelection = ({ setSectors }) => {
  const plainOptions = ["Sector 1", "Sector 2", "Sector 3"];

  const onChange = (checkedValues) => {
    if (!checkedValues.length) {
      setSectors(() => [...plainOptions]);
    } else {
      setSectors(() => checkedValues);
    }
  };

  return (
    <div>
      <Checkbox.Group options={plainOptions} onChange={onChange} />
    </div>
  );
};

export default SectorSelection;
