
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
          Toastr({ message: "An error occurred!", type: "error" });
        }
      },
      invalidatesTags: ["event"],
    }),

    getEvent: builder.query({
        query: ({search,page,limit}) => ({
          url: `event?search=${search}&page=${page}`,
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
              // Toastr({ message: response?.data?.msg, type: "error" });
            }
          } catch (error) {
            dispatch(setSearchLoading(false))
            console.error("Error:", error);
            // Toastr({ message: "An error occurred!", type: "error" });
          }
        },
        providesTags: ["event"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
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
          Toastr({ message: "An error occurred!", type: "error" });
        }
      },
      invalidatesTags: ["event"],
    }),

    editEvent: builder.mutation({
      query: ({id,data}) => ({
        url: `/event/${id}`,
        method: "PUT",
        body:data
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
          Toastr({ message: "An error occurred!", type: "error" });
        }
      },
      invalidatesTags: ["event"],
    }),
  }),
});

export const { 
  useAddEventMutation,
  useLazyGetEventQuery,
  useDeleteEventMutation,
  useEditEventMutation
 } =
  eventApi;
