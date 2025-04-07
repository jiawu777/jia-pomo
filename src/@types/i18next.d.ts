import { LanguageType, resources } from '@/i18n';

// react-i18next versions higher than 11.11.0
declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    // custom resources type
    resources: (typeof resources)[LanguageType.ZH_TW];
    resources: (typeof resources)[LanguageType.EN_US];
  }
}
