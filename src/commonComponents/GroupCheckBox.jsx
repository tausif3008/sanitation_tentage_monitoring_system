import { Checkbox } from "antd";
import React from "react";

const GroupCheckBox = ({ setSelectedDashboardVals }) => {
  const plainOptions = ["Tentage", "Sanitization", "Wastes"];

  const onChange = (checkedValues) => {
    if (checkedValues.length) {
      setSelectedDashboardVals(() => [...checkedValues]);
    } else {
      setSelectedDashboardVals(() => [...plainOptions]);
    }
  };

  return (
    <div>
      <Checkbox.Group options={plainOptions} onChange={onChange} />
    </div>
  );
};

export default GroupCheckBox;
