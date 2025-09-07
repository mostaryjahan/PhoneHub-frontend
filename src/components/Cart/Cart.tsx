import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useClearCartMutation, useDecreaseQuantityMutation, useGetIndividualCartItemsQuery, useIncreaseQuantityMutation, useRemoveFromCartMutation } from "@/redux/features/Cart/CartApi";
import { useAppSelector } from "@/redux/features/hook";
import { useCreateOrderMutation } from "@/redux/features/order/order";
import { useEffect } from "react";
import { toast } from "sonner";

const Cart = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: cartData, error, isLoading } = useGetIndividualCartItemsQuery(user?.email);
  const [createOrder, { isError, isSuccess, data }] = useCreateOrderMutation();
  const [increaseQuantityMutation] = useIncreaseQuantityMutation();
  const [decreaseQuantityMutation] = useDecreaseQuantityMutation();
  const [removeFromCartMutation] = useRemoveFromCartMutation();
  const [clearCartMutation] = useClearCartMutation();

console.log(cartData);

  const handlePlaceOrder = async () => {
    if (!cartData?.data?.items) {
      toast.error("Your cart is empty.");
      return;
    }
            if (cartData.data.items.length === 0) {
  toast.error("Your cart is empty.");
  return;
}

    const orderItems = cartData.data.items.map((item: { product: { _id: string; price: number; name: string }; quantity: number }) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));


    await createOrder({ phones: orderItems });

  };

  const handleIncreaseQuantity = async (productId: string) => {
    
    try {
      const res = await increaseQuantityMutation({ productId: productId, email: user?.email });
      toast.success(res.data.message, { position: "top-center" });
  } catch (err: any) {
      if (err?.data?.message) {
          toast.error(err.data.message, { position: "top-center" }); // Display backend error message
      } else {
          toast.error("Failed to increase quantity", { position: "top-center" }); // Generic error
      }
  }
  };

  const handleDecreaseQuantity = async (productId: string) => {
   try {
    const res = await decreaseQuantityMutation({ productId: productId, email: user?.email });
    toast.success(res.data.message);
   } catch (err:any) {
    if (err?.data?.message) {
      toast.error(err.data.message); // Display backend error message
  } else {
      toast.error("Failed to increase quantity"); // Generic error
  }
   }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
    const res =  await removeFromCartMutation({ productId: productId, email: user?.email });
    toast.success(res.data.message, { position: "top-center" });
    } catch (err:any) {
      if (err?.data?.message) {
        toast.error(err.data.message, { position: "top-center" }); // Display backend error message
    } else {
        toast.error("Failed to increase quantity", { position: "top-center" }); // Generic error
    }
    }
  };

  const toastId = "cart";

  useEffect(() => {
   
    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(async() => {
            await clearCartMutation(user?.email);
          window.location.href = data.data;
        });
      }
    }
    if (isError) {
      toast.error(JSON.stringify(error), { id: toastId });
    }
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess, user?.email, clearCartMutation]);

  // Calculate total quantity and total price with discount
  const totalQuantity = cartData?.data?.items.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
  const totalPrice = cartData?.data?.items.reduce((total: number, item: any) => {
    const discountedPrice = item.product.discount > 0 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + (discountedPrice * item.quantity);
  }, 0) || 0;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartData?.data?.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.data?.items.map((item:any) => (
              <tr key={item._id} className="border-b">
                <td className="border p-2">{item?.product.brand} {item?.product.model}</td>
                <td className="border p-2">
                  {item.product.discount > 0 ? (
                    <div>
                      <span className="line-through text-red-500">${item.product.price?.toFixed(2)}</span>
                      <br />
                      <span className="text-green-600">${(item.product.price * (1 - item.product.discount / 100))?.toFixed(2)}</span>
                      <span className="text-xs text-green-600 ml-1">({item.product.discount}% off)</span>
                    </div>
                  ) : (
                    `$${item.product.price?.toFixed(2) || '0.00'}`
                  )}
                </td>
                <td className="border p-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleDecreaseQuantity(item.product._id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleIncreaseQuantity(item.product._id)}
                  >
                    +
                  </button>
                </td>
                <td className="border p-2">
                  ${((item.product.discount > 0 
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price) * item.quantity)?.toFixed(2) || '0.00'}
                </td>
                <td className="border p-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveItem(item.product._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Total Quantity:
          </span>
          <span className="text-lg font-bold">{totalQuantity}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Total Price:
          </span>
          <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;