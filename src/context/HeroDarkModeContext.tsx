"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface HeroDarkModeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const HeroDarkModeContext = createContext<HeroDarkModeContextType | undefined>(undefined);

export function useHeroDarkMode() {
  const context = useContext(HeroDarkModeContext);
  if (!context) {
    throw new Error("useHeroDarkMode must be used within a HeroDarkModeProvider");
  }
  return context;
}

export function HeroDarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <HeroDarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </HeroDarkModeContext.Provider>
  );
} 