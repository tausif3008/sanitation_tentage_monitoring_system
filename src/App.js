import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Layout from "./AppLayout/Layout";
import Dashboard from "./dashboard/Dashboard";

import UserRegistrationForm from "./user/UserRegistrationForm";
import UserList from "./user/UsersList";

import AssetRegistrationForm from "./asset/AssetRegistrationForm";
import AssetsList from "./asset/AssetsList";
import AssetAllotment from "./asset/AssetAllotment";
import GisRegistrationForm from "./gis/GisRegistrationForm";
import GisList from "./gis/GisList";

import GisSurveyRegistrationForm from "./gis/GisSurveyRegistrationForm";
import QrCodeAssignmentForm from "./assignment/QrCodeAssignmentForm";
import SchedulingAndDeploymentForm from "./schedule/SchedulingAndDeploymentForm";
import WasteManagementSchedule from "./schedule/WasteManagementSchedule";
import CreateTentageSchedule from "./schedule/CreateTentageSchedule";
import CreateSanitationSchedule from "./schedule/CreateSanitationSchedule";
import MonthlyReport from "./schedule/MonthlyReport";

import Monitoring from "./complaince/Monitoring";
import MonitoringReport from "./complaince/MonitoringReport";
import Notification from "./complaince/Notification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/home" element={<LandingPage></LandingPage>}></Route>

          <Route
            path="user-registration"
            element={<UserList></UserList>}
          ></Route>

          {/* <Route path="user-list" element={<UserList></UserList>}></Route> */}

          <Route
            path="asset-registration"
            element={<AssetRegistrationForm></AssetRegistrationForm>}
          ></Route>
          <Route path="asset-list" element={<AssetsList></AssetsList>}></Route>

          <Route
            path="gis-registration"
            element={<GisRegistrationForm></GisRegistrationForm>}
          ></Route>
          <Route path="gis-list" element={<GisList></GisList>}></Route>

          <Route
            path="gis-survey-registration"
            element={<GisSurveyRegistrationForm></GisSurveyRegistrationForm>}
          ></Route>
          <Route
            path="qr-code-assignment"
            element={<QrCodeAssignmentForm></QrCodeAssignmentForm>}
          ></Route>
          <Route
            path="asset-allotment"
            element={<AssetAllotment></AssetAllotment>}
          ></Route>

          <Route
            path="scheduling-and-deployment"
            element={
              <SchedulingAndDeploymentForm></SchedulingAndDeploymentForm>
            }
          ></Route>
          <Route
            path="waste-management-schedule"
            element={<WasteManagementSchedule></WasteManagementSchedule>}
          ></Route>

          <Route
            path="create-tentage-schedule"
            element={<CreateTentageSchedule></CreateTentageSchedule>}
          ></Route>
          <Route
            path="create-sanitation-schedule"
            element={<CreateSanitationSchedule></CreateSanitationSchedule>}
          ></Route>
          <Route
            path="monthly-report"
            element={<MonthlyReport></MonthlyReport>}
          ></Route>
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
