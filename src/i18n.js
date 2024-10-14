import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './Json/en.json'; // Ajuste do caminho
import translationPT from './Json/pt.json'; // Ajuste do caminho

const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
