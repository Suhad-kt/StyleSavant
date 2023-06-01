// import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserHeader from "../components/UserHeader/UserHeader";
import Register from "../pages/auth/Register.tsx";
import Login from "../pages/auth/Login.tsx";
import Dashboard from "../pages/Userpage/Dashboard.tsx";
import PrivateRoute from "../utils/private.tsx";
import ForgotPassword from "../pages/auth/forgotPassword.tsx";

const UserRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHeader />} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="" element={<Dashboard/>} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRoute;
