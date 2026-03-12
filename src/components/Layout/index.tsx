import styles from "./index.module.scss";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={styles.application}>
      <Navigation />
      <Outlet />
    </div>
  );
}
