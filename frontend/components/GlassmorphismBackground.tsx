import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassmorphismBackgroundProps {
  isDark?: boolean;
  children?: React.ReactNode;
}

const GlassmorphismBackground: React.FC<GlassmorphismBackgroundProps> = ({
  isDark = false,
  children,
}) => {
  const lightGradient = ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6'];
  const darkGradient = ['#0a0e27', '#16213e', '#1a237e', '#283593'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? darkGradient : lightGradient}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default GlassmorphismBackground; 