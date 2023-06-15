import axios from 'axios'
import  { useEffect, useState } from 'react'

interface Category{
    _id:string;
    name:string;
    slug:string;
}
const Usecategory = () => {
    const [categories,setcategories] = useState<Category[]>([])

    //get categories
    const getcategories = async ()=>{
        try {
            const {data} = await axios.get("http://localhost:8080/api/category/get-category")
            if(data?.category){
                setcategories(data.category)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getcategories()
    },[])
  return categories
}

export default Usecategory