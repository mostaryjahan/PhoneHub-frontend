import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { NavbarMenu, MegaMenuData } from "@/db/data";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const ResponsiveMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  // const [showProducts, setShowProducts] = useState(false);
 const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 const megaMenuRef = useRef<HTMLLIElement>(null);
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

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 w-full text-center h-auto bg-white z-50 shadow-md"
        >
          <ul className="flex flex-col gap-4 p-6">
            {NavbarMenu.map((item) => {
              // Products (mega menu case)

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
                      to={item.link}
                      className={({ isActive }) =>
                        `flex items-center justify-center py-2 px-4 text-gray-900 text-center hover:text-primary ${
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
                        className="absolute left-0 top-full bg-white text-primary w-full p-6 rounded-lg shadow-xl border border-gray-200 mt-1"
                        onMouseEnter={handleMegaMenuOpen}
                        onMouseLeave={handleMegaMenuClose}
                      >
                        <div className="grid grid-cols-3 gap-6">
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
                                      className="text-gray-700 hover:text-muted transition-colors cursor-pointer p-2 rounded-md hover:bg-gray-100 w-full block"
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

              // Normal link
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-gray-900 hover:text-primary ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
