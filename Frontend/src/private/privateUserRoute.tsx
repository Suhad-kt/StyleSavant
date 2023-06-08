import { useSelector } from "react-redux";
import { Rootstate } from "../Redux/store/store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";

const PrivateUserRoute = () => {
  const [ok, setok] = useState(false);

  const auth = useSelector((state: Rootstate) => state.authreducer);
  console.log(auth);
  
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('http://localhost:8080/api/auth/user-auth', {
        headers: {
          Authorization: auth?.accessToken
        }
      });

      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.accessToken) authCheck();
  }, [auth?.accessToken]);
  return ok ? <Outlet /> : <Spinner/>;
};

export default PrivateUserRoute;
