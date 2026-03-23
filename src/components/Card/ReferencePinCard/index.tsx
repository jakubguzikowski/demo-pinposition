import React from "react";
import styles from "./index.module.scss";
import { Green } from "../../../data/greens";
import { PinPosition } from "../../../types/tournament";
import { greenSvgs } from "../../../assets/greens";
import { handleManualPin } from "../../../utils/handleManualPin";

interface ReferencePinCardProps {
  green: Green;
  index: number;
  pin: PinPosition | null;
  pins: (PinPosition | null)[];
  setPins: React.Dispatch<React.SetStateAction<(PinPosition | null)[]>>;
}

export default function PinCard({
  green,
  index,
  pin,
  pins,
  setPins
}: ReferencePinCardProps) {
  const Svg = greenSvgs[green.id];

  return (
    <div className={styles.card}>
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
              <p className={styles.data}>{pin?.posX ?? "Not yet generated"}</p>
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
}
