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
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-background border border-foreground/10 shadow-sm hover:border-primary hover:text-primary transition-colors duration-200 font-bold uppercase text-xs"
      aria-label="Toggle language"
    >
      {i18n.language.startsWith('es') ? 'ES' : 'EN'}
    </button>
  );
};
