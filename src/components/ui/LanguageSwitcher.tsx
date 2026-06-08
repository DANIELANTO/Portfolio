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
      className="fixed top-8 right-8 z-50 flex items-center justify-center w-10 h-10 bg-white border border-[#E4E4E7] rounded-md shadow-sm hover:border-[#0070F3] hover:text-[#0070F3] active:opacity-80 transition-all duration-150 font-mono text-[11px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0070F3]/30"
      aria-label="Toggle language"
    >
      {i18n.language.startsWith('es') ? 'ES' : 'EN'}
    </button>
  );
};
