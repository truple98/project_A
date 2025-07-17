// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// 4. 상수 및 유틸리티 변수 정의
const { width } = Dimensions.get('window');

// 5. 메인 스크린 컴포넌트 함수 정의
const HomeScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.3. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleStartNewGame = useCallback(() => {
    navigation.navigate('GameStart');
  }, [navigation]);

  const handleViewCharacter = useCallback(() => {
    navigation.navigate('Character');
  }, [navigation]);

  const handleViewHistory = useCallback(() => {
    navigation.navigate('History');
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  // 5.5. JSX 반환
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        {/* 헤더 */}
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.15}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>안녕하세요</Text>
              <Text style={[styles.username, { color: theme.colors.text }]}>모험가님</Text>
              <View style={styles.greetingIcon}>
                <Icon
                  name="lightning-bolt-outline"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.profileButton, { backgroundColor: theme.colors.elevated }]}
              onPress={handleOpenSettings}
            >
              <Icon
                name="cog-outline"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </GlassmorphismCard>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 오늘의 진행 상황 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>오늘의 진행 상황</Text>
            <View style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.progressSteps}>
                <View style={[styles.progressStep, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.stepIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="check"
                      size={16}
                      color={theme.colors.success}
                    />
                  </View>
                  <Text style={[styles.stepText, { color: theme.colors.text }]}>캐릭터 생성 완료</Text>
                </View>
                <View style={[styles.progressStep, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.stepIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="plus-circle-outline"
                      size={16}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                  <Text style={[styles.stepText, { color: theme.colors.text }]}>첫 번째 시나리오 시작하기</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 통계 카드들 */}
          <View style={styles.section}>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>15</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>레벨</Text>
                <Text style={[styles.statChange, { color: theme.colors.success }]}>+2</Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>127</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>퀘스트</Text>
                <Text style={[styles.statChange, { color: theme.colors.success }]}>+7</Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>89</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>승리</Text>
                <Text style={[styles.statChange, { color: theme.colors.success }]}>+12</Text>
              </View>
            </View>
          </View>

          {/* 빠른 메뉴 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>빠른 메뉴</Text>
            <View style={styles.menuGrid}>
              <TouchableOpacity onPress={handleStartNewGame}>
                <View style={[styles.menuItem, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="play-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </View>
                  <Text style={[styles.menuTitle, { color: theme.colors.text }]}>새 게임</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleViewCharacter}>
                <View style={[styles.menuItem, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="account-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </View>
                  <Text style={[styles.menuTitle, { color: theme.colors.text }]}>캐릭터</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleViewHistory}>
                <View style={[styles.menuItem, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="history"
                      size={24}
                      color={theme.colors.text}
                    />
                  </View>
                  <Text style={[styles.menuTitle, { color: theme.colors.text }]}>기록</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOpenSettings}>
                <View style={[styles.menuItem, { backgroundColor: theme.colors.card }]}>
                  <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                    <Icon
                      name="cog-outline"
                      size={24}
                      color={theme.colors.text}
                    />
                  </View>
                  <Text style={[styles.menuTitle, { color: theme.colors.text }]}>설정</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 게임 시작 버튼 */}
          <Button 
            onPress={handleStartNewGame}
            mode="contained"
            style={[styles.startGameButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={[styles.startGameButtonLabel, { color: '#ffffff' }]}
          >
            새로운 모험 시작하기
          </Button>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. 스타일 정의 (컴포넌트 함수 외부에 StyleSheet.create로 선언)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  greetingIcon: {
    marginTop: 8,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  scrollContent: {
    paddingHorizontal: 20,
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
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  progressSteps: {
    gap: 12,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: (width - 64) / 2,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  startGameButton: {
    borderRadius: 16,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  startGameButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

// 7. 컴포넌트 내보내기
export default HomeScreen; 