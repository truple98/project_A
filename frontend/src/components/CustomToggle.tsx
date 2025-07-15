import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface CustomToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ value, onValueChange, disabled = false }) => {
  const { theme, mode } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const handleToggle = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  // 글래스모피즘 스타일에 맞는 색상 설정
  const colors = {
    light: {
      trackActive: '#4285F4',      // 구글 블루
      trackInactive: 'rgba(255, 255, 255, 0.3)',
      thumb: '#ffffff',
      thumbShadow: 'rgba(0, 0, 0, 0.2)',
    },
    dark: {
      trackActive: '#5A9FFF',      // 밝은 블루
      trackInactive: 'rgba(255, 255, 255, 0.2)',
      thumb: '#ffffff',
      thumbShadow: 'rgba(0, 0, 0, 0.3)',
    }
  };

  const currentColors = colors[mode];

  const trackColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColors.trackInactive, currentColors.trackActive],
  });

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // 트랙 너비 50 - 썸 너비 26 - 패딩 2 = 22
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { opacity: disabled ? 0.5 : 1 }
      ]}
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackColor,
            borderWidth: 1,
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            shadowColor: mode === 'dark' ? '#000' : '#4285F4',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 2,
          }
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: currentColors.thumb,
              transform: [{ translateX: thumbTranslateX }],
              shadowColor: currentColors.thumbShadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 3,
            }
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    position: 'relative',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    position: 'absolute',
  },
});

export default CustomToggle; 