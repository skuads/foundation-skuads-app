import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlassButton } from './GlassButton';
import { GlassInput } from './GlassInput';
import { colors, fontFamily, fontSize, spacing } from '../theme';
import { t } from '../i18n';

type DateRangeControlsProps = {
  value: { from: string; to: string };
  onChange: (next: { from: string; to: string }) => void;
  onApply: () => void;
  onClear: () => void;
  helper?: string;
  loading?: boolean;
};

export function DateRangeControls({
  value,
  onChange,
  onApply,
  onClear,
  helper,
  loading,
}: DateRangeControlsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('date_range.title')}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{t('date_range.from')}</Text>
          <GlassInput
            placeholder="YYYY-MM-DD"
            value={value.from}
            onChangeText={text => onChange({ ...value, from: text })}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{t('date_range.to')}</Text>
          <GlassInput
            placeholder="YYYY-MM-DD"
            value={value.to}
            onChangeText={text => onChange({ ...value, to: text })}
          />
        </View>
      </View>
      <View style={styles.actions}>
        <GlassButton
          label={loading ? t('common.loading') : t('date_range.apply')}
          onPress={onApply}
        />
        <GlassButton label={t('date_range.reset')} variant="ghost" onPress={onClear} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  helper: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  field: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
