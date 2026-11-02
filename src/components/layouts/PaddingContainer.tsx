import React from 'react';
import { DimensionValue, StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface PaddingContainerProps extends ViewProps {
  children?: React.ReactNode;
  /** Horizontal inline padding (left/right). Defaults to 16. */
  paddingInline?: DimensionValue;
  /** Vertical block padding (top/bottom). Optional. */
  paddingBlock?: DimensionValue;
  /** Allows passing any standard ViewStyle or overrides */
  style?: StyleProp<ViewStyle>;
}

const PaddingContainer: React.FC<PaddingContainerProps> = ({
  children,
  paddingInline = 16,
  paddingBlock,
  style,
  ...restProps
}) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: paddingInline, // Uses standard RN paddingHorizontal for cross-platform support
          ...(paddingBlock !== undefined ? { paddingVertical: paddingBlock } : {}),
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
};

export default PaddingContainer;