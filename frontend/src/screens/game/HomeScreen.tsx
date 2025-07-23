// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../components/GlassmorphismHeader';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// 4. 상수 및 유틸리티 변수 정의
const MOCK_NOTICE = {
  title: '새로운 업데이트가 있습니다!',
  content: '새로운 스토리와 아이템이 추가되었습니다. 지금 바로 확인해보세요!',
  date: '2024.01.15'
};

const MOCK_CURRENT_GAME = {
  id: 'current-1',
  title: '인생의 모험',
  chapter: '제 3장: 새로운 시작',
  daysPassed: 45, // 진행된 일수
  completedMissions: 12, // 완수한 임무 수
  activeMissions: 3, // 진행중인 임무 수
  playerStatus: '건강함', // 플레이어 상태
  currentMainMission: '새로운 직장 적응하기', // 현재 진행중인 메인 임무
  lastPlayed: '2024-01-15 14:30',
  duration: '2시간 15분',
  location: '서울 강남구',
  isActive: true,
};

// 5. 메인 스크린 컴포넌트 함수 정의
const HomeScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleContinueGame = useCallback(() => {
    // 진행중인 게임으로 이동 - 현재 노드 ID를 전달
    navigation.navigate('Story', {
      nodeId: 'current-save-node',
    });
  }, [navigation]);

  const handleStartNewGame = useCallback(() => {
    navigation.navigate('Story', { nodeId: 'start' });
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const handleOpenEncyclopedia = useCallback(() => {
    (navigation as any).navigate('Encyclopedia');
  }, [navigation]);

  const handleOpenStore = useCallback(() => {
    (navigation as any).navigate('Store');
  }, [navigation]);

  const handleOpenLibrary = useCallback(() => {
    (navigation as any).navigate('Library');
  }, [navigation]);

  const handleOpenMyPage = useCallback(() => {
    navigation.navigate('Account');
  }, [navigation]);









  // 5.3. 스타일 정의 (theme 객체 활용)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    settingsButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 80, // 120에서 80으로 줄임 (푸터 높이에 맞춤)
    },
    noticeCard: {
      marginBottom: 48,
      padding: 24,
    },
    noticeTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    noticeContent: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
      letterSpacing: -0.1,
    },
    noticeDate: {
      fontSize: 12,
      letterSpacing: -0.1,
    },
    currentGameCard: {
      marginBottom: 32,
      padding: 24,
    },
    currentGameHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    currentGameTitle: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: -0.3,
      flex: 1,
    },
    currentGameStatus: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: '#4CAF50',
    },
    currentGameStatusText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    currentGameChapter: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },
    progressContainer: {
      marginBottom: 16,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    progressText: {
      fontSize: 14,
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
    gameStatsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    gameStatItem: {
      alignItems: 'center',
      flex: 1,
    },
    gameStatValue: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    gameStatLabel: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    mainMissionContainer: {
      marginBottom: 20,
      padding: 16,
      borderRadius: 12,
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderLeftWidth: 4,
      borderLeftColor: '#4CAF50',
    },
    mainMissionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    mainMissionIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    mainMissionLabel: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    mainMissionText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
      lineHeight: 22,
    },
    gameInfoContainer: {
      marginBottom: 16,
    },
    gameInfoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gameInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      width: '48%',
    },
    gameInfoIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    gameInfoContent: {
      flex: 1,
    },
    gameInfoLabel: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
      marginBottom: 2,
    },
    gameInfoValue: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    continueButton: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    startGameButton: {
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 'auto', // 하단에 고정
      marginBottom: 24,
    },
    startGameButtonText: {
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
    },


    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom: 16, // 32에서 16으로 줄임
      paddingTop: 12, // 20에서 12로 줄임
    },
    bottomNavContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    bottomNavItem: {
      alignItems: 'center',
      flex: 1,
    },
    bottomNavIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
    },
    bottomNavText: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
  });

  // 5.4. JSX 반환
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="모험가님"
          showBackButton={false}
          rightComponent={
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={handleOpenSettings}
            >
              <Icon name="cog" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          }
        />

        {/* 메인 콘텐츠 */}
        <ScrollView 
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // 푸터 높이만큼 여백
        >
          {/* 정보창 */}
          <GlassmorphismCard style={styles.noticeCard}>
            <Text style={[styles.noticeTitle, { color: theme.colors.text }]}>
              {MOCK_NOTICE.title}
            </Text>
            <Text style={[styles.noticeContent, { color: theme.colors.textSecondary }]}>
              {MOCK_NOTICE.content}
            </Text>
            <Text style={[styles.noticeDate, { color: theme.colors.textTertiary }]}>
              {MOCK_NOTICE.date}
            </Text>
          </GlassmorphismCard>

          {/* 진행중인 게임 정보 */}
          {MOCK_CURRENT_GAME.isActive && (
            <GlassmorphismCard style={styles.currentGameCard}>
              <View style={styles.currentGameHeader}>
                <Text style={[styles.currentGameTitle, { color: theme.colors.text }]}>
                  {MOCK_CURRENT_GAME.title}
                </Text>
                <View style={styles.currentGameStatus}>
                  <Text style={styles.currentGameStatusText}>진행중</Text>
                </View>
              </View>
              
              <Text style={[styles.currentGameChapter, { color: theme.colors.primary }]}>
                {MOCK_CURRENT_GAME.chapter}
              </Text>
              
              {/* 게임 통계 */}
              <View style={styles.gameStatsGrid}>
                <View style={styles.gameStatItem}>
                  <Text style={[styles.gameStatValue, { color: theme.colors.text }]}>
                    {MOCK_CURRENT_GAME.daysPassed}일
                  </Text>
                  <Text style={[styles.gameStatLabel, { color: theme.colors.textSecondary }]}>
                    진행된 일수
                  </Text>
                </View>
                <View style={styles.gameStatItem}>
                  <Text style={[styles.gameStatValue, { color: theme.colors.text }]}>
                    {MOCK_CURRENT_GAME.completedMissions}
                  </Text>
                  <Text style={[styles.gameStatLabel, { color: theme.colors.textSecondary }]}>
                    완수한 임무
                  </Text>
                </View>
                <View style={styles.gameStatItem}>
                  <Text style={[styles.gameStatValue, { color: theme.colors.text }]}>
                    {MOCK_CURRENT_GAME.activeMissions}
                  </Text>
                  <Text style={[styles.gameStatLabel, { color: theme.colors.textSecondary }]}>
                    진행중인 임무
                  </Text>
                </View>
                <View style={styles.gameStatItem}>
                  <Text style={[styles.gameStatValue, { color: theme.colors.text }]}>
                    {MOCK_CURRENT_GAME.playerStatus}
                  </Text>
                  <Text style={[styles.gameStatLabel, { color: theme.colors.textSecondary }]}>
                    상태
                  </Text>
                </View>
              </View>
              
              {/* 현재 진행중인 메인 임무 */}
              <View style={styles.mainMissionContainer}>
                <View style={styles.mainMissionHeader}>
                  <View style={[styles.mainMissionIcon, { backgroundColor: theme.colors.primary }]}>
                    <Icon name="target" size={16} color="#FFFFFF" />
                  </View>
                  <Text style={[styles.mainMissionLabel, { color: theme.colors.textSecondary }]}>
                    현재 진행중인 메인 임무
                  </Text>
                </View>
                <Text style={[styles.mainMissionText, { color: theme.colors.text }]}>
                  {MOCK_CURRENT_GAME.currentMainMission}
                </Text>
              </View>
              
              {/* 게임 정보 */}
              <View style={styles.gameInfoContainer}>
                <View style={styles.gameInfoGrid}>
                  <View style={styles.gameInfoItem}>
                    <View style={[styles.gameInfoIcon, { backgroundColor: theme.colors.elevated }]}>
                      <Icon name="map-marker" size={16} color={theme.colors.text} />
                    </View>
                    <View style={styles.gameInfoContent}>
                      <Text style={[styles.gameInfoLabel, { color: theme.colors.textSecondary }]}>
                        현재 위치
                      </Text>
                      <Text style={[styles.gameInfoValue, { color: theme.colors.text }]}>
                        {MOCK_CURRENT_GAME.location}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.gameInfoItem}>
                    <View style={[styles.gameInfoIcon, { backgroundColor: theme.colors.elevated }]}>
                      <Icon name="clock-outline" size={16} color={theme.colors.text} />
                    </View>
                    <View style={styles.gameInfoContent}>
                      <Text style={[styles.gameInfoLabel, { color: theme.colors.textSecondary }]}>
                        마지막 플레이
                      </Text>
                      <Text style={[styles.gameInfoValue, { color: theme.colors.text }]}>
                        {MOCK_CURRENT_GAME.lastPlayed}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.gameInfoItem}>
                    <View style={[styles.gameInfoIcon, { backgroundColor: theme.colors.elevated }]}>
                      <Icon name="timer-outline" size={16} color={theme.colors.text} />
                    </View>
                    <View style={styles.gameInfoContent}>
                      <Text style={[styles.gameInfoLabel, { color: theme.colors.textSecondary }]}>
                        총 플레이 시간
                      </Text>
                      <Text style={[styles.gameInfoValue, { color: theme.colors.text }]}>
                        {MOCK_CURRENT_GAME.duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* 게임 계속하기 버튼 */}
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  { backgroundColor: theme.colors.primary }
                ]}
                onPress={handleContinueGame}
                activeOpacity={0.8}
              >
                <Text style={[styles.continueButtonText, { color: '#FFFFFF' }]}>
                  게임 계속하기
                </Text>
              </TouchableOpacity>
            </GlassmorphismCard>
          )}



          {/* 새로운 모험 시작하기 버튼 */}
          <TouchableOpacity
            style={[
              styles.startGameButton,
              { backgroundColor: theme.colors.primary }
            ]}
            onPress={handleStartNewGame}
            activeOpacity={0.8}
          >
            <Text style={[styles.startGameButtonText, { color: '#FFFFFF' }]}>
              새로운 모험 시작하기
            </Text>
          </TouchableOpacity>

        </ScrollView>

        {/* 하단 네비게이션 바 */}
        <View style={[styles.bottomNav, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.bottomNavContent}>
            <TouchableOpacity style={styles.bottomNavItem} onPress={handleOpenEncyclopedia}>
              <View style={[styles.bottomNavIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="book-open-variant" size={24} color={theme.colors.text} />
              </View>
              <Text style={[styles.bottomNavText, { color: theme.colors.text }]}>도감</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={handleOpenStore}>
              <View style={[styles.bottomNavIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="store" size={24} color={theme.colors.text} />
              </View>
              <Text style={[styles.bottomNavText, { color: theme.colors.text }]}>스토어</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={handleOpenLibrary}>
              <View style={[styles.bottomNavIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="bookmark-multiple" size={24} color={theme.colors.text} />
              </View>
              <Text style={[styles.bottomNavText, { color: theme.colors.text }]}>서재</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={handleOpenMyPage}>
              <View style={[styles.bottomNavIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="account-outline" size={24} color={theme.colors.text} />
              </View>
              <Text style={[styles.bottomNavText, { color: theme.colors.text }]}>내 정보</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </GlassmorphismBackground>
  );
};

// 6. 컴포넌트 내보내기
export default HomeScreen; 