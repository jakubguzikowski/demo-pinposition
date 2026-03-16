import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useRef, useEffect, useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/greens", label: "Greens" },
  { path: "/tournaments", label: "Tournaments" }
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    const activeButton = buttonsRef.current[activeIndex];
    const nav = navRef.current;

    if (activeButton && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = activeButton.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - navRect.left,
        width: btnRect.width
      });
    }
  }, [location.pathname]);

  return (
    <nav className={styles.navigation} ref={navRef}>
      {navItems.map(({ path, label }, index) => (
        <button
          key={path}
          ref={(el) => (buttonsRef.current[index] = el)}
          onClick={() => navigate(path)}
          className={clsx(
            styles.nav_button,
            location.pathname === path && styles.active
          )}
        >
          {label}
        </button>
      ))}
      <span
        className={styles.indicator}
        style={{ left: indicator.left, width: indicator.width }}
      />
    </nav>
  );
}
