import { createContext, useContext, useMemo, useState } from "react";

const PortfolioContext = createContext(null);

function readStoredLanguage() {
  try {
    return localStorage.getItem("siteLang") || "en";
  } catch {
    return "en";
  }
}

export function PortfolioProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);
  const [bootComplete, setBootComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("start");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const setLanguage = (nextLang) => {
    setLanguageState(nextLang);
    try {
      localStorage.setItem("siteLang", nextLang);
    } catch {
      /* ignore quota / private mode */
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en");
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      bootComplete,
      setBootComplete,
      scrollLocked,
      setScrollLocked,
      panelOpen,
      setPanelOpen,
      activeSection,
      setActiveSection,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [language, bootComplete, scrollLocked, panelOpen, activeSection, mobileMenuOpen],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}
