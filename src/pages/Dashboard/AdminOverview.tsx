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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Activity type definition
// type Activity = {
//   id: number;
//   type: 'order' | 'user' | 'alert' | 'update' | 'completion';
//   message: string;
//   timestamp: string;
// };

const AdminOverview = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [6500, 5900, 8000, 8100, 5600, 7500, 9400],
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

  // Recent activity data
  // const recentActivities: Activity[] = [
  //   {
  //     id: 1,
  //     type: 'order',
  //     message: 'New order #1234 placed',
  //     timestamp: '2 minutes ago',
  //   },
  //   {
  //     id: 2,
  //     type: 'completion',
  //     message: 'Order #1232 has been completed',
  //     timestamp: '15 minutes ago',
  //   },
  //   {
  //     id: 3,
  //     type: 'user',
  //     message: 'New user registered',
  //     timestamp: '1 hour ago',
  //   },
  //   {
  //     id: 4,
  //     type: 'alert',
  //     message: 'High traffic alert - 1500 visitors in last hour',
  //     timestamp: '3 hours ago',
  //   },
  //   {
  //     id: 5,
  //     type: 'update',
  //     message: 'Product details updated',
  //     timestamp: '5 hours ago',
  //   },
  // ];

  // Get icon and color based on activity type
  // const getActivityIcon = (type: Activity['type']) => {
  //   switch (type) {
  //     case 'order':
  //       return {
  //         icon: (
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         ),
  //         color: 'indigo',
  //       };
  //     case 'completion':
  //       return {
  //         icon: (
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M5 13l4 4L19 7"
  //           />
  //         ),
  //         color: 'green',
  //       };
  //     case 'user':
  //       return {
  //         icon: (
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
  //           />
  //         ),
  //         color: 'blue',
  //       };
  //     case 'alert':
  //       return {
  //         icon: (
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  //           />
  //         ),
  //         color: 'yellow',
  //       };
  //     case 'update':
  //       return {
  //         icon: (
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  //           />
  //         ),
  //         color: 'purple',
  //       };
  //     default:
  //       return {
  //         icon: null,
  //         color: 'gray',
  //       };
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Total Revenue"
          value="$24,780"
          trend="+12.5% from last month"
          color="indigo"
        />
        <Card
          title="New Users"
          value="1,245"
          trend="+8.3% from last month"
          color="blue"
        />
        <Card
          title="Orders"
          value="856"
          trend="+4.7% from last month"
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