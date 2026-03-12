import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/greens": "Greens",
  "/pins": "Pins"
};

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/greens", label: "Greens" },
  { path: "/pins", label: "Pins" }
];

export default function Navigation() {
  const location = useLocation();
  const title = titles[location.pathname] ?? "";
  const navigate = useNavigate();

  return (
    <nav className={styles.navigation}>
      {navItems.map(({ path, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={location.pathname === path ? styles.active : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
