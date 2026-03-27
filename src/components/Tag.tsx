import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type TagProps = {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

const toneMap = {
  neutral: colors.chipBackground,
  success: 'rgba(16, 185, 129, 0.16)',
  warning: 'rgba(245, 158, 11, 0.16)',
  danger: 'rgba(239, 68, 68, 0.16)',
};

export function Tag({ label, tone = 'neutral' }: TagProps) {
  return (
    <View style={[styles.tag, { backgroundColor: toneMap[tone] }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: radii.capsule,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});
