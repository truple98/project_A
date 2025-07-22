import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../../components/GlassmorphismHeader';

// 프로젝트 내부 타입 및 테마
import { useTheme } from '../../../theme/ThemeContext';

type ItemEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface ItemData {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  type?: string;
}

// Mock data for items
const ITEM_DATA: ItemData[] = [
  {
    id: 'item_1',
    name: '마법 지팡이',
    description: '마법을 증폭시키는 기본적인 마법 도구. 모든 마법사가 가지고 다니는 필수품이다.',
    icon: 'wand',
    discovered: true,
    type: '무기',
  },
  {
    id: 'item_2',
    name: '고대 마법서',
    description: '잃어버린 마법들이 기록된 신비로운 책. 해독하면 강력한 마법을 배울 수 있다.',
    icon: 'book-open-variant',
    discovered: false,
    rarity: 'epic',
    type: '도구',
  },
  {
    id: 'item_3',
    name: '치유 물약',
    description: '상처를 치료하는 마법 물약. 생명력을 회복시킨다.',
    icon: 'flask',
    discovered: true,
    type: '소모품',
  },
  {
    id: 'item_4',
    name: '마법 반지',
    description: '마법의 힘을 증폭시키는 반지. 착용하면 마법 효과가 강화된다.',
    icon: 'ring',
    discovered: true,
    type: '장신구',
  },
  {
    id: 'item_5',
    name: '드래곤의 심장',
    description: '전설적인 드래곤의 심장. 강력한 마법의 원천이 된다.',
    icon: 'heart',
    discovered: false,
    rarity: 'legendary',
    type: '재료',
  },
];

const ItemEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<ItemEncyclopediaScreenNavigationProp>();
  const { theme, mode } = useTheme();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'rare':
        return mode === 'dark' ? '#42A5F5' : '#2196F3';
      case 'epic':
        return mode === 'dark' ? '#AB47BC' : '#9C27B0';
      case 'legendary':
        return mode === 'dark' ? '#FFA726' : '#FF9800';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getRarityText = (rarity?: string) => {
    switch (rarity) {
      case 'common':
        return '일반';
      case 'rare':
        return '희귀';
      case 'epic':
        return '영웅';
      case 'legendary':
        return '전설';
      default:
        return '';
    }
  };

  // 스타일 정의
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      letterSpacing: -0.3,
      color: theme.colors.text,
    },
    itemCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      opacity: 1,
    },
    undiscoveredCard: {
      opacity: 0.6,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    itemType: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    itemRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    itemDescription: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -0.2,
      color: theme.colors.textSecondary,
    },
  }), [theme, mode]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="아이템 도감" 
          onBackPress={handleBack}
        />

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            아이템 목록 ({ITEM_DATA.length})
          </Text>
          
          {ITEM_DATA.map((item) => (
            <View 
              key={item.id} 
              style={[
                styles.itemCard,
                !item.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.itemHeader}>
                <View style={styles.itemIconContainer}>
                  <Icon 
                    name={item.icon} 
                    size={24} 
                    color={item.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.discovered ? item.name : '??? 발견되지 않음'}
                  </Text>
                  {item.type && item.discovered && (
                    <Text style={styles.itemType}>
                      {item.type}
                    </Text>
                  )}
                  {item.rarity && item.discovered && (
                    <Text style={[
                      styles.itemRarity,
                      { color: getRarityColor(item.rarity) }
                    ]}>
                      {getRarityText(item.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {item.discovered && (
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default ItemEncyclopediaScreen; 