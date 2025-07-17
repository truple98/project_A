/**
 * 📊 StatsCard - 통계 정보 카드 컴포넌트
 * 
 * 게임 내 다양한 통계 정보를 일관된 형태로 표시하는 카드 컴포넌트입니다.
 * CharacterScreen, InventoryScreen, AccountScreen 등에서 반복되는 통계 UI 패턴을
 * 재사용 가능한 컴포넌트로 추상화했습니다.
 * 
 * @description
 * - 유연한 그리드 레이아웃 (1-4열 지원)
 * - 아이콘과 텍스트 조합 지원
 * - 테마 기반 스타일링
 * - GlassmorphismCard 기반 디자인
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
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// ========================================
// 3. 외부 UI 라이브러리
// ========================================
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ========================================
// 4. 프로젝트 내부 컴포넌트
// ========================================
import GlassmorphismCard from '../GlassmorphismCard';

// ========================================
// 5. 프로젝트 내부 - 테마 및 유틸리티
// ========================================
import { useTheme } from '../../theme/ThemeContext';

// ========================================
// 6. 타입 정의
// ========================================

/**
 * 개별 통계 항목 인터페이스
 * 
 * @interface StatItem
 */
interface StatItem {
  /** 통계 항목의 고유 키 */
  key: string;
  
  /** 표시할 라벨 텍스트 */
  label: string;
  
  /** 통계 값 (숫자 또는 문자열) */
  value: string | number;
  
  /** 선택적 아이콘 이름 (MaterialCommunityIcons) */
  icon?: string;
  
  /** 값의 색상 커스터마이징 */
  valueColor?: string;
  
  /** 라벨의 색상 커스터마이징 */
  labelColor?: string;
  
  /** 아이콘 색상 커스터마이징 */
  iconColor?: string;
}

/**
 * StatsCard 컴포넌트의 Props 인터페이스
 * 
 * @interface StatsCardProps
 */
interface StatsCardProps {
  /** 카드 제목 (선택사항) */
  title?: string;
  
  /** 통계 항목 배열 */
  stats: StatItem[];
  
  /** 그리드 열 개수 (1-4, 기본값: 3) */
  columns?: 1 | 2 | 3 | 4;
  
  /** 카드에 적용할 추가 스타일 */
  cardStyle?: ViewStyle;
  
  /** 컨테이너에 적용할 추가 스타일 */
  containerStyle?: ViewStyle;
  
  /** elevation 레벨 (1-4, 기본값: 1) */
  elevationLevel?: 1 | 2 | 3 | 4;
}

// ========================================
// 7. 상수 정의
// ========================================

/**
 * 기본 아이콘 크기
 */
const DEFAULT_ICON_SIZE = 20;

/**
 * 기본 spacing 값들
 */
const DEFAULT_SPACING = {
  xs: 4,
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
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

// ========================================
// 8. 스타일 정의 함수
// ========================================

/**
 * 테마 기반 스타일 생성 함수
 * 
 * @param theme - 현재 테마 객체
 * @param columns - 그리드 열 개수
 * @returns StyleSheet 객체
 */
const getStyles = (theme: any, columns: number) => {
  // 안전한 속성 접근
  const spacing = theme.design?.spacing || DEFAULT_SPACING;
  const typography = theme.typography || DEFAULT_TYPOGRAPHY;
  const colors = theme.colors || {};

  return StyleSheet.create({
    container: {
      // 기본 컨테이너 스타일
    },
    card: {
      padding: spacing.lg,
    },
    title: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: colors.text || '#000000',
      marginBottom: spacing.md,
      textAlign: 'center' as const,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statItem: {
      width: `${100 / columns}%`,
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    statIcon: {
      marginBottom: spacing.xs,
    },
    statValue: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.text || '#000000',
      marginBottom: spacing.xs,
      textAlign: 'center' as const,
    },
    statLabel: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.regular,
      color: colors.textSecondary || '#666666',
      textAlign: 'center' as const,
    },
  });
};

// ========================================
// 9. 메인 컴포넌트
// ========================================

/**
 * StatsCard 컴포넌트
 * 
 * @description
 * 통계 정보를 그리드 형태로 표시하는 카드 컴포넌트입니다.
 * 게임 내 다양한 통계 데이터를 일관된 UI로 표현할 때 사용합니다.
 * 
 * @param props - StatsCardProps
 * @returns React.FC<StatsCardProps>
 * 
 * @example
 * ```tsx
 * <StatsCard
 *   title="캐릭터 통계"
 *   columns={3}
 *   stats={[
 *     { key: 'level', label: '레벨', value: 15, icon: 'star' },
 *     { key: 'exp', label: '경험치', value: '1,250', icon: 'lightning-bolt' },
 *     { key: 'gold', label: '골드', value: '2,500', icon: 'currency-usd' },
 *   ]}
 * />
 * ```
 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  stats,
  columns = 3,
  cardStyle,
  containerStyle,
  elevationLevel = 1,
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
   * theme과 columns가 변경될 때만 스타일을 재계산하도록 최적화
   */
  const styles = useMemo(() => getStyles(theme, columns), [theme, columns]);

  // ========================================
  // 11. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 개별 통계 항목 렌더링 함수
   * 
   * @param item - 통계 항목 데이터
   * @returns React.ReactNode
   */
  const renderStatItem = (item: StatItem): React.ReactNode => {
    const { key, label, value, icon, valueColor, labelColor, iconColor } = item;
    
    return (
      <View key={key} style={styles.statItem}>
        {/* 아이콘 (선택사항) */}
        {icon && (
          <Icon
            name={icon}
            size={DEFAULT_ICON_SIZE}
            color={iconColor || theme.colors?.primary || '#007AFF'}
            style={styles.statIcon}
          />
        )}
        
        {/* 통계 값 */}
        <Text
          style={[
            styles.statValue,
            ...(valueColor ? [{ color: valueColor }] : []),
          ]}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Text>
        
        {/* 라벨 */}
        <Text
          style={[
            styles.statLabel,
            ...(labelColor ? [{ color: labelColor }] : []),
          ]}
        >
          {label}
        </Text>
      </View>
    );
  };

  /**
   * 제목 렌더링 함수
   * 
   * @returns React.ReactNode 또는 null
   */
  const renderTitle = (): React.ReactNode => {
    if (!title) return null;

    return (
      <Text style={styles.title}>
        {title}
      </Text>
    );
  };

  // ========================================
  // 12. JSX 반환
  // ========================================

  return (
    <View style={[styles.container, containerStyle]}>
      <GlassmorphismCard
        elevationLevel={elevationLevel}
        style={StyleSheet.flatten([styles.card, cardStyle])}
      >
        {renderTitle()}
        
        <View style={styles.statsGrid}>
          {stats.map(renderStatItem)}
        </View>
      </GlassmorphismCard>
    </View>
  );
};

// ========================================
// 13. 컴포넌트 내보내기
// ========================================

export default StatsCard; 