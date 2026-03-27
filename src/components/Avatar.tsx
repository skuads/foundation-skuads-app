import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, fontSize } from '../theme';

type AvatarProps = {
  uri?: string | null;
  size?: number;
  name?: string | null;
};

function getInitials(name?: string | null) {
  if (!name) {
    return '';
  }
  const parts = name.trim().split(' ').filter(Boolean);
  if (!parts.length) {
    return '';
  }
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() ?? '';
  }
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

export function Avatar({ uri, size = 36, name }: AvatarProps) {
  const initials = getInitials(name);
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.initials}>{initials || '•'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
