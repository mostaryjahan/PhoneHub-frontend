import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { 
  useClearCartMutation, 
  useDecreaseQuantityMutation, 
  useGetIndividualCartItemsQuery, 
  useIncreaseQuantityMutation, 
  useRemoveFromCartMutation 
} from "@/redux/features/Cart/CartApi";
import { useAppSelector } from "@/redux/features/hook";
import { useCreateOrderMutation } from "@/redux/features/order/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ShoppingBag,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { data: cartData,isLoading } = useGetIndividualCartItemsQuery(user?.email);
  const [createOrder, { isError, isSuccess, data, isLoading: isPlacingOrder }] = useCreateOrderMutation();
  const [increaseQuantityMutation] = useIncreaseQuantityMutation();
  const [decreaseQuantityMutation] = useDecreaseQuantityMutation();
  const [removeFromCartMutation] = useRemoveFromCartMutation();
  const [clearCartMutation] = useClearCartMutation();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    if (!cartData?.data?.items || cartData.data.items.length === 0) {
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
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to increase quantity");
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    try {
      const res = await decreaseQuantityMutation({ productId: productId, email: user?.email });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to decrease quantity");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setIsRemoving(productId);
    try {
      const res = await removeFromCartMutation({ productId: productId, email: user?.email });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove item");
    } finally {
      setIsRemoving(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      if (data?.data) {
        setTimeout(async () => {
          await clearCartMutation(user?.email);
          window.location.href = data.data;
        }, 1000);
      }
    }
    if (isError) {
      toast.error("Failed to place order. Please try again.");
    }
  }, [isSuccess, isError, data, user?.email, clearCartMutation]);

  // Calculate totals
  const totalQuantity = cartData?.data?.items.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
  const totalPrice = cartData?.data?.items.reduce((total: number, item: any) => {
    const discountedPrice = item.product.discount > 0 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + (discountedPrice * item.quantity);
  }, 0) || 0;

  const totalDiscount = cartData?.data?.items.reduce((total: number, item: any) => {
    return item.product.discount > 0 
      ? total + (item.product.price * (item.product.discount / 100) * item.quantity)
      : total;
  }, 0) || 0;

  const subtotal = cartData?.data?.items.reduce((total: number, item: any) => {
    return total + (item.product.price * item.quantity);
  }, 0) || 0;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-white">
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">

     
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          Shopping Cart
        </h1>
        {totalQuantity > 0 && (
          <Badge variant="secondary" className="ml-2 px-2 py-1 bg-orange-600 text-white">
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </Badge>
        )}
      </div>

      {cartData?.data?.items.length === 0 ? (
        <div className="text-center py-16 md:py-24">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button onClick={() => navigate('/allProducts')} className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4 ">
            {cartData?.data?.items.map((item: any) => (
              <Card key={item._id} className="overflow-hidden hover:shadow-md transition-shadow bg-blue-50">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                        {item.product.brand} {item.product.model}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.product.storage} {item.product.color}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        {item.product.discount > 0 ? (
                          <>
                            <span className="text-xl font-bold text-green-600">
                              ${(item.product.price * (1 - item.product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="line-through text-gray-400 text-sm">
                              ${item.product.price.toFixed(2)}
                            </span>
                            <Badge variant="destructive" className="ml-2">
                              {item.product.discount}% OFF
                            </Badge>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">
                            ${item.product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleDecreaseQuantity(item.product._id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleIncreaseQuantity(item.product._id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.product._id)}
                          disabled={isRemoving === item.product._id}
                        >
                          {isRemoving === item.product._id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-1" />
                          )}
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${((item.product.discount > 0 
                          ? item.product.price * (1 - item.product.discount / 100)
                          : item.product.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} × ${(item.product.discount > 0 
                          ? item.product.price * (1 - item.product.discount / 100)
                          : item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${totalDiscount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <Shield className="h-5 w-5 mx-auto text-green-600 mb-1" />
                    <p className="text-xs text-gray-600">Secure Payment</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <Truck className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                    <p className="text-xs text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <RotateCcw className="h-5 w-5 mx-auto text-orange-600 mb-1" />
                    <p className="text-xs text-gray-600">Easy Returns</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-1" />
                      Checkout
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Cart;