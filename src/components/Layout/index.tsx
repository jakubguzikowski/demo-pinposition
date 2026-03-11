import styles from "./index.module.scss";
import { Outlet, useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/greens": "Greens",
  "/generate": "Generate"
};

export default function Layout() {
  const location = useLocation();
  const title = titles[location.pathname] ?? "";

  return (
    <div className={styles.application}>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
      <nav className={styles.navigation} />
      <main className={styles.page}>
        <Outlet />
      </main>
    </div>
  );
}
