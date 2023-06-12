import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../Feautures/authSlice";
import Search from "../Feautures/SearchProductSlice";

export const store = configureStore({
    reducer:{
        authreducer,
        Search
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

