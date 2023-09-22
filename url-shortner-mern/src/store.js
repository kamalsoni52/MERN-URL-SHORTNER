import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/authSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer

    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})