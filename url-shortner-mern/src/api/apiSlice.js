import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8001",
    credentials: "include",
    prepareHeaders : (headers, {getState}) =>{
        const token = getState().auth.accessToken
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})




export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: bulider  => ({})
})

