// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface StoryPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  isOnSale: boolean;
  isOwned: boolean;
  storyCount: number;
  estimatedPlayTime: string;
  difficulty: 'easy' | 'normal' | 'hard';
  tags: string[];
  imageUrl?: string;
}

// 4. 상수 및 유틸리티 변수 정의
const MOCK_STORY_PACKAGES: StoryPackage[] = [
  {
    id: '1',
    title: '신비한 숲의 모험',
    description: '고대의 숲에서 펼쳐지는 신비로운 모험. 숲의 비밀을 탐험하며 새로운 친구들을 만나보세요.',
    price: 2900,
    originalPrice: 3900,
    isOnSale: true,
    isOwned: false,
    storyCount: 5,
    estimatedPlayTime: '2-3시간',
    difficulty: 'easy',
    tags: ['판타지', '모험', '친구'],
  },
  {
    id: '2',
    title: '고대 던전 탐험',
    description: '깊은 지하 던전에서 보물을 찾아라! 함정과 몬스터가 가득한 위험한 던전을 탐험하세요.',
    price: 3900,
    isOnSale: false,
    isOwned: true,
    storyCount: 7,
    estimatedPlayTime: '3-4시간',
    difficulty: 'normal',
    tags: ['던전', '보물', '전투'],
  },
  {
    id: '3',
    title: '마법사의 탑',
    description: '마법의 힘을 배우며 탑을 정복하라. 강력한 마법과 지혜를 얻어 최고의 마법사가 되세요.',
    price: 4900,
    originalPrice: 5900,
    isOnSale: true,
    isOwned: false,
    storyCount: 8,
    estimatedPlayTime: '4-5시간',
    difficulty: 'hard',
    tags: ['마법', '학습', '성장'],
  },
  {
    id: '4',
    title: '해적의 보물섬',
    description: '바다를 건너 보물섬으로 향하라! 해적들과의 전투와 보물 찾기 모험이 기다리고 있습니다.',
    price: 3500,
    isOnSale: false,
    isOwned: false,
    storyCount: 6,
    estimatedPlayTime: '2-3시간',
    difficulty: 'normal',
    tags: ['해적', '보물', '바다'],
  },
  {
    id: '5',
    title: '우주 탐험대',
    description: '우주를 탐험하며 새로운 행성을 발견하라! 외계 생명체와의 만남과 우주의 비밀을 탐구하세요.',
    price: 5900,
    isOnSale: false,
    isOwned: false,
    storyCount: 10,
    estimatedPlayTime: '5-6시간',
    difficulty: 'hard',
    tags: ['우주', '탐험', 'SF'],
  },
];

// 5. 메인 스크린 컴포넌트 함수 정의
const StoreScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const { theme } = useTheme();

  // 5.2. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePurchase = useCallback((storyPackage: StoryPackage) => {
    if (storyPackage.isOwned) {
      Alert.alert('이미 보유한 상품', '이 스토리 패키지는 이미 구매하셨습니다.');
      return;
    }

    Alert.alert(
      '구매 확인',
      `${storyPackage.title}\n가격: ${storyPackage.price.toLocaleString()}원\n\n이 상품을 구매하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '구매', 
          onPress: () => {
            // TODO: 실제 결제 로직 구현
            Alert.alert('구매 완료', '스토리 패키지가 성공적으로 구매되었습니다!');
          }
        },
      ]
    );
  }, []);

  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy': return theme.colors.success;
      case 'normal': return theme.colors.warning;
      case 'hard': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  }, [theme.colors]);

  const getDifficultyText = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'normal': return '보통';
      case 'hard': return '어려움';
      default: return '보통';
    }
  }, []);

  // 5.3. 스타일 정의 (theme 객체 활용)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: 80,
      paddingBottom: 32,
      paddingHorizontal: 24,
      marginHorizontal: 24,
      marginTop: 24,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    placeholder: {
      width: 48,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    packageCard: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    packageHeader: {
      padding: 20,
    },
    packageTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    packageDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 16,
      letterSpacing: -0.1,
    },
    packageInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    packageStats: {
      flexDirection: 'row',
      gap: 16,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    statLabel: {
      fontSize: 12,
      letterSpacing: -0.1,
    },
    difficultyBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    difficultyText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    packageTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    tagText: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    packageFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    currentPrice: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: -0.3,
    },
    originalPrice: {
      fontSize: 16,
      textDecorationLine: 'line-through',
      letterSpacing: -0.2,
    },
    saleBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    saleText: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    purchaseButton: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 20,
    },
    purchaseButtonText: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    ownedBadge: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    ownedText: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
  });

  // 5.4. JSX 반환
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* 헤더 */}
        <GlassmorphismCard style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
              onPress={handleGoBack}
            >
              <Icon
                name="arrow-left"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              스토어
            </Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 스토리 패키지 목록 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              스토리 패키지
            </Text>
            
            {MOCK_STORY_PACKAGES.map((packageItem) => (
              <View key={packageItem.id} style={[styles.packageCard, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.packageHeader}>
                  <Text style={[styles.packageTitle, { color: theme.colors.text }]}>
                    {packageItem.title}
                  </Text>
                  <Text style={[styles.packageDescription, { color: theme.colors.textSecondary }]}>
                    {packageItem.description}
                  </Text>
                  
                  <View style={styles.packageInfo}>
                    <View style={styles.packageStats}>
                      <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.colors.text }]}>
                          {packageItem.storyCount}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                          스토리
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.colors.text }]}>
                          {packageItem.estimatedPlayTime}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                          예상 시간
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(packageItem.difficulty) + '20' }
                    ]}>
                      <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(packageItem.difficulty) }
                      ]}>
                        {getDifficultyText(packageItem.difficulty)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.packageTags}>
                    {packageItem.tags.map((tag, index) => (
                      <View key={index} style={[
                        styles.tag,
                        { backgroundColor: theme.colors.elevated }
                      ]}>
                        <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>
                          #{tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.packageFooter}>
                  <View style={styles.priceContainer}>
                    {packageItem.isOnSale && (
                      <Text style={[styles.originalPrice, { color: theme.colors.textTertiary }]}>
                        {packageItem.originalPrice?.toLocaleString()}원
                      </Text>
                    )}
                    <Text style={[styles.currentPrice, { color: theme.colors.text }]}>
                      {packageItem.price.toLocaleString()}원
                    </Text>
                    {packageItem.isOnSale && (
                      <View style={[styles.saleBadge, { backgroundColor: theme.colors.error }]}>
                        <Text style={[styles.saleText, { color: '#FFFFFF' }]}>
                          할인
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  {packageItem.isOwned ? (
                    <View style={[styles.ownedBadge, { backgroundColor: theme.colors.success }]}>
                      <Text style={[styles.ownedText, { color: '#FFFFFF' }]}>
                        보유중
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.purchaseButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => handlePurchase(packageItem)}
                    >
                      <Text style={[styles.purchaseButtonText, { color: '#FFFFFF' }]}>
                        구매
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. 컴포넌트 내보내기
export default StoreScreen; 