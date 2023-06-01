import { useEffect } from "react";
import "./App.css";
import UserRoute from "./Routes/UserRoute";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { access } from "./Redux/Feautures/authSlice";



function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
   const storedAuthData = localStorage.getItem('auth')
   if(storedAuthData){
    const {user,accessToken} = JSON.parse(storedAuthData)
    dispatch(access({user,accessToken}))
   }
  })
  
  return (
    <>
    <UserRoute/>
    <ToastContainer/>
    </>
  );
}

export default App;
