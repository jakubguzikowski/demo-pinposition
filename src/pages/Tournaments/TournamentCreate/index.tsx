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
import DatePicker from "../../../components/DatePicker";

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
        <div className={styles.dates}>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            label="Start date"
            isFirst
          />
          <DatePicker value={endDate} onChange={setEndDate} label="End date" />
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
