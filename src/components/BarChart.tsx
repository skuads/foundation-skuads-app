import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors, radii } from '../theme';

type BarChartProps = {
  data: number[];
  height?: number;
  barColor?: string;
};

export function BarChart({ data, height = 180, barColor = colors.primary }: BarChartProps) {
  const [width, setWidth] = useState(0);

  const bars = useMemo(() => {
    if (!width || data.length === 0) {
      return [];
    }
    const padding = 12;
    const max = Math.max(...data, 0) || 1;
    const availableWidth = Math.max(width - padding * 2, 0);
    const step = availableWidth / data.length;
    const barWidth = step * 0.7;
    return data.map((value, index) => {
      const safeValue = Number.isFinite(value) ? value : 0;
      const barHeight = ((safeValue / max) || 0) * (height - padding * 2);
      const x = padding + index * step + (step - barWidth) / 2;
      const y = height - padding - barHeight;
      return { x, y, width: barWidth, height: barHeight };
    });
  }, [data, height, width]);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width ? (
        <Svg width={width} height={height}>
          {bars.map((bar, index) => (
            <Rect
              key={`bar-${index}`}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx={4}
              ry={4}
              fill={barColor}
            />
          ))}
        </Svg>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
});
