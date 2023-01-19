import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPass from "./pages/ResetPass";
import DashBoard from "./pages/admin/DashBoard";
import Layout from "./pages/Layout";
import Tickets from "./pages/admin/Tickets";
import Users from "./pages/admin/Users";
import Profile from "./pages/admin/Profile";

import UserProfile from "./pages/user/Profile";
import UserDashBoard from "./pages/user/DashBoard";
import UserTickets from "./pages/user/Tickets";
import QATickets from "./pages/user/QaTickets";
import OpenTickets from "./pages/admin/OpenTickets";
import List from "./pages/user/List";
import ProtectedComp from "./middleware/ProtectedComp";
import RoleProtectComp from "./middleware/RoleProtectComp";
import UnAuthorized from "./pages/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobProtectComp from "./middleware/JobProtectComp";
import ViewUserTicket from "./pages/admin/ViewUserTicket";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />

        <Route path="/backend" element={<Layout />}>
          <Route element={<ProtectedComp />}>
            <Route
              element={
                <RoleProtectComp
                  allowedRoles={["Admin", "Super Admin"]}
                  allowedJobs={null}
                />
              }
            >
              <Route index element={<DashBoard />} />
              <Route path="tickets" element={<Tickets />} />

              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />

              <Route
                path="user-tickets/view/:email/"
                element={<ViewUserTicket />}
              />
            </Route>

            <Route
              element={
                <RoleProtectComp
                  allowedRoles={["Admin", "Super Admin"]}
                  allowedJobs={["Q.A"]}
                />
              }
            >
              <Route path="open-tickets" element={<OpenTickets />} />
            </Route>

            <Route
              element={
                <RoleProtectComp allowedRoles={["User"]} allowedJobs={null} />
              }
            >
              <Route path="user" element={<UserDashBoard />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/tickets" element={<UserTickets />} />
              <Route path="user/tickets-list/all" element={<List />} />
              <Route element={<JobProtectComp />}>
                {/* Job */}
                <Route path="user/qa-tickets" element={<QATickets />} />
              </Route>
            </Route>
          </Route>
          <Route path="unauthorized" element={<UnAuthorized />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
