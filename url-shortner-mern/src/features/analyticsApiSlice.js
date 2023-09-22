import { apiSlice } from "../api/apiSlice";

export const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: () => "/analytics/",
            keepUnusedDataFor : 0,
        }),
    })
})

export const { useGetAnalyticsQuery } = analyticsApiSlice