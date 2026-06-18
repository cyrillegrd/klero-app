import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddSheet } from "../add/AddSheet";

const navItems = [
  {
    label: "Accueil",
    path: "/",
    icon: "🏠",
  },
  {
    label: "Plan",
    path: "/plan",
    icon: "📅",
  },
  {
    label: "Chrono",
    path: "/chrono",
    icon: "⏱️",
  },
  {
    label: "Routines",
    path: "/routines",
    icon: "🔄",
  },
  {
    label: "Refuge",
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
            <span>{item.label}</span>
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