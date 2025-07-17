/**
 * 📝 FormCard - 폼 입력 카드 컴포넌트
 * 
 * 로그인, 회원가입, 게임 설정 등에서 사용되는 폼 입력 영역을 위한 카드 컴포넌트입니다.
 * GlassmorphismCard를 기반으로 하여 일관된 디자인을 제공하며,
 * 제목과 설명을 포함한 구조화된 폼 레이아웃을 지원합니다.
 * 
 * @description
 * - GlassmorphismCard 기반 디자인
 * - 제목과 설명 텍스트 지원
 * - 유연한 폼 컨텐츠 배치
 * - 테마 기반 스타일링
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. React 및 내장 Hooks
// ========================================
import React, { useMemo } from 'react';

// ========================================
// 2. React Native 핵심 컴포넌트
// ========================================
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

// ========================================
// 3. 프로젝트 내부 컴포넌트
// ========================================
import GlassmorphismCard from '../GlassmorphismCard';

// ========================================
// 4. 프로젝트 내부 - 테마 및 유틸리티
// ========================================
import { useTheme } from '../../theme/ThemeContext';

// ========================================
// 5. 타입 정의
// ========================================

/**
 * FormCard 컴포넌트의 Props 인터페이스
 * 
 * @interface FormCardProps
 */
interface FormCardProps {
  /** 폼 카드 제목 (선택사항) */
  title?: string;
  
  /** 폼 카드 설명 텍스트 (선택사항) */
  subtitle?: string;
  
  /** 폼 내용 (TextInput, Button 등) */
  children: React.ReactNode;
  
  /** 카드에 적용할 추가 스타일 */
  cardStyle?: ViewStyle;
  
  /** 컨테이너에 적용할 추가 스타일 */
  containerStyle?: ViewStyle;
  
  /** 헤더 영역에 적용할 추가 스타일 */
  headerStyle?: ViewStyle;
  
  /** 컨텐츠 영역에 적용할 추가 스타일 */
  contentStyle?: ViewStyle;
  
  /** elevation 레벨 (1-4, 기본값: 2) */
  elevationLevel?: 1 | 2 | 3 | 4;
  
  /** 제목 텍스트 색상 커스터마이징 */
  titleColor?: string;
  
  /** 설명 텍스트 색상 커스터마이징 */
  subtitleColor?: string;
}

// ========================================
// 6. 상수 정의
// ========================================

/**
 * 기본 spacing 값들
 */
const DEFAULT_SPACING = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

/**
 * 기본 typography 값들
 */
const DEFAULT_TYPOGRAPHY = {
  sizes: {
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

// ========================================
// 7. 스타일 정의 함수
// ========================================

/**
 * 테마 기반 스타일 생성 함수
 * 
 * @param theme - 현재 테마 객체
 * @returns StyleSheet 객체
 */
const getStyles = (theme: any) => {
  // 안전한 속성 접근
  const spacing = theme.design?.spacing || DEFAULT_SPACING;
  const typography = theme.typography || DEFAULT_TYPOGRAPHY;
  const colors = theme.colors || {};

  return StyleSheet.create({
    container: {
      // 기본 컨테이너 스타일
    },
    card: {
      padding: spacing.xl,
    },
    header: {
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: colors.text || '#000000',
      marginBottom: spacing.sm,
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.regular,
      color: colors.textSecondary || '#666666',
      textAlign: 'center' as const,
      lineHeight: typography.sizes.md * 1.5,
    },
    content: {
      // 폼 컨텐츠 영역
    },
  });
};

// ========================================
// 8. 메인 컴포넌트
// ========================================

/**
 * FormCard 컴포넌트
 * 
 * @description
 * 폼 입력을 위한 구조화된 카드 컴포넌트입니다.
 * 제목, 설명, 그리고 폼 컨텐츠를 일관된 레이아웃으로 표시합니다.
 * 
 * @param props - FormCardProps
 * @returns React.FC<FormCardProps>
 * 
 * @example
 * ```tsx
 * <FormCard
 *   title="로그인"
 *   subtitle="계정에 로그인하여 게임을 시작하세요"
 *   elevationLevel={2}
 * >
 *   <TextInput placeholder="이메일" />
 *   <TextInput placeholder="비밀번호" secureTextEntry />
 *   <Button title="로그인" onPress={handleLogin} />
 * </FormCard>
 * ```
 */
const FormCard: React.FC<FormCardProps> = ({
  title,
  subtitle,
  children,
  cardStyle,
  containerStyle,
  headerStyle,
  contentStyle,
  elevationLevel = 2,
  titleColor,
  subtitleColor,
}) => {
  // ========================================
  // 9. Hooks 및 상태 관리
  // ========================================
  
  /**
   * 테마 컨텍스트에서 현재 테마 가져오기
   */
  const { theme } = useTheme();

  /**
   * 테마 기반 스타일 메모이제이션
   * 
   * @description
   * theme이 변경될 때만 스타일을 재계산하도록 최적화
   */
  const styles = useMemo(() => getStyles(theme), [theme]);

  // ========================================
  // 10. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 헤더 렌더링 함수 (제목 + 설명)
   * 
   * @returns React.ReactNode 또는 null
   */
  const renderHeader = (): React.ReactNode => {
    if (!title && !subtitle) return null;

    return (
      <View style={StyleSheet.flatten([styles.header, headerStyle])}>
        {title && (
          <Text
            style={[
              styles.title,
              ...(titleColor ? [{ color: titleColor }] : []),
            ]}
          >
            {title}
          </Text>
        )}
        
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              ...(subtitleColor ? [{ color: subtitleColor }] : []),
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  /**
   * 컨텐츠 렌더링 함수
   * 
   * @returns React.ReactNode
   */
  const renderContent = (): React.ReactNode => (
    <View style={StyleSheet.flatten([styles.content, contentStyle])}>
      {children}
    </View>
  );

  // ========================================
  // 11. JSX 반환
  // ========================================

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <GlassmorphismCard
        elevationLevel={elevationLevel}
        style={StyleSheet.flatten([styles.card, cardStyle])}
      >
        {renderHeader()}
        {renderContent()}
      </GlassmorphismCard>
    </View>
  );
};

// ========================================
// 12. 컴포넌트 내보내기
// ========================================

export default FormCard; 