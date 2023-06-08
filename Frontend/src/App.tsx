import { useEffect } from "react";
import "./App.css";
import UserRoute from "./Routes/UserRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { access } from "./Redux/Feautures/authSlice";
import { BrowserRouter } from "react-router-dom";
import UserHeader from "./components/UserHeader/UserHeader";
// import AdminRouter from "./Routes/AdminRouter";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth");
    if (storedAuthData) {
      const { user, accessToken } = JSON.parse(storedAuthData);
      dispatch(access({ user, accessToken }));
    }
  });

  return (
    <BrowserRouter>
    <UserHeader/>
        <UserRoute />
        {/* <AdminRouter /> */}
        <ToastContainer />
    </BrowserRouter>  
  );
}

export default App;
