import styles from "./index.module.scss";
import { PropsWithChildren } from "react";

type GreenScrollSectionProps = PropsWithChildren<{
  id: string;
  title: string;
  metaLabel: string;
  metaValue: string | number;
}>;

export default function GreenScrollSection({
  id,
  title,
  metaLabel,
  metaValue,
  children
}: GreenScrollSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.heading}>
        <h2 className="title">{title}</h2>
        <p className="paragraph">
          <span className={styles.label}>{metaLabel}</span>
          <span className={styles.value}>{metaValue}</span>
        </p>
      </div>
      <div className={styles.wrapper}>{children}</div>
    </section>
  );
}
