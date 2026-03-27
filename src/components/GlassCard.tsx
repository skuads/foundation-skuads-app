import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii } from '../theme';

type GlassCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  radius?: number;
  /**
   * Keeps API compatibility with previous "floating" cards.
   * In flat mode we only strengthen borders; no translucent or shadow effects.
   */
  floating?: boolean;
};

export function GlassCard({
  children,
  style,
  padding = 16,
  radius = radii.lg,
  floating = false,
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: radius,
          borderColor: floating ? colors.borderStrong : colors.border,
        },
        style,
      ]}
    >
      <View style={[styles.content, { padding }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexGrow: 1,
  },
});
