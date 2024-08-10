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

import GisRegistrationForm from "./gis/GisRegistrationForm";
import GisList from "./gis/GisList";

import GisSurveyRegistrationForm from "./gis/GisSurveyRegistrationForm";
import QrCodeAssignmentForm from "./assignment/QrCodeAssignmentForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />}
        ></Route>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/home"
            element={<LandingPage></LandingPage>}
          ></Route>
          
          <Route path="user-registration" element={<UserRegistrationForm></UserRegistrationForm>}></Route>
          <Route path="user-list" element={<UserList></UserList>}></Route>

          <Route path="asset-registration" element={<AssetRegistrationForm></AssetRegistrationForm>}></Route>
          <Route path="asset-list" element={<AssetsList></AssetsList>}></Route>

          <Route path="gis-registration" element={<GisRegistrationForm></GisRegistrationForm>}></Route>
          <Route path="gis-list" element={<GisList></GisList>}></Route>

          <Route path="gis-survey-registration" element={<GisSurveyRegistrationForm></GisSurveyRegistrationForm>}></Route>
          <Route path="qr-code-assignment" element={<QrCodeAssignmentForm></QrCodeAssignmentForm>}></Route>

          

        </Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
