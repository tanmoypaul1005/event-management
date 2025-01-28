"use client"
import { authPaths, base_url_client } from "@/util/const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl:base_url_client,
        prepareHeaders: (headers) => {
            // headers.set("Content-Type", "application/json");
            if (typeof window !== 'undefined') {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('accessToken='))
                    ?.split('=')[1];
                    headers.set("Authorization", `Bearer ${token}`);
                // const currentPath = window.location.pathname;
               
                // const isAuthPage = currentPath === "/login" || currentPath === "/register";

                // if (token) {
                //    
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
