"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: (headers) => {
            // headers.set("Content-Type", "application/json");
            if (typeof window !== 'undefined') {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('accessToken='))
                    ?.split('=')[1];
                const currentPath = window.location.pathname;
                headers.set("Authorization", `Bearer ${token}`);
                // const isAuthPage = currentPath === authPaths.login || currentPath === authPaths.register;

                // if (token) {
                //     headers.set("Authorization", `Bearer ${token}`);
                // } else if (!isAuthPage) {
                //     // Navigate to login if token is not found and not on login or signup page
                //     window.location.href = authPaths.login;
                // }
            }
            return headers;
        },
    }),
    tagTypes: ['event'], // Add the tagTypes here
    endpoints: () => ({

    }),
});

export const { useGetPostQuery, useAddPostMutation, useEditPostMutation } = apiSlice;
