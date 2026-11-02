import React from 'react';

import { BASE_TYPOGRAPHY } from '@/constants/font-size';
import { useAppSettings } from '@/providers/app-settings-provider';
import { containsKhmerText } from '@/utils';
import type { AppTheme } from '@/constants/themes';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

export type TextVariant =
  | 'hero'
  | 'header'
  | 'title'
  | 'subheading'
  | 'body'
  | 'bodySmall'
  | 'caption';

export type TextColorType =
  | 'default'
  | 'secondary'
  | 'muted'
  | 'primary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'inverse';

export interface ThemedTextProps extends RNTextProps {
  variant?: TextVariant;
  colorType?: TextColorType;
  bold?: boolean;
  forceLanguage?: 'km' | 'en';
  customFont?: string;
  style?: StyleProp<TextStyle>;
}

const textColorSelectors: Record<TextColorType, (theme: AppTheme) => string> = {
  default: (theme) => theme.colors.text,
  secondary: (theme) => theme.colors.textSecondary,
  muted: (theme) => theme.colors.textMuted,
  primary: (theme) => theme.colors.primary,
  accent: (theme) => theme.colors.accent,
  danger: (theme) => theme.colors.danger,
  success: (theme) => theme.colors.success,
  inverse: (theme) => theme.isDark ? '#000000' : '#FFFFFF',
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  colorType = 'default',
  bold = false,
  forceLanguage,
  customFont,
  style,
  ...props
}) => {
  const { theme, getActiveFont, scale } = useAppSettings();

  const baseSize = BASE_TYPOGRAPHY[variant] || BASE_TYPOGRAPHY.body;
  const scaledSize = scale(baseSize);
  const textColor = textColorSelectors[colorType](theme);

  const activeLanguage = forceLanguage ?? (containsKhmerText(children) ? 'km' : undefined);
  const fontFamily = customFont || getActiveFont(bold || variant === 'hero' || variant === 'header' || variant === 'title', activeLanguage);

  return (
    <RNText
      style={[
        {
          fontSize: scaledSize,
          color: textColor,
          fontFamily,
          lineHeight: Math.round(scaledSize * 1.4),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};