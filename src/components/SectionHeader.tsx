import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme';

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  action: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
