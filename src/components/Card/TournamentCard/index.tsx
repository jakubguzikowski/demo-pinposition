import styles from "./index.module.scss";
import React from "react";
import { Green } from "../../../data/greens";
import { PinPosition } from "../../../types/tournament";
import { greenSvgs } from "../../../assets/greens";
import { handleManualPin } from "../../../utils/handleManualPin";
import GreenWithPin from "../../GreenWithPin";

interface TournamentCardProps {
  green: Green;
  index: number;
  pin: PinPosition | null;
  pins: (PinPosition | null)[];
  setPins: React.Dispatch<React.SetStateAction<(PinPosition | null)[]>>;
}

export default function TournamentCard({
  green,
  index,
  pin,
  pins,
  setPins
}: TournamentCardProps) {
  const Svg = greenSvgs[green.id];

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <GreenWithPin
          Svg={Svg}
          pin={pin}
          svgClassName={styles.svg}
          onClick={(e) => handleManualPin(e, green, index, pins, setPins)}
        />
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
}
