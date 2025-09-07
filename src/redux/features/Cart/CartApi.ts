import { baseApi } from "@/redux/api/baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getIndividualCartItems: builder.query({
            query: (email) => ({
                url: `/cart/by-email/${email}`,
                method: "GET",
            }),
            providesTags: ["cart"],
        }),
        addToCart: builder.mutation({
            query: (cartItem) => ({
                url: "/cart/add",
                method: "POST",
                body: cartItem,
            }),
            invalidatesTags: ["cart"],
        }),
        removeFromCart: builder.mutation({
            query: ({productId, email}) => ({
                url: `/cart/remove/${email}/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["cart"],
        }),
        increaseQuantity: builder.mutation({
            query: ({ productId, email}) => ({
                url: `/cart/increase-quantity/${email}/${productId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["cart"],
        }),
        decreaseQuantity: builder.mutation({
            query: ({ productId, email }) => ({
                url: `/cart/decrease-quantity/${email}/${productId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["cart"],
        }),
        clearCart: builder.mutation({
            query: (email) => ({
                url: `/cart/clear/${email}`,
                method: "DELETE",
            }),
            invalidatesTags: ["cart"],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
    useGetIndividualCartItemsQuery,
    useIncreaseQuantityMutation,
    useDecreaseQuantityMutation
} = cartApi;