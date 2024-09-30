import React, { useContext, useEffect, useState } from "react";
import { Button, message, Modal, Table } from "antd";
import CommonTable from "../../commonComponents/CommonTable";
import CommonDivider from "../../commonComponents/CommonDivider";
import URLS from "../../urils/URLS";
import { useNavigate, useParams } from "react-router";
import { getData } from "../../Fetch/Axios";
import { EditOutlined } from "@ant-design/icons";
import { AssetContext } from "./AssetContext";

const AssetTypeList = () => {
  const { setIsListUpdateDetails, isListUpdateDetails } =
    useContext(AssetContext);

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]); // To store questions for the selected asset type
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedAssetType, setSelectedAssetType] = useState(null); // Currently selected asset type for viewing questions

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const params = useParams();

  const getDetails = async () => {
    setLoading(true);

    let uri = URLS.assetTypes.path + "/?";
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const extraHeaders = { "x-api-version": URLS.assetTypes.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      const data = res.data;
      setIsListUpdateDetails((prev) => {
        return { ...prev, updated: false };
      });

      setLoading(false);

      const list = data.assettypes.map((el, index) => {
        return {
          ...el,
          action: (
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                setIsListUpdateDetails((prev) => {
                  return { ...prev, updateDetails: el };
                });
              }}
            >
              <EditOutlined></EditOutlined>
            </Button>
          ),
        };
      });

      setDetails(() => {
        return {
          list,
          pageLength: list.length,
          currentPage: 1,
          totalRecords: list.length,
        };
      });
    }
  };

  const fetchQuestions = async (assetTypeId) => {
    try {
      const response = await getData(URLS.assetQuestions.path + assetTypeId, {
        "x-api-version": URLS.assetQuestions.version,
      });

      const data = response.data;
      console.log(data);

      if (data.listings.length > 0) {
        setQuestions({
          list: data.listings,
          pageLength: data.paging[0].length,
          currentPage: data.paging[0].currentpage,
          totalRecords: data.paging[0].totalrecords,
        });
      } else {
        setQuestions([]); // If no questions are found
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      message.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    getDetails();
  }, [params, isListUpdateDetails.updated]);

  useEffect(() => {
    if (isListUpdateDetails.isList || isListUpdateDetails.updateDetails) {
      console.log(
        " isListUpdateDetails",
        isListUpdateDetails.isList,
        isListUpdateDetails.updateDetails
      );
      navigate("/asset-type-registration");
    }
  }, [isListUpdateDetails.isList, isListUpdateDetails.updateDetails, navigate]);

  const showModal = async (assetTypeId) => {
    setSelectedAssetType(assetTypeId);
    await fetchQuestions(assetTypeId); // Fetch questions for the asset type
    setIsModalVisible(true); // Show the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
    setQuestions([]); // Clear the questions when modal closes
  };

  const columns = [
    {
      title: "Main Type", // Asset main type
      dataIndex: "asset_main_type",
      key: "asset_main_type",
    },
    {
      title: "Name", // Asset name
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description", // Asset description
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total Quantity", // Total quantity
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Questions", // Number of questions
      dataIndex: "questions",
      key: "questions",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record?.asset_type_id)}>
          View Questions
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="">
      <>
        <CommonDivider
          label={"Asset Type List"}
          compo={
            <Button
              className="bg-orange-300 mb-1"
              onClick={() =>
                setIsListUpdateDetails((prev) => {
                  return { ...prev, isList: true };
                })
              }
            >
              Add Asset Type
            </Button>
          }
        ></CommonDivider>

        <CommonTable
          columns={columns}
          uri={"asset-type-list"}
          details={details}
          loading={loading}
          scroll={{ x: 800, y: 400 }}
        ></CommonTable>

        <Modal
          title={`Questions for Asset Type ID: ${selectedAssetType}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800} // Adjust width if necessary
        >
          {questions?.list?.length > 0 ? (
            <Table
              bordered
              dataSource={questions.list}
              rowKey="question_id"
              pagination={false}
              scroll={{ x: 800, y: 400 }}
              columns={[
                {
                  title: "Question (EN)",
                  dataIndex: "question_en",
                  key: "question_en",
                },
                {
                  title: "Question (HI)",
                  dataIndex: "question_hi",
                  key: "question_hi",
                },
              ]}
            />
          ) : (
            <p>No questions found for this asset type.</p>
          )}
        </Modal>
      </>
    </div>
  );
};

export default AssetTypeList;
