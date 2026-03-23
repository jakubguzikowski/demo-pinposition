import styles from "./index.module.scss";
import { SectionData } from "../../../hooks/useSections";

interface SectionCardProps {
  section: SectionData;
}

export default function SectionCard({ section }: SectionCardProps) {
  const { id, name, Svg, sections, activeSectionIndex } = section;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg_container}
        >
          <defs>
            <clipPath id={`clip-0-${id}`}>
              <rect x="0" y="0" width="100" height="33.33" />
            </clipPath>
            <clipPath id={`clip-1-${id}`}>
              <rect x="0" y="33.33" width="100" height="33.33" />
            </clipPath>
            <clipPath id={`clip-2-${id}`}>
              <rect x="0" y="66.66" width="100" height="33.34" />
            </clipPath>
          </defs>
          {sections.map((letter, i) => (
            <g key={i} clipPath={`url(#clip-${i}-${id})`}>
              <Svg className={i === activeSectionIndex ? styles.svg_active : styles.svg_inactive} />
            </g>
          ))}
          <line x1="0" y1="33.33" x2="100" y2="33.33" className={styles.divider} />
          <line x1="0" y1="66.66" x2="100" y2="66.66" className={styles.divider} />
          {sections.map((letter, i) => (
            <text
              key={i}
              x="50"
              y={16.66 + i * 33.33}
              textAnchor="middle"
              dominantBaseline="middle"
              className={i === activeSectionIndex ? styles.label_active : styles.label}
            >
              {letter}
            </text>
          ))}
        </svg>
      </div>
      <div className={styles.properties}>
        <p><span>Name:</span><span>{name}</span></p>
      </div>
    </div>
  );
}