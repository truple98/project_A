/**
 * ⚙️ SettingItem - 설정 항목 컴포넌트
 * 
 * 설정 화면에서 사용되는 개별 설정 항목을 표시하는 컴포넌트입니다.
 * 스위치, 버튼, 텍스트 표시 등 다양한 타입의 설정 항목을 지원하며,
 * 일관된 디자인과 동작을 제공합니다.
 * 
 * @description
 * - 다양한 설정 타입 지원 (switch, button, text)
 * - 아이콘과 텍스트 조합
 * - 테마 기반 스타일링
 * - 접근성 지원
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. React 및 내장 Hooks
// ========================================
import React, { useCallback, useMemo } from 'react';

// ========================================
// 2. React Native 핵심 컴포넌트
// ========================================
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

// ========================================
// 3. 외부 UI 라이브러리
// ========================================
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ========================================
// 4. 프로젝트 내부 컴포넌트
// ========================================
import CustomToggle from '../CustomToggle';

// ========================================
// 5. 프로젝트 내부 - 테마 및 유틸리티
// ========================================
import { useTheme } from '../../theme/ThemeContext';

// ========================================
// 6. 타입 정의
// ========================================

/**
 * 설정 항목 타입 정의
 */
type SettingType = 'switch' | 'button' | 'text';

/**
 * SettingItem 컴포넌트의 Props 인터페이스
 * 
 * @interface SettingItemProps
 */
interface SettingItemProps {
  /** 설정 항목 라벨 */
  label: string;
  
  /** 아이콘 이름 (MaterialCommunityIcons) */
  icon: string;
  
  /** 설정 항목 타입 */
  type: SettingType;
  
  /** 스위치의 현재 값 (type이 'switch'일 때 필수) */
  value?: boolean | string;
  
  /** 스위치 토글 핸들러 (type이 'switch'일 때 사용) */
  onToggle?: (value: boolean) => void;
  
  /** 버튼/항목 클릭 핸들러 (type이 'button'일 때 사용) */
  onPress?: () => void;
  
  /** 비활성화 여부 */
  disabled?: boolean;
  
  /** 설명 텍스트 (선택사항) */
  description?: string;
  
  /** 컨테이너에 적용할 추가 스타일 */
  containerStyle?: ViewStyle;
  
  /** 우측 화살표 표시 여부 (type이 'button'일 때) */
  showArrow?: boolean;
  
  /** 커스텀 우측 컨텐츠 */
  rightContent?: React.ReactNode;
}

// ========================================
// 7. 상수 정의
// ========================================

/**
 * 기본 아이콘 크기
 */
const DEFAULT_ICON_SIZE = 24;

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
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
  },
} as const;

// ========================================
// 8. 스타일 정의 함수
// ========================================

/**
 * 테마 기반 스타일 생성 함수
 * 
 * @param theme - 현재 테마 객체
 * @param disabled - 비활성화 여부
 * @returns StyleSheet 객체
 */
const getStyles = (theme: any, disabled: boolean) => {
  // 안전한 속성 접근
  const spacing = theme.design?.spacing || DEFAULT_SPACING;
  const typography = theme.typography || DEFAULT_TYPOGRAPHY;
  const colors = theme.colors || {};

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      backgroundColor: 'transparent',
      opacity: disabled ? 0.5 : 1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: colors.elevated || '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    contentContainer: {
      flex: 1,
      marginRight: spacing.md,
    },
    label: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.medium,
      color: colors.text || '#000000',
      marginBottom: spacing.xs,
    },
    description: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.regular,
      color: colors.textSecondary || '#666666',
      lineHeight: typography.sizes.sm * 1.4,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    valueText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.regular,
      color: colors.textSecondary || '#666666',
      marginRight: spacing.sm,
    },
    arrowIcon: {
      marginLeft: spacing.sm,
    },
  });
};

// ========================================
// 9. 메인 컴포넌트
// ========================================

/**
 * SettingItem 컴포넌트
 * 
 * @description
 * 설정 화면에서 사용되는 개별 설정 항목을 표시하는 컴포넌트입니다.
 * 다양한 타입의 설정 항목을 일관된 UI로 표현할 때 사용합니다.
 * 
 * @param props - SettingItemProps
 * @returns React.FC<SettingItemProps>
 * 
 * @example
 * ```tsx
 * <SettingItem
 *   label="다크 모드"
 *   icon="moon-waning-crescent"
 *   type="switch"
 *   value={isDarkMode}
 *   onToggle={setDarkMode}
 *   description="어두운 테마를 사용합니다"
 * />
 * 
 * <SettingItem
 *   label="언어 설정"
 *   icon="earth"
 *   type="button"
 *   value="한국어"
 *   onPress={() => openLanguageSelector()}
 *   showArrow
 * />
 * ```
 */
const SettingItem: React.FC<SettingItemProps> = ({
  label,
  icon,
  type,
  value,
  onToggle,
  onPress,
  disabled = false,
  description,
  containerStyle,
  showArrow = true,
  rightContent,
}) => {
  // ========================================
  // 10. Hooks 및 상태 관리
  // ========================================
  
  /**
   * 테마 컨텍스트에서 현재 테마 가져오기
   */
  const { theme } = useTheme();

  /**
   * 테마 기반 스타일 메모이제이션
   * 
   * @description
   * theme과 disabled 상태가 변경될 때만 스타일을 재계산하도록 최적화
   */
  const styles = useMemo(() => getStyles(theme, disabled), [theme, disabled]);

  // ========================================
  // 11. 이벤트 핸들러
  // ========================================

  /**
   * 스위치 토글 핸들러
   * 
   * @param newValue - 새로운 스위치 값
   */
  const handleToggle = useCallback((newValue: boolean) => {
    if (!disabled && onToggle) {
      onToggle(newValue);
    }
  }, [disabled, onToggle]);

  /**
   * 터치 핸들러
   * 
   * @description
   * type이 'button'일 때 onPress 호출
   * type이 'switch'일 때 토글 동작
   */
  const handlePress = useCallback(() => {
    if (disabled) return;

    if (type === 'button' && onPress) {
      onPress();
    } else if (type === 'switch' && onToggle && typeof value === 'boolean') {
      onToggle(!value);
    }
  }, [disabled, type, onPress, onToggle, value]);

  // ========================================
  // 12. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 아이콘 렌더링 함수
   * 
   * @returns React.ReactNode
   */
  const renderIcon = (): React.ReactNode => (
    <View style={styles.iconContainer}>
      <Icon
        name={icon}
        size={DEFAULT_ICON_SIZE}
        color={theme.colors?.primary || '#007AFF'}
      />
    </View>
  );

  /**
   * 메인 컨텐츠 렌더링 함수
   * 
   * @returns React.ReactNode
   */
  const renderContent = (): React.ReactNode => (
    <View style={styles.contentContainer}>
      <Text style={styles.label}>{label}</Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );

  /**
   * 우측 컨텐츠 렌더링 함수
   * 
   * @returns React.ReactNode
   */
  const renderRightContent = (): React.ReactNode => {
    if (rightContent) {
      return rightContent;
    }

    return (
      <View style={styles.rightContainer}>
        {/* 타입별 우측 컨텐츠 */}
        {type === 'switch' && typeof value === 'boolean' && (
          <CustomToggle
            value={value}
            onValueChange={handleToggle}
            disabled={disabled}
          />
        )}
        
        {type === 'button' && typeof value === 'string' && (
          <Text style={styles.valueText}>{value}</Text>
        )}
        
        {type === 'text' && typeof value === 'string' && (
          <Text style={styles.valueText}>{value}</Text>
        )}
        
        {/* 화살표 아이콘 (button 타입에서 showArrow가 true일 때) */}
        {type === 'button' && showArrow && (
          <Icon
            name="chevron-right"
            size={20}
            color={theme.colors?.textSecondary || '#666666'}
            style={styles.arrowIcon}
          />
        )}
      </View>
    );
  };

  // ========================================
  // 13. JSX 반환
  // ========================================

  if (type === 'button' || type === 'switch') {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([styles.container, containerStyle])}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {renderIcon()}
        {renderContent()}
        {renderRightContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {renderIcon()}
      {renderContent()}
      {renderRightContent()}
    </View>
  );
};

// ========================================
// 14. 컴포넌트 내보내기
// ========================================

export default SettingItem; 