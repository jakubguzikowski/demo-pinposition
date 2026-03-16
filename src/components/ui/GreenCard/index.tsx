import styles from "./index.module.scss";
import { GreenWithSvg } from "../../../hooks/useGreens";

interface GreenCardProps {
  green: GreenWithSvg;
}

export default function GreenCard({ green }: GreenCardProps) {
  const { name, width, height, Svg } = green;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Svg className={styles.svg} />
      </div>
      <div className={styles.properties}>
        <p><span>Name:</span><span>{name}</span></p>
        <p><span>Length:</span><span>{height} m</span></p>
        <p><span>Width:</span><span>{width} m</span></p>
      </div>
    </div>
  );
}