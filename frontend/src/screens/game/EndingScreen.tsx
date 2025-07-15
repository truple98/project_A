// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type EndingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ending'>;

interface GameStats {
  totalScore: number;
  totalTime: string;
  levelsCompleted: number;
  enemiesDefeated: number;
  treasuresFound: number;
  secretsDiscovered: number;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
}

interface FinalRanking {
  rank: string;
  percentage: number;
  comment: string;
}

// 4. 상수 및 유틸리티 변수 정의
const MOCK_GAME_STATS: GameStats = {
  totalScore: 15750,
  totalTime: '2:45:32',
  levelsCompleted: 12,
  enemiesDefeated: 87,
  treasuresFound: 23,
  secretsDiscovered: 5,
};

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: '첫 승리', description: '첫 번째 전투에서 승리하기', unlocked: true },
  { id: 2, name: '탐험가', description: '모든 숨겨진 보물 발견하기', unlocked: true },
  { id: 3, name: '전사', description: '100명의 적을 처치하기', unlocked: false },
  { id: 4, name: '수집가', description: '모든 아이템 수집하기', unlocked: true },
  { id: 5, name: '마스터', description: '모든 레벨 완료하기', unlocked: true },
  { id: 6, name: '비밀 발견자', description: '숨겨진 장소 발견하기', unlocked: true },
];

const MOCK_FINAL_RANKING: FinalRanking = {
  rank: 'A+',
  percentage: 95,
  comment: '완벽한 모험가!',
};

// 5. 메인 스크린 컴포넌트 함수 정의
const EndingScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<EndingScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2. 데이터 (현재는 Mock 데이터 사용)
  const gameStats = MOCK_GAME_STATS;
  const achievements = MOCK_ACHIEVEMENTS;
  const finalRanking = MOCK_FINAL_RANKING;

  // 5.3. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleRestart = useCallback(() => {
    navigation.navigate('GameStart');
  }, [navigation]);

  const handleHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getAchievementColor = useCallback((unlocked: boolean) => {
    return unlocked ? theme.colors.success : theme.colors.textTertiary;
  }, [theme.colors]);

  const getRankColor = useCallback((rank: string) => {
    switch (rank) {
      case 'A+':
      case 'A':
        return theme.colors.warning;
      case 'B+':
      case 'B':
        return theme.colors.primary;
      case 'C+':
      case 'C':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  }, [theme.colors]);

  // 5.4. 스타일 정의 (theme 객체 활용)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.design.spacing.xl,
      paddingBottom: theme.design.spacing.xl,
    },
    congratsCard: {
      marginBottom: theme.design.spacing.xl,
      padding: theme.design.spacing.xxl,
      alignItems: 'center',
    },
    congratsTitle: {
      fontSize: theme.typography.sizes.xxxl,
      fontWeight: theme.typography.weights.bold,
      marginBottom: theme.design.spacing.md,
      textAlign: 'center',
      color: theme.colors.warning,
    },
    congratsMessage: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      marginBottom: theme.design.spacing.sm,
      textAlign: 'center',
      color: theme.colors.text,
    },
    congratsSubtitle: {
      fontSize: theme.typography.sizes.sm,
      textAlign: 'center',
      lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
    },
    rankCard: {
      marginBottom: theme.design.spacing.lg,
      padding: theme.design.spacing.xl,
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      marginBottom: theme.design.spacing.lg,
      color: theme.colors.text,
    },
    rankDisplay: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: theme.design.spacing.md,
    },
    rankGrade: {
      fontSize: 48,
      fontWeight: theme.typography.weights.bold,
      marginRight: theme.design.spacing.md,
    },
    rankPercentage: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
    },
    rankComment: {
      fontSize: theme.typography.sizes.sm,
      textAlign: 'center',
      color: theme.colors.textSecondary,
    },
    statsCard: {
      marginBottom: theme.design.spacing.lg,
      padding: theme.design.spacing.xl,
    },
    statsGrid: {
      gap: theme.design.spacing.md,
    },
    statItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.design.spacing.sm,
    },
    statLabel: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.textSecondary,
    },
    statValue: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text,
    },
    achievementsCard: {
      marginBottom: theme.design.spacing.lg,
      padding: theme.design.spacing.xl,
    },
    achievementsList: {
      gap: theme.design.spacing.md,
    },
    achievementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.design.spacing.lg,
      borderRadius: theme.design.borderRadius.md,
    },
    achievementContent: {
      flex: 1,
    },
    achievementName: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      marginBottom: theme.design.spacing.xs,
    },
    achievementDescription: {
      fontSize: theme.typography.sizes.xs,
      lineHeight: theme.typography.lineHeights.normal * theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
    },
    achievementStatus: {
      width: 32,
      height: 32,
      borderRadius: theme.design.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: theme.design.spacing.md,
    },
    achievementStatusText: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold,
    },
    thanksCard: {
      marginBottom: theme.design.spacing.xl,
      padding: theme.design.spacing.xxl,
      alignItems: 'center',
    },
    thanksTitle: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      marginBottom: theme.design.spacing.md,
      textAlign: 'center',
      color: theme.colors.text,
    },
    thanksMessage: {
      fontSize: theme.typography.sizes.sm,
      textAlign: 'center',
      lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
    },
    actionsContainer: {
      gap: theme.design.spacing.md,
    },
    actionButton: {
      paddingVertical: theme.design.spacing.lg,
      paddingHorizontal: theme.design.spacing.xxl,
      borderRadius: theme.design.borderRadius.md,
      alignItems: 'center',
      ...theme.design.shadows.sm,
    },
    actionButtonText: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      color: '#FFFFFF',
    },
    secondaryButtonText: {
      color: theme.colors.text,
    },
  });

  // 5.5. JSX 반환
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <ScreenHeader title="게임 완료" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 축하 메시지 */}
          <GlassmorphismCard style={styles.congratsCard}>
            <Text style={styles.congratsTitle}>
              축하합니다!
            </Text>
            <Text style={styles.congratsMessage}>
              모든 모험을 성공적으로 완료했습니다!
            </Text>
            <Text style={styles.congratsSubtitle}>
              당신의 여정은 정말 멋졌습니다.
            </Text>
          </GlassmorphismCard>

          {/* 최종 등급 */}
          <GlassmorphismCard style={styles.rankCard}>
            <Text style={styles.sectionTitle}>
              최종 등급
            </Text>
            <View style={styles.rankDisplay}>
              <Text style={[
                styles.rankGrade,
                { color: getRankColor(finalRanking.rank) }
              ]}>
                {finalRanking.rank}
              </Text>
              <Text style={styles.rankPercentage}>
                {finalRanking.percentage}%
              </Text>
            </View>
            <Text style={styles.rankComment}>
              {finalRanking.comment}
            </Text>
          </GlassmorphismCard>

          {/* 총 통계 */}
          <GlassmorphismCard style={styles.statsCard}>
            <Text style={styles.sectionTitle}>
              총 통계
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>총 점수</Text>
                <Text style={styles.statValue}>
                  {gameStats.totalScore.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>총 시간</Text>
                <Text style={styles.statValue}>
                  {gameStats.totalTime}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>완료한 레벨</Text>
                <Text style={styles.statValue}>
                  {gameStats.levelsCompleted}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>처치한 적</Text>
                <Text style={styles.statValue}>
                  {gameStats.enemiesDefeated}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>발견한 보물</Text>
                <Text style={styles.statValue}>
                  {gameStats.treasuresFound}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>비밀 발견</Text>
                <Text style={styles.statValue}>
                  {gameStats.secretsDiscovered}
                </Text>
              </View>
            </View>
          </GlassmorphismCard>

          {/* 업적 목록 */}
          <GlassmorphismCard style={styles.achievementsCard}>
            <Text style={styles.sectionTitle}>
              업적 ({achievements.filter(a => a.unlocked).length}/{achievements.length})
            </Text>
            <View style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={[
                  styles.achievementItem,
                  { 
                    backgroundColor: achievement.unlocked 
                      ? theme.colors.success + '20'
                      : theme.colors.surface,
                    opacity: achievement.unlocked ? 1 : 0.6
                  }
                ]}>
                  <View style={styles.achievementContent}>
                    <Text style={[
                      styles.achievementName,
                      { color: getAchievementColor(achievement.unlocked) }
                    ]}>
                      {achievement.name}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.achievementStatus,
                    { 
                      backgroundColor: achievement.unlocked 
                        ? theme.colors.success
                        : theme.colors.border
                    }
                  ]}>
                    <Text style={[
                      styles.achievementStatusText,
                      { 
                        color: achievement.unlocked 
                          ? '#FFFFFF' 
                          : theme.colors.textSecondary 
                      }
                    ]}>
                      {achievement.unlocked ? '✓' : '○'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </GlassmorphismCard>

          {/* 감사 메시지 */}
          <GlassmorphismCard style={styles.thanksCard}>
            <Text style={styles.thanksTitle}>
              게임을 플레이해주셔서 감사합니다!
            </Text>
            <Text style={styles.thanksMessage}>
              당신의 모험은 끝났지만, 새로운 여정은 언제든지 시작할 수 있습니다.
            </Text>
          </GlassmorphismCard>

          {/* 액션 버튼들 */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary }
              ]}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>
                새로운 모험 시작
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.surface }
              ]}
              onPress={handleHome}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
                메인 화면으로
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 7. 컴포넌트 내보내기
export default EndingScreen; 