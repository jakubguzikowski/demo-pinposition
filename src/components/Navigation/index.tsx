import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import clsx from "clsx";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/greens", label: "Greens" },
  { path: "/pins", label: "Pins" }
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navigation}>
      {navItems.map(({ path, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={clsx(
            styles.nav_button,
            location.pathname === path && styles.active
          )}
        >
          {label}
        </button>
      ))}
      <button className={styles.theme_button} onClick={toggleTheme}>
        {theme === "light" ? (
          <MoonIcon size={20} weight="duotone" />
        ) : (
          <SunIcon size={20} weight="duotone" />
        )}
      </button>
    </nav>
  );
}
