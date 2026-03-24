import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  WarningCircleIcon,
  XIcon
} from "@phosphor-icons/react";

export interface PopupResult {
  success: boolean;
  message: string;
}

interface PopupProps {
  result: PopupResult;
  onClose: () => void;
}

export default function Popup({ result, onClose }: PopupProps) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(0);
  const startTimeRef = useRef(0);
  const remainingRef = useRef(3500);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, remainingRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timeoutRef.current);
    remainingRef.current -= Date.now() - startTimeRef.current;
  };

  const resumeTimer = () => startTimer();

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClose = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`${styles.popup} ${result.success ? styles.success : styles.fail} ${visible ? styles.fadeIn : styles.fadeOut}`}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className={styles.icon}>
        {result.success ? (
          <CheckCircleIcon size={20} weight="duotone" />
        ) : (
          <WarningCircleIcon size={20} weight="duotone" />
        )}
      </div>
      <p className={styles.message}>{result.message}</p>
      <button className={styles.close} onClick={handleClose}>
        <XIcon size={16} weight="bold" />
      </button>
    </div>
  );
}
