import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export default function Generate() {
  const navigate = useNavigate();

  return (
    <div className={styles.generate}>
      <button onClick={() => navigate("/")}>Dashboard</button>
    </div>
  );
}