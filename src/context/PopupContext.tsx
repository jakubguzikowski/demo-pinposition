import React, { createContext, useContext } from "react";
import { usePopup } from "../hooks/usePopup";
import { PopupResult } from "../components/Popup";
import PopupContainer from "../components/PopupContainer";

interface PopupContextType {
  showPopup: (result: PopupResult) => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const { popups, showPopup, closePopup } = usePopup();

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <PopupContainer popups={popups} onClose={closePopup} />
    </PopupContext.Provider>
  );
}

export function usePopupContext(): PopupContextType {
  const context = useContext(PopupContext);
  if (!context)
    throw new Error("usePopupContext must be used within PopupProvider");
  return context;
}
