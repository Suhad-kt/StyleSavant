// import React from 'react'

import UserMenu from "../../components/UserMenu/UserMenu"

const Orders = () => {
  return (
    <div className="max-w-7xl m-auto p-5   ">
      <div className="flex flex-row gap-36">
        <div className="">
          <UserMenu />
        </div>
        <div className="text-xl font-bold border px-5 py-2">
          <h3 className="border p-2 text-xl font-extrabold tracking-wider ">All Orders</h3>
        </div>
      </div>
    </div>
  )
}

export default Orders