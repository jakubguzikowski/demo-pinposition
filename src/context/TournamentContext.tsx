import React, { createContext, useContext } from "react";
import { Tournament } from "../types/tournament";
import { useTournaments } from "../hooks/useTournaments";

interface TournamentContextType {
  tournaments: Tournament[];
  add: (t: Tournament) => boolean;
  update: (t: Tournament) => boolean;
  remove: (id: string) => void;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

export function TournamentProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { tournaments, add, update, remove } = useTournaments();

  return (
    <TournamentContext.Provider value={{ tournaments, add, update, remove }}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournamentContext(): TournamentContextType {
  const context = useContext(TournamentContext);
  if (!context)
    throw new Error(
      "useTournamentContext must be used within TournamentProvider"
    );
  return context;
}
