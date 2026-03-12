import styles from "./index.module.scss";
import {
  CheckCircleIcon,
  HourglassIcon,
  LightbulbIcon
} from "@phosphor-icons/react";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.list}>
        <p className={styles.title}>Quick summary</p>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Greens data (width/height/template)</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Generate tournament/regular pins</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Pins manual correction</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Pins history</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Weekly auto regular sections</p>
        </div>
      </div>
      <div className={styles.list}>
        <p className={styles.title}>Application features</p>
        <div className={styles.item}>
          <LightbulbIcon size={20} weight="duotone" />
          <p>Feature suggestion</p>
        </div>
        <div className={styles.item}>
          <HourglassIcon className={styles.todo} size={20} weight="duotone" />
          <p>Feature in progress</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon className={styles.done} size={20} weight="duotone" />
          <p>Feature implemented</p>
        </div>
      </div>
    </main>
  );
}
