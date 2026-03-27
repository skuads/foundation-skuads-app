import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize, radii, spacing } from '../theme';

type FilterPillsProps = {
  options: string[];
  active?: string | string[];
  onSelect?: (value: string) => void;
};

export function FilterPills({ options, active, onSelect }: FilterPillsProps) {
  const activeValues = Array.isArray(active) ? active : active ? [active] : [];

  return (
    <View style={styles.row}>
      {options.map(option => {
        const isActive = activeValues.includes(option);

        if (!onSelect) {
          return (
            <View key={option} style={[styles.pill, isActive && styles.pillActive]}>
              <Text style={[styles.text, isActive && styles.textActive]}>{option}</Text>
            </View>
          );
        }

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={({ pressed }) => [
              styles.pill,
              isActive && styles.pillActive,
              pressed && styles.pillPressed,
            ]}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    borderRadius: radii.capsule,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  pillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  pillPressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  textActive: {
    color: colors.primary,
    fontFamily: fontFamily.semibold,
  },
});
