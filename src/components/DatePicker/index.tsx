import styles from "./index.module.scss";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DatePickerProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  isFirst?: boolean;
}

function toDate(val: string): Date | undefined {
  if (val.length !== 10) return undefined;
  const d = new Date(val);
  return isNaN(d.getTime()) ? undefined : d;
}

function fromDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DatePicker({
  value,
  onChange,
  label,
  isFirst
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = toDate(value);
  const month = selected ?? new Date();

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={`field ${styles.field}`}>
        <input
          className="input"
          placeholder=" "
          value={value}
          readOnly
          onFocus={() => setOpen(true)}
        />
        <label className="label">{label}</label>
      </div>

      {open && (
        <div className={`${styles.popover} ${isFirst ? styles.first : ""}`}>
          <DayPicker
            mode="single"
            weekStartsOn={1}
            selected={selected}
            defaultMonth={month}
            onSelect={(date) => {
              if (date) {
                onChange(fromDate(date));
                setOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
