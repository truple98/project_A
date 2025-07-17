/**
 * 🎮 GameScreen - 기본 스크린 래퍼 컴포넌트
 * 
 * 모든 게임 스크린에서 사용할 수 있는 공통 레이아웃을 제공합니다.
 * GlassmorphismBackground, ScreenHeader, ScrollView를 포함한 기본 구조를 제공하여
 * 일관된 UI/UX를 보장합니다.
 * 
 * @description
 * - 배경: GlassmorphismBackground 자동 적용
 * - 헤더: 선택적 ScreenHeader 포함
 * - 스크롤: 선택적 ScrollView 래핑
 * - 테마: useTheme 훅으로 다크/라이트 모드 자동 지원
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
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';

// ========================================
// 3. 프로젝트 내부 컴포넌트
// ========================================
import GlassmorphismBackground from '../GlassmorphismBackground';
import { ScreenHeader } from '../ScreenHeader';

// ========================================
// 4. 프로젝트 내부 - 테마 및 유틸리티
// ========================================
import { useTheme } from '../../theme/ThemeContext';

// ========================================
// 5. 타입 정의
// ========================================

/**
 * GameScreen 컴포넌트의 Props 인터페이스
 * 
 * @interface GameScreenProps
 */
interface GameScreenProps {
  /** 스크린 제목 (ScreenHeader에 표시) */
  title?: string;
  
  /** 뒤로가기 버튼 표시 여부 */
  showBackButton?: boolean;
  
  /** 뒤로가기 버튼 클릭 핸들러 */
  onBackPress?: () => void;
  
  /** 스크린 내용 */
  children: React.ReactNode;
  
  /** ScrollView 사용 여부 (기본값: true) */
  scrollable?: boolean;
  
  /** 스크롤 컨텐츠에 적용할 추가 스타일 */
  contentStyle?: ViewStyle;
  
  /** 컨테이너에 적용할 추가 스타일 */
  containerStyle?: ViewStyle;
  
  /** ScrollView에 전달할 추가 props */
  scrollViewProps?: React.ComponentProps<typeof ScrollView>;
}

// ========================================
// 6. 상수 정의
// ========================================

/**
 * 기본 스크롤 설정
 */
const DEFAULT_SCROLL_OPTIONS = {
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled' as const,
} as const;

/**
 * 기본 spacing 값들 (테마에서 사용할 수 없을 경우 대체값)
 */
const DEFAULT_SPACING = {
  lg: 16,
  xxxl: 32,
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
  // 안전한 spacing 접근
  const spacing = theme.design?.spacing || DEFAULT_SPACING;
  
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxxl,
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
  });
};

// ========================================
// 8. 메인 컴포넌트
// ========================================

/**
 * GameScreen 컴포넌트
 * 
 * @description
 * 게임의 모든 스크린에서 사용할 수 있는 기본 레이아웃 컴포넌트입니다.
 * 일관된 배경, 헤더, 스크롤 영역을 제공하여 개발 효율성과 UI 일관성을 높입니다.
 * 
 * @param props - GameScreenProps
 * @returns React.FC<GameScreenProps>
 * 
 * @example
 * ```tsx
 * <GameScreen 
 *   title="캐릭터 정보" 
 *   showBackButton 
 *   onBackPress={() => navigation.goBack()}
 * >
 *   <Text>게임 컨텐츠</Text>
 * </GameScreen>
 * ```
 */
const GameScreen: React.FC<GameScreenProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  children,
  scrollable = true,
  contentStyle,
  containerStyle,
  scrollViewProps,
}) => {
  // ========================================
  // 9. Hooks 및 상태 관리
  // ========================================
  
  /**
   * 테마 컨텍스트에서 현재 테마와 모드 가져오기
   */
  const { theme, mode } = useTheme();

  /**
   * 테마 기반 스타일 메모이제이션
   * 
   * @description
   * theme 객체가 변경될 때만 스타일을 재계산하도록 최적화
   */
  const styles = useMemo(() => getStyles(theme), [theme]);

  /**
   * 스크롤 컨텐츠 스타일 계산
   * 
   * @description
   * 기본 스타일과 사용자 정의 스타일을 병합
   */
  const finalContentStyle = useMemo(() => [
    styles.scrollContent,
    contentStyle,
  ], [styles.scrollContent, contentStyle]);

  /**
   * 컨테이너 스타일 계산
   * 
   * @description
   * 기본 컨테이너 스타일과 사용자 정의 스타일을 병합
   */
  const finalContainerStyle = useMemo(() => [
    styles.container,
    containerStyle,
  ], [styles.container, containerStyle]);

  // ========================================
  // 10. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 헤더 렌더링 함수
   * 
   * @returns ScreenHeader 컴포넌트 또는 null
   */
  const renderHeader = (): React.ReactNode => {
    if (!title) return null;

    return (
      <ScreenHeader
        title={title}
        showBackButton={showBackButton}
        onBackPress={onBackPress}
      />
    );
  };

  /**
   * 컨텐츠 렌더링 함수
   * 
   * @returns 스크롤 가능하거나 일반 View에 감싸진 컨텐츠
   */
  const renderContent = (): React.ReactNode => {
    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={finalContentStyle}
          {...DEFAULT_SCROLL_OPTIONS}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    );
  };

  // ========================================
  // 11. JSX 반환
  // ========================================

  return (
    <GlassmorphismBackground>
      <View style={finalContainerStyle}>
        {renderHeader()}
        {renderContent()}
      </View>
    </GlassmorphismBackground>
  );
};

// ========================================
// 12. 컴포넌트 내보내기
// ========================================

export default GameScreen; 