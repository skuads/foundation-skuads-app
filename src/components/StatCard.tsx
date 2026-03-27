import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type StatCardProps = {
  label: string;
  value: string;
  gradient?: string[];
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
});
