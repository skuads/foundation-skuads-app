import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { t } from '../i18n';
import { colors, fontFamily, fontSize, spacing } from '../theme';

Sound.setCategory('Playback');

type AudioPlayerProps = {
  url?: string | null;
  title?: string;
};

export function AudioPlayer({ url, title }: AudioPlayerProps) {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const instance = new Sound(url, undefined, error => {
      if (error) {
        setIsLoading(false);
        return;
      }
      setDuration(instance.getDuration() || 0);
      setSound(instance);
      setIsLoading(false);
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      instance.release();
    };
  }, [url]);

  useEffect(() => {
    if (!sound || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      sound.getCurrentTime(seconds => {
        setPosition(seconds);
      });
    }, 400);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [sound, isPlaying]);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(1, position / duration);
  }, [position, duration]);

  const togglePlayback = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
      return;
    }
    sound.play(() => {
      setIsPlaying(false);
      setPosition(0);
    });
    setIsPlaying(true);
  };

  if (!url) {
    return null;
  }

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.row}>
        <Pressable
          onPress={togglePlayback}
          style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}
          disabled={isLoading}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={colors.textPrimary}
          />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.time}>{formatTime(position)} / {formatTime(duration)}</Text>
      </View>
      {isLoading ? <Text style={styles.helper}>{t('calls.audio_loading')}</Text> : null}
    </View>
  );
}

function formatTime(value: number) {
  if (!value || Number.isNaN(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  pressed: {
    opacity: 0.85,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  time: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    minWidth: 70,
    textAlign: 'right',
  },
  helper: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
