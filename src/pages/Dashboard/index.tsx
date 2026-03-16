import styles from "./index.module.scss";
import {
  CheckCircleIcon,
  HourglassIcon,
  LightbulbIcon
} from "@phosphor-icons/react";

export default function Dashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.list_group}>
        <div className={styles.list}>
          <p className={styles.title}>Implemented features</p>
          <div className={styles.item}>
            <CheckCircleIcon
              className={styles.done}
              size={20}
              weight="duotone"
            />
            <p>Check greens data (width/length/visual)</p>
          </div>
        </div>
        <div className={styles.list}>
          <p className={styles.title}>In progress features</p>
          <div className={styles.item}>
            <HourglassIcon className={styles.todo} size={20} weight="duotone" />
            <p>Template feature</p>
          </div>
        </div>
        <div className={styles.list}>
          <p className={styles.title}>Suggested features</p>
          <div className={styles.item}>
            <LightbulbIcon size={20} weight="duotone" />
            <p>Template suggestion</p>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <p className={styles.title}>Quick summary</p>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Current section: A/B/C</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Section changes in: 3d 12m 34s</p>
        </div>
        <div className={styles.item}>
          <CheckCircleIcon size={20} weight="duotone" />
          <p>Last tournament: 1234/56/78</p>
        </div>
      </div>
    </main>
  );
}
