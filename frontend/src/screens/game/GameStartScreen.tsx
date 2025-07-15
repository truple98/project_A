// 1. React/External imports
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. Internal imports
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface CharacterClass {
  id: string;
  name: string;
  icon: string;
  description: string;
  stats: {
    hp: string;
    mp: string;
    atk: string;
  };
}

interface Difficulty {
  id: string;
  name: string;
  description: string;
  color: string;
}

type GameStartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameStart'>;

// 4. Constants
const CHARACTER_CLASSES: CharacterClass[] = [
  { 
    id: 'warrior', 
    name: '전사', 
    icon: 'sword', 
    description: '강력한 근접 전투사', 
    stats: { hp: '+20', mp: '+5', atk: '+15' } 
  },
  { 
    id: 'mage', 
    name: '마법사', 
    icon: 'auto-fix', 
    description: '강력한 마법 사용자', 
    stats: { hp: '+5', mp: '+20', atk: '+10' } 
  },
  { 
    id: 'archer', 
    name: '궁수', 
    icon: 'bow-arrow', 
    description: '정확한 원거리 공격수', 
    stats: { hp: '+10', mp: '+10', atk: '+12' } 
  },
  { 
    id: 'rogue', 
    name: '도적', 
    icon: 'knife', 
    description: '은밀한 암살자', 
    stats: { hp: '+8', mp: '+12', atk: '+20' } 
  },
];

const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', name: '쉬움', description: '편안한 게임플레이', color: '#4CAF50' },
  { id: 'normal', name: '보통', description: '균형잡힌 도전', color: '#f0ad4e' },
  { id: 'hard', name: '어려움', description: '강력한 도전', color: '#d9534f' },
];

// 5. Component
const GameStartScreen = () => {
  // 5.1 Hooks
  const navigation = useNavigation<GameStartScreenNavigationProp>();
  const { theme, mode } = useTheme();
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);

  // 5.2 Data/Computed values
  const getSelectedClass = useCallback(() => 
    CHARACTER_CLASSES.find(c => c.id === selectedClass), 
    [selectedClass]
  );

  const getSelectedDifficulty = useCallback(() => 
    DIFFICULTIES.find(d => d.id === selectedDifficulty), 
    [selectedDifficulty]
  );

  // 5.3 Event handlers
  const handleStartGame = useCallback(async () => {
    if (!characterName.trim()) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Story', { nodeId: 'start' });
    }, 2000);
  }, [characterName, navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleClassSelect = useCallback((classId: string) => {
    setSelectedClass(classId);
  }, []);

  const handleDifficultySelect = useCallback((difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
  }, []);

  const handleCharacterNameChange = useCallback((text: string) => {
    setCharacterName(text);
  }, []);

  // 5.5 JSX Return
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
              style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
              onPress={handleBack}
            >
              <Text style={[styles.backButtonText, { color: theme.colors.text }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>새 게임 시작</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 캐릭터 이름 입력 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>캐릭터 이름</Text>
            <View style={[styles.nameInputCard, { backgroundColor: theme.colors.surface }]}>
              <TextInput
                value={characterName}
                onChangeText={handleCharacterNameChange}
                placeholder="캐릭터 이름을 입력하세요"
                placeholderTextColor={theme.colors.textSecondary}
                style={[styles.nameInput, { backgroundColor: theme.colors.elevation1 }]}
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
                textColor={theme.colors.text}
                maxLength={20}
              />
            </View>
          </View>

          {/* 클래스 선택 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>클래스 선택</Text>
            <View style={styles.classGrid}>
              {CHARACTER_CLASSES.map((classItem) => (
                <TouchableOpacity
                  key={classItem.id}
                  onPress={() => handleClassSelect(classItem.id)}
                >
                                     <View style={[
                     styles.classCard,
                     { backgroundColor: theme.colors.surface },
                     selectedClass === classItem.id && [
                       styles.selectedClassCard,
                       { 
                         backgroundColor: theme.colors.elevation2,
                         borderColor: theme.colors.primary 
                       }
                     ]
                   ]}>
                     <View style={styles.classHeader}>
                       <View style={[styles.classIcon, { backgroundColor: theme.colors.elevation1 }]}>
                         <Icon
                           name={classItem.icon}
                           size={24}
                           color={theme.colors.text}
                         />
                       </View>
                       <View style={styles.classInfo}>
                         <Text style={[styles.className, { color: theme.colors.text }]}>
                           {classItem.name}
                         </Text>
                         <Text style={[styles.classDescription, { color: theme.colors.textSecondary }]}>
                           {classItem.description}
                         </Text>
                       </View>
                     </View>
                     <View style={[styles.classStats, { backgroundColor: theme.colors.elevation1 }]}>
                       <View style={styles.statItem}>
                         <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>HP</Text>
                         <Text style={[styles.statValue, { color: theme.colors.text }]}>
                           {classItem.stats.hp}
                         </Text>
                       </View>
                       <View style={styles.statItem}>
                         <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>MP</Text>
                         <Text style={[styles.statValue, { color: theme.colors.text }]}>
                           {classItem.stats.mp}
                         </Text>
                       </View>
                       <View style={styles.statItem}>
                         <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>공격</Text>
                         <Text style={[styles.statValue, { color: theme.colors.text }]}>
                           {classItem.stats.atk}
                         </Text>
                       </View>
                     </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 난이도 선택 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>난이도</Text>
            <View style={styles.difficultyGrid}>
              {DIFFICULTIES.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty.id}
                  onPress={() => handleDifficultySelect(difficulty.id)}
                >
                  <View style={[
                    styles.difficultyCard,
                    { backgroundColor: theme.colors.surface },
                    selectedDifficulty === difficulty.id && [
                      styles.selectedDifficultyCard,
                      { 
                        backgroundColor: theme.colors.elevation2,
                        borderColor: theme.colors.primary 
                      }
                    ]
                  ]}>
                    <View style={styles.difficultyHeader}>
                      <View style={[
                        styles.difficultyColorDot,
                        { backgroundColor: difficulty.color }
                      ]} />
                      <Text style={[styles.difficultyName, { color: theme.colors.text }]}>
                        {difficulty.name}
                      </Text>
                    </View>
                    <Text style={[styles.difficultyDescription, { color: theme.colors.textSecondary }]}>
                      {difficulty.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 요약 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>게임 요약</Text>
            <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>캐릭터 이름</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                  {characterName || '미입력'}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>클래스</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                  {getSelectedClass()?.name}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>난이도</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                  {getSelectedDifficulty()?.name}
                </Text>
              </View>
            </View>
          </View>

          {/* 게임 시작 버튼 */}
          <Button
            onPress={handleStartGame}
            mode="contained"
            loading={isLoading}
            disabled={!characterName.trim() || isLoading}
            style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={[styles.startButtonLabel, { color: '#ffffff' }]}
          >
            {isLoading ? '게임을 시작하고 있습니다...' : '모험 시작하기'}
          </Button>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. Styles
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
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
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
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  nameInputCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nameInput: {
    borderRadius: 12,
  },
  classGrid: {
    gap: 12,
  },
  classCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedClassCard: {
    borderWidth: 2,
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
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  classDescription: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  classStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  difficultyGrid: {
    gap: 12,
  },
  difficultyCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedDifficultyCard: {
    borderWidth: 2,
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
    letterSpacing: -0.3,
  },
  difficultyDescription: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
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
    letterSpacing: -0.2,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  startButton: {
    borderRadius: 16,
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  startButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

// 7. Export
export default GameStartScreen; 