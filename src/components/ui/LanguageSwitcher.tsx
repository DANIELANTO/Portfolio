import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-white border border-border shadow-sm hover:border-primary hover:text-primary active:translate-y-0.5 transition-all duration-200 font-mono text-[10px] font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      aria-label="Toggle language"
    >
      {i18n.language.startsWith('es') ? 'ES' : 'EN'}
    </button>
  );
};
