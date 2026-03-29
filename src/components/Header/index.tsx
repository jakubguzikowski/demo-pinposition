import styles from "./index.module.scss";
import { useTheme } from "../../hooks/useTheme";
import {
  SunIcon,
  MoonIcon,
  CaretDownIcon,
  CaretUpIcon,
  ArrowLeftIcon
} from "@phosphor-icons/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/greens", label: "Greens" },
  { path: "/tournaments", label: "Tournaments" }
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSubpage =
    location.pathname.startsWith("/tournaments") &&
    location.pathname !== "/tournaments";

  const currentItem = navItems.find((item) => item.path === location.pathname);

  return (
    <header className={styles.header}>
      {isSubpage ? (
        <button
          className={styles.backButton}
          onClick={() => navigate("/tournaments")}
        >
          <ArrowLeftIcon size={20} />
        </button>
      ) : (
        <button
          className={styles.titleButton}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span>{currentItem?.label}</span>
          {menuOpen ? <CaretUpIcon size={20} /> : <CaretDownIcon size={20} />}
        </button>
      )}

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.controls}>
        <button className={styles.theme_button} onClick={toggleTheme}>
          {theme === "light" ? (
            <MoonIcon size={20} weight="duotone" />
          ) : (
            <SunIcon size={20} weight="duotone" />
          )}
        </button>
      </div>
    </header>
  );
}
