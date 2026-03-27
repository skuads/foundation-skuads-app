import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors, radii } from '../theme';

type LineChartProps = {
  data: number[];
  height?: number;
  stroke?: string;
  gradient?: string[];
};

export function LineChart({ data, height = 180, stroke = colors.primary, gradient }: LineChartProps) {
  const [width, setWidth] = useState(0);

  const { path, area } = useMemo(() => {
    if (!width || data.length < 2) {
      return { path: '', area: '' };
    }
    const padding = 12;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const xStep = (width - padding * 2) / (data.length - 1);
    const points = data.map((value, index) => {
      const x = padding + index * xStep;
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    const line = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
      .join(' ');

    const areaPath = `${line} L${points[points.length - 1].x} ${height - padding} L${points[0].x} ${
      height - padding
    } Z`;

    return { path: line, area: areaPath };
  }, [data, width, height]);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width ? (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={gradient?.[0] ?? stroke} stopOpacity="0.25" />
              <Stop offset="1" stopColor={gradient?.[1] ?? stroke} stopOpacity="0.02" />
            </LinearGradient>
          </Defs>
          {area ? <Path d={area} fill="url(#lineGradient)" /> : null}
          {path ? <Path d={path} stroke={stroke} strokeWidth={2.5} fill="none" /> : null}
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
