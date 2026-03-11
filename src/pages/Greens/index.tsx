import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export default function Greens() {
  const navigate = useNavigate();

  return (
    <div className={styles.greens}>
      <button onClick={() => navigate("/")}>Dashboard</button>
    </div>
  );
}