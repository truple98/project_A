/**
 * 🎯 ActionButton - 공통 액션 버튼 컴포넌트
 * 
 * 앱 전체에서 사용되는 버튼의 디자인과 동작을 통일하는 공통 컴포넌트입니다.
 * 다양한 variant(primary, secondary, outline)와 상태(disabled, loading)를 지원하며,
 * 아이콘과 텍스트의 조합도 가능합니다.
 * 
 * @description
 * - 다양한 버튼 variant 지원
 * - 로딩 상태 및 비활성화 상태 지원
 * - 아이콘과 텍스트 조합 가능
 * - 테마 기반 스타일링
 * - 접근성 지원
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
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

// ========================================
// 3. 외부 UI 라이브러리
// ========================================
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ========================================
// 4. 프로젝트 내부 - 테마 및 유틸리티
// ========================================
import { useTheme } from '../../theme/ThemeContext';

// ========================================
// 5. 타입 정의
// ========================================

/**
 * 버튼 variant 타입 정의
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * 버튼 크기 타입 정의
 */
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * ActionButton 컴포넌트의 Props 인터페이스
 * 
 * @interface ActionButtonProps
 */
interface ActionButtonProps {
  /** 버튼에 표시할 텍스트 */
  title: string;
  
  /** 버튼 클릭 핸들러 */
  onPress: () => void;
  
  /** 버튼 variant (기본값: 'primary') */
  variant?: ButtonVariant;
  
  /** 버튼 크기 (기본값: 'medium') */
  size?: ButtonSize;
  
  /** 아이콘 이름 (MaterialCommunityIcons, 선택사항) */
  icon?: string;
  
  /** 아이콘 위치 (기본값: 'left') */
  iconPosition?: 'left' | 'right';
  
  /** 비활성화 여부 */
  disabled?: boolean;
  
  /** 로딩 상태 */
  loading?: boolean;
  
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  
  /** 컨테이너에 적용할 추가 스타일 */
  style?: ViewStyle;
  
  /** 텍스트에 적용할 추가 스타일 */
  textStyle?: TextStyle;
  
  /** 커스텀 배경색 */
  backgroundColor?: string;
  
  /** 커스텀 텍스트 색상 */
  textColor?: string;
  
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// ========================================
// 6. 상수 정의
// ========================================

/**
 * 기본 아이콘 크기
 */
const ICON_SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

/**
 * 기본 spacing 값들
 */
const DEFAULT_SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

/**
 * 기본 typography 값들
 */
const DEFAULT_TYPOGRAPHY = {
  sizes: {
    sm: 13,
    md: 15,
    lg: 17,
  },
  weights: {
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

/**
 * 기본 borderRadius 값들
 */
const DEFAULT_BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
} as const;

// ========================================
// 7. 스타일 정의 함수
// ========================================

/**
 * 테마 기반 스타일 생성 함수
 * 
 * @param theme - 현재 테마 객체
 * @param variant - 버튼 variant
 * @param size - 버튼 크기
 * @param disabled - 비활성화 여부
 * @param fullWidth - 전체 너비 사용 여부
 * @returns StyleSheet 객체
 */
const getStyles = (
  theme: any, 
  variant: ButtonVariant, 
  size: ButtonSize, 
  disabled: boolean,
  fullWidth: boolean
) => {
  // 안전한 속성 접근
  const spacing = theme.design?.spacing || DEFAULT_SPACING;
  const typography = theme.typography || DEFAULT_TYPOGRAPHY;
  const borderRadius = theme.design?.borderRadius || DEFAULT_BORDER_RADIUS;
  const colors = theme.colors || {};

  // 크기별 설정
  const sizeConfig = {
    small: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: typography.sizes.sm,
      borderRadius: borderRadius.sm,
    },
    medium: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      fontSize: typography.sizes.md,
      borderRadius: borderRadius.md,
    },
    large: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      fontSize: typography.sizes.lg,
      borderRadius: borderRadius.lg,
    },
  };

  // variant별 색상 설정
  const variantConfig = {
    primary: {
      backgroundColor: colors.primary || '#007AFF',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.secondary || '#5856D6',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.primary || '#007AFF',
      borderColor: colors.primary || '#007AFF',
      borderWidth: 2,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.text || '#000000',
      borderColor: 'transparent',
      borderWidth: 0,
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return StyleSheet.create({
    container: {
      alignSelf: fullWidth ? 'stretch' : 'center',
      opacity: disabled ? 0.5 : 1,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: currentSize.paddingVertical,
      paddingHorizontal: currentSize.paddingHorizontal,
      backgroundColor: currentVariant.backgroundColor,
      borderRadius: currentSize.borderRadius,
      borderWidth: currentVariant.borderWidth,
      borderColor: currentVariant.borderColor,
      minHeight: size === 'small' ? 36 : size === 'medium' ? 44 : 52,
    },
    text: {
      fontSize: currentSize.fontSize,
      fontWeight: typography.weights.semibold,
      color: currentVariant.textColor,
      textAlign: 'center' as const,
    },
    iconContainer: {
      marginHorizontal: spacing.xs,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

// ========================================
// 8. 메인 컴포넌트
// ========================================

/**
 * ActionButton 컴포넌트
 * 
 * @description
 * 앱 전체에서 사용되는 통일된 버튼 컴포넌트입니다.
 * 다양한 스타일과 상태를 지원하여 일관된 사용자 경험을 제공합니다.
 * 
 * @param props - ActionButtonProps
 * @returns React.FC<ActionButtonProps>
 * 
 * @example
 * ```tsx
 * <ActionButton
 *   title="로그인"
 *   onPress={handleLogin}
 *   variant="primary"
 *   size="large"
 *   icon="login"
 *   loading={isLoading}
 *   fullWidth
 * />
 * 
 * <ActionButton
 *   title="취소"
 *   onPress={handleCancel}
 *   variant="outline"
 *   size="medium"
 * />
 * ```
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  backgroundColor,
  textColor,
  accessibilityLabel,
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
   * theme, variant, size, disabled, fullWidth가 변경될 때만 스타일을 재계산하도록 최적화
   */
  const styles = useMemo(() => 
    getStyles(theme, variant, size, disabled, fullWidth), 
    [theme, variant, size, disabled, fullWidth]
  );

  /**
   * 아이콘 크기 계산
   */
  const iconSize = ICON_SIZES[size];

  /**
   * 최종 버튼 스타일 계산
   */
  const finalButtonStyle = useMemo(() => [
    styles.button,
    ...(backgroundColor ? [{ backgroundColor }] : []),
    style,
  ], [styles.button, backgroundColor, style]);

  /**
   * 최종 텍스트 스타일 계산
   */
  const finalTextStyle = useMemo(() => [
    styles.text,
    ...(textColor ? [{ color: textColor }] : []),
    textStyle,
  ], [styles.text, textColor, textStyle]);

  // ========================================
  // 10. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 아이콘 렌더링 함수
   * 
   * @returns React.ReactNode 또는 null
   */
  const renderIcon = (): React.ReactNode => {
    if (!icon || loading) return null;

    return (
      <Icon
        name={icon}
        size={iconSize}
        color={textColor || styles.text.color}
        style={styles.iconContainer}
      />
    );
  };

  /**
   * 로딩 인디케이터 렌더링 함수
   * 
   * @returns React.ReactNode 또는 null
   */
  const renderLoadingIndicator = (): React.ReactNode => {
    if (!loading) return null;

    return (
      <ActivityIndicator
        size="small"
        color={textColor || styles.text.color}
        style={styles.iconContainer}
      />
    );
  };

  /**
   * 버튼 컨텐츠 렌더링 함수
   * 
   * @returns React.ReactNode
   */
  const renderContent = (): React.ReactNode => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          {renderLoadingIndicator()}
          <Text style={finalTextStyle}>{title}</Text>
        </View>
      );
    }

    if (iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          <Text style={finalTextStyle}>{title}</Text>
        </>
      );
    }

    return (
      <>
        <Text style={finalTextStyle}>{title}</Text>
        {renderIcon()}
      </>
    );
  };

  // ========================================
  // 11. JSX 반환
  // ========================================

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={finalButtonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        accessibilityLabel={accessibilityLabel || title}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading }}
      >
        {renderContent()}
      </TouchableOpacity>
    </View>
  );
};

// ========================================
// 12. 컴포넌트 내보내기
// ========================================

export default ActionButton; 