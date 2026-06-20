import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddSheet } from "../add/AddSheet";

const navItems = [
  {
    
    path: "/",
    icon: "🏠",
  },
  {
    
    path: "/plan",
    icon: "📅",
  },
  {
    
    path: "/chrono",
    icon: "⏱️",
  },
  {
    
    path: "/routines",
    icon: "🔄",
  },
  {
    
    path: "/refuge",
    icon: "🏝️",
  },
];

export function BottomNav() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "bottom-nav__item bottom-nav__item--active"
                : "bottom-nav__item"
            }
          >
            <span>{item.icon}</span>
          </NavLink>
        ))}

        <button
          type="button"
          className="bottom-nav__add"
          onClick={() => setIsAddOpen(true)}
        >
          +
        </button>
      </nav>

      {isAddOpen && (
        <AddSheet onClose={() => setIsAddOpen(false)} />
      )}
    </>
  );
}