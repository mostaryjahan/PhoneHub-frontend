import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/features/hook";
import { useDispatch } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Package, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetSingleUserQuery } from "@/redux/features/User/userManagementApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Fetch complete user data including photo
  const { data: userData, isLoading: isUserLoading } = useGetSingleUserQuery(user?.email, {
    skip: !user?.email,
  });
  
 
  const completeUser = userData?.data || user;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!token && !storedToken) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-secondary text-black fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-black hover:bg-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 p-0 bg-primary border-r border-gray-700"
              >
                <Sidebar />
              </SheetContent>
            </Sheet>

            {/* Logo and brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Dashboard</h2>
                <p className="text-black text-xs capitalize">
                  {completeUser?.role} Panel
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Profile dropdown */}
          <div className="flex items-center space-x-4">
            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-1 bg-transparent hover:bg-gray-100 "
                >
                  <Avatar className="h-8 w-8 border-2 border-gray-600">
                    <AvatarImage 
                      src={completeUser?.photo} 
                      alt={completeUser?.name} 
                    />
                    <AvatarFallback className="bg-secondary text-primary font-semibold">
                      {completeUser?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium truncate max-w-[120px]">
                      {completeUser?.name || "User"}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink
                    to="/dashboard/myProfile"
                    className="flex items-center w-full px-2 py-2 hover:text-white hover:bg-accent/10 rounded"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 hover:text-red-100 flex items-center px-2 py-2 hover:bg-red-100 rounded"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed left-0 top-0 h-full z-40">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-4 md:p-6 min-h-[calc(100vh-4rem)] w-[calc(100%-16rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;