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
      className="fixed top-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border border-accent/20 rounded-full shadow-sm hover:border-primary hover:text-primary active:scale-95 transition-all duration-300 font-sans text-[11px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle language"
    >
      {i18n.language.startsWith('es') ? 'ES' : 'EN'}
    </button>
  );
};
