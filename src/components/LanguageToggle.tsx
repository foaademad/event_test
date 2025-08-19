import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;