// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type AchievementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Achievement'>;

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'combat' | 'exploration' | 'story' | 'collection' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: {
    current: number;
    total: number;
  };
}

// 4. 상수 및 유틸리티 변수 정의
const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: '첫 번째 승리',
    description: '첫 번째 전투에서 승리하세요',
    icon: 'sword-cross',
    isUnlocked: true,
    unlockedAt: '2024-01-15',
    category: 'combat',
    rarity: 'common',
  },
  {
    id: '2',
    title: '탐험가',
    description: '10개의 숨겨진 장소를 발견하세요',
    icon: 'map-marker-path',
    isUnlocked: true,
    unlockedAt: '2024-01-14',
    category: 'exploration',
    rarity: 'rare',
    progress: { current: 10, total: 10 },
  },
  {
    id: '3',
    title: '스토리텔러',
    description: '모든 메인 스토리를 완료하세요',
    icon: 'book-open-variant',
    isUnlocked: false,
    category: 'story',
    rarity: 'epic',
    progress: { current: 3, total: 5 },
  },
  {
    id: '4',
    title: '수집가',
    description: '100개의 아이템을 수집하세요',
    icon: 'package-variant',
    isUnlocked: false,
    category: 'collection',
    rarity: 'rare',
    progress: { current: 67, total: 100 },
  },
  {
    id: '5',
    title: '전설의 영웅',
    description: '모든 업적을 달성하세요',
    icon: 'crown',
    isUnlocked: false,
    category: 'special',
    rarity: 'legendary',
    progress: { current: 12, total: 50 },
  },
  {
    id: '6',
    title: '무적의 전사',
    description: '연속으로 10번 전투에서 승리하세요',
    icon: 'shield-cross',
    isUnlocked: true,
    unlockedAt: '2024-01-13',
    category: 'combat',
    rarity: 'epic',
  },
  {
    id: '7',
    title: '마법의 달인',
    description: '모든 마법을 습득하세요',
    icon: 'auto-fix',
    isUnlocked: false,
    category: 'story',
    rarity: 'legendary',
    progress: { current: 5, total: 12 },
  },
  {
    id: '8',
    title: '친구 사귀기',
    description: '10명의 NPC와 친구가 되세요',
    icon: 'account-group',
    isUnlocked: true,
    unlockedAt: '2024-01-12',
    category: 'story',
    rarity: 'common',
    progress: { current: 10, total: 10 },
  },
];

// 5. 메인 스크린 컴포넌트 함수 정의
const AchievementScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<AchievementScreenNavigationProp>();
  const { theme } = useTheme();

  // 5.2. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': return theme.colors.textSecondary;
      case 'rare': return theme.colors.primary;
      case 'epic': return theme.colors.warning;
      case 'legendary': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  }, [theme.colors]);

  const getRarityText = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': return '일반';
      case 'rare': return '희귀';
      case 'epic': return '영웅';
      case 'legendary': return '전설';
      default: return '일반';
    }
  }, []);

  const getCategoryText = useCallback((category: string) => {
    switch (category) {
      case 'combat': return '전투';
      case 'exploration': return '탐험';
      case 'story': return '스토리';
      case 'collection': return '수집';
      case 'special': return '특별';
      default: return '기타';
    }
  }, []);

  // 5.3. 계산된 값들
  const unlockedCount = MOCK_ACHIEVEMENTS.filter(a => a.isUnlocked).length;
  const totalCount = MOCK_ACHIEVEMENTS.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  // 5.4. 스타일 정의 (theme 객체 활용)
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
    progressCard: {
      padding: 20,
      borderRadius: 16,
      marginBottom: 24,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    progressTitle: {
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.3,
    },
    progressText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    achievementCard: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    achievementHeader: {
      padding: 20,
    },
    achievementTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    achievementDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
      letterSpacing: -0.1,
    },
    achievementMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    achievementInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    achievementIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    achievementDetails: {
      flex: 1,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    rarityText: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    progressContainer: {
      alignItems: 'flex-end',
    },
    progressValue: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    unlockDate: {
      fontSize: 12,
      letterSpacing: -0.1,
    },
    lockedOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lockedIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // 5.5. JSX 반환
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
              업적
            </Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 진행 상황 */}
          <View style={styles.section}>
            <View style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressTitle, { color: theme.colors.text }]}>
                  전체 진행률
                </Text>
                <Text style={[styles.progressText, { color: theme.colors.primary }]}>
                  {progressPercentage}%
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.elevated }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: theme.colors.primary,
                      width: `${progressPercentage}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.textSecondary, marginTop: 8 }]}>
                {unlockedCount} / {totalCount} 업적 달성
              </Text>
            </View>
          </View>

          {/* 업적 목록 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              업적 목록
            </Text>
            
            {MOCK_ACHIEVEMENTS.map((achievement) => (
              <View key={achievement.id} style={[
                styles.achievementCard, 
                { 
                  backgroundColor: theme.colors.surface,
                  opacity: achievement.isUnlocked ? 1 : 0.7
                }
              ]}>
                <View style={styles.achievementHeader}>
                  <Text style={[
                    styles.achievementTitle, 
                    { color: achievement.isUnlocked ? theme.colors.text : theme.colors.textTertiary }
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription, 
                    { color: achievement.isUnlocked ? theme.colors.textSecondary : theme.colors.textTertiary }
                  ]}>
                    {achievement.description}
                  </Text>
                  
                  <View style={styles.achievementMeta}>
                    <View style={styles.achievementInfo}>
                      <View style={[
                        styles.achievementIcon,
                        { backgroundColor: theme.colors.elevated }
                      ]}>
                        <Icon
                          name={achievement.icon}
                          size={20}
                          color={achievement.isUnlocked ? theme.colors.text : theme.colors.textTertiary}
                        />
                      </View>
                      <View style={styles.achievementDetails}>
                        <Text style={[
                          styles.categoryText,
                          { color: theme.colors.textSecondary }
                        ]}>
                          {getCategoryText(achievement.category)}
                        </Text>
                        <Text style={[
                          styles.rarityText,
                          { color: getRarityColor(achievement.rarity) }
                        ]}>
                          {getRarityText(achievement.rarity)}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.progressContainer}>
                      {achievement.progress && (
                        <Text style={[
                          styles.progressValue,
                          { color: theme.colors.textSecondary }
                        ]}>
                          {achievement.progress.current} / {achievement.progress.total}
                        </Text>
                      )}
                      {achievement.isUnlocked && achievement.unlockedAt && (
                        <Text style={[
                          styles.unlockDate,
                          { color: theme.colors.textTertiary }
                        ]}>
                          {achievement.unlockedAt}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                
                {!achievement.isUnlocked && (
                  <View style={styles.lockedOverlay}>
                    <View style={[
                      styles.lockedIcon,
                      { backgroundColor: theme.colors.surface }
                    ]}>
                      <Icon
                        name="lock"
                        size={24}
                        color={theme.colors.textTertiary}
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. 컴포넌트 내보내기
export default AchievementScreen; 