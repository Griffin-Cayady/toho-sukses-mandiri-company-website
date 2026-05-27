import React, { createContext, useState, useContext } from 'react';
import en from '@/locales/en';
import id from '@/locales/id';

const translations = { en, id };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result[k];
      if (!result) {
        let fallback = translations['en'];
        for (const fk of keys) {
          fallback = fallback[fk];
        }
        return fallback || key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);