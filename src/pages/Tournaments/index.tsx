import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export default function Tournaments() {
  return (
    <main className={styles.page}>
      <div className={styles.no_data}>
        <p className="paragraph">No tournaments created yet.</p>
        <Link className="goto" to="/tournaments/create">
          Create tournament
        </Link>
      </div>
    </main>
  );
}
