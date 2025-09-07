'use client';

import React from 'react';
import { useAppSelector } from '@/redux/features/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetOrderByEmailQuery } from '@/redux/features/order/order';
import { TOrder } from '@/types';

const MyOrderHistory: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const email = user?.email;

  const { data, error, isLoading } = useGetOrderByEmailQuery(email, {
    skip: !email,
  });

  console.log('Fetched order data:', data);

  const orders = data?.data || [];

  if (!email) {
    return <p className="text-center mt-4">Please log in to view your orders.</p>;
  }

  if (isLoading) {
    return <p className="text-center mt-4">Loading your order history...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading your orders. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Order History</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order:TOrder) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">Order ID: {order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.totalPrice?.toFixed(2) || '0.00'}</p>
              <p>Created on: {new Date(order.createdAt).toLocaleDateString()}</p>
              {/* <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You don't have any orders yet.</p>
      )}
    </div>
  );
};

export default MyOrderHistory;
