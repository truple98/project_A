import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './ThemeContext';

interface GradientBackgroundProps {
  gradientType: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  locations?: readonly [number, number, ...number[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  gradientType,
  children,
  style,
  locations,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
}) => {
  const { theme } = useTheme();
  
  const gradientColors = (theme.gradients as any)[gradientType] || theme.gradients.background;
  
  return (
    <LinearGradient
      colors={gradientColors}
      locations={locations}
      start={start}
      end={end}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground; 