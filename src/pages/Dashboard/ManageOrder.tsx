/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/order/order";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ORDERS_PER_PAGE = 5;

const ManageOrders = () => {
    const { data, refetch, isLoading } = useGetAllOrdersQuery({});
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const orders = data?.data || [];

    const filteredOrders = orders.filter((order: any) =>
        !filterStatus || order.status === filterStatus
    );

    const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ORDERS_PER_PAGE,
        currentPage * ORDERS_PER_PAGE
    );

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Change order status to ${newStatus}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
                    if (response.success) {
                        refetch();
                        Swal.fire("Updated!", "Order status has been changed.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to update order status.", "error");
                }
            }
        });
    };

    const handleDeleteOrder = (orderId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteOrder(orderId).unwrap();
                    if (response.success) {
                        refetch();
                        Swal.fire("Deleted!", "Order has been deleted.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete order.", "error");
                }
            }
        });
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if(isLoading){
        return <p>Loading.....</p>
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Orders</h2>
                <select
                    className="border p-2 rounded"
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on filter change
                    }}
                >
                    <option value="">All Orders</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Customer</th>
                            <th className="p-2 border">Product</th>
                            <th className="p-2 border">Total Price</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((item: any, index: number) => (
                            <tr key={item._id} className="border-t">
                                <td className="p-2 border">{(currentPage - 1) * ORDERS_PER_PAGE + index + 1}</td>
                                <td className="p-2 border">{item.user.name}</td>
                                <td className="p-2 border">
                                    {item.products.map((p: any, i: number) => (
                                        <span key={i}>{p.product?.brand || "N/A"}</span>
                                    ))}
                                </td>
                                <td className="p-2 border">${item.totalPrice}</td>
                                <td className="p-2 border">
                                    <select
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                        className="border p-1 rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="p-2 border flex gap-2">
                                    <button onClick={() => handleDeleteOrder(item._id)} className="text-red-500">
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageOrders;
