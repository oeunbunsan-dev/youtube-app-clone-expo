import React from 'react';

import { BASE_TYPOGRAPHY } from '@/constants/font-size';
import { useAppSettings } from '@/providers/app-settings-provider';
import { containsKhmerText } from '@/utils';
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

  let textColor = theme.colors.text;
  switch (colorType) {
    case 'secondary':
      textColor = theme.colors.textSecondary;
      break;
    case 'muted':
      textColor = theme.colors.textMuted;
      break;
    case 'primary':
      textColor = theme.colors.primary;
      break;
    case 'accent':
      textColor = theme.colors.accent;
      break;
    case 'danger':
      textColor = theme.colors.danger;
      break;
    case 'success':
      textColor = theme.colors.success;
      break;
    case 'inverse':
      textColor = theme.isDark ? '#000000' : '#FFFFFF';
      break;
  }

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