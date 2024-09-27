import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import optionsMaker from "../urils/OptionMaker";

const CountryStateCity = ({ setSelectedVillageId, form }) => {
  const [selectedCountryId, setSelectedCountryId] = useState();
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState();
  const [villageOptions, setVillageOptions] = useState([]);

  useEffect(() => {
    optionsMaker("country", "countries", "name", setCountryOptions, "");
  }, []);

  useEffect(() => {
    if (countryOptions.length) {
      setSelectedCountryId(
        JSON.stringify({ country_id: "82", name: "India", status: "1" })
      );
    }
  }, [countryOptions]);

  useEffect(() => {
    if (selectedCountryId) {
      const element = JSON.parse(selectedCountryId);
      const params = "?country_id=" + element.country_id;
      optionsMaker("state", "states", "name", setStateOptions, params);
      form.setFieldsValue({ country_id: selectedCountryId });
    }
  }, [selectedCountryId, form]);

  useEffect(() => {
    if (selectedStateId) {
      const element = JSON.parse(selectedStateId);

      const params =
        "?country_id=" + element.country_id + "&state_id=" + element.state_id;
      optionsMaker("city", "cities", "name", setVillageOptions, params);
    }
  }, [selectedStateId]);

  return (
    <>
      <Form.Item
        label={<div className="font-semibold">Select Country</div>}
        name="country_id"
        className="mb-4"
      >
        <Select
          showSearch
          onChange={(val) => setSelectedCountryId(() => val)}
          options={countryOptions}
          placeholder="Select Country"
          className="rounded-none "
        />
      </Form.Item>

      <Form.Item
        label={<div className="font-semibold">State</div>}
        name="state_id"
        className="mb-4"
      >
        <Select
          showSearch
          options={stateOptions}
          onChange={(val) => setSelectedStateId(() => val)}
          placeholder="Select state"
          className="rounded-none"
        />
      </Form.Item>

      <Form.Item
        label={<div className="font-semibold">City</div>}
        name="city_id"
        className="mb-4"
      >
        <Select
          showSearch
          onChange={(val) => setSelectedVillageId(() => val)}
          options={villageOptions}
          placeholder="Select city"
          className="rounded-none"
        />
      </Form.Item>
    </>
  );
};

export default CountryStateCity;
