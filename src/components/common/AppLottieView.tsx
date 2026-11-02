import { lottieManager, LottieName } from '@/configs/lottie';
import type { AnimationObject } from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { useMemo } from 'react';
import { Platform, processColor, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface AppLottieViewProps {
  name: LottieName;
  style?: StyleProp<ViewStyle>;
  color?: string;
  colorFilters?: { keypath: string; color: string }[];
  autoPlay?: boolean;
  loop?: boolean;
}

const recolorAnimation = (source: AnimationObject, color: string): AnimationObject => {
  const processedColor = processColor(color);
  if (typeof processedColor !== 'number') {
    throw new Error(`Invalid Lottie color: ${color}`);
  }

  const rgba = [
    ((processedColor >>> 16) & 255) / 255,
    ((processedColor >>> 8) & 255) / 255,
    (processedColor & 255) / 255,
  ];
  const animation = JSON.parse(JSON.stringify(source)) as AnimationObject;

  const replaceColor = (value: unknown): void => {
    if (!Array.isArray(value) || value.length < 3 || value.some((channel) => typeof channel !== 'number')) {
      return;
    }

    value[0] = rgba[0];
    value[1] = rgba[1];
    value[2] = rgba[2];
  };

  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (value === null || typeof value !== 'object') {
      return;
    }

    const node = value as Record<string, unknown>;
    if (node.ty === 'fl' || node.ty === 'st') {
      const colorProperty = node.c;
      if (colorProperty !== null && typeof colorProperty === 'object') {
        const color = colorProperty as Record<string, unknown>;
        if (color.a === 1 && Array.isArray(color.k)) {
          color.k.forEach((keyframe: unknown) => {
            if (keyframe === null || typeof keyframe !== 'object') {
              return;
            }

            const frame = keyframe as Record<string, unknown>;
            replaceColor(frame.s);
            replaceColor(frame.e);
          });
        } else {
          replaceColor(color.k);
        }
      }
    }

    Object.values(node).forEach(visit);
  };

  visit(animation);
  return animation;
};

const AppLottieView = ({
  name,
  style,
  color,
  colorFilters,
  autoPlay = true,
  loop = true,
}: AppLottieViewProps) => {
  const lottieSource = lottieManager.get(name);
  const source = useMemo(
    () => color ? recolorAnimation(lottieSource, color) : lottieSource,
    [color, lottieSource],
  );
  const componentStyle = StyleSheet.flatten([styles.defaultStyle, style]) ?? styles.defaultStyle;
  const webStyle = Platform.OS === 'web'
    ? {
      width: typeof componentStyle.width === 'string' || typeof componentStyle.width === 'number'
        ? componentStyle.width
        : undefined,
      height: typeof componentStyle.height === 'string' || typeof componentStyle.height === 'number'
        ? componentStyle.height
        : undefined,
    }
    : undefined;

  return (
    <LottieView
      source={source}
      colorFilters={colorFilters}
      style={componentStyle}
      webStyle={webStyle}
      autoPlay={autoPlay}
      loop={loop}
    />
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    width: 100,
    height: 100,
  },
});

export default AppLottieView;