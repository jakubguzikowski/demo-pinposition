import styles from "./index.module.scss";
import {
  getCurrentSectionLetter,
  getSectionLastChange,
  getSectionNextChange
} from "../../hooks/useSections";
import { useTournamentContext } from "../../context/TournamentContext";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { formatDate, formatCountdown } from "../../utils/timeUtils";

export default function Dashboard() {
  const activeSection = getCurrentSectionLetter();
  const { tournaments } = useTournamentContext();
  const [countdown, setCountdown] = useState(() =>
    formatCountdown(getSectionNextChange())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(getSectionNextChange()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const processed = useMemo(
    () =>
      tournaments.map((t) => ({
        ...t,
        startTime: new Date(t.startDate).setHours(0, 0, 0, 0),
        endTime: new Date(t.endDate).setHours(0, 0, 0, 0)
      })),
    [tournaments]
  );

  const currentTournaments = useMemo(
    () => processed.filter((t) => t.startTime <= today && t.endTime >= today),
    [processed, today]
  );

  const plannedTournaments = useMemo(
    () =>
      processed
        .filter((t) => t.startTime > today)
        .sort((a, b) => a.startTime - b.startTime),
    [processed, today]
  );

  const lastActiveTournament = useMemo(
    () =>
      processed
        .filter((t) => t.endTime < today)
        .sort((a, b) => b.endTime - a.endTime)[0] ?? null,
    [processed, today]
  );

  return (
    <main className={styles.page}>
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
          <p>{formatDate(getSectionLastChange())}</p>
        </div>
        <div className={styles.item}>
          <p>Changes in:</p>
          <p>{countdown}</p>
        </div>
      </div>

      <div className={styles.list}>
        <p className={styles.title}>Tournaments</p>
        <div className={styles.item}>
          <p>Current:</p>
          {currentTournaments.length > 0 ? (
            <div className={styles.values}>
              {currentTournaments.map((t) => (
                <div key={t.id} className={styles.values}>
                  <p>{t.name}</p>
                  <p>
                    <span className={styles.desc}>From</span> {t.startDate}
                  </p>
                  <p>
                    <span className={styles.desc}>To</span> {t.endDate}
                  </p>
                  <Link className="goto" to={`/tournaments/${t.id}`}>
                    Check pins
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No active tournament</p>
          )}
        </div>
        <div className={styles.item}>
          <p>Planned:</p>
          {plannedTournaments.length > 0 ? (
            <div className={styles.values}>
              {plannedTournaments.slice(0, 3).map((t) => (
                <div key={t.id} className={styles.values}>
                  <p>{t.name}</p>
                  <p>
                    <span className={styles.desc}>From</span> {t.startDate}
                  </p>
                  <p>
                    <span className={styles.desc}>To</span> {t.endDate}
                  </p>
                  <Link className="goto" to={`/tournaments/${t.id}`}>
                    Check pins
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.values}>
              <p>No planned tournaments</p>
              <Link className="goto" to="/tournaments/create">
                Create tournament
              </Link>
            </div>
          )}
        </div>
        <div className={styles.item}>
          <p>History:</p>
          {lastActiveTournament ? (
            <div className={styles.values}>
              <p>{lastActiveTournament.name}</p>
              <p>
                <span className={styles.desc}>From</span>{" "}
                {lastActiveTournament.startDate}
              </p>
              <p>
                <span className={styles.desc}>To</span>{" "}
                {lastActiveTournament.endDate}
              </p>
              <Link
                className="goto"
                to={`/tournaments/${lastActiveTournament.id}`}
              >
                Check pins
              </Link>
            </div>
          ) : (
            <p>No past tournaments</p>
          )}
        </div>
      </div>
    </main>
  );
}
