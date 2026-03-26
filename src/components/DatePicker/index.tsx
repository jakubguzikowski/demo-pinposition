import styles from "./index.module.scss";
import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onRangeChange: (start: string, end: string) => void;
}

function fromDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DatePicker({
  startDate,
  endDate,
  onRangeChange
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined
  } as DateRange);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (r: DateRange | undefined) => {
    setRange(r);
  };

  const handleConfirm = () => {
    if (!range?.from || !range?.to) return;
    onRangeChange(fromDate(range.from), fromDate(range.to));
    setOpen(false);
  };

  const displayValue =
    startDate && endDate ? `${startDate} — ${endDate}` : startDate || "";

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={`field ${styles.field}`}>
        <input
          className="input"
          placeholder=" "
          value={displayValue}
          readOnly
          onFocus={() => setOpen(true)}
        />
        <label className="label">Tournament dates</label>
      </div>

      {open && (
        <div className={styles.popover}>
          <DayPicker
            captionLayout="label"
            ISOWeek
            mode="range"
            navLayout="around"
            required
            resetOnSelect
            selected={range}
            onSelect={handleSelect}
          />
          <button
            className={styles.confirm}
            disabled={!range?.from || !range?.to}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
