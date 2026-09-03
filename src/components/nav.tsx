import { Link } from "react-router-dom";
import type { LinkProps } from "./nav.type";
const navLinks: LinkProps[] = [
  { label: "Services", to: "#" },
  { label: "About", to: "#" },
  { label: "Contact", to: "#" },
  { label: "Profile", to: "#" },
];

export const Nav = () => {
  return (
    <header className="flex justify-between items-center bg-red-600 left-0 right-0 top-0 w-full h-20 py-10 px-16 ">
      {/* logo */}
      <h1>Shokemi</h1>
      <nav className="flex items-centre gap-12">
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
