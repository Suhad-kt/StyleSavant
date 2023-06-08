import { useSelector } from 'react-redux';
import UserMenu from '../../components/UserMenu/UserMenu'
import { Rootstate } from '../../Redux/store/store';

const UserDashboard = () => {
    const auth = useSelector((state: Rootstate) => state.authreducer);
  return (
    <div className="max-w-7xl m-auto p-5">
      <div className="flex flex-row gap-36">
        <div className="">
          <UserMenu />
        </div>
        <div className="text-xl font-bold border px-5 py-2">
          <h3 className="border p-2 ">user name : <span className="text-red-500">{auth?.user?.name}</span></h3>
          <h3 className="border p-2 ">user email : <span className="text-red-500">{auth?.user?.email}</span></h3>
          <h3 className="border p-2 ">user contact : <span className="text-red-500">{auth?.user?.phone}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard