import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, mode } = useTheme();

  const handleStartNewGame = () => {
    navigation.navigate('GameStart');
  };

  const handleViewCharacter = () => {
    navigation.navigate('Character');
  };

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings');
  };

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
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    username: {
      fontSize: 28,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
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
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
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
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    progressCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 20,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    progressHeader: {
      marginBottom: 16,
    },
    progressTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.3,
    },
    progressSteps: {
      gap: 12,
    },
    progressStep: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
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
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
    },
    stepText: {
      fontSize: 16,
      fontWeight: '500',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    statsGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 8,
    },
    statCard: {
      flex: 1,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
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
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 2,
      letterSpacing: -0.1,
    },
    statChange: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4CAF50',
      letterSpacing: -0.1,
    },
    menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    menuItem: {
      width: (Dimensions.get('window').width - 64) / 2,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
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
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    startGameButton: {
      backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
      borderRadius: 16,
      marginTop: 8,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    startGameButtonLabel: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
  });

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
              <Text style={styles.greeting}>안녕하세요</Text>
              <Text style={styles.username}>모험가님</Text>
              <View style={styles.greetingIcon}>
                <Icon
                  name="lightning-bolt-outline"
                  size={20}
                  color={mode === 'dark' ? '#ffffff' : '#000000'}
                />
              </View>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={handleOpenSettings}
            >
              <Icon
                name="cog-outline"
                size={20}
                color={mode === 'dark' ? '#ffffff' : '#000000'}
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
            <Text style={styles.sectionTitle}>오늘의 진행 상황</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressSteps}>
                <View style={styles.progressStep}>
                  <View style={styles.stepIcon}>
                    <Icon
                      name="check"
                      size={16}
                      color={mode === 'dark' ? '#4CAF50' : '#4CAF50'}
                    />
                  </View>
                  <Text style={styles.stepText}>캐릭터 생성 완료</Text>
                </View>
                <View style={styles.progressStep}>
                  <View style={styles.stepIcon}>
                    <Icon
                      name="plus-circle-outline"
                      size={16}
                      color={mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'}
                    />
                  </View>
                  <Text style={styles.stepText}>첫 번째 시나리오 시작하기</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 통계 카드들 */}
          <View style={styles.section}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>15</Text>
                <Text style={styles.statLabel}>레벨</Text>
                <Text style={styles.statChange}>+2</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>127</Text>
                <Text style={styles.statLabel}>퀘스트</Text>
                <Text style={styles.statChange}>+7</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>89</Text>
                <Text style={styles.statLabel}>승리</Text>
                <Text style={styles.statChange}>+12</Text>
              </View>
            </View>
          </View>

          {/* 빠른 메뉴 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>빠른 메뉴</Text>
            <View style={styles.menuGrid}>
              <TouchableOpacity onPress={handleStartNewGame}>
                <View style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <Icon
                      name="play-outline"
                      size={24}
                      color={mode === 'dark' ? '#ffffff' : '#000000'}
                    />
                  </View>
                  <Text style={styles.menuTitle}>새 게임</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleViewCharacter}>
                <View style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <Icon
                      name="account-outline"
                      size={24}
                      color={mode === 'dark' ? '#ffffff' : '#000000'}
                    />
                  </View>
                  <Text style={styles.menuTitle}>캐릭터</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleViewHistory}>
                <View style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <Icon
                      name="history"
                      size={24}
                      color={mode === 'dark' ? '#ffffff' : '#000000'}
                    />
                  </View>
                  <Text style={styles.menuTitle}>기록</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOpenSettings}>
                <View style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <Icon
                      name="cog-outline"
                      size={24}
                      color={mode === 'dark' ? '#ffffff' : '#000000'}
                    />
                  </View>
                  <Text style={styles.menuTitle}>설정</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 게임 시작 버튼 */}
          <Button 
            onPress={handleStartNewGame}
            mode="contained"
            style={styles.startGameButton}
            labelStyle={styles.startGameButtonLabel}
          >
            새로운 모험 시작하기
          </Button>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default HomeScreen; 