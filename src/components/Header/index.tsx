import styles from "./index.module.scss";
import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/greens", label: "Greens" },
  { path: "/tournaments", label: "Tournaments" },
  { path: "/tournaments/create", label: "Create tournament" },
  { path: "/features", label: "Features" }
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <select
        className={styles.select}
        value={location.pathname}
        onChange={(e) => navigate(e.target.value)}
      >
        {navItems.map(({ path, label }) => (
          <option key={path} value={path}>
            {label}
          </option>
        ))}
      </select>
      <button className={styles.theme_button} onClick={toggleTheme}>
        {theme === "light" ? (
          <MoonIcon size={20} weight="duotone" />
        ) : (
          <SunIcon size={20} weight="duotone" />
        )}
      </button>
    </header>
  );
}
