import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

/**
 * Flat app background layer.
 */
export function LiquidBackground() {
  return <View style={styles.fill} pointerEvents="none" />;
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
});
