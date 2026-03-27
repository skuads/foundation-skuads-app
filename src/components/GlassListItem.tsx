import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '../theme';
import { Tag } from './Tag';

type GlassListItemProps = {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  leading?: React.ReactNode;
};

export function GlassListItem({ title, subtitle, meta, badge, tone, leading }: GlassListItemProps) {
  return (
    <View style={styles.container}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.metaBlock}>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        {badge ? <Tag label={badge} tone={tone} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leading: {
    marginRight: spacing.md,
  },
  textBlock: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  metaBlock: {
    alignItems: 'flex-end',
  },
  meta: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: 6,
  },
});
