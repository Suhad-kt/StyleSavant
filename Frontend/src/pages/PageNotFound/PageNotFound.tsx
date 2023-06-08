import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
   const navigate = useNavigate()
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 bg-gray-100">
      <h1 className="text-6xl font-extrabold tracking-wide">404</h1>
      <p className="text-3xl">
        Oops{" "}
        <span className="text-red-600 font-semibold animate-pulse">! </span>{" "}
        Page not Found
      </p>
      <button className="mt-4 border px-3 py-2 tracking-wide shadow-xl hover:bg-purple-700 rounded-md duration-300 hover:text-white" onClick={()=>navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
