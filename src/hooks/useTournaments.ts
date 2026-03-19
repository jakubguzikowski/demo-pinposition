import { useState } from "react";
import { Tournament } from "../types/tournament";

const KEY = "tournaments";

function load(): Tournament[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>(load);

  const add = (t: Tournament) => {
    const updated = [...tournaments, t];
    localStorage.setItem(KEY, JSON.stringify(updated));
    setTournaments(updated);
  };

  const remove = (id: string) => {
    const updated = tournaments.filter((t) => t.id !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));
    setTournaments(updated);
  };

  return { tournaments, add, remove };
}