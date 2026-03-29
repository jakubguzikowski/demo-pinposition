import styles from "../TournamentCreate/index.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { greens } from "../../../data/greens";
import { generatePinPositions } from "../../../utils/generatePinPositions";
import { useTournamentContext } from "../../../context/TournamentContext";
import { PinPosition } from "../../../types/tournament";
import TournamentCard from "../../../components/Card/TournamentCard";
import CardsRow from "../../../components/CardsRow";
import { usePopupContext } from "../../../context/PopupContext";
import DatePicker from "../../../components/DatePicker";

export default function TournamentEdit() {
  const { id } = useParams<{ id: string }>();
  const { tournaments, update } = useTournamentContext();
  const { showPopup } = usePopupContext();
  const navigate = useNavigate();

  const tournament = tournaments.find((t) => t.id === id);

  const [name, setName] = useState(tournament?.name ?? "");
  const [startDate, setStartDate] = useState(tournament?.startDate ?? "");
  const [endDate, setEndDate] = useState(tournament?.endDate ?? "");
  const [pins, setPins] = useState<(PinPosition | null)[]>(
    tournament?.pins ?? []
  );

  if (!tournament) {
    return (
      <main className={styles.page}>
        <p>Tournament not found.</p>
      </main>
    );
  }

  const handleGenerate = () => setPins(generatePinPositions(greens));

  const handleSave = () => {
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

    const success = update({
      ...tournament,
      name,
      startDate,
      endDate,
      pins
    });

    if (!success) {
      showPopup({
        success: false,
        message: "Tournament with this name already exists."
      });
      return;
    }

    showPopup({ success: true, message: "Tournament updated successfully." });
    navigate(`/tournaments/${id}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <h2 className="title">Edit tournament</h2>
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
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
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
      <div className={styles.actions}>
        <button onClick={handleGenerate}>Generate pin positions</button>
        <button
          onClick={handleSave}
          disabled={pins.filter(Boolean).length !== greens.length}
        >
          Save changes
        </button>
      </div>
    </main>
  );
}
