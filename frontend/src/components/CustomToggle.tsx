// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface CustomToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

// 4. 상수 및 유틸리티 변수 (컴포넌트 외부에 선언)
const THUMB_OFFSET = 22; // 트랙 너비 - 썸 너비 - 패딩 계산 값
const ANIMATION_DURATION = 200;

// 5. 컴포넌트 함수 정의
const CustomToggle: React.FC<CustomToggleProps> = ({ value, onValueChange, disabled = false }) => {
  // 5.1 Hooks 선언
  const { theme, mode } = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  // 5.3 이벤트 핸들러 및 유틸리티 함수
  const handleToggle = useCallback(() => {
    if (!disabled) {
      onValueChange(!value);
    }
  }, [disabled, onValueChange, value]);

  // 5.4 useEffect
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false, // 레이아웃 변경에 사용되므로 false
    }).start();
  }, [value, animatedValue]);

  // 5.5 JSX 반환
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.track,
          { 
            backgroundColor: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [theme.colors.toggleTrackInactive, theme.colors.toggleTrackActive],
            }),
            borderColor: theme.colors.divider,
          },
          Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: { elevation: 2 },
          }),
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: theme.colors.toggleThumb,
              transform: [{ translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [2, THUMB_OFFSET],
                })
              }],
            },
            Platform.select({
                ios: {
                  shadowColor: theme.colors.toggleThumbShadow || '#000000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                },
                android: { elevation: 3 },
            }),
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

// 6. 스타일 정의
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
    borderWidth: 1,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    position: 'absolute',
  },
});

// 7. 컴포넌트 내보내기
export default CustomToggle;