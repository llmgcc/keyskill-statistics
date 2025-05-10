import { translations } from '@/i18n/translations';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const LOCAL_STORAGE_KEY = 'language';

i18n
  .use(new LanguageDetector(null, { lookupLocalStorage: LOCAL_STORAGE_KEY }))
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: translations,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LOCAL_STORAGE_KEY,
    },
  });

export default i18n;
