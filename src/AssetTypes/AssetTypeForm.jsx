// import React, { useState } from "react";
// import { Form, Input, Button, Select, Divider, message } from "antd";

// const { Option } = Select;

// const assetMainTypes = [
//   { value: "Sanitation", label: "Sanitation" },
//   { value: "Tentage", label: "Tentage" },
// ];

// const AssetTypeForm = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     console.log("Form Values:", values);

//     // Prepare data for API with default values for questions and status
//     const apiData = {
//       asset_main_type: values.assetMainType, // Assuming 'name' is the asset type (dropdown selection)
//       name: values.assetType, // Assuming this is for asset sub-type
//       description: values.assetTypeDescription || "", // Optional description
//       questions: 0, // default value
//       status: 1, // default value
//     };

//     console.log("API Data:", apiData);

//     try {
//       setLoading(true);

//       // Call the API to add the asset sub-type
//       const response = await fetch(
//         "https://kumbhtsmonitoring.in/php-api/asset-types/entry",
//         {
//           method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          //   "x-api-key": "YunHu873jHds83hRujGJKd873",
          //   "x-api-version": "1.0.1",
          //   "x-platform": "Web",
          //   "x-access-token": localStorage.getItem("sessionToken") || "",
          // },
//           body: JSON.stringify(apiData),
//         }
//       );

//       console.log("API Response:", response);

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("API Result:", result); // Log the parsed result

//       // Check if the API returned success
//       if (result.success) {
//         message.success("Asset Type added successfully!");
//         form.resetFields();
//       } else {
//         message.error(
//           result.message || "Failed to add asset type. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error adding asset type:", error);
//       message.error("Failed to add asset type. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
//       <div className="text-d9 text-2xl flex items-end justify-between">
//         <div className="font-bold"></div>
//         <div className="text-xs">All * marked fields are mandatory</div>
//       </div>
//       <Divider className="bg-d9 h-2/3 mt-1"></Divider>
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
//           {/* Asset Type Dropdown */}
//           <Form.Item
//             name="assetMainType"
//             label={<div className="font-semibold">Asset Main Type</div>}
//             rules={[
//               { required: true, message: "Please select an asset main type" },
//             ]}
//           >
//             <Select
//               placeholder="Select asset main type"
//               className="rounded-none"
//             >
//               {assetMainTypes.map((type) => (
//                 <Option key={type.value} value={type.value}>
//                   {type.label}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Asset Sub Type Textbox */}
//           <Form.Item
//             name="assetType"
//             label={<div className="font-semibold">Asset Type</div>}
//             rules={[{ required: true, message: "Please enter an asset type" }]}
//           >
//             <Input placeholder="Enter asset type" className="rounded-none" />
//           </Form.Item>

//           {/* Asset Type Description Textbox */}
//           <Form.Item
//             name="assetTypeDescription"
//             label={<div className="font-semibold">Asset Type Description</div>}
//           >
//             <Input
//               placeholder="Enter asset type description (optional)"
//               className="rounded-none"
//             />
//           </Form.Item>
//         </div>

//         <div className="flex justify-end">
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="w-fit rounded-none bg-5c"
//               loading={loading} // Show loading spinner during API call
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AssetTypeForm;
import React, { useState } from "react";
import { Form, Input, Button, Select, Divider, message } from "antd";
import { useDispatch } from "react-redux";
import { submit } from "../Redux/assetTypeSlice";

const { Option } = Select;

const assetMainTypes = [
  { value: "Sanitation", label: "Sanitation" },
  { value: "Tentage", label: "Tentage" },
  { value: "Tin", label: "Tin" },
  { value: "Furniture", label: "Furniture" },
];

const AssetTypeForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // const onFinish = async (values) => {
  //   console.log("Form Values:", values);

  //   // Prepare data for API with default values for questions and status
  //   const apiData = {
  //     asset_main_type: values.assetMainType, 
  //     name: values.name, // Correctly mapped to "name"
  //     description: values.assetTypeDescription || "", // Optional description
  //     questions: values.questions || 0, // Use form value or default to 0
  //     status: values.status || 1, // Use form value or default to 1
  //   };

  //   console.log("API Payload Data:", apiData); // Log the payload data

  //   try {
  //     setLoading(true);

  //     // Call the API to add the asset sub-type
  //     const response = await fetch(
  //       "https://kumbhtsmonitoring.in/php-api/asset-types/entry",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": "YunHu873jHds83hRujGJKd873",
  //           "x-api-version": "1.0.1",
  //           "x-platform": "Web",
  //           "x-access-token": localStorage.getItem("sessionToken") || "",
  //         },
  //         body: JSON.stringify(apiData),
  //       }
  //     );

  //     console.log("API Response:", response);

  //     const result = await response.json();
  //     console.log("Parsed API Result:", result); 

  //     if (!response.ok || !result.success) {
  //       console.error("Error Response Body:", result); 
  //       throw new Error(result.message || "Failed to add asset type.");
  //     }

  //     // If successful
  //     message.success("Asset Type added successfully!");
  //     form.resetFields();
  //   } catch (error) {
  //     console.error("Error adding asset type:", error); 
  //     message.error(error.message || "Failed to add asset type. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onFinish = async (values) => {
    console.log("Form Values:", values);

    // Prepare data for API with default values for questions and status
    const apiData = {
      asset_main_type: values.assetMainType, 
      name: values.name, // Correctly mapped to "name"
      description: values.assetTypeDescription || "", // Optional description
      questions: values.questions || 0, // Use form value or default to 0
      status: values.status || 1, // Use form value or default to 1
    };

    console.log("API Payload Data:", apiData); // Log the payload data

    dispatch(submit(apiData));
  };
  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-3 w-full">
      <div className="text-d9 text-2xl flex items-end justify-between">
        <div className="font-bold"></div>
        <div className="text-xs">All * marked fields are mandatory</div>
      </div>
      <Divider className="bg-d9 h-2/3 mt-1"></Divider>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mb-3">
          {/* Asset Main Type Dropdown */}
          <Form.Item
            name="assetMainType"
            label={<div className="font-semibold">Asset Main Type</div>}
            rules={[{ required: true, message: "Please select an asset main type" }]}
          >
            <Select
              placeholder="Select asset main type"
              className="rounded-none"
            >
              {assetMainTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Asset Sub Type Textbox */}
          <Form.Item
            name="name"
            type="text"
            label={<div className="font-semibold">Asset Type</div>}
            rules={[{ required: true, message: "Please enter an asset type" }]}
          >
            <Input placeholder="Enter asset type" className="rounded-none" />
          </Form.Item>

          {/* Asset Type Description Textbox */}
          <Form.Item
            name="assetTypeDescription"
            label={<div className="font-semibold">Asset Type Description</div>}
          >
            <Input
              placeholder="Enter asset type description (optional)"
              className="rounded-none"
            />
          </Form.Item>

          {/* Questions Field */}
          <Form.Item
            name="questions"
            label={<div className="font-semibold">Questions</div>}
          >
            <Input
              type="text"
              placeholder="Enter number of questions"
              defaultValue={0}
              className="rounded-none"
            />
          </Form.Item>

          {/* Status Field */}
          <Form.Item
            name="status"
            label={<div className="font-semibold">Status</div>}
          >
            <Input
              type="text"
              placeholder="Enter status (1 for active, 0 for inactive)"
              defaultValue={1}
              className="rounded-none"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-fit rounded-none bg-5c"
              loading={loading} // Show loading spinner during API call
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AssetTypeForm;
