import {
      DEFAULT_FONT_SIZE_KEY,
      FontSizeKey,
      getFontScale,
      scaleFontSize,
} from '@/constants/font-size';
import {
      DEFAULT_ENGLISH_FONT_ID,
      DEFAULT_KHMER_FONT_ID,
      ENGLISH_FONTS,
      FontOption,
      KHMER_FONTS,
      getEnglishFontById,
      getKhmerFontById,
} from '@/constants/fonts';
import {
      DEFAULT_LANGUAGE,
      SupportedLanguage,
      TranslationSchema,
      translations,
} from '@/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
      APP_THEMES,
      AppTheme,
      DEFAULT_THEME_ID,
      getThemeById,
} from '../constants/themes';

interface AppSettingsContextValue {
      // State
      language: SupportedLanguage;
      themeId: string;
      khmerFontId: string;
      englishFontId: string;
      fontSizeKey: FontSizeKey;
      isReady: boolean;

      // Resolved Objects
      theme: AppTheme;
      khmerFont: FontOption;
      englishFont: FontOption;
      fontScale: number;
      translations: TranslationSchema;

      // Actions
      setLanguage: (lang: SupportedLanguage) => Promise<void>;
      setThemeId: (id: string) => Promise<void>;
      setKhmerFontId: (id: string) => Promise<void>;
      setEnglishFontId: (id: string) => Promise<void>;
      setFontSizeKey: (key: FontSizeKey) => Promise<void>;
      resetToDefaults: () => Promise<void>;

      // Helpers
      scale: (size: number) => number;
      getActiveFont: (isBold?: boolean, forceLanguage?: 'km' | 'en') => string;
      t: (path: string) => string;
}

const STORAGE_KEYS = {
      LANGUAGE: '@app_template_language',
      THEME: '@app_template_theme',
      KHMER_FONT: '@app_template_khmer_font',
      ENGLISH_FONT: '@app_template_english_font',
      FONT_SIZE: '@app_template_font_size',
};

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
      const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
      const [themeId, setThemeIdState] = useState<string>(DEFAULT_THEME_ID);
      const [khmerFontId, setKhmerFontIdState] = useState<string>(DEFAULT_KHMER_FONT_ID);
      const [englishFontId, setEnglishFontIdState] = useState<string>(DEFAULT_ENGLISH_FONT_ID);
      const [fontSizeKey, setFontSizeKeyState] = useState<FontSizeKey>(DEFAULT_FONT_SIZE_KEY);
      const [isReady, setIsReady] = useState<boolean>(false);

      // Load saved preferences on mount
      useEffect(() => {
            async function loadSettings() {
                  let savedSettings: [string | null, string | null, string | null, string | null, string | null];
                  try {
                        savedSettings = await Promise.all([
                              AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
                              AsyncStorage.getItem(STORAGE_KEYS.THEME),
                              AsyncStorage.getItem(STORAGE_KEYS.KHMER_FONT),
                              AsyncStorage.getItem(STORAGE_KEYS.ENGLISH_FONT),
                              AsyncStorage.getItem(STORAGE_KEYS.FONT_SIZE),
                        ]);
                  } catch (e) {
                        console.warn('Failed to load settings from storage', e);
                        savedSettings = [null, null, null, null, null];
                  }

                  const [savedLang, savedTheme, savedKhmerFont, savedEnglishFont, savedFontSize] = savedSettings;
                  if (savedLang && (savedLang === 'en' || savedLang === 'km' || savedLang === 'zh')) {
                        setLanguageState(savedLang as SupportedLanguage);
                  }
                  if (savedTheme && APP_THEMES.some((t) => t.id === savedTheme)) {
                        setThemeIdState(savedTheme);
                  }
                  if (savedKhmerFont && KHMER_FONTS.some((f) => f.id === savedKhmerFont)) {
                        setKhmerFontIdState(savedKhmerFont);
                  }
                  if (savedEnglishFont && ENGLISH_FONTS.some((f) => f.id === savedEnglishFont)) {
                        setEnglishFontIdState(savedEnglishFont);
                  }
                  if (
                        savedFontSize &&
                        ['small', 'normal', 'medium', 'large', 'extraLarge'].includes(savedFontSize)
                  ) {
                        setFontSizeKeyState(savedFontSize as FontSizeKey);
                  }
                  setIsReady(true);
            }

            loadSettings();
      }, []);

      const setLanguage = useCallback(async (lang: SupportedLanguage) => {
            setLanguageState(lang);
            try {
                  await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
            } catch (e) {
                  console.warn('Error saving language:', e);
            }
      }, []);

      const setThemeId = useCallback(async (id: string) => {
            setThemeIdState(id);
            try {
                  await AsyncStorage.setItem(STORAGE_KEYS.THEME, id);
            } catch (e) {
                  console.warn('Error saving theme:', e);
            }
      }, []);

      const setKhmerFontId = useCallback(async (id: string) => {
            setKhmerFontIdState(id);
            try {
                  await AsyncStorage.setItem(STORAGE_KEYS.KHMER_FONT, id);
            } catch (e) {
                  console.warn('Error saving khmer font:', e);
            }
      }, []);

      const setEnglishFontId = useCallback(async (id: string) => {
            setEnglishFontIdState(id);
            try {
                  await AsyncStorage.setItem(STORAGE_KEYS.ENGLISH_FONT, id);
            } catch (e) {
                  console.warn('Error saving english font:', e);
            }
      }, []);

      const setFontSizeKey = useCallback(async (key: FontSizeKey) => {
            setFontSizeKeyState(key);
            try {
                  await AsyncStorage.setItem(STORAGE_KEYS.FONT_SIZE, key);
            } catch (e) {
                  console.warn('Error saving font size:', e);
            }
      }, []);

      const resetToDefaults = useCallback(async () => {
            setLanguageState(DEFAULT_LANGUAGE);
            setThemeIdState(DEFAULT_THEME_ID);
            setKhmerFontIdState(DEFAULT_KHMER_FONT_ID);
            setEnglishFontIdState(DEFAULT_ENGLISH_FONT_ID);
            setFontSizeKeyState(DEFAULT_FONT_SIZE_KEY);
            try {
                  await AsyncStorage.multiRemove([
                        STORAGE_KEYS.LANGUAGE,
                        STORAGE_KEYS.THEME,
                        STORAGE_KEYS.KHMER_FONT,
                        STORAGE_KEYS.ENGLISH_FONT,
                        STORAGE_KEYS.FONT_SIZE,
                  ]);
            } catch (e) {
                  console.warn('Error resetting settings:', e);
            }
      }, []);

      const theme = useMemo(() => getThemeById(themeId), [themeId]);
      const khmerFont = useMemo(() => getKhmerFontById(khmerFontId), [khmerFontId]);
      const englishFont = useMemo(() => getEnglishFontById(englishFontId), [englishFontId]);
      const fontScale = useMemo(() => getFontScale(fontSizeKey), [fontSizeKey]);
      const activeTranslations = useMemo(() => translations[language] || translations.en, [language]);

      const scale = useCallback(
            (size: number) => scaleFontSize(size, fontSizeKey),
            [fontSizeKey]
      );

      const getActiveFont = useCallback(
            (isBold?: boolean, forceLanguage?: 'km' | 'en'): string => {
                  const isKhmer = forceLanguage ? forceLanguage === 'km' : language === 'km';
                  if (isKhmer) {
                        if (isBold && khmerFont.bold) return khmerFont.bold;
                        return khmerFont.regular;
                  }
                  if (isBold && englishFont.bold) return englishFont.bold;
                  return englishFont.regular;
            },
            [language, khmerFont, englishFont]
      );

      const t = useCallback(
            (path: string): string => {
                  const parts = path.split('.');
                  let current: any = activeTranslations;
                  for (const part of parts) {
                        if (current && typeof current === 'object' && part in current) {
                              current = current[part];
                        } else {
                              // Fallback to English
                              let fallback: any = translations.en;
                              for (const fbPart of parts) {
                                    if (fallback && typeof fallback === 'object' && fbPart in fallback) {
                                          fallback = fallback[fbPart];
                                    } else {
                                          return path;
                                    }
                              }
                              return typeof fallback === 'string' ? fallback : path;
                        }
                  }
                  return typeof current === 'string' ? current : path;
            },
            [activeTranslations]
      );

      const value = useMemo(
            () => ({
                  language,
                  themeId,
                  khmerFontId,
                  englishFontId,
                  fontSizeKey,
                  isReady,
                  theme,
                  khmerFont,
                  englishFont,
                  fontScale,
                  translations: activeTranslations,
                  setLanguage,
                  setThemeId,
                  setKhmerFontId,
                  setEnglishFontId,
                  setFontSizeKey,
                  resetToDefaults,
                  scale,
                  getActiveFont,
                  t,
            }),
            [
                  language,
                  themeId,
                  khmerFontId,
                  englishFontId,
                  fontSizeKey,
                  isReady,
                  theme,
                  khmerFont,
                  englishFont,
                  fontScale,
                  activeTranslations,
                  setLanguage,
                  setThemeId,
                  setKhmerFontId,
                  setEnglishFontId,
                  setFontSizeKey,
                  resetToDefaults,
                  scale,
                  getActiveFont,
                  t,
            ]
      );

      return (
            <AppSettingsContext.Provider value={value}>
                  {children}
            </AppSettingsContext.Provider>
      );
}

export function useAppSettings(): AppSettingsContextValue {
      const context = useContext(AppSettingsContext);
      if (!context) {
            throw new Error('useAppSettings must be used within an AppSettingsProvider');
      }
      return context;
}