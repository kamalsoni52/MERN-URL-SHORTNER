import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: loginCred => ({
                url: "/user/login",
                method: "POST",
                body: {...loginCred }
            })
        }),
    })
})

export const { useLoginMutation } = authApiSlice