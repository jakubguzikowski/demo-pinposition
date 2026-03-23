import styles from "./index.module.scss";
import { PropsWithChildren, useRef, useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

type CardsRowProps = PropsWithChildren<{
  id: string;
  title: string;
  metaLabel?: string;
  metaValue?: string | number;
}>;

export default function CardsRow({
  id,
  title,
  metaLabel,
  metaValue,
  children
}: CardsRowProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const targetScroll = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      targetScroll.current = wrapper.scrollLeft; // synchronizuj przy manualnym scrollu
      setCanScrollLeft(wrapper.scrollLeft > 0);
      setCanScrollRight(
        wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth - 1
      );
    };

    update();
    wrapper.addEventListener("scroll", update);
    return () => wrapper.removeEventListener("scroll", update);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cardWidth = wrapper.querySelector("*")?.clientWidth ?? 260;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    const next = Math.min(
      Math.max(
        targetScroll.current + (direction === "right" ? cardWidth : -cardWidth),
        0
      ),
      maxScroll
    );

    targetScroll.current = next;
    setCanScrollLeft(next > 0);
    setCanScrollRight(next < maxScroll);
    wrapper.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <section id={id} className={styles.section}>
      <div className={styles.heading}>
        <h2 className="title">{title}</h2>
        <div className={styles.heading_right}>
          {metaLabel && metaValue !== undefined && (
            <p className="paragraph">
              <span className={styles.label}>{metaLabel}</span>
              <span className={styles.value}>{metaValue}</span>
            </p>
          )}
        </div>
      </div>
      <div className={styles.wrapper} ref={wrapperRef}>
        {children}
      </div>
      <div className={styles.arrows}>
        <button onClick={() => scroll("left")} disabled={!canScrollLeft}>
          <ArrowLeftIcon size={20} />
        </button>
        <button onClick={() => scroll("right")} disabled={!canScrollRight}>
          <ArrowRightIcon size={20} />
        </button>
      </div>
    </section>
  );
}
