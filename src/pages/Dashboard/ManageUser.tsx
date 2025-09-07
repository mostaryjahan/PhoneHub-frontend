/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useChangeUserRoleMutation, useDeleteUsersMutation, useGetUsersQuery } from '@/redux/features/User/userManagementApi';
import { useState } from "react";

const ManageUsers = () => {
    const { data, isLoading } = useGetUsersQuery({});
    const [deleteUser] = useDeleteUsersMutation();
    const [changeRole] = useChangeUserRoleMutation();

    const users = data?.data || [];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleRole = async (userId: string, newRole: string) => {
        const info = { id: userId, role: newRole };

        Swal.fire({
            title: `Are you sure you want to make this user ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, make ${newRole}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await changeRole(info).unwrap();
                    if (res.data.success) {
                        Swal.fire("Success", "Role has been changed", "success");
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to update role", "error");
                }
            }
        });
    };

    const handleDelete = async (userId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteUser(userId).unwrap();
                    if (response.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to delete user", "error");
                }
            }
        });
    };

    if(isLoading){
        return <p>Loading....</p>
    }
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Users</h2>

            <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 border">#</th>
                        <th className="py-3 px-4 border">Name</th>
                        <th className="py-3 px-4 border">Email</th>
                        <th className="py-3 px-4 border">Role</th>
                        <th className="py-3 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user: any, index: number) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border text-center">{indexOfFirstUser + index + 1}</td>
                            <td className="py-3 px-4 border">{user.name}</td>
                            <td className="py-3 px-4 border">{user.email}</td>
                            <td className="py-3 px-4 border">
                                <select
                                    defaultValue={user.role}
                                    onChange={(e) => handleRole(user._id, e.target.value)}
                                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="py-3 px-4 border text-center">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-500 hover:text-red-700 transition-all"
                                >
                                    <FaTrash className="text-2xl" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
