import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../Feautures/authSlice";
import Search from "../Feautures/SearchProductSlice";
import Cart from "../Feautures/CartSlice";
export const store = configureStore({
    reducer:{
        authreducer,
        Search,
        Cart
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

