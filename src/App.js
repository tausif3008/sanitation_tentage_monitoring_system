import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Layout from "./AppLayout/Layout";
import Dashboard from "./dashboard/Dashboard";
import UserRegistrationForm from "./user/UserRegistrationForm";
import UserList from "./user/UsersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/welcome-to-lost-and-found-2025" />}
        ></Route>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/welcome-to-lost-and-found-2025"
            element={<LandingPage></LandingPage>}
          ></Route>
          <Route
            path="user-registration"
            element={<UserRegistrationForm></UserRegistrationForm>}
          ></Route>
          <Route path="user-list" element={<UserList></UserList>}></Route>
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
