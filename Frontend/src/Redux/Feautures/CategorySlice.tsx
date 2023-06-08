import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface categoryState {
    name:string
}

const initialState:categoryState = {
    name:''
}


export const CategorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        setName:(state,action:PayloadAction<string>)=>{
            state.name=action.payload
        }
    }
})



export const {setName}  = CategorySlice.actions
export default CategorySlice.reducer