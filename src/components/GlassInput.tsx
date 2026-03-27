import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type GlassInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function GlassInput({ containerStyle, inputStyle, ...rest }: GlassInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, inputStyle]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
