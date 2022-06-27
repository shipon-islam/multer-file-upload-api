import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="flex justify-between container px-10 bg-blue-500 items-center py-2 mx-auto">
        <div>
          <a
            className="text-white text-2xl uppercase font-sans font-black"
            href="/"
          >
            <span className="text-red-500 text-3xl">s</span>hipon islam
          </a>
        </div>
        <div>
          <NavLink
            style={(e) => (e.isActive ? { color: "red" } : {})}
            className="nav-btn"
            to="/"
          >
            home
          </NavLink>
          <NavLink
            style={(e) => (e.isActive ? { color: "red" } : {})}
            className="nav-btn"
            to="/mypost"
          >
            my post
          </NavLink>
          <NavLink
            style={(e) => (e.isActive ? { color: "red" } : {})}
            className="nav-btn"
            to="/profile"
          >
            profile
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
