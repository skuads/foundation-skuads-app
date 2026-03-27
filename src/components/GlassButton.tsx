import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type GlassButtonVariant = 'primary' | 'secondary' | 'ghost' | 'floating';

type GlassButtonProps = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /**
   * primary   — solid indigo fill (default)
   * secondary — light indigo tinted surface
   * ghost     — outlined, transparent
   * floating  — elevated flat button (navigation helper / fab-like).
   */
  variant?: GlassButtonVariant;
  disabled?: boolean;
};

export function GlassButton({
  label,
  onPress,
  style,
  variant = 'primary',
  disabled = false,
}: GlassButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles[`${variant}Text`] ?? styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    overflow: 'hidden',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  floating: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.45,
  },
  primaryText: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: '#FFFFFF',
  },
  secondaryText: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.primary,
  },
  ghostText: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  floatingText: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
