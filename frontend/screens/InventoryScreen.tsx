import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InventoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inventory'>;

const { width } = Dimensions.get('window');
const cardWidth = (width - 64) / 2; // 2열 그리드

const InventoryScreen = () => {
  const navigation = useNavigation<InventoryScreenNavigationProp>();
  const { mode } = useTheme();

  const inventoryItems = [
    { id: 1, name: '체력 포션', quantity: 5, rarity: 'common', description: '체력을 회복시킵니다', icon: 'heart' },
    { id: 2, name: '마나 포션', quantity: 3, rarity: 'common', description: '마나를 회복시킵니다', icon: 'flash' },
    { id: 3, name: '강철 검', quantity: 1, rarity: 'rare', description: '강력한 무기입니다', icon: 'sword' },
    { id: 4, name: '마법 반지', quantity: 1, rarity: 'epic', description: '마법의 힘을 담은 반지', icon: 'ring' },
    { id: 5, name: '방어구', quantity: 2, rarity: 'uncommon', description: '몸을 보호하는 방어구', icon: 'shield' },
    { id: 6, name: '스크롤', quantity: 7, rarity: 'common', description: '유용한 주문이 담긴 스크롤', icon: 'scroll' },
    { id: 7, name: '비밀 열쇠', quantity: 1, rarity: 'rare', description: '특별한 곳을 열 수 있는 열쇠', icon: 'key' },
    { id: 8, name: '회복 물약', quantity: 4, rarity: 'uncommon', description: '더 강력한 회복 효과', icon: 'bottle-wine' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 26, 26, 0.6)';
      case 'uncommon': return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'rare': return mode === 'dark' ? '#5A9FFF' : '#4285F4';
      case 'epic': return mode === 'dark' ? '#FF8A65' : '#FF6F00';
      default: return mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 26, 26, 0.6)';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return '일반';
      case 'uncommon': return '고급';
      case 'rare': return '희귀';
      case 'epic': return '전설';
      default: return '일반';
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleItemPress = (item: any) => {
    // TODO: 아이템 상세 정보 표시 또는 사용
    console.log('아이템 선택:', item.name);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 24,
    },
    headerSection: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 16,
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.2,
    },
    itemsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    itemButton: {
      width: cardWidth,
    },
    itemCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 16,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      marginBottom: 8,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    itemRarity: {
      fontSize: 12,
      fontWeight: '500',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      overflow: 'hidden',
      letterSpacing: -0.1,
    },
    itemDescription: {
      fontSize: 12,
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      marginBottom: 8,
      lineHeight: 16,
      letterSpacing: -0.1,
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 8,
      padding: 8,
    },
    quantityLabel: {
      fontSize: 12,
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
    quantityValue: {
      fontSize: 14,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
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
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      marginBottom: 16,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      textAlign: 'center',
      letterSpacing: -0.1,
    },
    statsCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
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
      fontSize: 24,
      fontWeight: '700',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 12,
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
  });

  const getTotalQuantity = () => {
    return inventoryItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getRarityCount = (rarity: string) => {
    return inventoryItems.filter(item => item.rarity === rarity).length;
  };

  return (
    <GlassmorphismBackground>
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
                <Text style={styles.statValue}>{getTotalQuantity()}</Text>
                <Text style={styles.statLabel}>총 개수</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{getRarityCount('rare') + getRarityCount('epic')}</Text>
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
                  color={mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(26, 26, 26, 0.5)'}
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

export default InventoryScreen; 