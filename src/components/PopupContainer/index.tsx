import styles from "./index.module.scss";
import Popup, { PopupResult } from "../Popup";

interface PopupContainerProps {
  popups: { id: string; result: PopupResult }[];
  onClose: (id: string) => void;
}

export default function PopupContainer({
  popups,
  onClose
}: PopupContainerProps) {
  return (
    <div className={styles.container}>
      {popups.map(({ id, result }) => (
        <Popup key={id} result={result} onClose={() => onClose(id)} />
      ))}
    </div>
  );
}
