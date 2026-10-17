import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface StickerTextProps {
  children: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * Komponen Text dengan efek outline / stroke solid seperti potongan stiker (die-cut sticker).
 * Bekerja konsisten di iOS, Android, dan Web.
 */
export function StickerText({
  children,
  style,
  containerStyle,
  strokeColor = '#FFFFFF',
  strokeWidth = 5,
}: StickerTextProps) {
  const points = 16;
  const strokeLayers: React.ReactNode[] = [];

  // Double layer sampling agar stroke tebal terisi penuh tanpa celah
  const radii = strokeWidth > 3 ? [strokeWidth * 0.5, strokeWidth] : [strokeWidth];

  radii.forEach((r, rIdx) => {
    for (let i = 0; i < points; i++) {
      const angle = (i * 2 * Math.PI) / points;
      const dx = Math.round(Math.cos(angle) * r * 10) / 10;
      const dy = Math.round(Math.sin(angle) * r * 10) / 10;

      strokeLayers.push(
        <Text
          key={`${rIdx}-${i}`}
          aria-hidden
          style={[
            style,
            styles.strokeLayer,
            {
              color: strokeColor,
              transform: [{ translateX: dx }, { translateY: dy }],
            },
          ]}>
          {children}
        </Text>
      );
    }
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {strokeLayers}
      <Text style={style}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  strokeLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
