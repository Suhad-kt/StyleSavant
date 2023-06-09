// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register.tsx";
import Login from "../pages/auth/Login.tsx";
import ForgotPassword from "../pages/auth/forgotPassword.tsx";
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
import Products from "../pages/admin/Products.tsx";
import UpdateProduct from "../pages/admin/UpdateProducts.tsx";
import Homepage from "../pages/HomePage/Homepage.tsx";
import SearchPage from "../pages/SearchPage/SearchPage.tsx";
import ProductDeatailes from "../pages/ProductDetails/ProductDeatailes.tsx";
import CategoryProduct from "../pages/Categories/CategoryProduct.tsx";
import CartPage from "../pages/Cartpage/CartPage.tsx";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path="/products-details/:slug" element={<ProductDeatailes/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/dashboard" element={<PrivateUserRoute />}>
        <Route path="user" element={<UserDashboard/>} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      
      <Route path="/dashboard" element={<PrivateAdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
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
