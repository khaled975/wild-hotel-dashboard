import { createContext, useState } from "react";

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    window.matchMedia("prefers-color-scheme: dark").matches
  );
  function toggleDarkMode() {
    setIsDark((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
