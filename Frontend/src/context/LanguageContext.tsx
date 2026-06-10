import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../locales/translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>("EN");

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem("preferred_lang");
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      return;
    }

    // Auto-detect browser language
    const browserLang = navigator.language.split("-")[0].toUpperCase();
    if (translations[browserLang]) {
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("preferred_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
