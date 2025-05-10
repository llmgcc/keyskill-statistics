import { translations } from '@/i18n/translations';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next)
.use(new LanguageDetector(null, { lookupLocalStorage: "language" }))
.init({
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: translations,
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
});

export default i18n;

