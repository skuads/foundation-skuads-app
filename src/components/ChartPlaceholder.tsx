import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radii, spacing } from '../theme';

type ChartPlaceholderProps = {
  height?: number;
  bars?: number[];
};

const defaultBars = [0.28, 0.62, 0.4, 0.78, 0.5, 0.72, 0.36];

export function ChartPlaceholder({ height = 180, bars = defaultBars }: ChartPlaceholderProps) {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.grid}>
        {bars.map((value, index) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={`${value}-${index}`}
            style={[styles.bar, { height: Math.max(10, height * value) }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: 'flex-end',
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  bar: {
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
  },
});
