import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { TournamentProvider } from "./context/TournamentContext";
import { PopupProvider } from "./context/PopupContext";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TournamentProvider>
          <PopupProvider>
            <App />
          </PopupProvider>
        </TournamentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
