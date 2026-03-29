import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useTournamentContext } from "../../context/TournamentContext";

export default function Tournaments() {
  const { tournaments, remove } = useTournamentContext();

  if (tournaments.length === 0) {
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

  return (
    <main className={styles.page}>
      <div className={styles.list}>
        {tournaments.map((t) => (
          <div key={t.id} className={styles.item}>
            <Link className={styles.item_link} to={`/tournaments/${t.id}`}>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.dates}>{t.startDate} — {t.endDate}</p>
            </Link>
            <div className={styles.item_actions}>
              <Link className={styles.action} to={`/tournaments/${t.id}/edit`}>
                Edit
              </Link>
              <button className={styles.action} onClick={() => remove(t.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <Link to="/tournaments/create">Create tournament</Link>
      </div>
    </main>
  );
}