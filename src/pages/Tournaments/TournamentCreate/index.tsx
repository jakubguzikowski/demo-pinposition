import styles from "./index.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { greens } from "../../../data/greens";
import { generateId } from "../../../utils/generateId";
import { generatePinPositions } from "../../../utils/generatePinPositions";
import { useTournamentContext } from "../../../context/TournamentContext";
import { PinPosition } from "../../../types/tournament";
import TournamentCard from "../../../components/Card/TournamentCard";
import CardsRow from "../../../components/CardsRow";
import { usePopupContext } from "../../../context/PopupContext";

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
  const { add } = useTournamentContext();
  const { showPopup } = usePopupContext();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pins, setPins] = useState<(PinPosition | null)[]>([]);

  const handleGenerate = () => {
    setPins(generatePinPositions(greens));
  };

  const handleCreate = () => {
    if (
      !name ||
      !startDate ||
      !endDate ||
      pins.filter(Boolean).length !== greens.length
    ) {
      showPopup({
        success: false,
        message: "Fill all fields and set all pins."
      });
      return;
    }

    const success = add({
      id: generateId(),
      name,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
      pins
    });

    if (!success) {
      showPopup({
        success: false,
        message: "Tournament with this name already exists."
      });
      return;
    }

    showPopup({ success: true, message: "Tournament created successfully." });
    navigate("/tournaments");
  };

  return (
    <main className={styles.page}>
      <div className={styles.actions}>
        <button onClick={handleGenerate}>Generate pin positions</button>
        <button
          onClick={handleCreate}
          disabled={pins.filter(Boolean).length !== greens.length}
        >
          Utwórz turniej
        </button>
      </div>

      <div className={styles.heading}>
        <h2 className="title">Fill the tournament data</h2>
      </div>
      <div className={styles.inputs}>
        <div className="field">
          <input
            className="input"
            placeholder=" "
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">Event name</label>
        </div>
        <div className="field">
          <input
            className="input"
            placeholder=" "
            value={startDate}
            inputMode="numeric"
            autoComplete="off"
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
            inputMode="numeric"
            autoComplete="off"
            maxLength={10}
            onChange={(e) => setEndDate(formatDateInput(e.target.value))}
          />
          <label className="label">End date (YYYY-MM-DD)</label>
        </div>
      </div>

      <CardsRow
        id="pins"
        title="Adjust the tournament pin positions"
        metaLabel="Pins set: "
        metaValue={`${pins.filter(Boolean).length} / ${greens.length}`}
      >
        <>
          {greens.map((green, index) => (
            <TournamentCard
              key={green.id}
              green={green}
              index={index}
              pin={pins[index] ?? null}
              pins={pins}
              setPins={setPins}
            />
          ))}
        </>
      </CardsRow>
    </main>
  );
}
