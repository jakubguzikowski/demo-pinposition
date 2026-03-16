import { useGreens } from "../../hooks/useGreens";
import styles from "./index.module.scss";
import GreenScrollSection from "../../components/GreenScrollSection";

export default function Greens() {
  const greens = useGreens();

  return (
    <main className={styles.page}>
      <section id="greens" className={styles.green_section}>
        <div className={styles.heading}>
          <h2 className="title">Greens details</h2>
          <p className="paragraph">
            <span className={styles.key}>Total greens: </span>
            <span className={styles.bold}>{Object.keys(greens).length}</span>
          </p>
        </div>
        <div className={styles.greens_wrapper}>
          {greens.map(({ id, name, width, height, Svg }) => (
            <div key={id} className={styles.green_card}>
              <div className={styles.green_image}>
                <Svg className={styles.green_svg} />
              </div>
              <div className={styles.green_properties}>
                <p>
                  <span>Name:</span>
                  <span>{name}</span>
                </p>
                <p>
                  <span>Length:</span>
                  <span>{height} m</span>
                </p>
                <p>
                  <span>Width:</span>
                  <span>{width} m</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="sections" className={styles.green_section}>
        <div className={styles.heading}>
          <h2 className="title">Sections details</h2>
          <p className="paragraph">
            <span className={styles.key}>Active section: </span>
            <span className={styles.bold}>A/B/C</span>
          </p>
        </div>
        <div className={styles.greens_wrapper}>
          {greens.map(({ id, name, width, height, Svg }) => (
            <div key={id} className={styles.green_card}>
              <div className={styles.green_image}>
                <Svg className={styles.green_svg} />
              </div>
              <div className={styles.green_properties}>
                <p>
                  <span>Name:</span>
                  <span>{name}</span>
                </p>
                <p>
                  <span>Length:</span>
                  <span>{height} m</span>
                </p>
                <p>
                  <span>Width:</span>
                  <span>{width} m</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*<GreenScrollSection id="greens" title="Greens details" meta={} />*/}
    </main>
  );
}
