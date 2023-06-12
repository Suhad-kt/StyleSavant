import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, Rootstate } from '../../Redux/store/store'
import { setSearchKeyword, setSearchResult } from '../../Redux/Feautures/SearchProductSlice';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductSearch = () => {
    const {keyword} =useSelector((state:Rootstate)=>state.Search)
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit =async (e:React.SyntheticEvent)=>{
        e.preventDefault()
        try {
            const {data} =await axios.get(`http://localhost:8080/api/products/search-products/${keyword}`)
            console.log(data);
            
            dispatch(setSearchResult(data))
            navigate('/search')           
        } catch (error) {
            console.log(error)
        }
    }

  return (
        <form  onSubmit={handleSubmit} className="bg-slate-200 p-2 flex text-center justify-around rounded-full">
          <input
            type="text"
            placeholder="Search products...."
            className="w-full bg-transparent ml-4 text-base tracking-wide focus:outline-none"
            value={keyword}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>dispatch(setSearchKeyword(e.target.value))}
          />
          <button type="submit"><AiOutlineSearch size={25} className="fill-slate-600" /></button>
        </form >
  )
}

export default ProductSearch