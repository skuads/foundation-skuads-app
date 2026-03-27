import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { colors, layout, radii, spacing } from '../theme';
import { SkuadsLogo } from './SkuadsLogo';

type AuthLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthLayout({ children, header, footer }: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.center}>
          <SkuadsLogo />
          {header ? <View style={styles.header}>{header}</View> : null}
          <View style={styles.card}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.contentPadding,
    paddingVertical: spacing.xl,
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  header: {
    width: '100%',
    maxWidth: 520,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    width: '100%',
    maxWidth: 420,
  },
});
