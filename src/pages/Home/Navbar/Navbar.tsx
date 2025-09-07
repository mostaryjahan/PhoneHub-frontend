/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsCart3 } from "react-icons/bs";
import { MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavbarMenu, MegaMenuData } from "@/db/data";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useGetIndividualCartItemsQuery } from "@/redux/features/Cart/CartApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/assets/Logo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { data: cartData } = useGetIndividualCartItemsQuery(
    currentUser?.email,
    {
      skip: !currentUser?.email,
    }
  );

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
      }
    };
  }, []);

  const handleMegaMenuOpen = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setMegaMenuOpen(true);
  };

  const handleMegaMenuClose = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 300); 
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const cartItemCount =
    cartData?.data?.items?.reduce(
      (total: number, item: { product: any; quantity: number }) =>
        total + item.quantity,
      0
    ) || 0;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#ffffff] border-b text-black shadow-md">
        <div className="w-full flex justify-between items-center py-4 px-4 md:px-8 lg:container mx-auto">
          {/* Logo and desktop menu container */}
          <div className="flex items-center">
            <div className="mr-4">
              <Logo />
            </div>
            
            {/* Desktop menu section */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-2">
                {NavbarMenu.map((item) => {
                  let link = item.link;
                  if (item.title === "Dashboard") {
                    if (currentUser?.role === "admin") {
                      link = "/dashboard/overview";
                    } else if (currentUser) {
                      link = "/dashboard/myProfile";
                    }
                  }

                  if (item.isMegaMenu) {
                    return (
                      <li 
                        key={item.id} 
                        className="relative"
                        onMouseEnter={handleMegaMenuOpen}
                        onMouseLeave={handleMegaMenuClose}
                        ref={megaMenuRef}
                      >
                        <NavLink
                          to={link}
                          className={({ isActive }) =>
                            `flex items-center py-2 px-4 text-gray-900 hover:text-primary ${
                              isActive ? "text-primary" : ""
                            }`
                          }
                        >
                          {item.title}
                          <MdKeyboardArrowDown className="ml-1" />
                        </NavLink>
                        
                        {/* Custom Mega Menu */}
                        {megaMenuOpen && (
                          <div 
                            className="absolute left-0 top-full bg-white text-primary w-[800px] p-6 rounded-lg shadow-xl border border-gray-200 mt-1"
                            onMouseEnter={handleMegaMenuOpen}
                            onMouseLeave={handleMegaMenuClose}
                          >
                            <div className="grid grid-cols-4 gap-6">
                              {MegaMenuData.categories.map((category) => (
                                <div key={category.id}>
                                  <h3 className="text-sm mb-3 font-semibold text-primary border-b border-secondary pb-1">
                                    {category.name}
                                  </h3>
                                  <ul>
                                    {category.items.map((subItem) => (
                                      <li key={subItem.id} className="mb-2">
                                        <NavLink
                                          to={subItem.link}
                                          className="text-gray-700 hover:text-secondary transition-colors cursor-pointer p-2 rounded-md hover:bg-gray-100 w-full block"
                                          onClick={() => setMegaMenuOpen(false)}
                                        >
                                          {subItem.name}
                                        </NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  // Regular Menu Item
                  return (
                    <li key={item.id}>
                      <NavLink
                        to={link}
                        className={({ isActive }) =>
                          `inline-block py-2 px-4 text-gray-900 hover:text-primary ${
                            isActive ? "text-primary" : ""
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        
          {/* Right side icons and user menu */}
          <div className="flex items-center gap-4">
            {/* Mobile login button - visible on small screens */}
            {!currentUser && (
              <NavLink to="/login" className="md:hidden">
                <button className="hover:bg-secondary hover:text-primary font-semibold rounded-md border-2 border-secondary px-3 py-1 duration-200 text-sm">
                  Login
                </button>
              </NavLink>
            )}

            <NavLink to="/cart">
              <div className="relative">
                <button className="text-2xl hover:bg-secondary hover:text-primary rounded-full p-2 duration-200">
                  <BsCart3 />
                </button>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>

            {/* Conditionally render Login or Logout - hidden on mobile */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatarUrl || ""} alt="User" />
                    <AvatarFallback className="bg-secondary text-primary">
                      {currentUser.name ? currentUser.name[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">
                    {currentUser.name}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white text-primary w-40 mt-2"
                >
                  <DropdownMenuItem asChild>
                    <NavLink to="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink to="/login" className="hidden md:block">
                <button className="hover:bg-secondary hover:text-primary font-semibold rounded-md border-2 border-secondary px-4 py-1.5 duration-200">
                  Login
                </button>
              </NavLink>
            )}

            {/* Mobile hamburger menu */}
            <div className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? (
                <MdClose className="text-3xl" />
              ) : (
                <MdMenu className="text-3xl" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar section */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;