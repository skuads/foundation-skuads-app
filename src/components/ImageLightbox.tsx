import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fontFamily, fontSize, spacing } from '../theme';

type ImageLightboxProps = {
  visible: boolean;
  imageUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  onClose: () => void;
  children?: React.ReactNode;
};

export function ImageLightbox({
  visible,
  imageUrl,
  title,
  subtitle,
  onClose,
  children,
}: ImageLightboxProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={18} color={colors.textPrimary} />
            </Pressable>
          </View>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
          {children ? <View style={styles.actions}>{children}</View> : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 12, 18, 0.72)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
    gap: 2,
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
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  imagePlaceholder: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
  },
  actions: {
    gap: spacing.sm,
  },
});
