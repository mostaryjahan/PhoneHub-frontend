import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrders: builder.query({
      query: () => "/order",
    }),
    getOrderByEmail: builder.query({
      query: (email) => `/order/by-email/${email}`,
    }),
    verifyOrder: builder.query({
      query: (orderId) => ({
        url: "/order/verify",
        params: { order_id: orderId },
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => "/order",
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByEmailQuery,
  useVerifyOrderQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

