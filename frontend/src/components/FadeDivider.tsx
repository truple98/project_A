import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FadeDividerProps {
  color?: string;
  height?: number;
  marginHorizontal?: number;
}

const FadeDivider: React.FC<FadeDividerProps> = ({
  color = '#333333',
  height = 0.5,
  marginHorizontal = 20,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent', color, color, 'transparent']}
        locations={[0, 0.1, 0.9, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          {
            height,
            marginHorizontal,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gradient: {
    width: '100%',
  },
});

export default FadeDivider; 