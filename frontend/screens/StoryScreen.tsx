import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ConsequenceType } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

const StoryScreen = () => {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { mode } = useTheme();
  
  const [currentStory, setCurrentStory] = useState({
    id: 'start',
    title: '모험의 시작',
    content: '당신은 어둠 속에서 깨어났습니다. 주변을 둘러보니 낯선 숲 속에 있습니다. 멀리서 이상한 빛이 보입니다.',
    choices: [
      { id: 'investigate', text: '빛을 조사한다', consequence: { type: ConsequenceType.HEALTH, value: -5 } },
      { id: 'avoid', text: '다른 길을 찾는다', consequence: { type: ConsequenceType.MANA, value: -3 } },
      { id: 'rest', text: '잠시 휴식을 취한다', consequence: { type: ConsequenceType.HEALTH, value: 10 } },
    ],
  });

  const [characterStats, setCharacterStats] = useState({
    level: 1,
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 80,
  });

  const [consequences, setConsequences] = useState<{ type: ConsequenceType; value: number }[]>([]);

  useEffect(() => {
    const nodeId = route.params?.nodeId;
    if (nodeId) {
      // TODO: 실제 스토리 데이터 로드
    }
  }, [route.params]);

  const handleChoice = async (choiceId: string) => {
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
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getHealthPercentage = () => characterStats.health / characterStats.maxHealth;
  const getManaPercentage = () => characterStats.mana / characterStats.maxMana;

  const getConsequenceText = (type: ConsequenceType, value: number) => {
    const sign = value > 0 ? '+' : '';
    switch (type) {
      case ConsequenceType.HEALTH:
        return `체력 ${sign}${value}`;
      case ConsequenceType.MANA:
        return `마나 ${sign}${value}`;
      default:
        return '';
    }
  };

  const getConsequenceColor = (value: number) => {
    if (value > 0) {
      return mode === 'dark' ? '#66BB6A' : '#4CAF50';
    } else if (value < 0) {
      return mode === 'dark' ? '#EF5350' : '#F44336';
    }
    return mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)';
  };

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
    statsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    statsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.3,
    },
    level: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#5A9FFF' : '#4285F4',
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
      fontSize: 16,
      fontWeight: '500',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      minWidth: 60,
      letterSpacing: -0.2,
    },
    statBar: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      overflow: 'hidden',
      marginHorizontal: 12,
    },
    statFill: {
      height: '100%',
      borderRadius: 4,
    },
    statValue: {
      fontSize: 14,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      minWidth: 60,
      textAlign: 'right',
      letterSpacing: -0.1,
    },
    storyCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 24,
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
    storyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    storyContent: {
      fontSize: 16,
      lineHeight: 24,
      color: mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
      letterSpacing: -0.2,
    },
    choicesContainer: {
      marginTop: 24,
    },
    choicesTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    choicesGrid: {
      gap: 12,
    },
    choiceCard: {
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
    choiceText: {
      fontSize: 16,
      fontWeight: '500',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    choiceConsequence: {
      fontSize: 14,
      fontWeight: '500',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      alignSelf: 'flex-start',
      letterSpacing: -0.1,
    },
    consequencesCard: {
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
    consequencesTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    consequencesList: {
      gap: 8,
    },
    consequenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 8,
      padding: 12,
    },
    consequenceIcon: {
      marginRight: 8,
    },
    consequenceText: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32,
    },
    emptyStateText: {
      fontSize: 16,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: -0.2,
    },
  });

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
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <Text style={styles.statsTitle}>캐릭터 상태</Text>
                <Text style={styles.level}>레벨 {characterStats.level}</Text>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>체력</Text>
                  <View style={styles.statBar}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#EF5350' : '#F44336',
                        width: `${getHealthPercentage() * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={styles.statValue}>
                    {characterStats.health}/{characterStats.maxHealth}
                  </Text>
                </View>
                
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>마나</Text>
                  <View style={styles.statBar}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
                        width: `${getManaPercentage() * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={styles.statValue}>
                    {characterStats.mana}/{characterStats.maxMana}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 스토리 내용 */}
          <View style={styles.section}>
            <View style={styles.storyCard}>
              <Text style={styles.storyTitle}>{currentStory.title}</Text>
              <Text style={styles.storyContent}>{currentStory.content}</Text>
              
              <View style={styles.choicesContainer}>
                <Text style={styles.choicesTitle}>선택지</Text>
                <View style={styles.choicesGrid}>
                  {currentStory.choices.map((choice) => (
                    <TouchableOpacity
                      key={choice.id}
                      style={styles.choiceCard}
                      onPress={() => handleChoice(choice.id)}
                    >
                      <Text style={styles.choiceText}>{choice.text}</Text>
                      {choice.consequence && (
                        <Text style={[
                          styles.choiceConsequence,
                          { 
                            color: getConsequenceColor(choice.consequence.value),
                            backgroundColor: getConsequenceColor(choice.consequence.value) + '20'
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
            <View style={styles.consequencesCard}>
              <Text style={styles.consequencesTitle}>행동 결과</Text>
              {consequences.length > 0 ? (
                <View style={styles.consequencesList}>
                  {consequences.map((consequence, index) => (
                    <View key={index} style={styles.consequenceItem}>
                      <View style={styles.consequenceIcon}>
                        <Icon
                          name={consequence.type === ConsequenceType.HEALTH ? 'heart' : 'flash'}
                          size={16}
                          color={getConsequenceColor(consequence.value)}
                        />
                      </View>
                      <Text style={[
                        styles.consequenceText,
                        { color: getConsequenceColor(consequence.value) }
                      ]}>
                        {getConsequenceText(consequence.type, consequence.value)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>아직 선택한 행동이 없습니다</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default StoryScreen; 