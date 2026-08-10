import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './resources/en/common';
import esCommon from './resources/es/common';

export const LANGUAGE_STORAGE_KEY = 'guayaera-language';
export const supportedLanguages = ['en', 'es'];

export const normalizeLanguage = (value) => {
  const normalized = String(value || '').toLowerCase().split('-')[0];
  return supportedLanguages.includes(normalized) ? normalized : 'en';
};

export const getStoredLanguage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to read stored language preference:', error);
    return null;
  }
};

export const persistLanguage = (language) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Unable to persist language preference:', error);
  }
};

const syncDocumentLanguage = (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
};

const applyLanguageSideEffects = (language) => {
  const normalizedLanguage = normalizeLanguage(language);
  persistLanguage(normalizedLanguage);
  syncDocumentLanguage(normalizedLanguage);
  return normalizedLanguage;
};

const getBrowserLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return normalizeLanguage(
    window.navigator?.languages?.[0] || window.navigator?.language || 'en'
  );
};

const getInitialLanguage = () => {
  const storedLanguage = getStoredLanguage();
  if (storedLanguage) {
    return normalizeLanguage(storedLanguage);
  }

  return getBrowserLanguage();
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon },
      es: { common: esCommon },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    load: 'languageOnly',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  });

  applyLanguageSideEffects(i18n.resolvedLanguage || i18n.language || 'en');
  i18n.on('languageChanged', applyLanguageSideEffects);
}

export const changeLanguage = async (nextLanguage) => {
  const normalizedLanguage = normalizeLanguage(nextLanguage);
  const currentLanguage = normalizeLanguage(
    i18n.resolvedLanguage || i18n.language || 'en'
  );

  if (normalizedLanguage === currentLanguage) {
    return applyLanguageSideEffects(normalizedLanguage);
  }

  await i18n.changeLanguage(normalizedLanguage);

  return applyLanguageSideEffects(
    i18n.resolvedLanguage || i18n.language || normalizedLanguage
  );
};

export default i18n;
