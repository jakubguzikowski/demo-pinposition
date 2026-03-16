import styles from "./index.module.scss";
import { ReactNode } from "react";

interface GreenScrollSectionProps {
  id: string;
  title: string;
  meta: ReactNode;
  children: ReactNode;
}

export default function GreenScrollSection({
  id,
  title,
  meta,
  children
}: GreenScrollSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.heading}>
        <h2 className="title">{title}</h2>
        <p className="paragraph">{meta}</p>
      </div>
      <div className={styles.wrapper}>{children}</div>
    </section>
  );
}
