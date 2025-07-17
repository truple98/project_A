// 1. React 및 외부 라이브러리 임포트
import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface GlassmorphismCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevationLevel?: 1 | 2 | 3 | 4; // 테마의 elevationLevel을 직접 선택하도록
}

// 5. 컴포넌트 함수 정의
const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  style,
  elevationLevel = 1, // 기본 elevationLevel
}) => {
  // 5.1 Hooks 선언
  const { theme, mode } = useTheme();

  // 기본 스타일과 elevation에 따른 동적 스타일
  const cardStyle = useMemo(() => {
    const baseStyle = {
      backgroundColor: theme.colors[`elevation${elevationLevel}` as keyof typeof theme.colors] || theme.colors.surface,
      borderColor: theme.colors.divider,
      borderRadius: 16, // lg 크기
      borderWidth: 1,
      overflow: 'hidden' as const,
    };

    const shadowStyle = Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: elevationLevel * 2 },
        shadowOpacity: 0.2 + (elevationLevel * 0.05),
        shadowRadius: elevationLevel * 2,
      },
      android: { 
        elevation: elevationLevel * 2 
      },
    });

    return [baseStyle, shadowStyle];
  }, [theme, elevationLevel]);

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
};

// 7. 컴포넌트 내보내기
export default GlassmorphismCard;