import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface FlatBackgroundProps {
  children: React.ReactNode;
}

export const FlatBackground: React.FC<FlatBackgroundProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// 하위 호환성을 위한 export
export const ParticleBackground = FlatBackground; 