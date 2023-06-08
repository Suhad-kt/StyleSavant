import { NavLink } from "react-router-dom"

const UserMenu = () => {
  return (
    <>
    <div>
        <div className="flex flex-col ">
            <NavLink to='/dashboard/user/' className="text-2xl  font-semibold">User Panel</NavLink>
            <NavLink to='/dashboard/user/profile' className='border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border'>
                Profile
            </NavLink>
            <NavLink to='/dashboard/user/orders' className='border p-2 rounded-md mt-4 hover:bg-purple-700 hover:text-white hover:border'>
                Orders
            </NavLink>
            
        </div>
    </div>
    </>
  )
}

export default UserMenu