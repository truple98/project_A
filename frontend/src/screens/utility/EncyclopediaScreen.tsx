import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import { ScreenHeader } from '../../components/ScreenHeader';

type EncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;
type EncyclopediaScreenRouteProp = RouteProp<any, any>;

interface EncyclopediaItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

// Mock data
const ENCYCLOPEDIA_DATA: EncyclopediaItem[] = [
  // 장소
  {
    id: 'place_1',
    name: '아르카니아 마법학원',
    description: '고대 마법의 비밀을 배우는 마법사들의 성지. 높은 탑과 도서관이 있는 웅장한 건물이다.',
    icon: 'castle',
    category: 'places',
    discovered: true,
  },
  {
    id: 'place_2',
    name: '마을 여관',
    description: '여행자들이 쉬어가는 따뜻한 여관. 마을의 소문과 정보를 얻을 수 있는 곳이다.',
    icon: 'home',
    category: 'places',
    discovered: true,
  },
  {
    id: 'place_3',
    name: '고대 유적',
    description: '신비로운 힘이 깃든 고대 유적. 아직 탐험되지 않은 곳이 많다.',
    icon: 'temple-buddhist',
    category: 'places',
    discovered: false,
    rarity: 'rare',
  },
  
  // 인물
  {
    id: 'char_1',
    name: '엘드리치 장로',
    description: '마법사 길드의 현명한 장로. 수백 년간 마법을 연구해온 전설적인 마법사다.',
    icon: 'account-wizard',
    category: 'characters',
    discovered: true,
  },
  {
    id: 'char_2',
    name: '리나 파이어스피어',
    description: '같은 학년의 엘리트 마법사. 화염 마법에 특화되어 있으며 경쟁심이 강하다.',
    icon: 'account',
    category: 'characters',
    discovered: true,
  },
  {
    id: 'char_3',
    name: '마스터 조르단',
    description: '마법 실습 담당 교수. 엄격하지만 학생들을 진심으로 아끼는 분이다.',
    icon: 'account-tie',
    category: 'characters',
    discovered: true,
  },
  
  // 생명체
  {
    id: 'creature_1',
    name: '마법 고양이',
    description: '마법학원에서 기르는 특별한 고양이. 마법을 감지할 수 있는 능력이 있다.',
    icon: 'cat',
    category: 'creatures',
    discovered: true,
  },
  {
    id: 'creature_2',
    name: '수정 드래곤',
    description: '수정으로 이루어진 작은 드래곤. 매우 희귀하며 마법의 힘을 증폭시킨다.',
    icon: 'dragon',
    category: 'creatures',
    discovered: false,
    rarity: 'legendary',
  },
  
  // 동료
  {
    id: 'companion_1',
    name: '아리아 스톰윈드',
    description: '당신의 캐릭터. 마법학원에 입학한 신입 마법사로, 잠재력이 무한하다.',
    icon: 'account-star',
    category: 'companions',
    discovered: true,
  },
  
  // 도구
  {
    id: 'tool_1',
    name: '마법 지팡이',
    description: '마법을 증폭시키는 기본적인 마법 도구. 모든 마법사가 가지고 다니는 필수품이다.',
    icon: 'wand',
    category: 'tools',
    discovered: true,
  },
  {
    id: 'tool_2',
    name: '고대 마법서',
    description: '잃어버린 마법들이 기록된 신비로운 책. 해독하면 강력한 마법을 배울 수 있다.',
    icon: 'book-open-variant',
    category: 'tools',
    discovered: false,
    rarity: 'epic',
  },
  
  // 상태
  {
    id: 'status_1',
    name: '행동력',
    description: '하루에 할 수 있는 행동의 수. 마법 사용이나 탐험에 소모된다.',
    icon: 'lightning-bolt',
    category: 'status',
    discovered: true,
  },
  {
    id: 'status_2',
    name: '생명력',
    description: '캐릭터의 생명을 나타내는 수치. 위험한 상황에서 소모될 수 있다.',
    icon: 'heart',
    category: 'status',
    discovered: true,
  },
  
  // 기술
  {
    id: 'skill_1',
    name: '화염 마법',
    description: '불을 다루는 기본적인 공격 마법. 적을 공격하거나 장애물을 제거할 수 있다.',
    icon: 'fire',
    category: 'skills',
    discovered: true,
  },
  {
    id: 'skill_2',
    name: '치유 마법',
    description: '상처를 치료하는 회복 마법. 생명력을 회복시킬 수 있다.',
    icon: 'medical-bag',
    category: 'skills',
    discovered: false,
    rarity: 'rare',
  },
];

const CATEGORIES = [
  { id: 'places', name: '장소', icon: 'map-marker', color: '#4CAF50' },
  { id: 'characters', name: '인물', icon: 'account-group', color: '#2196F3' },
  { id: 'creatures', name: '생명체', icon: 'paw', color: '#FF9800' },
  { id: 'companions', name: '동료', icon: 'account-star', color: '#9C27B0' },
  { id: 'tools', name: '도구', icon: 'hammer-wrench', color: '#795548' },
  { id: 'status', name: '상태', icon: 'chart-line', color: '#607D8B' },
  { id: 'skills', name: '기술', icon: 'sword-cross', color: '#F44336' },
];

const EncyclopediaScreen = () => {
  const navigation = useNavigation<EncyclopediaScreenNavigationProp>();
  const route = useRoute<EncyclopediaScreenRouteProp>();
  const { theme, mode } = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState((route.params as any)?.category || 'places');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredItems = useMemo(() => {
    return ENCYCLOPEDIA_DATA.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

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

  // Styles
  const styles = useMemo(() => getStyles(theme, mode), [theme, mode]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="도감" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 카테고리 선택 */}
          <View style={styles.categoriesContainer}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>카테고리</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    { 
                      backgroundColor: selectedCategory === category.id 
                        ? category.color + '20' 
                        : theme.colors.elevation1,
                      borderColor: selectedCategory === category.id 
                        ? category.color 
                        : 'transparent',
                    }
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Icon 
                    name={category.icon} 
                    size={24} 
                    color={selectedCategory === category.id ? category.color : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.categoryText,
                    { 
                      color: selectedCategory === category.id ? category.color : theme.colors.textSecondary,
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.medium,
                    }
                  ]}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 아이템 목록 */}
          <View style={styles.itemsContainer}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>
              {CATEGORIES.find(c => c.id === selectedCategory)?.name} ({filteredItems.length})
            </Text>
            
            <View style={styles.itemsGrid}>
              {filteredItems.map((item) => (
                <View key={item.id} style={[
                  styles.itemCard,
                  { 
                    backgroundColor: item.discovered ? theme.colors.elevation1 : theme.colors.elevation2,
                    opacity: item.discovered ? 1 : 0.6,
                  }
                ]}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemIconContainer}>
                      <Icon 
                        name={item.icon} 
                        size={24} 
                        color={item.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                      />
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={[
                        styles.itemName,
                        { 
                          color: item.discovered ? theme.colors.text : theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>
                        {item.discovered ? item.name : '??? 발견되지 않음'}
                      </Text>
                      {item.rarity && item.discovered && (
                        <Text style={[
                          styles.itemRarity,
                          { 
                            color: getRarityColor(item.rarity),
                            fontSize: theme.typography.sizes.xs,
                            fontWeight: theme.typography.weights.medium,
                          }
                        ]}>
                          {getRarityText(item.rarity)}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  {item.discovered && (
                    <Text style={[
                      styles.itemDescription,
                      { 
                        color: theme.colors.textSecondary,
                        fontSize: theme.typography.sizes.sm,
                        fontWeight: theme.typography.weights.regular,
                      }
                    ]}>
                      {item.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// Styles function
const getStyles = (theme: any, mode: string) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  categoriesScroll: {
    paddingHorizontal: 4,
  },
  categoryCard: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 80,
  },
  categoryText: {
    marginTop: 4,
    letterSpacing: -0.2,
  },
  itemsContainer: {
    marginBottom: 24,
  },
  itemsGrid: {
    gap: 12,
  },
  itemCard: {
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
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
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  itemRarity: {
    letterSpacing: -0.1,
  },
  itemDescription: {
    lineHeight: 20,
    letterSpacing: -0.2,
  },
});

export default EncyclopediaScreen; 