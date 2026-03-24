import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { useTournamentContext } from "../../../context/TournamentContext";
import { greens } from "../../../data/greens";
import CardsRow from "../../../components/CardsRow";
import { greenSvgs } from "../../../assets/greens";
import GreenWithPin from "../../../components/GreenWithPin";

export default function TournamentDetail() {
  const { id } = useParams<{ id: string }>();
  const { tournaments } = useTournamentContext();

  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return (
      <main className={styles.page}>
        <div className={styles.not_found}>
          <p className="paragraph">Tournament not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <div className={styles.info}>
          <h2 className="title">{tournament.name}</h2>
          <p className="paragraph">
            {tournament.startDate} — {tournament.endDate}
          </p>
        </div>
      </div>

      <CardsRow
        id="pins"
        title="Pin positions"
        metaLabel="Holes: "
        metaValue={greens.length}
      >
        <>
          {greens.map((green, index) => {
            const Svg = greenSvgs[green.id];
            const pin = tournament.pins[index];
            return (
              <div key={green.id} className={styles.card}>
                <div className={styles.image}>
                  <GreenWithPin Svg={Svg} pin={pin} />
                </div>
                <div className={styles.properties}>
                  <p>
                    <span>Name:</span>
                    <span>{green.name}</span>
                  </p>
                  <p>
                    <span>X:</span>
                    <span>{pin?.posX ?? "—"}</span>
                  </p>
                  <p>
                    <span>Y:</span>
                    <span>{pin?.posY ?? "—"}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </>
      </CardsRow>
    </main>
  );
}
