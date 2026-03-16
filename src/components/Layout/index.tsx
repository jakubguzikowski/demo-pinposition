import styles from "./index.module.scss";
import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={styles.application}>
      <Header />
      <Outlet />
    </div>
  );
}
