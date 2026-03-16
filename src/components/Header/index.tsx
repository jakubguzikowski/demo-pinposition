import styles from "./index.module.scss";
import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import Navigation from "../Navigation";


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Navigation />
      <button className={styles.theme_button} onClick={toggleTheme}>
        {theme === "light" ? (
          <MoonIcon size={20} weight="duotone" />
        ) : (
          <SunIcon size={20} weight="duotone" />
        )}
      </button>
    </header>
  );
}
