// 1. React 및 외부 라이브러리 임포트
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface FadeDividerProps {
  color?: string; // 테마 색상을 사용하도록 유도
  height?: number;
  marginHorizontal?: number; // 테마 간격 사용하도록 유도
}

// 5. 컴포넌트 함수 정의
const FadeDivider: React.FC<FadeDividerProps> = ({
  color, // prop으로 받지만, 기본값은 theme에서 가져오도록
  height = 0.5,
  marginHorizontal, // prop으로 받지만, 기본값은 theme에서 가져오도록
}) => {
  // 5.1 Hooks 선언
  const { theme, mode } = useTheme();

  // 실제 사용할 색상과 마진 값 결정 (prop이 없으면 테마 기본값 사용)
  const effectiveColor = color || theme.colors.divider; // 기본 색상은 theme.colors.divider
  const effectiveMarginHorizontal = marginHorizontal ?? 16; // 기본 마진은 16 (lg spacing)

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent', effectiveColor, effectiveColor, 'transparent']}
        locations={[0, 0.1, 0.9, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          {
            height,
            marginHorizontal: effectiveMarginHorizontal,
          },
        ]}
      />
    </View>
  );
};

// 6. 스타일 정의
const styles = StyleSheet.create({
  container: {
    width: '100%',
    // View에 직접 마진을 주지 않고 LinearGradient에 적용
  },
  gradient: {
    width: '100%',
  },
});

// 7. 컴포넌트 내보내기
export default FadeDivider;