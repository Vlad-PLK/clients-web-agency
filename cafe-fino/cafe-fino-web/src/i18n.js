import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslation from './locales/fr/translation.json';
import enTranslation from './locales/en/translation.json';

const savedLanguage = localStorage.getItem('cafe-fino-lang');

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslation },
      en: { translation: enTranslation },
    },
    lng: savedLanguage || 'fr',
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    interpolation: { escapeValue: false },
  });

export default i18n;
