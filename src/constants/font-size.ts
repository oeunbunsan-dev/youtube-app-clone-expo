export type FontSizeKey = 'small' | 'normal' | 'medium' | 'large' | 'extraLarge';

export interface FontSizeOption {
  key: FontSizeKey;
  scale: number;
  labelKey: string;
  percentage: string;
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { key: 'small', scale: 0.85, labelKey: 'small', percentage: '85%' },
  { key: 'normal', scale: 1.0, labelKey: 'normal', percentage: '100%' },
  { key: 'medium', scale: 1.15, labelKey: 'medium', percentage: '115%' },
  { key: 'large', scale: 1.3, labelKey: 'large', percentage: '130%' },
  { key: 'extraLarge', scale: 1.45, labelKey: 'extraLarge', percentage: '145%' },
];

export const DEFAULT_FONT_SIZE_KEY: FontSizeKey = 'normal';

export const BASE_TYPOGRAPHY = {
  caption: 12,
  bodySmall: 14,
  body: 16,
  subheading: 18,
  title: 22,
  header: 26,
  hero: 32,
};

export function getFontScale(key: FontSizeKey): number {
  const found = FONT_SIZE_OPTIONS.find((opt) => opt.key === key);
  return found ? found.scale : 1.0;
}

export function scaleFontSize(base: number, scaleKey: FontSizeKey): number {
  const scale = getFontScale(scaleKey);
  return Math.round(base * scale);
}