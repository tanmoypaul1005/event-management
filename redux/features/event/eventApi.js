
import { Toastr } from "@/util/utilityFunctions";
import { apiSlice } from "../api/apiSlice";
import { setSearchLoading } from "./eventSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (data) => ({
        url: "/event",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log("Response:", response);
          if (response?.data?.success) {
            Toastr({ message: response?.data?.message, type: "success" });
          } else {
            Toastr({ message: response?.data?.message, type: "error" });
          }
        } catch (error) {
          console.error("Error:", error);
          Toastr({ message: "An error occurred!", type: "success" });
        }
      },
      invalidatesTags: ["event"],
    }),

    getEvent: builder.query({
        query: (search) => ({
          url:`event?q=${search}`,
          method: "GET",
        }),
        onQueryStarted: async (arg, { queryFulfilled,dispatch }) => {
          try {
            dispatch(setSearchLoading(true))
            const response = await queryFulfilled;
            console.log("Response:", response);
            if (response?.data?.success) {
                dispatch(setSearchLoading(false))
            } else {
                dispatch(setSearchLoading(false))
              Toastr({ message: response?.data?.msg, type: "error" });
            }
          } catch (error) {
            dispatch(setSearchLoading(false))
            console.error("Error:", error);
            Toastr({ message: "An error occurred!", type: "error" });
          }
        },
        providesTags: ["event"],
    }),
  }),
});

export const { 
  useAddEventMutation,
  useLazyGetEventQuery
 } =
  eventApi;
