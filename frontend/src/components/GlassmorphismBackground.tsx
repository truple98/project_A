// 1. React 및 외부 라이브러리 임포트
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface GlassmorphismBackgroundProps {
  children?: React.ReactNode;
}

// 5. 컴포넌트 함수 정의
const GlassmorphismBackground: React.FC<GlassmorphismBackgroundProps> = ({
  children,
}) => {
  // 5.1 Hooks 선언
  const { theme, mode } = useTheme();

  // 테마에 정의된 그라데이션 색상
  const gradientColors = mode === 'dark'
    ? ['#0a0e27', '#16213e', '#1a237e', '#283593'] // 다크 모드 기본값
    : ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6']; // 라이트 모드 기본값

  // 5.5 JSX 반환
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      {children}
    </View>
  );
};

// 6. 스타일 정의
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

// 7. 컴포넌트 내보내기
export default GlassmorphismBackground;