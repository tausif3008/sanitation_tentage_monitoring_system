import { message } from "antd";
import axios from "axios";

const baseUrl = "https://kumbhlostandfound.in/kumbh-v2/php-api/html/api";

const loginFetch = async (data, setCanProceed) => {
  const url = baseUrl + "/login";

  const headers = {
    "Content-Type": "multipart/form-data",
    "x-api-key": "YunHu873jHds83hRujGJKd873",
    "x-api-version": "1.0.1",
    "x-platform": "Web",
  };

  const res = await axios
    .post(url, data, { headers })
    .then((response) => {
      if (response.data.success) {
        localStorage.setItem("sessionToken", response.data.sessionToken);
        localStorage.setItem(
          "sessionData",
          JSON.stringify(response.data.data.sessionData[0])
        );

        setCanProceed(true);
        return response.data.success;
      } else {
        message.info(response.data.message);
        return "error";
      }
    })
    .catch((error) => {
      message.info("Something went wrong!");
      return "error";
    });
  console.log("response", res);

  return res;
};

const postFaceDetection = async (path, formData) => {
  const url = `http://103.86.182.148:8001/api/version_0/authentication/${path}/`;

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const response = await axios
    .post(url, formData, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // message.error("Something went wrong!");
      return null;
    });
  return response;
};

const postData = async (formData, urlLast = "", extraHeaders) => {
  const url = baseUrl + urlLast;

  const headers = {
    "Content-Type": "multipart/form-data",
    "x-api-key": "YunHu873jHds83hRujGJKd873",
    "x-api-version": "5.43",
    "x-platform": "Android",
    "x-access-token": localStorage.getItem("sessionToken") || "",
    ...extraHeaders,
  };

  const response = await axios
    .post(url, formData, { headers })
    .then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      return res;
    })
    .catch((error) => {
      message.error("Something went wrong!");
      return null;
    });
  return response;
};

const putData = async (formData, urlLast = "", extraHeaders) => {
  const url = baseUrl + urlLast;

  const headers = {
    "Content-Type": "multipart/form-data",
    "x-api-key": "YunHu873jHds83hRujGJKd873",
    "x-api-version": "5.43",
    "x-platform": "Android",
    "x-access-token": localStorage.getItem("sessionToken") || "",
    ...extraHeaders,
  };

  const response = await axios
    .put(url, formData, { headers })
    .then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      return res;
    })
    .catch((error) => {
      message.error("Something went wrong!");
      return null;
    });
  return response;
};

const getData = async (urlLast, extraHeaders, params = "") => {
  const url = baseUrl + urlLast + params;

  const headers = {
    "x-api-key": "YunHu873jHds83hRujGJKd873",
    "x-api-version": "1.0.1",
    "x-platform": "Web",
    "x-access-token": localStorage.getItem("sessionToken") || "",
    ...extraHeaders,
  };

  const res = await axios
    .get(url, { headers })
    .then((response) => {
      response = response.data;
      if (response.success) {
        return response;
      } else {
        message.info(response.message);
      }
    })
    .catch((error) => {
      message.info("Something went wrong!");
      return null;
    });

  return res;
};

export { loginFetch, postData, getData, postFaceDetection, putData };
