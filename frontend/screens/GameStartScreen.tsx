import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GameStartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameStart'>;

const GameStartScreen = () => {
  const navigation = useNavigation<GameStartScreenNavigationProp>();
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const { theme, mode } = useTheme();

  const classes = [
    { id: 'warrior', name: '전사', icon: 'sword', description: '강력한 근접 전투사', stats: { hp: '+20', mp: '+5', atk: '+15' } },
    { id: 'mage', name: '마법사', icon: 'auto-fix', description: '강력한 마법 사용자', stats: { hp: '+5', mp: '+20', atk: '+10' } },
    { id: 'archer', name: '궁수', icon: 'bow-arrow', description: '정확한 원거리 공격수', stats: { hp: '+10', mp: '+10', atk: '+12' } },
    { id: 'rogue', name: '도적', icon: 'knife', description: '은밀한 암살자', stats: { hp: '+8', mp: '+12', atk: '+20' } },
  ];

  const difficulties = [
    { id: 'easy', name: '쉬움', description: '편안한 게임플레이', color: '#4CAF50' },
    { id: 'normal', name: '보통', description: '균형잡힌 도전', color: '#f0ad4e' },
    { id: 'hard', name: '어려움', description: '강력한 도전', color: '#d9534f' },
  ];

  const handleStartGame = async () => {
    if (!characterName.trim()) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Story', { nodeId: 'start' });
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getSelectedClass = () => classes.find(c => c.id === selectedClass);
  const getSelectedDifficulty = () => difficulties.find(d => d.id === selectedDifficulty);

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
    backButton: {
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
    backButtonText: {
      fontSize: 20,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.5,
    },
    placeholder: {
      width: 48,
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
    nameInputCard: {
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
    nameInput: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
    },
    classGrid: {
      gap: 12,
    },
    classCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 20,
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
    selectedClassCard: {
      backgroundColor: mode === 'dark' ? 'rgba(90,159,255,0.2)' : 'rgba(66,133,244,0.15)',
      borderWidth: 2,
      borderColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
    },
    classHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    classIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
    },
    classInfo: {
      flex: 1,
    },
    className: {
      fontSize: 20,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 4,
      letterSpacing: -0.3,
    },
    classDescription: {
      fontSize: 14,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: -0.1,
    },
    classStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      padding: 12,
    },
    statItem: {
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 12,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    difficultyGrid: {
      gap: 12,
    },
    difficultyCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 20,
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
    selectedDifficultyCard: {
      backgroundColor: mode === 'dark' ? 'rgba(90,159,255,0.2)' : 'rgba(66,133,244,0.15)',
      borderWidth: 2,
      borderColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
    },
    difficultyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    difficultyColorDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 12,
    },
    difficultyName: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.3,
    },
    difficultyDescription: {
      fontSize: 14,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: -0.1,
    },
    summaryCard: {
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
    summaryTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    summaryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 16,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: -0.2,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.2,
    },
    startButton: {
      backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
      borderRadius: 16,
      marginTop: 24,
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
    startButtonLabel: {
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>새 게임 시작</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 캐릭터 이름 입력 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>캐릭터 이름</Text>
            <View style={styles.nameInputCard}>
              <TextInput
                value={characterName}
                onChangeText={setCharacterName}
                placeholder="캐릭터 이름을 입력하세요"
                placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                style={styles.nameInput}
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
                textColor={mode === 'dark' ? '#ffffff' : '#000000'}
                maxLength={20}
              />
            </View>
          </View>

          {/* 클래스 선택 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>클래스 선택</Text>
            <View style={styles.classGrid}>
              {classes.map((classItem) => (
                <TouchableOpacity
                  key={classItem.id}
                  onPress={() => setSelectedClass(classItem.id)}
                >
                  <View style={[
                    styles.classCard,
                    selectedClass === classItem.id && styles.selectedClassCard
                  ]}>
                    <View style={styles.classHeader}>
                      <View style={styles.classIcon}>
                        <Icon
                          name={classItem.icon}
                          size={24}
                          color={mode === 'dark' ? '#ffffff' : '#000000'}
                        />
                      </View>
                      <View style={styles.classInfo}>
                        <Text style={styles.className}>{classItem.name}</Text>
                        <Text style={styles.classDescription}>{classItem.description}</Text>
                      </View>
                    </View>
                    <View style={styles.classStats}>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>HP</Text>
                        <Text style={styles.statValue}>{classItem.stats.hp}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>MP</Text>
                        <Text style={styles.statValue}>{classItem.stats.mp}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statLabel}>공격</Text>
                        <Text style={styles.statValue}>{classItem.stats.atk}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 난이도 선택 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>난이도</Text>
            <View style={styles.difficultyGrid}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty.id}
                  onPress={() => setSelectedDifficulty(difficulty.id)}
                >
                  <View style={[
                    styles.difficultyCard,
                    selectedDifficulty === difficulty.id && styles.selectedDifficultyCard
                  ]}>
                    <View style={styles.difficultyHeader}>
                      <View style={[
                        styles.difficultyColorDot,
                        { backgroundColor: difficulty.color }
                      ]} />
                      <Text style={styles.difficultyName}>{difficulty.name}</Text>
                    </View>
                    <Text style={styles.difficultyDescription}>{difficulty.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 요약 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>게임 요약</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>캐릭터 이름</Text>
                <Text style={styles.summaryValue}>{characterName || '미입력'}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>클래스</Text>
                <Text style={styles.summaryValue}>{getSelectedClass()?.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>난이도</Text>
                <Text style={styles.summaryValue}>{getSelectedDifficulty()?.name}</Text>
              </View>
            </View>
          </View>

          {/* 게임 시작 버튼 */}
          <Button
            onPress={handleStartGame}
            mode="contained"
            loading={isLoading}
            disabled={!characterName.trim() || isLoading}
            style={styles.startButton}
            labelStyle={styles.startButtonLabel}
          >
            {isLoading ? '게임을 시작하고 있습니다...' : '모험 시작하기'}
          </Button>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default GameStartScreen; 