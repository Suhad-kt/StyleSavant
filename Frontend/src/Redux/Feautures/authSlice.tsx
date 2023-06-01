import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface Authstate {
    user:any,
    accessToken:string
}
const initialState:Authstate={
    user:null,
    accessToken:''
}

export const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        access:(state,action:PayloadAction<{user:any,accessToken:string}>)=>{
         state.user = action.payload.user,
         state.accessToken = action.payload.accessToken
        }
    }
}) 



export const {access}  = AuthSlice.actions
export default AuthSlice.reducer