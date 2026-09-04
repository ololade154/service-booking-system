import { Link, NavLink } from "react-router-dom";
import type { LinkProps } from "./nav.type";
const navLinks: LinkProps[] = [
  { label: "Bookings", to: "/bookings" },
  { label: "About", to: "#" },
  { label: "Contact", to: "#" },
  { label: "Profile", to: "#" },
];

export const Nav = () => {
  return (
    <header className="flex justify-between items-center bg-blue-700 text-white left-0 right-0 top-0 w-full h-20 py-10 px-16 ">
      {/* logo */}

      <NavLink to="/" className="font-bold text-[20px] italic">
        Shokemi
      </NavLink>
      <nav className="flex items-centre gap-12 text-[15px] font-medium">
        {navLinks.map((link) => {
          return (
            <Link to={link.to} key={link.label}>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
