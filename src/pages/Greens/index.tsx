import { useGreens } from "../../hooks/useGreens";
import { useSections, getCurrentSectionLetter } from "../../hooks/useSections";
import GreenScrollSection from "../../components/GreenScrollSection";
import GreenCard from "../../components/ui/GreenCard";
import GreenSectionCard from "../../components/ui/GreenSectionCard";
import styles from "./index.module.scss";

export default function Greens() {
  const greens = useGreens();
  const sections = useSections();
  const activeSection = getCurrentSectionLetter();

  return (
    <main className={styles.page}>
      <GreenScrollSection
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
      </GreenScrollSection>

      <GreenScrollSection
        id="sections"
        title="Sections details"
        metaLabel="Active section: "
        metaValue={activeSection}
      >
        <>
          {sections.map((section) => (
            <GreenSectionCard key={section.id} section={section} />
          ))}
        </>
      </GreenScrollSection>
    </main>
  );
}
