import { useState } from "react";
import { PopupResult } from "../components/Popup";
import { generateId } from "../utils/generateId";

export function usePopup() {
  const [popups, setPopups] = useState<{ id: string; result: PopupResult }[]>(
    []
  );

  const showPopup = (result: PopupResult) => {
    const id = generateId();
    setPopups((prev) => [...prev, { id, result }]);
  };

  const closePopup = (id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  return { popups, showPopup, closePopup };
}
