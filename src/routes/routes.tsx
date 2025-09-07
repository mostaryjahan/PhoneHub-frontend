import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProduct from "@/pages/Phones/AllProduct";
import Home from "@/pages/Home/Home/Home";
import Details from "@/pages/Details/Details";
import Cart from "@/components/Cart/Cart";
import Dashboard from "@/components/layout/Dashboard";
import AddPhone from "@/pages/Dashboard/AddPhone";
import About from "@/pages/about/About";
import ManageUsers from "@/pages/Dashboard/ManageUser";
import OrderVerification from "@/pages/VerifyOrder";
import ManageProducts from "@/pages/Dashboard/ManageProducts";
import ManageOrders from "@/pages/Dashboard/ManageOrder";
import MyOrders from "@/pages/Dashboard/MyOrders";
import TrackOrder from "@/pages/Dashboard/TrackOrder";
import MyProfile from "@/pages/Dashboard/MyProfile";
// import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import AdminOverview from "@/pages/Dashboard/AdminOverview";
import MyOrderHistory from "@/pages/Dashboard/MyOrderHistory";
import Contact from "@/pages/Contact/Contact";
import App from "@/App";
import HotDeals from "@/pages/HotDeals/HotDeals";
import Support from "@/pages/Support/Support";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import CategoryPage from "@/pages/Category/Category";

const DashboardIndex = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin" || user.role === "vendor") return <Navigate to="overview" replace />;
  return <Navigate to="myOrders" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/allProducts",
        element: <AllProduct />,
      },

      {
        path: "/hot-deals",
        element: <HotDeals />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/verify",
        element: <OrderVerification />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true, // this will auto-redirect based on role
        element: <DashboardIndex />,
      },
      // admin routes
      {
        path: "overview",
        element: <AdminOverview />,
      },
      {
        path: "addPhone",
        element: <AddPhone />,
      },
      {
        path: "manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "manageOrders",
        element: <ManageOrders />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },

      // user routes
      {
        path: "myOrders",
        element: <MyOrders />,
      },
      {
        path: "trackOrders/:id",
        element: <TrackOrder />,
      },
      {
        path: "trackOrders",
        element: <TrackOrder />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "myOrderHistory",
        element: <MyOrderHistory />,
      },
    ],
  },
]);

export default router;
