import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/store/store";
import { useEffect } from "react";
import { access } from "../../Redux/Feautures/authSlice";
import { useDispatch } from "react-redux";

const UserFooter = () => {
  const auth = useSelector((state: Rootstate) => state.authreducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth");
    if (storedAuthData) {
      const { user, accessToken } = JSON.parse(storedAuthData);
      dispatch(access({ user, accessToken }));
    }
  }, []);
  return <div>{JSON.stringify(auth, null, 4)}</div>;
};

export default UserFooter;
