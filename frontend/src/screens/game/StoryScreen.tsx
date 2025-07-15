import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, ConsequenceType } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { ScreenHeader } from '../../src/components/ScreenHeader';

// TypeScript Interfaces
interface StoryChoice {
  id: string;
  text: string;
  consequence?: {
    type: ConsequenceType;
    value: number;
  };
}

interface StoryData {
  id: string;
  title: string;
  content: string;
  choices: StoryChoice[];
}

interface CharacterStats {
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
}

interface ConsequenceResult {
  type: ConsequenceType;
  value: number;
}

type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

// Constants
const INITIAL_STORY_DATA: StoryData = {
  id: 'start',
  title: '모험의 시작',
  content: '당신은 어둠 속에서 깨어났습니다. 주변을 둘러보니 낯선 숲 속에 있습니다. 멀리서 이상한 빛이 보입니다.',
  choices: [
    { id: 'investigate', text: '빛을 조사한다', consequence: { type: ConsequenceType.HEALTH, value: -5 } },
    { id: 'avoid', text: '다른 길을 찾는다', consequence: { type: ConsequenceType.MANA, value: -3 } },
    { id: 'rest', text: '잠시 휴식을 취한다', consequence: { type: ConsequenceType.HEALTH, value: 10 } },
  ],
};

const INITIAL_CHARACTER_STATS: CharacterStats = {
  level: 1,
  health: 85,
  maxHealth: 100,
  mana: 60,
  maxMana: 80,
};

const CONSEQUENCE_LABELS = {
  [ConsequenceType.HEALTH]: '체력',
  [ConsequenceType.MANA]: '마나',
  [ConsequenceType.EXPERIENCE]: '경험치',
  [ConsequenceType.TRAIT]: '특성',
  [ConsequenceType.ITEM]: '아이템',
} as const;

const CONSEQUENCE_ICONS = {
  [ConsequenceType.HEALTH]: 'heart',
  [ConsequenceType.MANA]: 'flash',
  [ConsequenceType.EXPERIENCE]: 'star',
  [ConsequenceType.TRAIT]: 'account',
  [ConsequenceType.ITEM]: 'package-variant',
} as const;

// Utility functions
const getConsequenceText = (type: ConsequenceType, value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${CONSEQUENCE_LABELS[type]} ${sign}${value}`;
};

const getConsequenceColor = (value: number, mode: string): string => {
  if (value > 0) {
    return mode === 'dark' ? '#66BB6A' : '#4CAF50';
  } else if (value < 0) {
    return mode === 'dark' ? '#EF5350' : '#F44336';
  }
  return mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)';
};

const StoryScreen = () => {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { theme, mode } = useTheme();
  
  // 5.1 Hooks
  const [currentStory, setCurrentStory] = useState<StoryData>(INITIAL_STORY_DATA);
  const [characterStats, setCharacterStats] = useState<CharacterStats>(INITIAL_CHARACTER_STATS);
  const [consequences, setConsequences] = useState<ConsequenceResult[]>([]);

  // 5.2 Data/mock data
  const healthPercentage = useMemo(() => characterStats.health / characterStats.maxHealth, [characterStats.health, characterStats.maxHealth]);
  const manaPercentage = useMemo(() => characterStats.mana / characterStats.maxMana, [characterStats.mana, characterStats.maxMana]);

  // 5.3 Event handlers with useCallback
  const handleChoice = useCallback(async (choiceId: string) => {
    const choice = currentStory.choices.find(c => c.id === choiceId);
    if (choice && choice.consequence) {
      const newConsequences = [...consequences, choice.consequence];
      setConsequences(newConsequences);

      // 능력치 업데이트
      const newStats = { ...characterStats };
      switch (choice.consequence.type) {
        case ConsequenceType.HEALTH:
          newStats.health = Math.min(newStats.maxHealth, Math.max(0, newStats.health + choice.consequence.value));
          break;
        case ConsequenceType.MANA:
          newStats.mana = Math.min(newStats.maxMana, Math.max(0, newStats.mana + choice.consequence.value));
          break;
      }
      setCharacterStats(newStats);
    }

    // TODO: 다음 스토리 노드로 이동
  }, [currentStory.choices, consequences, characterStats]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 5.4 useEffect
  useEffect(() => {
    const nodeId = route.params?.nodeId;
    if (nodeId) {
      // TODO: 실제 스토리 데이터 로드
    }
  }, [route.params]);

  // 5.5 JSX return
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="스토리" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 캐릭터 상태 */}
          <View style={styles.section}>
            <View style={[
              styles.statsCard,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <View style={styles.statsHeader}>
                <Text style={[
                  styles.statsTitle,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.lg,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>캐릭터 상태</Text>
                <Text style={[
                  styles.level,
                  { 
                    color: theme.colors.primary,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>레벨 {characterStats.level}</Text>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statRow}>
                  <Text style={[
                    styles.statLabel,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.medium,
                    }
                  ]}>체력</Text>
                  <View style={[
                    styles.statBar,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#EF5350' : '#F44336',
                        width: `${healthPercentage * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>
                    {characterStats.health}/{characterStats.maxHealth}
                  </Text>
                </View>
                
                <View style={styles.statRow}>
                  <Text style={[
                    styles.statLabel,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.medium,
                    }
                  ]}>마나</Text>
                  <View style={[
                    styles.statBar,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: theme.colors.primary,
                        width: `${manaPercentage * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>
                    {characterStats.mana}/{characterStats.maxMana}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 스토리 내용 */}
          <View style={styles.section}>
            <View style={[
              styles.storyCard,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <Text style={[
                styles.storyTitle,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.xl,
                  fontWeight: theme.typography.weights.bold,
                }
              ]}>{currentStory.title}</Text>
              <Text style={[
                styles.storyContent,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>{currentStory.content}</Text>
              
              <View style={styles.choicesContainer}>
                <Text style={[
                  styles.choicesTitle,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.lg,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>선택지</Text>
                <View style={styles.choicesGrid}>
                  {currentStory.choices.map((choice) => (
                    <TouchableOpacity
                      key={choice.id}
                      style={[
                        styles.choiceCard,
                        { backgroundColor: theme.colors.surface }
                      ]}
                      onPress={() => handleChoice(choice.id)}
                    >
                      <Text style={[
                        styles.choiceText,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>{choice.text}</Text>
                      {choice.consequence && (
                        <Text style={[
                          styles.choiceConsequence,
                          { 
                            color: getConsequenceColor(choice.consequence.value, mode),
                            backgroundColor: getConsequenceColor(choice.consequence.value, mode) + '20',
                            fontSize: theme.typography.sizes.sm,
                            fontWeight: theme.typography.weights.medium,
                          }
                        ]}>
                          {getConsequenceText(choice.consequence.type, choice.consequence.value)}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* 결과 기록 */}
          <View style={styles.section}>
            <View style={[
              styles.consequencesCard,
              { backgroundColor: theme.colors.surface }
            ]}>
              <Text style={[
                styles.consequencesTitle,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>행동 결과</Text>
              {consequences.length > 0 ? (
                <View style={styles.consequencesList}>
                  {consequences.map((consequence, index) => (
                    <View key={index} style={[
                      styles.consequenceItem,
                      { backgroundColor: theme.colors.elevation1 }
                    ]}>
                      <View style={styles.consequenceIcon}>
                        <Icon
                          name={CONSEQUENCE_ICONS[consequence.type]}
                          size={16}
                          color={getConsequenceColor(consequence.value, mode)}
                        />
                      </View>
                      <Text style={[
                        styles.consequenceText,
                        { 
                          color: getConsequenceColor(consequence.value, mode),
                          fontSize: theme.typography.sizes.sm,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>
                        {getConsequenceText(consequence.type, consequence.value)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={[
                    styles.emptyStateText,
                    { 
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}>아직 선택한 행동이 없습니다</Text>
                </View>
              )}
            </View>
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
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    letterSpacing: -0.3,
  },
  level: {
    letterSpacing: -0.2,
  },
  statsGrid: {
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    minWidth: 60,
    letterSpacing: -0.2,
  },
  statBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  statFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    minWidth: 60,
    textAlign: 'right',
    letterSpacing: -0.1,
  },
  storyCard: {
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  storyTitle: {
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  storyContent: {
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  choicesContainer: {
    marginTop: 24,
  },
  choicesTitle: {
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  choicesGrid: {
    gap: 12,
  },
  choiceCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  choiceText: {
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  choiceConsequence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    letterSpacing: -0.1,
  },
  consequencesCard: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  consequencesTitle: {
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  consequencesList: {
    gap: 8,
  },
  consequenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
  },
  consequenceIcon: {
    marginRight: 8,
  },
  consequenceText: {
    letterSpacing: -0.1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    letterSpacing: -0.2,
  },
});

export default StoryScreen; 