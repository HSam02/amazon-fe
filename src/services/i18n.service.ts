import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locals/en/translation.json";
import ruTranslation from "../locals/ru/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  // Add more languages here as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
