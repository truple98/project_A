// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback, useMemo } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type InventoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inventory'>;

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  description: string;
  icon: string;
}

// 4. 상수 및 유틸리티 변수 정의
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 2; // 2열 그리드

const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  { id: 1, name: '체력 포션', quantity: 5, rarity: 'common', description: '체력을 회복시킵니다', icon: 'heart' },
  { id: 2, name: '마나 포션', quantity: 3, rarity: 'common', description: '마나를 회복시킵니다', icon: 'flash' },
  { id: 3, name: '강철 검', quantity: 1, rarity: 'rare', description: '강력한 무기입니다', icon: 'sword' },
  { id: 4, name: '마법 반지', quantity: 1, rarity: 'epic', description: '마법의 힘을 담은 반지', icon: 'ring' },
  { id: 5, name: '방어구', quantity: 2, rarity: 'uncommon', description: '몸을 보호하는 방어구', icon: 'shield' },
  { id: 6, name: '스크롤', quantity: 7, rarity: 'common', description: '유용한 주문이 담긴 스크롤', icon: 'scroll' },
  { id: 7, name: '비밀 열쇠', quantity: 1, rarity: 'rare', description: '특별한 곳을 열 수 있는 열쇠', icon: 'key' },
  { id: 8, name: '회복 물약', quantity: 4, rarity: 'uncommon', description: '더 강력한 회복 효과', icon: 'bottle-wine' },
];

// 5. 메인 스크린 컴포넌트 함수 정의
const InventoryScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<InventoryScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2. 데이터 (현재는 Mock 데이터 사용)
  const inventoryItems = MOCK_INVENTORY_ITEMS;

  // 5.3. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleItemPress = useCallback((item: InventoryItem) => {
    // TODO: 아이템 상세 정보 표시 또는 사용
    console.log('아이템 선택:', item.name);
  }, []);

  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': 
        return mode === 'dark' ? theme.colors.textTertiary : theme.colors.textSecondary;
      case 'uncommon': 
        return theme.colors.success;
      case 'rare': 
        return theme.colors.primary;
      case 'epic': 
        return theme.colors.warning;
      default: 
        return theme.colors.textTertiary;
    }
  }, [mode, theme.colors]);

  const getRarityText = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': return '일반';
      case 'uncommon': return '고급';
      case 'rare': return '희귀';
      case 'epic': return '전설';
      default: return '일반';
    }
  }, []);

  // 5.4. Memoized 계산 값들
  const totalQuantity = useMemo(() => {
    return inventoryItems.reduce((total, item) => total + item.quantity, 0);
  }, [inventoryItems]);

  const rarityCount = useMemo(() => {
    return inventoryItems.filter(item => item.rarity === 'rare' || item.rarity === 'epic').length;
  }, [inventoryItems]);

  // 5.5. 스타일 정의 (theme 객체 활용)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.design.spacing.xl,
      paddingBottom: theme.design.spacing.xxxl,
    },
    section: {
      marginBottom: theme.design.spacing.xxl,
    },
    headerSection: {
      marginBottom: theme.design.spacing.xxl,
    },
    headerTitle: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text,
      marginBottom: theme.design.spacing.sm,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      letterSpacing: -0.2,
    },
    itemsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.design.spacing.md,
    },
    itemButton: {
      width: CARD_WIDTH,
    },
    itemCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.design.borderRadius.lg,
      padding: theme.design.spacing.lg,
      ...theme.design.shadows.sm,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.design.spacing.md,
    },
    itemIcon: {
      width: 40,
      height: 40,
      borderRadius: theme.design.borderRadius.full,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.elevated,
      marginBottom: theme.design.spacing.sm,
    },
    itemName: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
      marginBottom: theme.design.spacing.xs,
      letterSpacing: -0.2,
    },
    itemRarity: {
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.medium,
      paddingHorizontal: theme.design.spacing.sm,
      paddingVertical: theme.design.spacing.xs,
      borderRadius: theme.design.borderRadius.sm,
      overflow: 'hidden',
      letterSpacing: -0.1,
    },
    itemDescription: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      marginBottom: theme.design.spacing.sm,
      lineHeight: theme.typography.lineHeights.normal * theme.typography.sizes.xs,
      letterSpacing: -0.1,
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.design.borderRadius.sm,
      padding: theme.design.spacing.sm,
    },
    quantityLabel: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      letterSpacing: -0.1,
    },
    quantityValue: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
      letterSpacing: -0.1,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 64,
    },
    emptyStateIcon: {
      width: 80,
      height: 80,
      borderRadius: theme.design.borderRadius.full,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.elevated,
      marginBottom: theme.design.spacing.lg,
    },
    emptyStateText: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
      marginBottom: theme.design.spacing.sm,
      letterSpacing: -0.3,
    },
    emptyStateSubtext: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      letterSpacing: -0.1,
    },
    statsCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.design.borderRadius.lg,
      padding: theme.design.spacing.xl,
      marginBottom: theme.design.spacing.xxl,
      ...theme.design.shadows.md,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text,
      marginBottom: theme.design.spacing.xs,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      letterSpacing: -0.1,
    },
  });

  // 5.6. JSX 반환
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <ScreenHeader title="인벤토리" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 통계 카드 */}
          <View style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{inventoryItems.length}</Text>
                <Text style={styles.statLabel}>아이템</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalQuantity}</Text>
                <Text style={styles.statLabel}>총 개수</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{rarityCount}</Text>
                <Text style={styles.statLabel}>희귀</Text>
              </View>
            </View>
          </View>

          {/* 아이템 헤더 */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>보유 아이템</Text>
            <Text style={styles.headerSubtitle}>
              {inventoryItems.length}개의 아이템을 보유하고 있습니다
            </Text>
          </View>

          {/* 아이템 그리드 */}
          {inventoryItems.length > 0 ? (
            <View style={styles.itemsGrid}>
              {inventoryItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemButton}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemCard}>
                    <View style={styles.itemIcon}>
                      <Icon
                        name={item.icon}
                        size={24}
                        color={getRarityColor(item.rarity)}
                      />
                    </View>
                    
                    <Text style={styles.itemName}>{item.name}</Text>
                    
                    <Text style={[
                      styles.itemRarity,
                      { 
                        color: getRarityColor(item.rarity),
                        backgroundColor: getRarityColor(item.rarity) + '20'
                      }
                    ]}>
                      {getRarityText(item.rarity)}
                    </Text>
                    
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    
                    <View style={styles.itemFooter}>
                      <Text style={styles.quantityLabel}>수량</Text>
                      <Text style={styles.quantityValue}>{item.quantity}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Icon
                  name="package-variant"
                  size={40}
                  color={theme.colors.textTertiary}
                />
              </View>
              <Text style={styles.emptyStateText}>인벤토리가 비어있습니다</Text>
              <Text style={styles.emptyStateSubtext}>
                게임을 플레이하여 아이템을 획득하세요
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 7. 컴포넌트 내보내기
export default InventoryScreen; 