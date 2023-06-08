import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../Feautures/authSlice";
export const store = configureStore({
    reducer:{
        authreducer,
        
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

