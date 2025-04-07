import i18n from 'i18next';
import type { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setDocumentTitle } from '@/utils/setDocumentTitle';
import commonEN from './locales/en/common.json';
import commonZH from './locales/zh-TW/common.json';
import policyEN from './locales/en/policy.json';
import policyZH from './locales/zh-TW/policy.json';
import footerEN from './locales/en/footer.json';
import footerZH from './locales/zh-TW/footer.json';
import navigationEN from './locales/en/navigation.json';
import navigationZH from './locales/zh-TW/navigation.json';
import aboutEN from './locales/en/about.json';
import aboutZH from './locales/zh-TW/about.json';
import pageheaderEN from './locales/en/pageheader.json';
import pageheaderZH from './locales/zh-TW/pageheader.json';

export enum LanguageType {
  EN = 'en',
  ZH_TW = 'zh-TW',
}
export const resources = {
  [LanguageType.ZH_TW]: {
    common: commonZH,
    policy: policyZH,
    footer: footerZH,
    navigation: navigationZH,
    about: aboutZH,
    pageheader: pageheaderZH,
  },
  [LanguageType.EN]: {
    common: commonEN,
    policy: policyEN,
    footer: footerEN,
    navigation: navigationEN,
    about: aboutEN,
    pageheader: pageheaderEN,
  },
} as const;

const initOptions: InitOptions = {
  resources,
  fallbackLng: LanguageType.ZH_TW,
  // preload: [LanguageType.ZH_TW, LanguageType.EN],
  preload: [LanguageType.ZH_TW],
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(initOptions)
  .then(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? LanguageType.ZH_TW;
    setDocumentTitle();
  });

i18n.on('languageChanged', (lang) => {
  document.documentElement.lang = lang;
});

export default i18n;
