import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radii } from '../theme';

type MultiLineDataset = {
  data: number[];
  color: string;
};

type MultiLineChartProps = {
  datasets: MultiLineDataset[];
  height?: number;
};

export function MultiLineChart({ datasets, height = 180 }: MultiLineChartProps) {
  const [width, setWidth] = useState(0);

  const paths = useMemo(() => {
    if (!width || datasets.length === 0) {
      return [] as Array<{ path: string; color: string }>;
    }

    const maxLen = Math.max(...datasets.map(dataset => dataset.data.length));
    if (maxLen < 2) {
      return [] as Array<{ path: string; color: string }>;
    }

    const allValues = datasets.flatMap(dataset => dataset.data);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = max - min || 1;
    const padding = 12;
    const xStep = (width - padding * 2) / (maxLen - 1);

    return datasets.map(dataset => {
      const normalized = Array.from({ length: maxLen }, (_, index) => {
        const value = dataset.data[index];
        return Number.isFinite(value) ? value : 0;
      });

      const points = normalized.map((value, index) => {
        const x = padding + index * xStep;
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return { x, y };
      });

      const line = points
        .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
        .join(' ');

      return { path: line, color: dataset.color };
    });
  }, [datasets, width, height]);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width ? (
        <Svg width={width} height={height}>
          {paths.map((line, index) => (
            <Path
              key={`${line.color}-${index}`}
              d={line.path}
              stroke={line.color}
              strokeWidth={2}
              fill="none"
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
