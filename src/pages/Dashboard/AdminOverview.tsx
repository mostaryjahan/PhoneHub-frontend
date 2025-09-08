/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetAllOrdersQuery } from '@/redux/features/order/order';
import { useGetUsersQuery } from '@/redux/features/User/userManagementApi';
import { useMemo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



const AdminOverview = () => {
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({});
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({});

  const orders = ordersData?.data || [];
  const users = usersData?.data || [];

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;

    // Get last 7 months data
    const monthlyRevenue = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (6 - i));
      const monthOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
      });
      return monthOrders.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
    });

    return { totalRevenue, totalOrders, totalUsers, monthlyRevenue };
  }, [orders, users]);

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: stats.monthlyRevenue,
        backgroundColor: 'rgba(79, 70, 229, 0.05)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  } as const;

  if (ordersLoading || usersLoading) {
    return <div className="min-h-screen bg-gray-100 p-4"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Overview</h1>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          trend="Real-time data"
          color="indigo"
        />
        <Card
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          trend="All registered users"
          color="blue"
        />
        <Card
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          trend="All orders placed"
          color="green"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-4 h-80">
        <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
        <Line data={revenueData} options={chartOptions} />
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  trend,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  color: string;
}) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow border-l-4 border-${color}-500`}>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`text-sm ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </p>
    </div>
  );
};

export default AdminOverview;