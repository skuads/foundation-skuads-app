import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme';

type InfoRowProps = {
  label: string;
  value?: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
