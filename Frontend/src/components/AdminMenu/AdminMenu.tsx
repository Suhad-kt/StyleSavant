import { Link, NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col">
        <Link to='/dashboard/admin' className="text-2xl font-semibold">Admin Panel</Link >
        <NavLink
          to="/dashboard/admin/create-category"
          className="border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border"
        >
           Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
