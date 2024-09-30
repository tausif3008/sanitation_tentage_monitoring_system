import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Layout from "./AppLayout/Layout";

import UserList from "./register/user/UsersList";
import AssetRegistrationForm from "./asset/AssetRegistrationForm";
import AssetsList from "./asset/AssetsList";
import AssetAllotment from "./asset/AssetAllotment";
import GisServices from "./gis/GisServices";
import GisList from "./gis/GisList";

import VendorRegistrationForm from "./register/vendor/VendorRegistrationForm";
import VendorList from "./register/vendor/VendorList";
import VehicleRegistrationForm from "./vehicle/VehicleRegistrationForm";
import VehicleList from "./vehicle/VehicleList";

import AssetTypeForm from "./AssetTypes/AssetTypeForm";
import AssetTypeList from "./AssetTypes/AssetTypeList";

import GPSFleetRegistration from "./gis/GPSFleetRegistration";
import ManPowerAssignmentForm from "./assignment/ManPowerAssignmentForm";
import AssigningMonitoringManPower from "./assignment/AssigningMonitoringManPower";

import SchedulingAndDeploymentForm from "./schedule/SchedulingAndDeploymentForm";
import WasteManagementSchedule from "./schedule/WasteManagementSchedule";
import CreateTentageSchedule from "./schedule/CreateTentageSchedule";
import CreateSanitationSchedule from "./schedule/CreateSanitationSchedule";
import MonthlyReport from "./schedule/MonthlyReport";

import Monitoring from "./complaince/Monitoring";
import MonitoringReport from "./complaince/MonitoringReport";
import NotificationAdd from "./notification/NotificationAdd";
import WastesDashboard from "./WasteDashboard/WastesDashboard";
import Dashboard from "./dashboardNew/Dashboard";
import TentageDashboard from "./TentageDashboard/TentageDashboard";
import IncidentDashboard from "./IncidentDashborad/IncidentDashboard";
import AppError from "./AppError";
import DMSDashboard from "./DMSDashboard/DMSDashboard";
import SLADashboard from "./SLADashboard/SLADashboard";
import { Provider } from "react-redux";
import store from "./Redux/store";
import VendorDetails from "./register/vendor/VendorDetails/VendorDetails";
import UserRegistrationForm from "./register/user/UserRegistrationForm";
import { ListFormProviderVendor } from "./register/vendor/ListFormContextVendor";
import { ListFormProviderUser } from "./register/user/ListFormContextUser";
import VendorDetailsForm from "./register/vendor/VendorDetails/VendorDetailsForm";
import { ListFormProviderVendorDetails } from "./register/vendor/VendorDetails/ListFormContextVendorDetails";
import { QuestionContextProvider } from "./register/questions/QuestionContext";
import AddQuestionForm from "./register/questions/AddQuestionForm";
import QuestionList from "./register/questions/QuestionList";

function App() {
  const loggedIn = localStorage.getItem("sessionToken");

  return (
    <Provider store={store}>
      <ListFormProviderVendor>
        <ListFormProviderUser>
          <ListFormProviderVendorDetails>
            <QuestionContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      loggedIn ? (
                        <Navigate to={"/dashboard"}></Navigate>
                      ) : (
                        <Navigate to={"/home"} />
                      )
                    }
                  ></Route>

                  <Route path="/" element={<Layout></Layout>}>
                    <Route
                      path="/dashboard"
                      element={<Dashboard></Dashboard>}
                    ></Route>
                    <Route
                      path="/tentage-dashboard"
                      element={<TentageDashboard></TentageDashboard>}
                    ></Route>
                    <Route
                      path="/waste-dashboard"
                      element={<WastesDashboard></WastesDashboard>}
                    ></Route>
                    <Route
                      path="/incident-dashboard"
                      element={<IncidentDashboard></IncidentDashboard>}
                    ></Route>
                    <Route
                      path="/DMS-dashboard"
                      element={<DMSDashboard></DMSDashboard>}
                    ></Route>
                    <Route
                      path="/SLA-dashboard"
                      element={<SLADashboard></SLADashboard>}
                    ></Route>
                    <Route
                      path="/home"
                      element={<LandingPage></LandingPage>}
                    ></Route>
                    <Route
                      path="users/:page?/:per_page?"
                      element={<UserList></UserList>}
                    ></Route>
                    <Route
                      path="user-registration"
                      element={<UserRegistrationForm></UserRegistrationForm>}
                    ></Route>

                    {/* <Route path="user-list" element={<UserList></UserList>}></Route> */}
                    <Route
                      path="asset-registration"
                      element={<AssetRegistrationForm></AssetRegistrationForm>}
                    ></Route>
                    <Route
                      path="asset-list"
                      element={<AssetsList></AssetsList>}
                    ></Route>
                    <Route
                      path="gis-services"
                      element={<GisServices></GisServices>}
                    ></Route>
                    <Route
                      path="gis-list"
                      element={<GisList></GisList>}
                    ></Route>
                    <Route
                      path="gps-fleet-registration"
                      element={<GPSFleetRegistration></GPSFleetRegistration>}
                    ></Route>

                    <Route
                      path="vendor/:page?/:per_page?"
                      element={<VendorList></VendorList>}
                    ></Route>

                    <Route
                      path="vendor-registration"
                      element={
                        <VendorRegistrationForm></VendorRegistrationForm>
                      }
                    ></Route>

                    <Route
                      path="vendor/add-vendor-details/:id/:page?/:per_page?"
                      element={<VendorDetails></VendorDetails>}
                    ></Route>

                    <Route
                      path="vendor/add-vendor-details-form"
                      element={<VendorDetailsForm></VendorDetailsForm>}
                    ></Route>

                    <Route
                      path="asset-type-registration"
                      element={<AssetTypeForm></AssetTypeForm>}
                    ></Route>
                    <Route path="asset-type-list" element={<AssetTypeList />} />

                    <Route
                      path="add-question-form"
                      element={<AddQuestionForm></AddQuestionForm>}
                    ></Route>
                    <Route
                      path="questions/:page?/:per_page?"
                      element={<QuestionList />}
                    />

                    <Route
                      path="vendor-list"
                      element={<VendorList></VendorList>}
                    ></Route>

                    <Route
                      path="vehicle-registration"
                      element={
                        <VehicleRegistrationForm></VehicleRegistrationForm>
                      }
                    ></Route>
                    <Route
                      path="vehicle-list"
                      element={<VehicleList></VehicleList>}
                    ></Route>
                    <Route
                      path="manpower-assignment"
                      element={
                        <ManPowerAssignmentForm></ManPowerAssignmentForm>
                      }
                    ></Route>
                    <Route
                      path="assigning-monitoring-manpower"
                      element={
                        <AssigningMonitoringManPower></AssigningMonitoringManPower>
                      }
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
                      element={
                        <WasteManagementSchedule></WasteManagementSchedule>
                      }
                    ></Route>
                    <Route
                      path="create-tentage-schedule"
                      element={<CreateTentageSchedule></CreateTentageSchedule>}
                    ></Route>
                    <Route
                      path="create-sanitation-schedule"
                      element={
                        <CreateSanitationSchedule></CreateSanitationSchedule>
                      }
                    ></Route>
                    <Route
                      path="monthly-report"
                      element={<MonthlyReport></MonthlyReport>}
                    ></Route>
                    <Route
                      path="monitoring"
                      element={<Monitoring></Monitoring>}
                    ></Route>
                    <Route
                      path="notification"
                      element={<NotificationAdd></NotificationAdd>}
                    ></Route>
                    <Route
                      path="monitoring-report/:id"
                      element={<MonitoringReport></MonitoringReport>}
                    ></Route>
                  </Route>
                  <Route path="*" element={<AppError></AppError>}></Route>
                  <Route path="login" element={<Login></Login>}></Route>
                </Routes>
              </BrowserRouter>
            </QuestionContextProvider>
          </ListFormProviderVendorDetails>
        </ListFormProviderUser>
      </ListFormProviderVendor>
    </Provider>
  );
}

export default App;
