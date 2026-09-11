import { Link, NavLink } from "react-router-dom";
import type { LinkProps } from "./nav.type";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks: LinkProps[] = [
  { label: "Bookings", to: "/bookings" },
  { label: "Schedule", to: "/instructor-schedule" },
];

export const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      {/* desktop view */}
      <header className="hidden lg:flex justify-between items-center bg-blue-700 text-white sticky top-0 left-0 right-0 w-full h-20 py-4 px-16 z-40">
        {/* logo */}
        <NavLink to="/" className="font-bold text-[20px] italic">
          Shokemi
        </NavLink>
        <nav className="flex items-center gap-10 text-[15px] font-medium">
          {navLinks.map((link) => {
            return (
              <Link to={link.to} key={link.label}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* mobile view */}
      <div className="overflow-x-hidden">
        <header className="flex lg:hidden justify-between items-center bg-blue-700 text-white sticky top-0 left-0 right-0 w-full h-18 px-6 z-10">
          {/* logo */}
          <NavLink to="/" className="font-bold text-xl italic tracking-wide">
            Shokemi
          </NavLink>
          <button
            type="button"
            aria-label="Open menu"
            onClick={handleOpen}
            className="p-2 rounded-md hover:bg-blue-600 active:bg-blue-800 transition-colors"
          >
            <Menu size={30} />
          </button>
        </header>

        {/* mobile nav drawer */}
        <nav
          className={`fixed top-0 right-0 flex lg:hidden flex-col gap-2 text-base font-medium bg-blue-700 text-white h-lvh w-[60%] max-w-xs z-30 py-6 px-6 transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "translate-x-[101%]"
          }`}
        >
          <div className="flex justify-end mb-8">
            <button
              type="button"
              aria-label="Close menu"
              onClick={handleClose}
              className="p-2 rounded-md hover:bg-blue-600 active:bg-blue-800 transition-colors"
            >
              <X size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              return (
                <Link
                  to={link.to}
                  key={link.label}
                  onClick={handleClose}
                  className="py-3 px-3 rounded-lg hover:bg-blue-600 active:bg-blue-800 transition-colors text-[18px]"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};
