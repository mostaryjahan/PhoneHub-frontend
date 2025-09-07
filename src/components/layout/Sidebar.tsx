import { NavLink } from "react-router-dom";
import { 
  Home,
  LayoutDashboard, 
  PlusSquare, 
  Settings, 
  Users, 
  FileText,
  User,
  ShoppingBag,
  Truck,
  History,
} from "lucide-react";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";


const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);


  return (
    <div className="w-64 min-h-screen bg-primary text-white fixed left-0 top-0 overflow-y-auto border-r border-gray-700 ">
      {/* Header */}
      <div className="px-4">


        {/* Back to Home Link */}
        <NavLink
          to="/"
          className="flex items-center gap-3 p-3  text-white hover:text-gray-400 transition-all duration-200 mt-24"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Common routes for all roles */}
          

          {user?.role === "admin" && (
            <>
            <li>
            <NavLink
              to="/dashboard/overview"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? " text-gray-100 font-semibold shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </NavLink>
          </li>
              {/* <li>
                <NavLink
                  to="/dashboard/addPhone"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <PlusSquare className="w-5 h-5" />
                  <span>Add Products</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/dashboard/manageProducts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <Settings className="w-5 h-5" />
                  <span>Manage Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageOrders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <FileText className="w-5 h-5" />
                  <span>Manage Orders</span>
                </NavLink>
              </li>
               <li>
                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </NavLink>
              </li>
            </>
          )}

          
          {user?.role === "vendor" && (
            <>
            <li>
            <NavLink
              to="/dashboard/overview"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? " text-gray-100 font-semibold shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </NavLink>
          </li>
              <li>
                <NavLink
                  to="/dashboard/addPhone"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <PlusSquare className="w-5 h-5" />
                  <span>Add Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageProducts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <Settings className="w-5 h-5" />
                  <span>Manage Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageOrders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <FileText className="w-5 h-5" />
                  <span>Manage Orders</span>
                </NavLink>
              </li>
               <li>
                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </NavLink>
              </li>
            </>
          )}
          
          {(user?.role === "user") && (
            <>
              <li>
                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myOrders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/trackOrders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <Truck className="w-5 h-5" />
                  <span>Track Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myOrderHistory"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? " text-gray-100 font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <History className="w-5 h-5" />
                  <span>Order History</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Bottom spacer for better scrolling */}
        <div className="h-20"></div>
      </nav>

      
    </div>
  );
};

export default Sidebar;