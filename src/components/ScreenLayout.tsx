import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { colors, fontFamily, fontSize, layout, spacing } from '../theme';
import { useAuth } from '../data/AuthStore';
import { Avatar } from './Avatar';
import { LiquidBackground } from './LiquidBackground';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Main screen wrapper.
 *
 * Flat hierarchy with a dedicated navigation layer.
 * This stays compatible with iOS Liquid Glass guidance while keeping
 * custom app surfaces and controls strictly flat.
 */
export function ScreenLayout({
  title,
  subtitle,
  children,
  scroll = true,
  contentStyle,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const Container: React.ElementType = scroll ? ScrollView : View;
  const bodyProps = scroll
    ? {
        contentContainerStyle: [styles.content, contentStyle],
        showsVerticalScrollIndicator: false,
      }
    : { style: [styles.content, contentStyle] };

  return (
    <View style={styles.root}>
      <LiquidBackground />

      <View style={[styles.navBar, { paddingTop: insets.top }]}>
        <View style={[StyleSheet.absoluteFill, styles.navBarSurface]} />
        <View style={styles.navBarBorder} />

        <View style={styles.navBarContent}>
          {/* Avatar → opens drawer */}
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.iconButton}
            hitSlop={8}
          >
            <Avatar uri={user?.profile_photo_url} name={user?.name} size={30} />
          </Pressable>

          <View style={styles.navBarTitles}>
            <Text style={styles.navTitle} numberOfLines={1}>{title}</Text>
            {subtitle ? (
              <Text style={styles.navSubtitle} numberOfLines={1}>{subtitle}</Text>
            ) : null}
          </View>

          {/* Settings button */}
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.iconButton}
            hitSlop={8}
          >
            <Ionicons name="settings-outline" size={22} color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <Container {...(bodyProps as any)}>{children}</Container>
    </View>
  );
}

const NAV_BAR_HEIGHT = 52;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navBar: {
    position: 'relative',
    zIndex: 10,
  },
  navBarSurface: {
    backgroundColor: colors.surface,
  },
  navBarBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  navBarContent: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.contentPadding,
    gap: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarTitles: {
    flex: 1,
    alignItems: 'center',
  },
  navTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  navSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 1,
  },
  content: {
    paddingHorizontal: layout.contentPadding,
    paddingBottom: spacing.xxl + 20, // room for fixed tab bar + system inset
    paddingTop: spacing.md,
    gap: layout.sectionGap,
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
  },
});
