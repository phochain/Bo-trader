import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './resources/en.json';
import translationVI from './resources/vi.json';
import translationJp from './resources/jp.json';
import translationKr from './resources/kr.json';
import translationCh from './resources/ch.json';
import translationCam from './resources/cam.json';
import translationTh from './resources/th.json';
import translationIdn from './resources/idn.json';
import translationLa from './resources/la.json';

// Define the type for your translation structure
interface Translation {
  [key: string]: string; // Represents key-value pairs in your translation files
}

interface TranslationResources {
  [key: string]: {
    translation: Translation; // Use the Translation type here
  };
}

// Define your translations
const translations: { [key: string]: Translation } = {
  en: translationEN,
  vi: translationVI,
  jp: translationJp,
  kr: translationKr,
  ch: translationCh,
  cam: translationCam,
  th: translationTh,
  idn: translationIdn,
  la: translationLa,
};

// Initialize resources with the correct type
const resources: TranslationResources = Object.keys(translations).reduce((acc, lang) => {
  acc[lang] = { translation: translations[lang] };
  return acc;
}, {} as TranslationResources);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;