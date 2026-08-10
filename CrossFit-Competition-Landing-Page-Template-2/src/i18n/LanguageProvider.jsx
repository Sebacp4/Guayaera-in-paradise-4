import { useSyncExternalStore } from 'react';
import i18n, { changeLanguage, normalizeLanguage } from './config';

const getCurrentLanguage = () =>
  normalizeLanguage(i18n.resolvedLanguage || i18n.language || 'en');

const subscribeToLanguage = (callback) => {
  const handleLanguageChanged = () => callback();
  i18n.on('languageChanged', handleLanguageChanged);

  return () => {
    i18n.off('languageChanged', handleLanguageChanged);
  };
};

export function LanguageProvider({ children }) {
  return children;
}

export function useLanguage() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getCurrentLanguage,
    getCurrentLanguage
  );

  return {
    language,
    setLanguage: changeLanguage,
  };
}
