
import AdminMenu from "../../components/AdminMenu/AdminMenu";

const Users = () => {
  return (
    <div className="max-w-7xl m-auto p-5  mt-36 ">
      <div className="flex flex-row gap-36">
        <div className="">
          <AdminMenu />
        </div>
        <div className="text-xl font-bold border px-5 py-2">
          <h3 className="border p-2 ">Users</h3>
        </div>
      </div>
    </div>
  );
};

export default Users;
