import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, ConsequenceType } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import SideMenu from '../../components/common/SideMenu';
import GameInfoModal from '../../components/common/GameInfoModal';

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
  daysPassed: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  motivation: number;
  maxMotivation: number;
  stress: number;
  maxStress: number;
}



interface PlayerInfo {
  name: string;
  daysPassed: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  motivation: number;
  maxMotivation: number;
  stress: number;
  maxStress: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'sub';
  status: 'active' | 'completed' | 'failed';
  progress: number;
  maxProgress: number;
}

interface NPC {
  id: string;
  name: string;
  relationship: number;
  maxRelationship: number;
  lastMet: string;
  description: string;
}

interface DialogueRecord {
  id: string;
  timestamp: string;
  npcName: string;
  content: string;
  playerChoice: string;
  consequence: string;
}

type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

// Constants
const INITIAL_STORY_DATA: StoryData = {
  id: 'start',
  title: '마법학원의 첫날',
  content: '아르카니아 마법학원의 대형 도서관에 서 있습니다. 고대 마법서들이 빽빽이 쌓인 책장들 사이로 은은한 마법의 빛이 새어나오고 있습니다. 마법사 길드의 장로인 엘드리치가 당신을 불러 새로운 임무를 맡기려고 합니다. 그의 눈빛에는 당신에 대한 기대와 함께 약간의 우려도 보입니다.\n\n도서관의 창가로 걸어가니 마을의 풍경이 한눈에 들어옵니다. 아침 햇살이 마을의 지붕들을 금빛으로 물들이고 있고, 멀리서는 마법사들이 연습하는 모습도 보입니다. 이곳에서 당신의 모험이 시작될 것입니다.',
  choices: [
    { id: 'confident', text: '자신감을 가지고 임무를 받아들인다', consequence: { type: ConsequenceType.MANA, value: -15 } },
    { id: 'careful', text: '신중하게 임무의 내용을 파악한다', consequence: { type: ConsequenceType.MANA, value: -8 } },
    { id: 'rest', text: '잠시 휴식을 취하고 마음을 정리한다', consequence: { type: ConsequenceType.MANA, value: 20 } },
  ],
};

const INITIAL_CHARACTER_STATS: CharacterStats = {
  daysPassed: 45,
  energy: 3,
  maxEnergy: 4,
  health: 4,
  maxHealth: 4,
  motivation: 7,
  maxMotivation: 10,
  stress: 3,
  maxStress: 10,
};

const MOCK_PLAYER_INFO: PlayerInfo = {
  name: '아리아 스톰윈드',
  daysPassed: 45,
  energy: 3,
  maxEnergy: 4,
  health: 4,
  maxHealth: 4,
  motivation: 7,
  maxMotivation: 10,
  stress: 3,
  maxStress: 10,
};

const MOCK_TASKS: Task[] = [
  {
    id: 'main1',
    title: '고대 마법서 해독',
    description: '아르카니아 도서관에서 발견된 고대 마법서를 해독하여 잃어버린 마법을 복원해야 합니다.',
    type: 'main',
    status: 'active',
    progress: 3,
    maxProgress: 10,
  },
  {
    id: 'sub1',
    title: '마법 재료 수집',
    description: '마법 실습에 필요한 희귀한 재료들을 수집합니다.',
    type: 'sub',
    status: 'active',
    progress: 7,
    maxProgress: 10,
  },
  {
    id: 'sub2',
    title: '동료 마법사들과의 협력',
    description: '다른 학생들과 함께 마법 프로젝트를 완성합니다.',
    type: 'sub',
    status: 'completed',
    progress: 10,
    maxProgress: 10,
  },
];

const MOCK_NPCS: NPC[] = [
  {
    id: 'npc1',
    name: '엘드리치 장로',
    relationship: 75,
    maxRelationship: 100,
    lastMet: '오늘',
    description: '마법사 길드의 현명한 장로. 당신의 스승이자 멘토 역할을 합니다.',
  },
  {
    id: 'npc2',
    name: '리나 파이어스피어',
    relationship: 60,
    maxRelationship: 100,
    lastMet: '어제',
    description: '같은 학년의 엘리트 마법사. 경쟁 관계이지만 때로는 협력합니다.',
  },
  {
    id: 'npc3',
    name: '마스터 조르단',
    relationship: 45,
    maxRelationship: 100,
    lastMet: '3일 전',
    description: '마법 실습 담당 교수. 엄격하지만 학생들을 진심으로 아끼는 분입니다.',
  },
];

const MOCK_DIALOGUE_HISTORY: DialogueRecord[] = [
  {
    id: 'dialogue1',
    timestamp: '오늘 14:30',
    npcName: '엘드리치 장로',
    content: '아리아, 고대 마법서 해독 임무를 맡기겠다. 이는 쉬운 일이 아니지만, 너의 잠재력을 믿는다.',
    playerChoice: '자신감을 가지고 임무를 받아들인다',
    consequence: '에너지 -15, 동기부여 +10',
  },
  {
    id: 'dialogue2',
    timestamp: '어제 16:20',
    npcName: '리나 파이어스피어',
    content: '아리아, 마법 대결에서 너를 이길 수 있을까? 실력이 많이 늘었구나.',
    playerChoice: '겸손하게 대답한다',
    consequence: '스트레스 -5, 관계도 +5',
  },
];

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

// Token Component
const TokenDisplay: React.FC<{
  current: number;
  max: number;
  icon: string;
  color: string;
  label: string;
}> = ({ current, max, icon, color, label }) => {
  const { theme } = useTheme();
  
  const tokenStyles = StyleSheet.create({
    tokenContainer: {
      alignItems: 'center',
    },
    tokenHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    tokenLabel: {
      marginLeft: 4,
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    tokenGrid: {
      flexDirection: 'row',
      gap: 3,
    },
    token: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,
    },
  });
  
  return (
    <View style={tokenStyles.tokenContainer}>
      <View style={tokenStyles.tokenHeader}>
        <Icon name={icon} size={14} color={color} />
        <Text style={[
          tokenStyles.tokenLabel,
          { color: theme.colors.textSecondary }
        ]}>{label}</Text>
      </View>
      <View style={tokenStyles.tokenGrid}>
        {Array.from({ length: max }, (_, index) => (
          <View
            key={index}
            style={[
              tokenStyles.token,
              {
                backgroundColor: index < current ? color : theme.colors.elevation2,
                borderColor: color,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const StoryScreen = () => {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { theme, mode } = useTheme();
  
  // State
  const [currentStory, setCurrentStory] = useState<StoryData>(INITIAL_STORY_DATA);
  const [characterStats, setCharacterStats] = useState<CharacterStats>(INITIAL_CHARACTER_STATS);

  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [isGameInfoModalVisible, setIsGameInfoModalVisible] = useState(false);

  // Event handlers
  const handleChoice = useCallback(async (choiceId: string) => {
    const choice = currentStory.choices.find(c => c.id === choiceId);
    if (choice && choice.consequence) {
      // 능력치 업데이트 (에너지에 영향)
      const newStats = { ...characterStats };
      newStats.energy = Math.min(newStats.maxEnergy, Math.max(0, newStats.energy + choice.consequence.value));
      setCharacterStats(newStats);
    }

    // TODO: 다음 스토리 노드로 이동
  }, [currentStory.choices, characterStats]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuVisible(!isSideMenuVisible);
  }, [isSideMenuVisible]);

  const toggleGameInfoModal = useCallback(() => {
    setIsGameInfoModalVisible(!isGameInfoModalVisible);
  }, [isGameInfoModalVisible]);

  const handleInventory = useCallback(() => {
    // TODO: 인벤토리 모달 열기
  }, []);

  const handleSkills = useCallback(() => {
    // TODO: 숙련도 모달 열기
  }, []);

  const handleCompanions = useCallback(() => {
    // TODO: 동료 모달 열기
  }, []);

  // useEffect
  useEffect(() => {
    const nodeId = route.params?.nodeId;
    if (nodeId) {
      // TODO: 실제 스토리 데이터 로드
    }
  }, [route.params]);

  // Styles
  const styles = useMemo(() => getStyles(theme, mode), [theme, mode]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={[
          styles.topHeader,
          { backgroundColor: theme.colors.surface }
        ]}>
          <TouchableOpacity onPress={toggleSideMenu} style={styles.headerButton}>
            <Icon name="menu" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <Text style={[
            styles.chapterTitle,
            { 
              color: theme.colors.text,
              fontSize: theme.typography.sizes.lg,
              fontWeight: theme.typography.weights.semibold,
            }
          ]}>1장 : 모험의 시작</Text>
          
          <TouchableOpacity onPress={toggleGameInfoModal} style={styles.headerButton}>
            <Icon name="information" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Stats Bar */}
        <View style={[
          styles.statsBar,
          { backgroundColor: theme.colors.elevation1 }
        ]}>
          <View style={styles.statsRow}>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={16} color={theme.colors.primary} />
              <Text style={[
                styles.locationText,
                { color: theme.colors.text }
              ]}>마을 여관 앞</Text>
            </View>
            
            <TokenDisplay
              current={characterStats.energy}
              max={characterStats.maxEnergy}
              icon="lightning-bolt"
              color={mode === 'dark' ? '#FFA726' : '#FF9800'}
              label="행동력"
            />
            
            <TokenDisplay
              current={characterStats.health}
              max={characterStats.maxHealth}
              icon="heart"
              color={mode === 'dark' ? '#EF5350' : '#F44336'}
              label="생명력"
            />
            
            <View style={styles.daysContainer}>
              <Text style={[
                styles.daysLabel,
                { color: theme.colors.textSecondary }
              ]}>일차</Text>
              <Text style={[
                styles.daysValue,
                { color: theme.colors.primary }
              ]}>{characterStats.daysPassed}</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Narration */}
          <ScrollView 
            style={styles.narrationContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={[
              styles.narrationCard,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <Text style={[
                styles.narrationText,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>{currentStory.content}</Text>
            </View>
          </ScrollView>


        </View>

        {/* Choices */}
        <View style={styles.choicesSection}>
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

        {/* Footer */}
        <View style={[
          styles.footer,
          { backgroundColor: theme.colors.surface }
        ]}>
          <TouchableOpacity style={styles.footerButton} onPress={handleInventory}>
            <Icon name="package-variant" size={24} color={theme.colors.primary} />
            <Text style={[
              styles.footerButtonText,
              { color: theme.colors.textSecondary }
            ]}>소지품</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton} onPress={handleSkills}>
            <Icon name="sword-cross" size={24} color={theme.colors.primary} />
            <Text style={[
              styles.footerButtonText,
              { color: theme.colors.textSecondary }
            ]}>숙련도</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton} onPress={handleCompanions}>
            <Icon name="account-group" size={24} color={theme.colors.primary} />
            <Text style={[
              styles.footerButtonText,
              { color: theme.colors.textSecondary }
            ]}>동료</Text>
          </TouchableOpacity>
        </View>

        {/* Side Menu */}
        <SideMenu 
          isVisible={isSideMenuVisible} 
          onClose={() => setIsSideMenuVisible(false)} 
        />

        {/* Game Info Modal */}
        <GameInfoModal
          isVisible={isGameInfoModalVisible}
          onClose={() => setIsGameInfoModalVisible(false)}
          playerInfo={MOCK_PLAYER_INFO}
          tasks={MOCK_TASKS}
          npcs={MOCK_NPCS}
          dialogueHistory={MOCK_DIALOGUE_HISTORY}
        />
      </View>
    </GlassmorphismBackground>
  );
};

// Styles function
const getStyles = (theme: any, mode: string) => StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerButton: {
    padding: 8,
  },
  chapterTitle: {
    letterSpacing: -0.3,
  },
  statsBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  daysContainer: {
    alignItems: 'center',
  },
  daysLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  daysValue: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  narrationContainer: {
    flex: 1,
  },
  narrationCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
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
  narrationText: {
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  choicesSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  choicesTitle: {
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  choicesGrid: {
    gap: 8,
  },
  choiceCard: {
    borderRadius: 16,
    padding: 16,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  footerButton: {
    alignItems: 'center',
    padding: 8,
  },
  footerButtonText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

export default StoryScreen; 