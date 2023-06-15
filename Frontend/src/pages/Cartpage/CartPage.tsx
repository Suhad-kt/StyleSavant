import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../Redux/store/store";
import { RemoveFromCart, addToCart } from "../../Redux/Feautures/CartSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const CartPage: React.FC = () => {
  // const auth = useSelector((state: Rootstate) => state.authreducer);
  const { CartItems, cartTotalQuantity } = useSelector(
    (state: Rootstate) => state.Cart
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const handleRemoveItem = (itemId: string) => {
    dispatch(RemoveFromCart(itemId));
  };
  useEffect(() => {
    const storedata = localStorage.getItem("cartItem");
    if (storedata) {
      JSON.parse(storedata);
    }
  }, [dispatch]);


  //calculate total price
  const CalcuteTotalPrice = ():number=>{
    let TotalAmount = 0 
    CartItems.forEach((item)=>{
      TotalAmount +=item.price
    })
    return TotalAmount
  }

  //format total price as currency
  const formatPrice = (price:number):string=>{
    return price.toLocaleString('es-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  //discount
  const discount:number=250
  const totalDiscountedPrice = (CalcuteTotalPrice()-discount)
  return (
    <div className="flex flex-col gap-2 h-screen">
      <div className="">
        <div className="w-full h-32"></div>
        <nav className="w-full bg-white fixed top-0 z-50">
          <div className="w-full  flex p-5 gap-4  ">
            <BiArrowBack
              className="w-6 h-6 hover:fill-slate-300"
              onClick={() => {
                navigate(-1);
              }}
            />
            <p className=" m-1 ml-5 font-semibold">My Cart</p>
          </div>
          <div className="w-full h-14  flex flex-row ">
            <div className="w-1/2 flex items-center justify-center border cursor-default  border-b-4 border-x-0 border-y-0 border-blue-700 text-blue-700">
              <p>Your Cart</p>
            </div>
            <div
              className="w-1/2 flex items-center justify-center border cursor-pointer  border-b-2 border-x-0 border-y-0 border-stone-200"
              onClick={() => navigate('/fav')}
            >
              <p>Your Wish List</p>
            </div>
          </div>
          <div className="w-full h-14 flex px-3 justify-between items-center ">
            <p className="text-sm font-light">From Addresses</p>
            <button className="border border-slate-400 rounded-sm max-w-max p-2 text-xs text-blue-700 ">
              Enter Delivery Pincode
            </button>
          </div>
        </nav>
      </div>
      <div className="lg:flex w-full h-full">
        <div data-aos='fade-right' className="w-full h-auto flex flex-wrap gap-2  pt-5 lg:p-10 lg:overflow-y-scroll">
          {CartItems?.map((items) => (
            <div data-aos='flip-left' data-aos-duration='3000'
              key={items._id}
              className="w-[400px] lg:h-[200px] border rounded-md shadow-lg cursor-pointer mx-2 my-4 lg:my-0 flex"
            >
              <div className="lg:h-[200px] w-[30%] lg:w-[40%]  overflow-hidden rounded-t-md p-3 relative ">
                {items.photo && (
                  <img
                    src={items.photo}
                    alt="img"
                    className="w-full h-full object-cover"
                  />
                )}
                <MdFavoriteBorder
                  className="w-6 h-6 absolute top-2 right-2 shadow-lg rounded-full p-1"
                />
              </div>
              <div className="flex flex-col justify-between p-2 lg:p-4 px-4 items-start w-[70%]">
                <h1 className="text-xl font-extrabold">{items.name}</h1>
                <div className="flex gap-2">
                  <p className="font-light lg:font-bold">
                    Price ₹{items.price}
                  </p>
                  <span className="line-through text-gray-700 ">
                    ₹10699
                  </span>
                  <span className="text-green-600">60% off</span>
                </div>
                <p className="text-xs hidden lg:block">Free delivery</p>
                <div className="w-full flex gap-5">
                  <button
                    className="shadow-lg text-black py-2 px-2 lg:px-3 border border-black rounded hover:bg-blue-600  hover:text-white mt-2 text-xs"
                    onClick={() => handleRemoveItem(items._id)}
                  >
                    REMOVE
                  </button>
                  <button className="shadow-lg text-black  py-2 px-2 lg:px-3 border border-black  rounded hover:bg-blue-600 hover:text-white  mt-2 text-xs">
                    CONTACT NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[30%] lg:h-full shadow-lg border p-3 ">
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-full p-3 bg-white">
              <p className="py-5 font-semibold"> Price Details</p>
              <ul className="flex flex-col font-light">
                <li className="flex justify-between py-1">
                  Price({CartItems?.length} item) <span className="tracking-wide">{formatPrice(CalcuteTotalPrice())}</span>
                </li>
                <li className="flex justify-between py-1">
                  Discount{" "}
                  <span className="text-green-600">{"-$250"}</span>
                </li>
                <li className="flex justify-between py-1 border-b-2 border-dashed border-x-0 border-y-0 border-gray-300">
                  Delivery Charges{" "}
                  <span className="text-green-600">FREE Delivery</span>
                </li>
                <li className="flex justify-between py-5 font-semibold tracking-wide">
                  Total Amount <span className="tracking-wide">{formatPrice(totalDiscountedPrice)}</span>
                </li>
                <li className="flex justify-between py-2 text-green-600">
                  You will save {"$250"} on this order
                </li>
              </ul>
              <div className="h-12 bg-white flex border-y border-x-0 py-10 border-gray-300 mb-20 ">
                <div className="w-1/2 h-full flex flex-col justify-center ">
                  <p className="font-semibold tracking-wide">{formatPrice(totalDiscountedPrice)} </p>
                  <a href="" className="text-xs text-blue-700">
                    View Price details
                  </a>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center items-end  ">
                  <button className="bg-amber-400 w-max p-2 px-2 rounded-sm text-sm">
                    CONTACT NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
