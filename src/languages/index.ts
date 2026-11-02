import { chinese } from './chinese';
import { english } from './english';
import { khmer } from './khmer';
import { SupportedLanguage, TranslationSchema } from './types';

export * from './types';

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en: english,
  km: khmer,
  zh: chinese,
};

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function getTranslation(lang: SupportedLanguage = DEFAULT_LANGUAGE): TranslationSchema {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}