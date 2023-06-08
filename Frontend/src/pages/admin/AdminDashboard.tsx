import { useSelector } from "react-redux";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { Rootstate } from "../../Redux/store/store";

const AdminDashboard = () => {
  const auth = useSelector((state:Rootstate) => state.authreducer);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:gap-36">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="text-lg font-bold border px-5 py-2">
          <h3 className="border p-2">
            Admin name:{" "}
            <span className="text-red-500 tracking-wide text-xl">{auth?.user?.name}</span>
          </h3>
          <h3 className="border p-2">
            Admin email:{" "}
            <span className="text-red-500  tracking-wide text-xl">{auth?.user?.email}</span>
          </h3>
          <h3 className="border p-2">
            Admin contact:{" "}
            <span className="text-red-500  tracking-wide text-xl">{auth?.user?.phone}</span>
          </h3>
        </div>
      </div>  
    </div>
  );
};

export default AdminDashboard;
