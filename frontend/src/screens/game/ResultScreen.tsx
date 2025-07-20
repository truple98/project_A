import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { ScreenHeader } from '../../components/ScreenHeader';

// TypeScript Interfaces
interface GameSummary {
  playTime: string;
  totalDays: number;
  totalChoices: number;
  energyTokensUsed: number;
  healthTokensUsed: number;
  storyProgress: number;
}

interface VisitedLocation {
  id: string;
  name: string;
  description: string;
  visitCount: number;
}

interface MetCharacter {
  id: string;
  name: string;
  type: 'person' | 'creature' | 'companion';
  relationship: number;
  lastMet: string;
  description: string;
}

interface AcquiredItem {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  quantity: number;
  description: string;
}

interface StatusChange {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'neutral';
  description: string;
  duration: string;
}

interface SkillProficiency {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  unlocked: boolean;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'story' | 'choice' | 'achievement' | 'item' | 'relationship';
  title: string;
  description: string;
}

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

// Mock Data
const MOCK_GAME_SUMMARY: GameSummary = {
  playTime: '3시간 27분',
  totalDays: 45,
  totalChoices: 23,
  energyTokensUsed: 156,
  healthTokensUsed: 12,
  storyProgress: 78,
};

const MOCK_VISITED_LOCATIONS: VisitedLocation[] = [
  { id: '1', name: '아르카니아 마법학원', description: '마법사들의 교육 기관', visitCount: 15 },
  { id: '2', name: '고대 도서관', description: '고대 마법서가 보관된 곳', visitCount: 8 },
  { id: '3', name: '마법 실습실', description: '마법 연습을 하는 공간', visitCount: 12 },
  { id: '4', name: '마을 광장', description: '마을 사람들이 모이는 곳', visitCount: 5 },
];

const MOCK_MET_CHARACTERS: MetCharacter[] = [
  { id: '1', name: '엘드리치 장로', type: 'person', relationship: 85, lastMet: '오늘', description: '마법사 길드의 현명한 장로' },
  { id: '2', name: '리나 파이어스피어', type: 'person', relationship: 72, lastMet: '어제', description: '엘리트 마법사 학생' },
  { id: '3', name: '마스터 조르단', type: 'person', relationship: 65, lastMet: '3일 전', description: '마법 실습 담당 교수' },
  { id: '4', name: '고대 마법서의 수호자', type: 'creature', relationship: 50, lastMet: '1주일 전', description: '도서관을 지키는 마법 생명체' },
  { id: '5', name: '마법 고양이 루나', type: 'companion', relationship: 90, lastMet: '오늘', description: '당신의 충실한 동반자' },
];

const MOCK_ACQUIRED_ITEMS: AcquiredItem[] = [
  { id: '1', name: '고대 마법서', rarity: 'epic', quantity: 1, description: '고대의 비밀을 담은 마법서' },
  { id: '2', name: '마법 지팡이', rarity: 'rare', quantity: 1, description: '마법을 증폭시키는 지팡이' },
  { id: '3', name: '체력 물약', rarity: 'common', quantity: 8, description: '체력을 회복시키는 물약' },
  { id: '4', name: '마법 결정', rarity: 'uncommon', quantity: 15, description: '마법 주문에 필요한 재료' },
];

const MOCK_STATUS_CHANGES: StatusChange[] = [
  { id: '1', name: '마법의 통찰', type: 'buff', description: '마법 이해도가 크게 향상됨', duration: '영구' },
  { id: '2', name: '학습 열정', type: 'buff', description: '새로운 지식을 배우는 속도 증가', duration: '7일' },
  { id: '3', name: '피로도', type: 'debuff', description: '과도한 학습으로 인한 피로', duration: '3일' },
];

const MOCK_SKILL_PROFICIENCIES: SkillProficiency[] = [
  { id: '1', name: '화염 마법', level: 4, maxLevel: 10, experience: 450, experienceToNext: 550 },
  { id: '2', name: '빙결 마법', level: 3, maxLevel: 10, experience: 280, experienceToNext: 320 },
  { id: '3', name: '치유 마법', level: 2, maxLevel: 10, experience: 150, experienceToNext: 250 },
  { id: '4', name: '마법 이론', level: 5, maxLevel: 10, experience: 680, experienceToNext: 320 },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', name: '첫 번째 퀘스트', description: '첫 번째 퀘스트를 완료했습니다', category: '스토리', unlocked: true },
  { id: '2', name: '사교적', description: '10명의 NPC와 친밀도를 50 이상으로 높였습니다', category: '사회', unlocked: true },
  { id: '3', name: '탐험가', description: '5개의 새로운 장소를 발견했습니다', category: '탐험', unlocked: true },
  { id: '4', name: '마법사', description: '마법 레벨을 5 이상으로 올렸습니다', category: '전투', unlocked: false },
];

const MOCK_ACTIVITY_LOG: ActivityLog[] = [
  { id: '1', timestamp: '1일차', type: 'story', title: '마법학원 입학', description: '아르카니아 마법학원에 입학하여 새로운 모험이 시작되었습니다.' },
  { id: '2', timestamp: '3일차', type: 'choice', title: '첫 번째 선택', description: '고대 마법서 해독 퀘스트를 자신감을 가지고 받아들였습니다.' },
  { id: '3', timestamp: '7일차', type: 'relationship', title: '엘드리치 장로와의 만남', description: '마법사 길드의 장로와 첫 대화를 나누었습니다.' },
  { id: '4', timestamp: '15일차', type: 'achievement', title: '첫 번째 퀘스트 완료', description: '고대 마법서 해독 퀘스트를 성공적으로 완료했습니다.' },
  { id: '5', timestamp: '30일차', type: 'item', title: '마법 지팡이 획득', description: '고대 마법서 해독의 보상으로 마법 지팡이를 받았습니다.' },
  { id: '6', timestamp: '45일차', type: 'story', title: '진실의 발견', description: '마법의 진정한 의미를 깨달아 진정한 마법사가 되었습니다.' },
];

const ResultScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // Accordion state
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Mock data
  const gameSummary = useMemo(() => MOCK_GAME_SUMMARY, []);
  const visitedLocations = useMemo(() => MOCK_VISITED_LOCATIONS, []);
  const metCharacters = useMemo(() => MOCK_MET_CHARACTERS, []);
  const acquiredItems = useMemo(() => MOCK_ACQUIRED_ITEMS, []);
  const statusChanges = useMemo(() => MOCK_STATUS_CHANGES, []);
  const skillProficiencies = useMemo(() => MOCK_SKILL_PROFICIENCIES, []);
  const achievements = useMemo(() => MOCK_ACHIEVEMENTS, []);
  const activityLog = useMemo(() => MOCK_ACTIVITY_LOG, []);

  // Event handlers
  const handleBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleTitleScreen = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleNewGame = useCallback(() => {
    navigation.navigate('GameStart');
  }, [navigation]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common':
        return mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 26, 26, 0.6)';
      case 'uncommon':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'rare':
        return mode === 'dark' ? '#5A9FFF' : '#4285F4';
      case 'epic':
        return mode === 'dark' ? '#FF8A65' : '#FF6F00';
      default:
        return theme.colors.textSecondary;
    }
  }, [mode, theme.colors.textSecondary]);

  const getStatusTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'buff':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'debuff':
        return mode === 'dark' ? '#EF5350' : '#F44336';
      case 'neutral':
        return mode === 'dark' ? '#42A5F5' : '#2196F3';
      default:
        return theme.colors.textSecondary;
    }
  }, [mode, theme.colors.textSecondary]);

  const getActivityTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'story':
        return mode === 'dark' ? '#9C27B0' : '#673AB7';
      case 'choice':
        return mode === 'dark' ? '#FF9800' : '#F57C00';
      case 'achievement':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'item':
        return mode === 'dark' ? '#5A9FFF' : '#4285F4';
      case 'relationship':
        return mode === 'dark' ? '#FF8A65' : '#FF6F00';
      default:
        return theme.colors.textSecondary;
    }
  }, [mode, theme.colors.textSecondary]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionCard: {
      marginBottom: 12,
      padding: 0,
      overflow: 'hidden',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.elevation1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    sectionCount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    sectionIcon: {
      marginLeft: 8,
    },
    sectionContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: theme.colors.elevation1,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      paddingTop: 16,
    },
    statItem: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.elevation2,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 8,
      textAlign: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.elevation2,
      borderRadius: 8,
      marginBottom: 8,
      marginTop: 8,
    },
    listItemInfo: {
      flex: 1,
    },
    listItemName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    listItemDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    listItemMeta: {
      alignItems: 'flex-end',
    },
    listItemMetaText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    skillItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.elevation2,
      borderRadius: 8,
      marginBottom: 8,
      marginTop: 8,
    },
    skillInfo: {
      flex: 1,
    },
    skillName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    skillProgress: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    skillLevel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    achievementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.elevation2,
      borderRadius: 8,
      marginBottom: 8,
      marginTop: 8,
    },
    achievementInfo: {
      flex: 1,
    },
    achievementName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    achievementDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    achievementStatus: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.success,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 12,
    },
    activityItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.elevation2,
      borderRadius: 8,
      marginBottom: 8,
      marginTop: 8,
    },
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    activityTimestamp: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    activityDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    actionsContainer: {
      gap: 12,
      marginTop: 20,
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
    },
  });

  // Accordion Section Component
  const AccordionSection = ({ 
    id, 
    title, 
    count, 
    children 
  }: { 
    id: string; 
    title: string; 
    count: number; 
    children: React.ReactNode; 
  }) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <GlassmorphismCard style={styles.sectionCard}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(id)}
          activeOpacity={0.8}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionCount}>+{count}</Text>
          </View>
          <Icon
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color={theme.colors.text}
            style={styles.sectionIcon}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.sectionContent}>
            {children}
          </View>
        )}
      </GlassmorphismCard>
    );
  };

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="게임 요약" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 게임 통계 - 항상 펼쳐진 상태 */}
          <GlassmorphismCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>게임 통계</Text>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>플레이 시간</Text>
                  <Text style={styles.statValue}>{gameSummary.playTime}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>총 일차</Text>
                  <Text style={styles.statValue}>{gameSummary.totalDays}일</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>선택지</Text>
                  <Text style={styles.statValue}>{gameSummary.totalChoices}개</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>행동력 토큰</Text>
                  <Text style={styles.statValue}>{gameSummary.energyTokensUsed}개</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>생명력 토큰</Text>
                  <Text style={styles.statValue}>{gameSummary.healthTokensUsed}개</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>스토리 진척도</Text>
                  <Text style={styles.statValue}>{gameSummary.storyProgress}%</Text>
                </View>
              </View>
            </View>
          </GlassmorphismCard>

          {/* 방문한 장소들 */}
          <AccordionSection id="locations" title="방문한 장소들" count={visitedLocations.length}>
            {visitedLocations.map((location) => (
              <View key={location.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{location.name}</Text>
                  <Text style={styles.listItemDescription}>{location.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={styles.listItemMetaText}>방문 {location.visitCount}회</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 만난 인물들 */}
          <AccordionSection id="people" title="만난 인물들" count={metCharacters.filter(char => char.type === 'person').length}>
            {metCharacters.filter(char => char.type === 'person').map((character) => (
              <View key={character.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{character.name}</Text>
                  <Text style={styles.listItemDescription}>{character.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={styles.listItemMetaText}>관계도 {character.relationship}</Text>
                  <Text style={styles.listItemMetaText}>{character.lastMet}</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 만난 생명체 */}
          <AccordionSection id="creatures" title="만난 생명체" count={metCharacters.filter(char => char.type === 'creature').length}>
            {metCharacters.filter(char => char.type === 'creature').map((character) => (
              <View key={character.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{character.name}</Text>
                  <Text style={styles.listItemDescription}>{character.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={styles.listItemMetaText}>관계도 {character.relationship}</Text>
                  <Text style={styles.listItemMetaText}>{character.lastMet}</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 만난 동료 */}
          <AccordionSection id="companions" title="만난 동료" count={metCharacters.filter(char => char.type === 'companion').length}>
            {metCharacters.filter(char => char.type === 'companion').map((character) => (
              <View key={character.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{character.name}</Text>
                  <Text style={styles.listItemDescription}>{character.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={styles.listItemMetaText}>관계도 {character.relationship}</Text>
                  <Text style={styles.listItemMetaText}>{character.lastMet}</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 획득한 아이템 */}
          <AccordionSection id="items" title="획득한 아이템" count={acquiredItems.length}>
            {acquiredItems.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{item.name}</Text>
                  <Text style={styles.listItemDescription}>{item.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={[styles.listItemMetaText, { color: getRarityColor(item.rarity) }]}>
                    {item.rarity.toUpperCase()}
                  </Text>
                  <Text style={styles.listItemMetaText}>x{item.quantity}</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 상태 변화 */}
          <AccordionSection id="status" title="상태 변화" count={statusChanges.length}>
            {statusChanges.map((status) => (
              <View key={status.id} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{status.name}</Text>
                  <Text style={styles.listItemDescription}>{status.description}</Text>
                </View>
                <View style={styles.listItemMeta}>
                  <Text style={[styles.listItemMetaText, { color: getStatusTypeColor(status.type) }]}>
                    {status.type.toUpperCase()}
                  </Text>
                  <Text style={styles.listItemMetaText}>{status.duration}</Text>
                </View>
              </View>
            ))}
          </AccordionSection>

          {/* 기술 숙련도 */}
          <AccordionSection id="skills" title="기술 숙련도" count={skillProficiencies.length}>
            {skillProficiencies.map((skill) => (
              <View key={skill.id} style={styles.skillItem}>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillProgress}>
                    {skill.experience} / {skill.experienceToNext} XP
                  </Text>
                </View>
                <Text style={styles.skillLevel}>Lv.{skill.level}</Text>
              </View>
            ))}
          </AccordionSection>

          {/* 달성한 업적 - 항상 펼쳐진 상태 */}
          <GlassmorphismCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>달성한 업적</Text>
            </View>
            <View style={styles.sectionContent}>
              {achievements.filter(achievement => achievement.unlocked).map((achievement) => (
                <View key={achievement.id} style={styles.achievementItem}>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  </View>
                  <View style={styles.achievementStatus}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16 }}>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          </GlassmorphismCard>

          {/* 행적 - 항상 펼쳐진 상태 */}
          <GlassmorphismCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>행적</Text>
            </View>
            <View style={styles.sectionContent}>
              {activityLog.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityHeader}>
                    <Text style={[styles.activityTitle, { color: getActivityTypeColor(activity.type) }]}>
                      {activity.title}
                    </Text>
                    <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
                  </View>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
              ))}
            </View>
          </GlassmorphismCard>

          {/* 액션 버튼들 */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.elevation2 }
              ]}
              onPress={handleTitleScreen}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>
                타이틀로 돌아가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: theme.colors.primary }
              ]}
              onPress={handleNewGame}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>
                새로운 게임 시작하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default ResultScreen; 