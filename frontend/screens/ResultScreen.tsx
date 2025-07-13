import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

const ResultScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const { mode } = useTheme();

  const gameResult = {
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

  const rewards = [
    { id: 1, name: '체력 포션', quantity: 2, rarity: 'common' },
    { id: 2, name: '마법 반지', quantity: 1, rarity: 'rare' },
    { id: 3, name: '골드', quantity: 150, rarity: 'common' },
    { id: 4, name: '경험치 물약', quantity: 1, rarity: 'uncommon' },
  ];

  const achievements = [
    { id: 1, name: '첫 승리', description: '첫 번째 게임에서 승리했습니다', unlocked: true },
    { id: 2, name: '탐험가', description: '모든 보물을 발견했습니다', unlocked: true },
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

  const getExpPercentage = () => (gameResult.currentExp / gameResult.nextLevelExp) * 100;

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  const handleRestart = () => {
    navigation.navigate('GameStart');
  };

  const handleBack = () => {
    navigation.goBack();
  };

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
              { color: gameResult.victory ? (mode === 'dark' ? '#66BB6A' : '#4CAF50') : (mode === 'dark' ? '#EF5350' : '#F44336') }
            ]}>
              {gameResult.victory ? '승리!' : '패배...'}
            </Text>
            <Text style={[
              styles.resultSubtitle,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              {gameResult.victory ? '축하합니다! 모험을 성공적으로 완료했습니다!' : '다시 한 번 도전해보세요!'}
            </Text>
          </GlassmorphismCard>

          {/* 점수 및 레벨 정보 */}
          <GlassmorphismCard style={styles.scoreCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              점수 및 레벨
            </Text>
            <View style={styles.scoreGrid}>
              <View style={styles.scoreItem}>
                <Text style={[
                  styles.scoreLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  최종 점수
                </Text>
                <Text style={[
                  styles.scoreValue,
                  { color: mode === 'dark' ? '#5A9FFF' : '#4285F4' }
                ]}>
                  {gameResult.score.toLocaleString()}
                </Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={[
                  styles.scoreLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  현재 레벨
                </Text>
                <Text style={[
                  styles.scoreValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameResult.level}
                </Text>
              </View>
            </View>
            
            <View style={styles.expSection}>
              <View style={styles.expHeader}>
                <Text style={[
                  styles.expLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  경험치 획득
                </Text>
                <Text style={[
                  styles.expValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  +{gameResult.experience} XP
                </Text>
              </View>
              <View style={[
                styles.expBar,
                { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
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
                { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
              ]}>
                {gameResult.currentExp} / {gameResult.nextLevelExp}
              </Text>
            </View>
          </GlassmorphismCard>

          {/* 게임 통계 */}
          <GlassmorphismCard style={styles.statsCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              게임 통계
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statLabel,
                  { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
                ]}>
                  소요 시간
                </Text>
                <Text style={[
                  styles.statValue,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {gameResult.timeElapsed}
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
                  {gameResult.enemiesDefeated}
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
                  {gameResult.treasuresFound}
                </Text>
              </View>
            </View>
          </GlassmorphismCard>

          {/* 보상 */}
          <GlassmorphismCard style={styles.rewardsCard}>
            <Text style={[
              styles.sectionTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              획득 보상
            </Text>
            <View style={styles.rewardsList}>
              {rewards.map((reward) => (
                <View key={reward.id} style={[
                  styles.rewardItem,
                  { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                ]}>
                  <View style={styles.rewardInfo}>
                    <Text style={[
                      styles.rewardName,
                      { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                    ]}>
                      {reward.name}
                    </Text>
                    <Text style={[
                      styles.rewardRarity,
                      { color: getRarityColor(reward.rarity) }
                    ]}>
                      {reward.rarity === 'common' ? '일반' : reward.rarity === 'uncommon' ? '고급' : reward.rarity === 'rare' ? '희귀' : '전설'}
                    </Text>
                  </View>
                  <Text style={[
                    styles.rewardQuantity,
                    { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
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
                { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
              ]}>
                해제된 업적
              </Text>
              <View style={styles.achievementsList}>
                {achievements.map((achievement) => (
                  <View key={achievement.id} style={[
                    styles.achievementItem,
                    { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                  ]}>
                    <View style={styles.achievementInfo}>
                      <Text style={[
                        styles.achievementName,
                        { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
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
                { backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4' }
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>
                메인으로 돌아가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)' }
              ]}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.actionButtonText,
                { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  scoreCard: {
    marginBottom: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
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
    fontSize: 14,
    fontWeight: '500',
  },
  expValue: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  rewardRarity: {
    fontSize: 12,
    fontWeight: '500',
  },
  rewardQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ResultScreen; 