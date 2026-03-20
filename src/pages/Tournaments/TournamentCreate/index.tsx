import styles from "./index.module.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { greens } from "../../../data/greens";
import { greenSvgs } from "../../../assets/greens";
import { generatePinPositions } from "../../../utils/generatePinPositions";
import { useTournaments } from "../../../hooks/useTournaments";
import { PinPosition } from "../../../types/tournament";
import { handleManualPin } from "../../../utils/handleManualPin";
import { Link } from "react-router-dom/dist";

function formatDateInput(val: string) {
  const d = val.replace(/\D/g, "");
  const p = [];
  if (d.length > 0) p.push(d.slice(0, 4));
  if (d.length > 4) p.push(d.slice(4, 6));
  if (d.length > 6) p.push(d.slice(6, 8));
  return p.join("-");
}

export default function TournamentCreate() {
  const navigate = useNavigate();
  const { add } = useTournaments();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pins, setPins] = useState<(PinPosition | null)[]>([]);

  const handleGenerate = () => {
    const result = generatePinPositions(greens);
    setPins(result);
  };

  const handleCreate = () => {
    if (
      !name ||
      !startDate ||
      !endDate ||
      pins.filter(Boolean).length !== greens.length
    )
      return;
    add({
      id: crypto.randomUUID(),
      name,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
      pins
    });
    navigate("/tournaments");
  };

  return (
    <main className={styles.page}>
      <div className={styles.actions}>
        <button onClick={handleGenerate}>Generuj piny</button>
        <button
          onClick={handleCreate}
          disabled={pins.filter(Boolean).length !== greens.length}
        >
          Utwórz turniej
        </button>
      </div>

      <div className={styles.inputs}>
        <div className="field">
          <input
            className="input"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">Event name</label>
        </div>
        <div className="field">
          <input
            className="input"
            placeholder=" "
            value={startDate}
            maxLength={10}
            onChange={(e) => setStartDate(formatDateInput(e.target.value))}
          />
          <label className="label">Start date (YYYY-MM-DD)</label>
        </div>
        <div className="field">
          <input
            className="input"
            placeholder=" "
            value={endDate}
            maxLength={10}
            onChange={(e) => setEndDate(formatDateInput(e.target.value))}
          />
          <label className="label">End date (YYYY-MM-DD)</label>
        </div>
      </div>

      <div className={styles.grid}>
        {greens.map((green, index) => {
          const Svg = greenSvgs[green.id];
          const pin = pins[index];
          return (
            <div key={green.id} className={styles.card}>
              <div
                className={styles.svg_wrapper}
                onClick={(e) => handleManualPin(e, green, index, pins, setPins)}
              >
                {Svg && <Svg className="greenSvg" />}
              </div>
              <div className={styles.properties}>
                <div className={styles.item}>
                  <p>Name:</p>
                  <p>{green.name}</p>
                </div>
                <div className={styles.item}>
                  <p>Pin position:</p>
                  <div className={styles.values}>
                    <div className={styles.value}>
                      <p className={styles.desc}>{pin?.posX && "X"}</p>
                      <p className={styles.data}>
                        {pin?.posX ?? "Not yet generated"}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <p className={styles.desc}>{pin?.posX && "Y"}</p>
                      <p className={styles.data}>{pin?.posY ?? ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
