import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type GlassCapsuleProps = {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  tint?: string;
};

export function GlassCapsule({ label, style, textStyle }: GlassCapsuleProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.capsule,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
