import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import optionsMaker from "../urils/OptionMaker";

const CommonFormDropDownMaker = ({
  form,
  selectLabel,
  selectName,
  required,
  RequiredMessage,
  uri,
  responseListName,
  responseLabelName,
  responseIdName,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    optionsMaker(
      uri,
      responseListName,
      responseLabelName,
      setOptions,
      "",
      responseIdName
    );
  }, []);

  return (
    <Form.Item
      label={<div className="font-semibold">{selectLabel}</div>}
      name={selectName}
      rules={[{ required, message: RequiredMessage }]}
      className="mb-4"
    >
      <Select placeholder="Select Main Asset Type" allowClear>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CommonFormDropDownMaker;
const { Option } = Select;
