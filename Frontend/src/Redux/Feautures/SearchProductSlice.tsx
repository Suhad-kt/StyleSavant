import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState{
    keyword:string,
    results:any[]
}

const initialState:SearchState = {
    keyword: "",
    results: []
}

export const SearchProductSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearchKeyword:(state,action:PayloadAction<string>)=>{
            state.keyword = action.payload
        },
        setSearchResult:(state,action:PayloadAction<any[]>)=>{
            state.results = action.payload
        }
    }
})

export default SearchProductSlice.reducer
export const {setSearchKeyword,setSearchResult} = SearchProductSlice.actions