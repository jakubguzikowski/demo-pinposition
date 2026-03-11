import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <button onClick={() => navigate("/greens")}>Greens</button>
      <button onClick={() => navigate("/generate")}>Generate pins</button>
    </div>
  );
}