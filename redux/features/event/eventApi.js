
import { Toastr } from "@/util/utilityFunctions";
import { apiSlice } from "../api/apiSlice";

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
    }),
  }),
});

export const { 
  useAddEventMutation,
 } =
  eventApi;
