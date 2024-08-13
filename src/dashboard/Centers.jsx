import { Divider, Select } from "antd";
import React, { useState } from "react";

const Centers = ({ label }) => {
  const [selectedCenter, setSelectedCenter] = useState();

  const onChange = (value) => {
    setSelectedCenter(value);
  };

  return (
    <div>
      <div className="text-xl font-semibold text-center mt-1">
        {label}
        <div className="w-11/12 m-auto">
          <Divider className=" m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>
      <div className="p-2">
        <Select
          showSearch
          placeholder="Select Center"
          optionFilterProp="label"
          onChange={onChange}
          options={[
            {
              value: "center 1",
              label: "Center 1",
            },
            {
              value: "Center 2",
              label: "Center 2",
            },
            {
              value: "Center 3",
              label: "Center 3",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Centers;
