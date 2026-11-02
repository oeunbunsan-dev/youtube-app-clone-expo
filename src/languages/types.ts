export type SupportedLanguage = 'en' | 'km' | 'zh';

export interface TranslationSchema {
  common: {
    home: string;
    settings: string;
    appearance: string;
    typography: string;
    language: string;
    theme: string;
    fontSize: string;
    preview: string;
    reset: string;
    resetConfirm: string;
    resetSuccess: string;
    done: string;
    close: string;
    select: string;
    active: string;
    version: string;
  };
  navigation: {
    homeTitle: string;
    settingsTitle: string;
    fontSettings: string;
    themeSettings: string;
    languageSettings: string;
  };
  home: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    templateBadge: string;
    systemOverview: string;
    activeTheme: string;
    activeLanguage: string;
    activeEnglishFont: string;
    activeKhmerFont: string;
    activeFontSize: string;
    quickSwitch: string;
    testTypography: string;
    interactivePreview: string;
    inputPlaceholder: string;
    openSettingsButton: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageSectionTitle: string;
    languageSectionDesc: string;
    themeSectionTitle: string;
    themeSectionDesc: string;
    khmerFontsSectionTitle: string;
    khmerFontsSectionDesc: string;
    englishFontsSectionTitle: string;
    englishFontsSectionDesc: string;
    fontSizeSectionTitle: string;
    fontSizeSectionDesc: string;
    resetAllSettings: string;
    resetDescription: string;
  };
  fontSizes: {
    small: string;
    normal: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  samples: {
    khmerQuote: string;
    englishQuote: string;
    chineseQuote: string;
  };
}