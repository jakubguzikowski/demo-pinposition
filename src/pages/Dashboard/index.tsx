import styles from "./index.module.scss";
import { getCurrentSectionLetter } from "../../hooks/useSections";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const activeSection = getCurrentSectionLetter();

  return (
    <main className={styles.page}>
      <div className={styles.list}>
        <p className={styles.title}>Greens</p>
        <div className={styles.item}>
          <p>Greens count:</p>
          <p>18</p>
        </div>
      </div>
      <div className={styles.list}>
        <p className={styles.title}>Sections</p>
        <div className={styles.item}>
          <p>Available:</p>
          <p>A, B, C</p>
        </div>
        <div className={styles.item}>
          <p>Current:</p>
          <p>{activeSection}</p>
        </div>
        <div className={styles.item}>
          <p>Last change:</p>
          <p>1234/56/78</p>
        </div>
        <div className={styles.item}>
          <p>Changes in:</p>
          <p>1d 2h 34m 56s</p>
        </div>
      </div>
      <div className={styles.list}>
        <p className={styles.title}>Tournaments</p>
        <div className={styles.item}>
          <p>Current:</p>
          <p>No active tournaments yet</p>
        </div>
        <div className={styles.item}>
          <p>Planned:</p>
          <div className={styles.values}>
            <p>No planned tournaments yet</p>
            <Link className={styles.goto} to="/tournaments/create">
              Create tournament
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <p>Last active:</p>
          <div className={styles.values}>
            <p>Last tournament name</p>
            <p><span className={styles.desc}>From</span> 1234/56/78</p>
            <p><span className={styles.desc}>To</span> 1234/56/78</p>
            <Link className={styles.goto} to="/">
              Check pins
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <p className={styles.title}>Features</p>
        <div className={styles.item}>
          <p>Implemented:</p>
          <p>1</p>
        </div>
        <div className={styles.item}>
          <p>In progress:</p>
          <p>2</p>
        </div>
        <div className={styles.item}>
          <p>Suggested:</p>
          <p>3</p>
        </div>
      </div>
    </main>
  );
}
