// import React from 'react'
import { Link } from "react-router-dom";
import StyleSavanLogo from "../../assets/StyleSavant_logo.png";
import { useEffect, useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineClose,
  AiOutlineMenu,
  AiTwotoneHome,
} from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../Redux/store/store";
import { access } from "../../Redux/Feautures/authSlice";
import { toast } from "react-toastify";

const UserHeader = () => {
  const [nav, setnav] = useState(false);
  const [Isopen, setIsopen] = useState(false);

  const auth = useSelector((state: Rootstate) => state.authreducer);
  const dispatch = useDispatch();
  console.log(auth);

  useEffect(() => {
    const StoredAuthData = localStorage.getItem("auth");
    if (StoredAuthData) {
      const { user, accessToken } = JSON.parse(StoredAuthData);
      dispatch(access({ user, accessToken }));
    }
  }, []);

  const handleLogout = () => {
    dispatch(
      access({
        ...auth,
        user: null,
        accessToken: "",
      })
    );
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  };

  return (
    <nav className="bg-white border-gray-200 drop-shadow-xl">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src={StyleSavanLogo}
            className="h-16 mr-3 rounded-full md:h-24"
            alt="StyleSavant logo"
          />
        </Link>
        <div className="md:hidden">
          {/* Dropdown Menu */}
          <div
            className={
              nav
                ? "w-2/3 bg-zinc-600 p-4 fixed left-0 top-0 h-[600px] duration-700 ease-in rounded-r-2xl "
                : "hidden w-2/3 bg-zinc-600 px-4 py-4 h-screen fixed left-0 top-0 duration-700 ease-in rounded-r-2xl "
            }
          >
            <div className="  border-b p-6 text-zinc-400 flex justify-center text-2xl">
              <span>StyleSavant</span>
            </div>
            <ul className="flex flex-col gap-4 mt-9">
              <Link to="">
                <li className="text-white border rounded-md  px-2 py-2 hover:bg-blue-700 hover:text-white/70">
                  Dashboard{" "}
                </li>
              </Link>

              <Link to="/register">
                <li className="text-white border rounded-md  px-2 py-2 hover:bg-blue-700 hover:text-white/70">
                  Register
                </li>
              </Link>
              <Link to="/login">
                <li className="text-white border rounded-md  px-2 py-2 hover:bg-blue-700 hover:text-white/70 flex flex-row justify-between">
                  Log In
                  <HiOutlineLogin size={20} />
                </li>
              </Link>
              <Link to="/logout">
                <li className="text-white border rounded-md  px-2 py-2 hover:bg-blue-700 hover:text-white/70 flex flex-row justify-between">
                  Log out
                  <HiOutlineLogout size={20} />
                </li>
              </Link>
              <Link to="/settings" className="absolute bottom-5">
                <li className="text-white border rounded-md  px-2 py-2 hover:bg-blue-700 hover:text-white/70">
                  <IoMdSettings size={25} />
                </li>
              </Link>
            </ul>
          </div>

          <button
            className="border px-2 py-2 bg-gray-700 text-white rounded-md"
            onClick={() => setnav(!nav)}
          >
            {!nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
            <li>
              <Link
                to=""
                className="flex flex-row items-center gap-2 py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                Home
                <AiTwotoneHome size={20} />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Catogery
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent   md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Cart
                <BsFillCartPlusFill size={20} />
                <sup className="text-xl -ml-2 animate-bounce duration-100 ease-in-out text-blue-600">
                  0
                </sup>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:ml-8 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 "
              >
                Register
              </Link>
            </li>
            {!auth.user ? (
              <li>
                <Link
                  to="/login"
                  className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                  <HiOutlineLogin size={20} />
                </Link>
              </li>
            ) : (
              <li>
                <Link to="" className="flex justify-evenly items-center px-3  gap-10 relative" onClick={() => setIsopen((prev) => !prev)}>
                  {auth?.user?.name}
                  {!Isopen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                </Link>

                {Isopen ? (
                  <ul className="absolute bg-white top-20 w-80 shadow-2xl duration-300 text-start p-2 flex flex-col justify-between">
                    <li className="mt-5 p-1">
                      <Link
                        to="/dashboard"
                        className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="mt-5 p-1">
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        className="flex flex-row items-center gap-2 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        logout
                        <HiOutlineLogout size={20} />
                      </Link>
                    </li>
                    
                  </ul>
                ) : (
                  ""
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
