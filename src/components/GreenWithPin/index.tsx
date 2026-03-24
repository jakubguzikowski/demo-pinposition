import styles from "./index.module.scss";
import React, { useRef, useState, useEffect } from "react";
import { PinPosition } from "../../types/tournament";
import { GreenSvgComponent } from "../../assets/greens";

interface GreenWithPinProps {
  Svg: GreenSvgComponent;
  pin?: PinPosition | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  svgClassName?: string;
}

export default function GreenWithPin({
  Svg,
  pin,
  onClick,
  svgClassName
}: GreenWithPinProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      setViewBox(svgRef.current.getAttribute("viewBox"));
    }
  }, []);

  return (
    <div className={styles.wrapper} onClick={onClick}>
      <Svg
        ref={svgRef}
        className={`greenSvg${svgClassName ? ` ${svgClassName}` : ""}`}
      />
      {pin && viewBox && (
        <svg
          className={styles.overlay}
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={pin.x} cy={pin.y} r="5" fill="var(--orange)" />
        </svg>
      )}
    </div>
  );
}
