
import { Toastr } from "@/util/utilityFunctions";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async ({ queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("Responsesss:", response);
          if (response?.data?.success) {
            Toastr({ message: response?.data?.message, type: "success" });
          } else {
            // Toastr({ message: response?.data?.message, type: "error" });
          }
        } catch (error) {
          console.error("Error:", error);
          Toastr({ message: "An error occurred!", type: "success" });
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("Response:", response);
          if (response?.data?.success) {
            Toastr({ message: response?.data?.message, type: "success" });
            const accessToken = response?.data?.token;

            // Store user information and tokens in local storage
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            // Set access token in cookies
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7
              }; secure; samesite=strict`;

          } else {
            Toastr({ message: response?.data?.message, type: "error" });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),

    getUserDetails: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const response = await queryFulfilled;
          console.log("Response:", response);
          if (response?.data?.success) {
            // dispatch(setSearchLoading(false))
          } else {
            // Toastr({ message: response?.data?.message, type: "error" });
          }
        } catch (error) {
          // console.error("Error:", error);
          // Toastr({ message: "An error occurred!", type: "error" });
        }
      },
      providesTags: ["event"],
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: "/logout",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("Response:", response);
          if (response?.data?.success) {
            Toastr({ message: response?.data?.message, type: "success" });
            localStorage.removeItem("user");
            // Clear all remaining items
            localStorage.clear();

            // Clear the access token cookie
            document.cookie =
              "accessToken=; path=/; max-age=0; secure; samesite=strict";
            document.cookie =
              "refreshToken=; path=/; max-age=0; secure; samesite=strict";
          } else {
            Toastr({ message: response?.data?.message, type: "error" });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }),

    // refresh: builder.mutation({
    //   query: (token) => ({
    //     url: kuRefreshToken,
    //     method: "POST",
    //     body: { refreshToken: `${token}` },
    //     headers: {
    //     }
    //   }),
    //   onQueryStarted: async (arg, { queryFulfilled }) => {
    //     try {
    //       const response = await queryFulfilled;
    //       console.log("Response:", response);
    //       if (response?.data?.success) {
    //         const accessToken = response?.data?.data?.accessToken;
    //         const refreshToken = response?.data?.data?.refreshToken;
    //         // Store user information and tokens in local storage
    //         localStorage.setItem("user", JSON.stringify(response?.data));
    //         // Set access token in cookies
    //         document.cookie = `accessToken=${accessToken}; path=/; max-age=${
    //           60 * 60 * 24 * 7
    //         }; secure; samesite=strict`;
    //         document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${
    //           60 * 60 * 24 * 7
    //         }; secure; samesite=strict`;
    //       } else {
    //         Toastr({ message: response?.data?.msg, type: "error" });
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //     }
    //   },
    // }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLazyGetUserDetailsQuery,
  useLogoutMutation
} =
  authApi;
