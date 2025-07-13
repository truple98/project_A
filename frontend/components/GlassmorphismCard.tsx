import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isDark?: boolean;
  opacity?: number;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  style,
  isDark = false,
  opacity = 0.15,
}) => {
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
  });

  return (
    <View
      style={[
        styles.container,
        shadowStyle,
        {
          backgroundColor: isDark 
            ? `rgba(255, 255, 255, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity + 0.1})`,
          borderColor: isDark 
            ? `rgba(255, 255, 255, ${opacity * 0.5})` 
            : `rgba(255, 255, 255, ${opacity * 0.8})`,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default GlassmorphismCard; 