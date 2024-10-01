import React, { useContext, useEffect, useState } from "react";
import { Table, Image, Button } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CommonTable from "../../commonComponents/CommonTable";
import CommonDivider from "../../commonComponents/CommonDivider";
import { getData } from "../../Fetch/Axios";
import URLS from "../../urils/URLS";
import { EditOutlined } from "@ant-design/icons";
import { QuestionContext } from "./QuestionContext";

const getVal = (val) => {
  if (val === "undefined" || val === null) {
    return "-";
  } else {
    return val;
  }
};

const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "question_id",
  //   key: "question_id",
  // },
  // {
  //   title: "Asset Type", // New column for Asset Type
  //   dataIndex: "asset_type", // Assuming this is the correct field from the API response
  //   key: "asset_type",
  // },
  {
    title: "Question (English)",
    dataIndex: "question_en",
    key: "question_en",
  },
  {
    title: "Question (Hindi)",
    dataIndex: "question_hi",
    key: "question_hi",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  },
];

const QuestionList = () => {
  const {
    updateDetails,
    setUpdateDetails,
    updated,
    setUpdated,
    isList,
    setIsList,
  } = useContext(QuestionContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    list: [],
    pageLength: 25,
    currentPage: 1,
  });

  const params = useParams();

  const getUsers = async () => {
    setLoading(true);

    let uri = URLS.questions.path + "/?";
    if (params.page) {
      uri = uri + params.page;
    } else if (params.per_page) {
      uri = uri + "&" + params.per_page;
    }

    const extraHeaders = { "x-api-version": URLS.users.version };
    const res = await getData(uri, extraHeaders);

    if (res) {
      
      const data = res.data;
      setUpdated(false);
      setLoading(false);

      const list = data.listings.map((el, index) => {
        return {
          ...el,
          action: (
            <Button
              className="bg-blue-100 border-blue-500 focus:ring-blue-500 hover:bg-blue-200 rounded-full "
              key={el.name + index}
              onClick={() => {
                setUpdateDetails(el);
              }}
            >
              <EditOutlined></EditOutlined>
            </Button>
          ),
        };
      });

      setUserDetails(() => {
        return {
          list,
          pageLength: data.paging[0].length,
          currentPage: data.paging[0].currentPage,
          totalRecords: data.paging[0].totalrecords,
        };
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [params, updated]);

  useEffect(() => {
    if (isList || updateDetails) {
      navigate("/add-question-form");
    }
  }, [isList, updateDetails, navigate]);

  return (
    <div className="">
      {!isList && !updateDetails && (
        <>
          <CommonDivider
            label={"Question List"}
            compo={
              <Button
                onClick={() => setIsList(true)}
                className="bg-orange-300 mb-1"
              >
                Add Questions
              </Button>
            }
          ></CommonDivider>

          <CommonTable
            loading={loading}
            uri={"questions"}
            columns={columns}
            details={userDetails}
            scroll={{ x: 300, y: 400 }}
          ></CommonTable>
        </>
      )}
    </div>
  );
};

export default QuestionList;
