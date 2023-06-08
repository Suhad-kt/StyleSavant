import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState('')
  const [answer, setanswer] = useState('')
  const [password, setpassword] = useState('')
   
  const Navigate = useNavigate()

  const handleSubmit =async(e:React.SyntheticEvent)=>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password",{
        email,
        answer,
        password
      })
      if(res && res.data.success){
        toast.success(res.data.message)
        Navigate('/login')
      }

    } catch (error) {
      toast.error(error as string)
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-100">
      <div className="w-full p-6 m-auto shadow-2xl bg-white rounded-md md:max-w-md ">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Reset Password
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={ (e)=> setemail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white text-black/100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="answer"
              className="block text-sm font-semibold text-gray-800"
            >
              Answer
            </label>
            <input
              type="text"
              name="answer"
              value={answer}
              onChange={ (e)=> setanswer(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white text-black/100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="NewPassword"
              className="block text-sm font-semibold text-gray-800"
            >
              NewPassword
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={ (e)=> setpassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-white text-black/100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>

          <div className="mt-6 flex  justify-center">
            <button type="submit" className="px-6 py-2 text-white tracking-wider rounded-md bg-purple-700 transition-colors duration-200 hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
