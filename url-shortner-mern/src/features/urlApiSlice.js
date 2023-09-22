import { apiSlice } from "../api/apiSlice";

export const urlApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        generateShortUrl: builder.mutation({
            query: originalUrl => ({
                url: "/url/",
                method: "POST",
                body: {...originalUrl }
            })
        }),
    })
})

export const { useGenerateShortUrlMutation } = urlApiSlice