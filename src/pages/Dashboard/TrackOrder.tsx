/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hook";
import { useGetOrderByEmailQuery } from "@/redux/features/order/order";

const statusStages = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data: orders, isLoading, error } = useGetOrderByEmailQuery(user?.email);
   

    if (isLoading) return <p className="text-center">Loading orders...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching orders.</p>;

    if (!orders?.data?.length) {
        return <p className="text-center text-gray-600">No orders found.</p>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6">Track Your Orders</h2>

            {orders.data.map((order: any) => {
                const totalQuantity = order.products.reduce((sum: number, product: any) => sum + product.quantity, 0);
                const statusIndex = statusStages.indexOf(order.status);

                return (
                    <div key={order._id} className="mb-10 border-b pb-6">
                        <div className="mb-2">
                            <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                            {/* <p><span className="font-semibold">Products:</span> {order.products.map((p: any) => p.productName).join(", ")}</p> */}
                            <p><span className="font-semibold">Total Quantity:</span> {totalQuantity}</p>
                            <p><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                            <p><span className="font-semibold">Estimated Delivery:</span> {order.estimatedDelivery || "Not available"}</p>
                        </div>

                        {/* Order Status Progress */}
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Order Progress:</h3>
                            <div className="flex items-center justify-between gap-2">
                                {statusStages.map((stage, idx) => (
                                    <div key={stage} className="flex-1 flex flex-col items-center relative">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold z-10
                                            ${idx <= statusIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs mt-2 text-center">{stage}</span>
                                        {idx < statusStages.length - 1 && (
                                            <div className={`absolute top-4 left-1/2 w-full h-1 z-0 
                                                ${idx < statusIndex ? 'bg-green-500' : 'bg-gray-300'}`} style={{ transform: 'translateX(50%)' }}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-lg font-semibold text-blue-600">Current Status: {order.status}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TrackOrder;
