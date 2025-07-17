import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './ThemeContext';

interface GradientBackgroundProps {
  gradientType?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  gradientType = 'background',
  children,
  style,
  locations,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
}) => {
  const { theme, mode } = useTheme();
  
  // 기본 그라데이션 색상 (테마에 gradients가 없는 경우)
  const defaultGradients = {
    background: mode === 'dark' 
      ? ['#0a0e27', '#16213e', '#1a237e'] 
      : ['#e3f2fd', '#bbdefb', '#90caf9'],
    surface: mode === 'dark'
      ? ['#1C1C1F', '#2C2C30', '#3A3A3F']
      : ['#ffffff', '#f5f5f5', '#e0e0e0'],
    primary: mode === 'dark'
      ? ['#4A90E2', '#62B9CC', '#4A90E2']
      : ['#1976d2', '#42a5f5', '#64b5f6'],
  };
  
  // 그라데이션 색상 결정
  const gradientColors = (theme as any).gradients?.[gradientType]?.colors || 
                         defaultGradients[gradientType as keyof typeof defaultGradients] ||
                         defaultGradients.background;
  
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