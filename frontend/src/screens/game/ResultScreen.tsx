import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { ScreenHeader } from '../../src/components/ScreenHeader';

// TypeScript Interfaces
interface GameResult {
  victory: boolean;
  score: number;
  experience: number;
  level: number;
  nextLevelExp: number;
  currentExp: number;
  timeElapsed: string;
  enemiesDefeated: number;
  treasuresFound: number;
}

interface Reward {
  id: number;
  name: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
}

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

// Constants
const MOCK_GAME_RESULT: GameResult = {
  victory: true,
  score: 1250,
  experience: 350,
  level: 5,
  nextLevelExp: 500,
  currentExp: 350,
  timeElapsed: '12:34',
  enemiesDefeated: 8,
  treasuresFound: 3,
};

const MOCK_REWARDS: Reward[] = [
  { id: 1, name: '체력 포션', quantity: 2, rarity: 'common' },
  { id: 2, name: '마법 반지', quantity: 1, rarity: 'rare' },
  { id: 3, name: '골드', quantity: 150, rarity: 'common' },
  { id: 4, name: '경험치 물약', quantity: 1, rarity: 'uncommon' },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: '첫 승리', description: '첫 번째 게임에서 승리했습니다', unlocked: true },
  { id: 2, name: '탐험가', description: '모든 보물을 발견했습니다', unlocked: true },
];

const RARITY_LABELS = {
  common: '일반',
  uncommon: '고급',
  rare: '희귀',
  epic: '전설',
} as const;

// Utility functions
const getRarityColor = (rarity: Reward['rarity'], mode: string) => {
  const colors = {
    common: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 26, 26, 0.6)',
    uncommon: mode === 'dark' ? '#66BB6A' : '#4CAF50',
    rare: mode === 'dark' ? '#5A9FFF' : '#4285F4',
    epic: mode === 'dark' ? '#FF8A65' : '#FF6F00',
  };
  return colors[rarity];
};

const ResultScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2 Data/mock data
  const gameResult = useMemo(() => MOCK_GAME_RESULT, []);
  const rewards = useMemo(() => MOCK_REWARDS, []);
  const achievements = useMemo(() => MOCK_ACHIEVEMENTS, []);

  // 5.3 Event handlers with useCallback
  const handleContinue = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleRestart = useCallback(() => {
    navigation.navigate('GameStart');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getExpPercentage = useCallback(() => {
    return (gameResult.currentExp / gameResult.nextLevelExp) * 100;
  }, [gameResult.currentExp, gameResult.nextLevelExp]);

  // 5.5 JSX return
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="게임 결과" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 결과 헤더 */}
          <GlassmorphismCard style={styles.resultHeader}>
            <Text style={[
              styles.resultTitle,
              { 
                color: gameResult.victory 
                  ? (mode === 'dark' ? '#66BB6A' : '#4CAF50') 
                  : (mode === 'dark' ? '#EF5350' : '#F44336'),
                fontSize: theme.typography.sizes.xl,
                fontWeight: theme.typography.weights.bold,
              }
            ]}>
              {gameResult.victory ? '승리!' : '패배...'}
            </Text>
            <Text style={[
              styles.resultSubtitle,
              { 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.sizes.sm,
                fontWeight: theme.typography.weights.regular,
              }
            ]}>
              {gameResult.victory ? '축하합니다! 모험을 성공적으로 완료했습니다!' : '다시 한 번 도전해보세요!'}
            </Text>
          </GlassmorphismCard>

          {/* 점수 및 레벨 정보 */}
          <GlassmorphismCard style={styles.scoreCard}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>
              점수 및 레벨
            </Text>
            <View style={styles.scoreGrid}>
              <View style={styles.scoreItem}>
                <Text style={[
                  styles.scoreLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  최종 점수
                </Text>
                <Text style={[
                  styles.scoreValue,
                  { 
                    color: theme.colors.primary,
                    fontSize: theme.typography.sizes.xl,
                    fontWeight: theme.typography.weights.bold,
                  }
                ]}>
                  {gameResult.score.toLocaleString()}
                </Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={[
                  styles.scoreLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  현재 레벨
                </Text>
                <Text style={[
                  styles.scoreValue,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.xl,
                    fontWeight: theme.typography.weights.bold,
                  }
                ]}>
                  {gameResult.level}
                </Text>
              </View>
            </View>
            
            <View style={styles.expSection}>
              <View style={styles.expHeader}>
                <Text style={[
                  styles.expLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  경험치 획득
                </Text>
                <Text style={[
                  styles.expValue,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>
                  +{gameResult.experience} XP
                </Text>
              </View>
              <View style={[
                styles.expBar,
                { backgroundColor: theme.colors.elevation2 }
              ]}>
                <View style={[
                  styles.expFill,
                  { 
                    backgroundColor: mode === 'dark' ? '#FFA726' : '#FF9800',
                    width: `${getExpPercentage()}%`
                  }
                ]} />
              </View>
              <Text style={[
                styles.expText,
                { 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.sizes.xs,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>
                {gameResult.currentExp} / {gameResult.nextLevelExp}
              </Text>
            </View>
          </GlassmorphismCard>

          {/* 게임 통계 */}
          <GlassmorphismCard style={styles.statsCard}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>
              게임 통계
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  소요 시간
                </Text>
                <Text style={[
                  styles.statValue,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>
                  {gameResult.timeElapsed}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  처치한 적
                </Text>
                <Text style={[
                  styles.statValue,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>
                  {gameResult.enemiesDefeated}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>
                  발견한 보물
                </Text>
                <Text style={[
                  styles.statValue,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>
                  {gameResult.treasuresFound}
                </Text>
              </View>
            </View>
          </GlassmorphismCard>

          {/* 보상 */}
          <GlassmorphismCard style={styles.rewardsCard}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>
              획득 보상
            </Text>
            <View style={styles.rewardsList}>
              {rewards.map((reward) => (
                <View key={reward.id} style={[
                  styles.rewardItem,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.rewardInfo}>
                    <Text style={[
                      styles.rewardName,
                      { 
                        color: theme.colors.text,
                        fontSize: theme.typography.sizes.sm,
                        fontWeight: theme.typography.weights.semibold,
                      }
                    ]}>
                      {reward.name}
                    </Text>
                    <Text style={[
                      styles.rewardRarity,
                      { 
                        color: getRarityColor(reward.rarity, mode),
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.medium,
                      }
                    ]}>
                      {RARITY_LABELS[reward.rarity]}
                    </Text>
                  </View>
                  <Text style={[
                    styles.rewardQuantity,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.bold,
                    }
                  ]}>
                    x{reward.quantity}
                  </Text>
                </View>
              ))}
            </View>
          </GlassmorphismCard>

          {/* 업적 */}
          {achievements.length > 0 && (
            <GlassmorphismCard style={styles.achievementsCard}>
              <Text style={[
                styles.sectionTitle,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>
                해제된 업적
              </Text>
              <View style={styles.achievementsList}>
                {achievements.map((achievement) => (
                  <View key={achievement.id} style={[
                    styles.achievementItem,
                    { backgroundColor: theme.colors.elevation1 }
                  ]}>
                    <View style={styles.achievementInfo}>
                      <Text style={[
                        styles.achievementName,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>
                        {achievement.name}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.sm,
                          fontWeight: theme.typography.weights.regular,
                        }
                      ]}>
                        {achievement.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </GlassmorphismCard>
          )}

          {/* 액션 버튼들 */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary }
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.actionButtonText,
                { 
                  color: '#FFFFFF',
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>
                메인으로 돌아가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.elevation2 }
              ]}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.actionButtonText,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>
                다시 시작하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// Styles moved outside component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultHeader: {
    marginBottom: 20,
    padding: 24,
    alignItems: 'center',
  },
  resultTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSubtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  scoreCard: {
    marginBottom: 16,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  scoreGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    marginBottom: 6,
  },
  scoreValue: {
    // Styles applied inline
  },
  expSection: {
    marginTop: 16,
    paddingTop: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expLabel: {
    // Styles applied inline
  },
  expValue: {
    // Styles applied inline
  },
  expBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  expFill: {
    height: '100%',
    borderRadius: 4,
  },
  expText: {
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: 16,
    padding: 20,
  },
  statsGrid: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statLabel: {
    // Styles applied inline
  },
  statValue: {
    // Styles applied inline
  },
  rewardsCard: {
    marginBottom: 16,
    padding: 20,
  },
  rewardsList: {
    gap: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    marginBottom: 2,
  },
  rewardRarity: {
    // Styles applied inline
  },
  rewardQuantity: {
    // Styles applied inline
  },
  achievementsCard: {
    marginBottom: 20,
    padding: 20,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    padding: 16,
    borderRadius: 8,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    marginBottom: 4,
  },
  achievementDescription: {
    lineHeight: 18,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    // Styles applied inline
  },
});

export default ResultScreen; 