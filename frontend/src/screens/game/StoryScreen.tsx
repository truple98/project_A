import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Platform, StyleSheet, Animated } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import SideMenu from '../../components/common/SideMenu';
import GameInfoModal from '../../components/common/GameInfoModal';
import TokenDisplay from '../../components/game/TokenDisplay';
import InventoryTab from '../../components/game/InventoryTab';
import ProficiencyTab from '../../components/game/ProficiencyTab';
import CompanionsTab from '../../components/game/CompanionsTab';
import StatusTab from '../../components/game/StatusTab';
import { 
  StoryData, 
  FooterTabType,
  StoryCharacterStats
} from '../../types/story';
import { ConsequenceType } from '../../types/game';
import { 
  INITIAL_STORY_DATA, 
  INITIAL_CHARACTER_STATS,
  MOCK_QUESTS,
  MOCK_MET_PEOPLE,
  MOCK_STORY_FLOW,
  MOCK_INVENTORY,
  MOCK_SKILLS,
  MOCK_COMPANIONS,
  MOCK_STATUS_EFFECTS
} from '../../constants/gameData';
import { getConsequenceText, getConsequenceColor } from '../../utils/gameUtils';

// Navigation Types
type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

const StoryScreen = () => {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { theme, mode } = useTheme();
  
  // State
  const [currentStory, setCurrentStory] = useState<StoryData>(INITIAL_STORY_DATA);
  const [characterStats, setCharacterStats] = useState<StoryCharacterStats>(INITIAL_CHARACTER_STATS);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [isGameInfoModalVisible, setIsGameInfoModalVisible] = useState(false);
  
  // Footer expansion state
  const [expandedFooter, setExpandedFooter] = useState<FooterTabType | null>(null);
  const [activeTab, setActiveTab] = useState<FooterTabType>('inventory');
  const [footerAnimation] = useState(new Animated.Value(0));

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

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuVisible(!isSideMenuVisible);
  }, [isSideMenuVisible]);

  const toggleGameInfoModal = useCallback(() => {
    setIsGameInfoModalVisible(!isGameInfoModalVisible);
  }, [isGameInfoModalVisible]);

  const handleFooterButton = useCallback((tabType: FooterTabType) => {
    if (expandedFooter === tabType) {
      // 축소
      Animated.timing(footerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpandedFooter(null);
        setActiveTab('inventory');
      });
    } else {
      // 확장
      setExpandedFooter(tabType);
      setActiveTab(tabType);
      Animated.timing(footerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [expandedFooter, footerAnimation]);

  const handleTabChange = useCallback((tabType: FooterTabType) => {
    setActiveTab(tabType);
  }, []);

  const handleInventory = useCallback(() => {
    handleFooterButton('inventory');
  }, [handleFooterButton]);

  const handleSkills = useCallback(() => {
    handleFooterButton('proficiency');
  }, [handleFooterButton]);

  const handleCompanions = useCallback(() => {
    handleFooterButton('companions');
  }, [handleFooterButton]);

  const handleStatus = useCallback(() => {
    handleFooterButton('status');
  }, [handleFooterButton]);

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

        {/* Story Output Area */}
        <View style={styles.mainContent}>
          <ScrollView 
            style={styles.storyOutputContainer}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.storyOutputContent}
          >
            {/* Illustration Area */}
            <View style={[
              styles.illustrationArea,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <Text style={[
                styles.illustrationPlaceholder,
                { 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.medium,
                }
              ]}>일러스트</Text>
            </View>

            {/* Text Output Area */}
            <View style={[
              styles.textOutputArea,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <Text style={[
                styles.narrationText,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.regular,
                  textAlign: 'left',
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

        {/* Background Overlay */}
        {expandedFooter && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => handleFooterButton(expandedFooter)}
          />
        )}

        {/* Footer */}
        <Animated.View style={[
          styles.footer,
          { 
            backgroundColor: theme.colors.surface,
            position: expandedFooter ? 'absolute' : 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            height: expandedFooter ? '40%' : undefined,
            zIndex: expandedFooter ? 1001 : 1,
            flexDirection: expandedFooter ? 'column' : 'row',
            alignItems: expandedFooter ? 'stretch' : 'center',
          }
        ]}>
          {!expandedFooter ? (
            // Normal footer buttons
            <>
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
              
              <TouchableOpacity style={styles.footerButton} onPress={handleStatus}>
                <Icon name="heart-pulse" size={24} color={theme.colors.primary} />
                <Text style={[
                  styles.footerButtonText,
                  { color: theme.colors.textSecondary }
                ]}>상태</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Expanded footer with tabs
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              {/* Tab Header - Fixed height */}
              <View style={styles.tabHeader}>
                <TouchableOpacity 
                  style={styles.footerButton} 
                  onPress={() => handleTabChange('inventory')}
                >
                  <Icon 
                    name="package-variant" 
                    size={24} 
                    color={activeTab === 'inventory' ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.footerButtonText,
                    { color: theme.colors.textSecondary }
                  ]}>소지품</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.footerButton} 
                  onPress={() => handleTabChange('proficiency')}
                >
                  <Icon 
                    name="sword-cross" 
                    size={24} 
                    color={activeTab === 'proficiency' ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.footerButtonText,
                    { color: theme.colors.textSecondary }
                  ]}>숙련도</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.footerButton} 
                  onPress={() => handleTabChange('companions')}
                >
                  <Icon 
                    name="account-group" 
                    size={24} 
                    color={activeTab === 'companions' ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.footerButtonText,
                    { color: theme.colors.textSecondary }
                  ]}>동료</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.footerButton} 
                  onPress={() => handleTabChange('status')}
                >
                  <Icon 
                    name="heart-pulse" 
                    size={24} 
                    color={activeTab === 'status' ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                  <Text style={[
                    styles.footerButtonText,
                    { color: theme.colors.textSecondary }
                  ]}>상태</Text>
                </TouchableOpacity>
                

              </View>
              
              {/* Tab Content - Scrollable */}
              <View style={styles.tabContent}>
                {activeTab === 'inventory' && (
                  <InventoryTab items={MOCK_INVENTORY} />
                )}
                {activeTab === 'proficiency' && (
                  <ProficiencyTab skills={MOCK_SKILLS} />
                )}
                {activeTab === 'companions' && (
                  <CompanionsTab companions={MOCK_COMPANIONS} />
                )}
                {activeTab === 'status' && (
                  <StatusTab statusEffects={MOCK_STATUS_EFFECTS} />
                )}
              </View>
            </View>
          )}
        </Animated.View>

        {/* Side Menu */}
        <SideMenu 
          isVisible={isSideMenuVisible} 
          onClose={() => setIsSideMenuVisible(false)} 
        />

        {/* Game Info Modal */}
        <GameInfoModal
          isVisible={isGameInfoModalVisible}
          onClose={() => setIsGameInfoModalVisible(false)}
          quests={MOCK_QUESTS}
          metPeople={MOCK_MET_PEOPLE}
          storyFlow={MOCK_STORY_FLOW}
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
  storyOutputContainer: {
    flex: 1,
  },
  storyOutputContent: {
    paddingBottom: 20,
  },
  illustrationArea: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
  illustrationPlaceholder: {
    textAlign: 'center',
  },
  textOutputArea: {
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
    minHeight: 80,
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
    minWidth: 60,
    minHeight: 60,
    flex: 1,
  },
  footerButtonText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    height: 80,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    borderRadius: 8,
    minWidth: 60,
    minHeight: 60,
  },
  activeTabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tabButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  closeButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
});

export default StoryScreen; 