// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register.tsx";
import Login from "../pages/auth/Login.tsx";
import ForgotPassword from "../pages/auth/forgotPassword.tsx";
import UserHomepage from "../pages/user/UserHomepage.tsx";
import PrivateUserRoute from "../private/privateUserRoute.tsx";
import PrivateAdminRoute from "../private/privateAdminRoute.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.tsx";
import CreateCategory from "../pages/admin/CreateCategory.tsx";
import CreateProduct from "../pages/admin/CreateProduct.tsx";
import Users from "../pages/admin/Users.tsx";
import Profile from "../pages/user/Profile.tsx";
import Orders from "../pages/user/Order.tsx";
import UserDashboard from "../pages/user/UserDashboard.tsx";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHomepage />} />
      <Route path="/dashboard" element={<PrivateUserRoute />}>
        <Route path="user" element={<UserDashboard/>} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      
      <Route path="/dashboard" element={<PrivateAdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UserRoute;
