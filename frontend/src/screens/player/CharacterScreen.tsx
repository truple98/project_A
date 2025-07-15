// 1. React/External imports
import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. Internal imports
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface CharacterStats {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  intelligence: number;
  agility: number;
  defense: number;
}

interface Equipment {
  weapon: string;
  armor: string;
  accessory: string;
}

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface CharacterData {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  class: string;
  stats: CharacterStats;
  equipment: Equipment;
  skills: Skill[];
}

type CharacterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Character'>;

// 4. Constants
const MOCK_CHARACTER_DATA: CharacterData = {
  name: '모험가',
  level: 5,
  experience: 1250,
  maxExperience: 1500,
  class: '전사',
  stats: {
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 80,
    strength: 15,
    intelligence: 8,
    agility: 12,
    defense: 10,
  },
  equipment: {
    weapon: '철검',
    armor: '가죽 갑옷',
    accessory: '힘의 반지',
  },
  skills: [
    { name: '강타', level: 3, description: '강력한 일격을 가합니다' },
    { name: '방어', level: 2, description: '데미지를 감소시킵니다' },
    { name: '회복', level: 1, description: '체력을 회복합니다' },
  ]
};

const EQUIPMENT_TYPES = {
  weapon: '무기',
  armor: '방어구',
  accessory: '장신구'
};

const STAT_COLORS = {
  health: { light: '#F44336', dark: '#EF5350' },
  mana: { light: '#4285F4', dark: '#5A9FFF' },
  experience: { light: '#FF9800', dark: '#FFA726' }
};

// 5. Component
const CharacterScreen = () => {
  // 5.1 Hooks
  const navigation = useNavigation<CharacterScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2 Data/Computed values
  const getStatPercentage = useCallback((current: number, max: number) => 
    (current / max) * 100, 
    []
  );

  // 5.3 Event handlers
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 5.5 JSX Return
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="캐릭터 정보" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 캐릭터 프로필 */}
          <View style={styles.section}>
            <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.profileHeader}>
                <View style={[
                  styles.avatar, 
                  { backgroundColor: theme.colors.primary }
                ]}>
                  <Text style={styles.avatarText}>
                    {MOCK_CHARACTER_DATA.name.substring(0, 1)}
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={[styles.characterName, { color: theme.colors.text }]}>
                    {MOCK_CHARACTER_DATA.name}
                  </Text>
                  <Text style={[styles.characterClass, { color: theme.colors.textSecondary }]}>
                    레벨 {MOCK_CHARACTER_DATA.level} {MOCK_CHARACTER_DATA.class}
                  </Text>
                </View>
              </View>
              
              {/* 경험치 바 */}
              <View style={[styles.experienceContainer, { backgroundColor: theme.colors.elevation1 }]}>
                <View style={styles.experienceHeader}>
                  <Text style={[styles.experienceLabel, { color: theme.colors.textSecondary }]}>
                    경험치
                  </Text>
                  <Text style={[styles.experienceValue, { color: theme.colors.text }]}>
                    {MOCK_CHARACTER_DATA.experience} / {MOCK_CHARACTER_DATA.maxExperience}
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.elevation2 }]}>
                  <View style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: STAT_COLORS.experience[mode],
                      width: `${getStatPercentage(MOCK_CHARACTER_DATA.experience, MOCK_CHARACTER_DATA.maxExperience)}%`,
                    }
                  ]} />
                </View>
              </View>
            </View>
          </View>

          {/* 능력치 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>능력치</Text>
            <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.statsGrid}>
                {/* 체력 */}
                <View style={[styles.statItem, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.statHeader}>
                    <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>체력</Text>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.health}/{MOCK_CHARACTER_DATA.stats.maxHealth}
                    </Text>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.elevation2 }]}>
                    <View style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: STAT_COLORS.health[mode],
                        width: `${getStatPercentage(MOCK_CHARACTER_DATA.stats.health, MOCK_CHARACTER_DATA.stats.maxHealth)}%`,
                      }
                    ]} />
                  </View>
                </View>

                {/* 마나 */}
                <View style={[styles.statItem, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.statHeader}>
                    <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>마나</Text>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.mana}/{MOCK_CHARACTER_DATA.stats.maxMana}
                    </Text>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.elevation2 }]}>
                    <View style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: STAT_COLORS.mana[mode],
                        width: `${getStatPercentage(MOCK_CHARACTER_DATA.stats.mana, MOCK_CHARACTER_DATA.stats.maxMana)}%`,
                      }
                    ]} />
                  </View>
                </View>

                {/* 기본 스탯들 */}
                <View style={[styles.basicStats, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.basicStatItem}>
                    <Text style={[styles.basicStatLabel, { color: theme.colors.textSecondary }]}>힘</Text>
                    <Text style={[styles.basicStatValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.strength}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={[styles.basicStatLabel, { color: theme.colors.textSecondary }]}>지능</Text>
                    <Text style={[styles.basicStatValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.intelligence}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={[styles.basicStatLabel, { color: theme.colors.textSecondary }]}>민첩</Text>
                    <Text style={[styles.basicStatValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.agility}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={[styles.basicStatLabel, { color: theme.colors.textSecondary }]}>방어</Text>
                    <Text style={[styles.basicStatValue, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.stats.defense}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 장비 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>장비</Text>
            <View style={[styles.equipmentCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.equipmentList}>
                <View style={[styles.equipmentItem, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.equipmentInfo}>
                    <Text style={[styles.equipmentName, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.equipment.weapon}
                    </Text>
                    <Text style={[styles.equipmentType, { color: theme.colors.textSecondary }]}>
                      {EQUIPMENT_TYPES.weapon}
                    </Text>
                  </View>
                </View>

                <View style={[styles.equipmentItem, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.equipmentInfo}>
                    <Text style={[styles.equipmentName, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.equipment.armor}
                    </Text>
                    <Text style={[styles.equipmentType, { color: theme.colors.textSecondary }]}>
                      {EQUIPMENT_TYPES.armor}
                    </Text>
                  </View>
                </View>

                <View style={[styles.equipmentItem, { backgroundColor: theme.colors.elevation1 }]}>
                  <View style={styles.equipmentInfo}>
                    <Text style={[styles.equipmentName, { color: theme.colors.text }]}>
                      {MOCK_CHARACTER_DATA.equipment.accessory}
                    </Text>
                    <Text style={[styles.equipmentType, { color: theme.colors.textSecondary }]}>
                      {EQUIPMENT_TYPES.accessory}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 스킬 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>스킬</Text>
            <View style={[styles.skillsCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.skillsList}>
                {MOCK_CHARACTER_DATA.skills.map((skill, index) => (
                  <View key={index} style={[styles.skillItem, { backgroundColor: theme.colors.elevation1 }]}>
                    <View style={styles.skillHeader}>
                      <Text style={[styles.skillName, { color: theme.colors.text }]}>
                        {skill.name}
                      </Text>
                      <View style={[styles.skillLevel, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.skillLevelText}>
                          Lv.{skill.level}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.skillDescription, { color: theme.colors.textSecondary }]}>
                      {skill.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  profileInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  characterClass: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  experienceContainer: {
    borderRadius: 12,
    padding: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  experienceLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  experienceValue: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsCard: {
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
  statsGrid: {
    gap: 20,
  },
  statItem: {
    borderRadius: 12,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  basicStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderRadius: 12,
    padding: 16,
  },
  basicStatItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  basicStatLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  basicStatValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  equipmentCard: {
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
  equipmentList: {
    gap: 16,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  equipmentType: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  skillsCard: {
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
  skillsList: {
    gap: 12,
  },
  skillItem: {
    padding: 16,
    borderRadius: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  skillLevel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  skillLevelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  skillDescription: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
});

// 7. Export
export default CharacterScreen; 