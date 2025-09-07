/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useGetOrderByEmailQuery } from "@/redux/features/order/order";

const MyOrders = () => {
  const user = useAppSelector(selectCurrentUser);
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrderByEmailQuery(user?.email);

  console.log(orders);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching orders.</p>;

  const totalOrders = orders?.data || [];
  const totalPages = Math.ceil(totalOrders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = totalOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {totalOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border p-2">Order ID</th>
                  {/* <th className="border p-2">Product</th> */}
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order: any) => (
                  <tr key={order._id} className="text-center border">
                    <td className="border p-2">{order._id}</td>
                    {/* <td className="border p-2">{order.brand}</td> */}
                    <td className="border p-2">
                      {order.products.reduce(
                        (total: number, product: any) =>
                          total + product.quantity,
                        0
                      )}
                    </td>
                    <td className="border p-2">${order.totalPrice}</td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2">
                      <Link
                        to={`/dashboard/trackOrders/${order._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
