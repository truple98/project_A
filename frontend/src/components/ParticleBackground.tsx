// 1. React 및 외부 라이브러리 임포트
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface FlatBackgroundProps {
  children: React.ReactNode;
}

// 5. 컴포넌트 함수 정의
export const FlatBackground: React.FC<FlatBackgroundProps> = ({ children }) => {
  // 5.1 Hooks 선언
  const { theme } = useTheme();

  // 5.5 JSX 반환
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {children}
    </View>
  );
};

// 6. 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// 7. 컴포넌트 내보내기
export default FlatBackground;