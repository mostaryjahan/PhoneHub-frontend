/* eslint-disable @typescript-eslint/no-unused-vars */

import { useGetUsersQuery, useBlockUserMutation, useChangeUserRoleMutation } from '@/redux/features/User/userManagementApi';
import { useState } from "react";
import { toast } from 'sonner';

const ManageUsers = () => {
    const { data, isLoading } = useGetUsersQuery({});
    const [blockUser] = useBlockUserMutation();
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
        try {
            const res = await changeRole({ id: userId, role: newRole }).unwrap();
            if (res.success) {
                toast.success("Role updated successfully");
            }
        } catch (err) {
            toast.error("Failed to update role");
        }
    };

    const handleBlock = async (userId: string, currentBlockStatus: boolean) => {
        const action = currentBlockStatus ? "unblocked" : "blocked";
        
        try {
            const response = await blockUser({ id: userId, isBlocked: !currentBlockStatus }).unwrap();
            if (response.success) {
                toast.success(`User has been ${action}`);
            }
        } catch (err) {
            toast.error(`Failed to ${action.slice(0, -2)} user`);
        }
    };

    if(isLoading){
        return <p>Loading....</p>
    }
    return (
        <div className="overflow-x-auto bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Manage Users</h2>

            <table className="max-w-6xl mx-auto border-collapse rounded-lg overflow-hidden">
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
                                    value={user.role}
                                    onChange={(e) => handleRole(user._id, e.target.value)}
                                    className="border p-1 rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                            </td>
                            <td className="py-3 px-4 border text-center">
                                <button
                                    onClick={() => handleBlock(user._id, user.isBlocked)}
                                    className={`px-3 py-1 rounded text-white ${
                                        user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                    }`}
                                >
                                    {user.isBlocked ? 'Unblock' : 'Block'}
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
