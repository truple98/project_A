import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';

type EndingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ending'>;

const EndingScreen = () => {
  const navigation = useNavigation<EndingScreenNavigationProp>();
  const { mode } = useTheme();

  const gameStats = {
    totalScore: 15750,
    totalTime: '2:45:32',
    levelsCompleted: 12,
    enemiesDefeated: 87,
    treasuresFound: 23,
    secretsDiscovered: 5,
  };

  const achievements = [
    { id: 1, name: '첫 승리', description: '첫 번째 전투에서 승리하기', unlocked: true },
    { id: 2, name: '탐험가', description: '모든 숨겨진 보물 발견하기', unlocked: true },
    { id: 3, name: '전사', description: '100명의 적을 처치하기', unlocked: false },
    { id: 4, name: '수집가', description: '모든 아이템 수집하기', unlocked: true },
    { id: 5, name: '마스터', description: '모든 레벨 완료하기', unlocked: true },
    { id: 6, name: '비밀 발견자', description: '숨겨진 장소 발견하기', unlocked: true },
  ];

  const finalRanking = {
    rank: 'A+',
    percentage: 95,
    comment: '완벽한 모험가!',
  };

  const handleRestart = () => {
    navigation.navigate('GameStart');
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getAchievementColor = (unlocked: boolean) => {
    if (unlocked) {
      return mode === 'dark' ? '#66BB6A' : '#4CAF50';
    }
    return mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(26, 26, 26, 0.3)';
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'A+':
      case 'A':
        return mode === 'dark' ? '#FFA726' : '#FF9800';
      case 'B+':
      case 'B':
        return mode === 'dark' ? '#5A9FFF' : '#4285F4';
      case 'C+':
      case 'C':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      default:
        return mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)';
    }
  };

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="게임 완료" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 축하 메시지 */}
          <GlassmorphismCard style={styles.congratsCard}>
            <Text style={[
              styles.congratsTitle,
              { color: mode === 'dark' ? '#FFA726' : '#FF9800' }
            ]}>
              축하합니다!
            </Text>
            <Text style={[
              styles.congratsMessage,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              모든 모험을 성공적으로 완료했습니다!
            </Text>
            <Text style={[
              styles.congratsSubtitle,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              당신의 여정은 정말 멋졌습니다.
            </Text>
          </GlassmorphismCard>

          {/* 최종 등급 */}
          <GlassmorphismCard style={styles.rankCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              최종 등급
            </Text>
            <View style={styles.rankDisplay}>
              <Text style={[
                styles.rankGrade,
                { color: getRankColor(finalRanking.rank) }
              ]}>
                {finalRanking.rank}
              </Text>
              <Text style={[
                styles.rankPercentage,
                { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
              ]}>
                {finalRanking.percentage}%
              </Text>
            </View>
            <Text style={[
              styles.rankComment,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              {finalRanking.comment}
            </Text>
          </GlassmorphismCard>

          {/* 총 통계 */}
          <GlassmorphismCard style={styles.statsCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              총 통계
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  총 점수
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.totalScore.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  총 시간
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.totalTime}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  완료한 레벨
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.levelsCompleted}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  처치한 적
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.enemiesDefeated}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  발견한 보물
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.treasuresFound}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  비밀 발견
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameStats.secretsDiscovered}
                </Text>
              </View>
            </View>
          </GlassmorphismCard>

          {/* 업적 목록 */}
          <GlassmorphismCard style={styles.achievementsCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              업적 ({achievements.filter(a => a.unlocked).length}/{achievements.length})
            </Text>
            <View style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={[
                  styles.achievementItem,
                  { 
                    backgroundColor: achievement.unlocked 
                      ? (mode === 'dark' ? 'rgba(102, 187, 106, 0.1)' : 'rgba(76, 175, 80, 0.1)')
                      : (mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'),
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
                    <Text style={[
                      styles.achievementDescription,
                      { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.achievementStatus,
                    { 
                      backgroundColor: achievement.unlocked 
                        ? (mode === 'dark' ? '#66BB6A' : '#4CAF50')
                        : (mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                    }
                  ]}>
                    <Text style={[
                      styles.achievementStatusText,
                      { color: achievement.unlocked ? '#FFFFFF' : (mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)') }
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
            <Text style={[
              styles.thanksTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              게임을 플레이해주셔서 감사합니다!
            </Text>
            <Text style={[
              styles.thanksMessage,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              당신의 모험은 끝났지만, 새로운 여정은 언제든지 시작할 수 있습니다.
            </Text>
          </GlassmorphismCard>

          {/* 액션 버튼들 */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4' }
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
                { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)' }
              ]}
              onPress={handleHome}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.actionButtonText,
                { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
              ]}>
                메인 화면으로
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  congratsCard: {
    marginBottom: 20,
    padding: 24,
    alignItems: 'center',
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  congratsMessage: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  congratsSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  rankCard: {
    marginBottom: 16,
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  rankDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  rankGrade: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 12,
  },
  rankPercentage: {
    fontSize: 20,
    fontWeight: '600',
  },
  rankComment: {
    fontSize: 14,
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: 16,
    padding: 20,
  },
  statsGrid: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementsCard: {
    marginBottom: 16,
    padding: 20,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  achievementStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  achievementStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thanksCard: {
    marginBottom: 20,
    padding: 24,
    alignItems: 'center',
  },
  thanksTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  thanksMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default EndingScreen; 