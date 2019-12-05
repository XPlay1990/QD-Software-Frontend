import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en/translation.json';
import translationDE from './de/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,

        objectNotation: true,

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;