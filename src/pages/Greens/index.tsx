import { useGreens } from "../../hooks/useGreens";
import { useSections, getCurrentSectionLetter } from "../../hooks/useSections";
import CardsRow from "../../components/CardsRow";
import GreenCard from "../../components/Card/GreenCard";
import SectionCard from "../../components/Card/SectionCard";
import styles from "./index.module.scss";

export default function Greens() {
  const greens = useGreens();
  const sections = useSections();
  const activeSection = getCurrentSectionLetter();

  return (
    <main className={styles.page}>
      <CardsRow
        id="greens"
        title="Greens details"
        metaLabel="Total greens: "
        metaValue={greens.length}
      >
        <>
          {greens.map((green) => (
            <GreenCard key={green.id} green={green} />
          ))}
        </>
      </CardsRow>

      <CardsRow
        id="sections"
        title="Sections details"
        metaLabel="Active section: "
        metaValue={activeSection}
      >
        <>
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </>
      </CardsRow>
    </main>
  );
}
