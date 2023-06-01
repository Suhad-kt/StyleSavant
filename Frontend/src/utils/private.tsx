import { useSelector } from "react-redux"
import { Rootstate } from "../Redux/store/store"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"

const PrivateRoute = () => {
    const [ok,setok] = useState(false)

    const auth =useSelector((state:Rootstate)=>state.authreducer)
    console.log("private",auth);
    
    useEffect(()=>{
        
        const authCheck = async ()=>{
            const res = await axios.get('/api/auth/userauth',{
                headers:{
                    "Authorization":auth?.accessToken 
                }
            })
            if(res.data.ok){
                setok(true)
            }
            else{
                setok(false)
            }
            console.log('res',res);
        }
        if(auth?.accessToken){
            authCheck()
        }
    },[auth?.accessToken])
  return ok ?<Outlet/> :<Spinner/>
}

export default PrivateRoute
 
  