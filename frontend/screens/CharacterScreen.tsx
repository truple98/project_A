import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';

type CharacterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Character'>;

const CharacterScreen = () => {
  const navigation = useNavigation<CharacterScreenNavigationProp>();
  const { mode } = useTheme();

  const characterData = {
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

  const handleBack = () => {
    navigation.goBack();
  };

  const getStatPercentage = (current: number, max: number) => (current / max) * 100;

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
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    profileCard: {
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
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.5,
    },
    characterClass: {
      fontSize: 16,
      fontWeight: '500',
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.2,
    },
    experienceContainer: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
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
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
    experienceValue: {
      fontSize: 14,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.2,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    statsCard: {
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
    statsGrid: {
      gap: 20,
    },
    statItem: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
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
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
    statValue: {
      fontSize: 14,
      fontWeight: '600',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.2,
    },
    basicStats: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
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
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
    basicStatValue: {
      fontSize: 24,
      fontWeight: '700',
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.5,
    },
    equipmentCard: {
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
    equipmentList: {
      gap: 16,
    },
    equipmentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
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
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.3,
    },
    equipmentType: {
      fontSize: 14,
      fontWeight: '500',
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
    skillsCard: {
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
    skillsList: {
      gap: 12,
    },
    skillItem: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
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
      color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
      letterSpacing: -0.3,
    },
    skillLevel: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
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
      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      letterSpacing: -0.1,
    },
  });

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
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={[
                  styles.avatar, 
                  { backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4' }
                ]}>
                  <Text style={styles.avatarText}>
                    {characterData.name.substring(0, 1)}
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.characterName}>
                    {characterData.name}
                  </Text>
                  <Text style={styles.characterClass}>
                    레벨 {characterData.level} {characterData.class}
                  </Text>
                </View>
              </View>
              
              {/* 경험치 바 */}
              <View style={styles.experienceContainer}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceLabel}>
                    경험치
                  </Text>
                  <Text style={styles.experienceValue}>
                    {characterData.experience} / {characterData.maxExperience}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: mode === 'dark' ? '#FFA726' : '#FF9800',
                      width: `${getStatPercentage(characterData.experience, characterData.maxExperience)}%`,
                    }
                  ]} />
                </View>
              </View>
            </View>
          </View>

          {/* 능력치 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>능력치</Text>
            <View style={styles.statsCard}>
              <View style={styles.statsGrid}>
                {/* 체력 */}
                <View style={styles.statItem}>
                  <View style={styles.statHeader}>
                    <Text style={styles.statLabel}>체력</Text>
                    <Text style={styles.statValue}>
                      {characterData.stats.health}/{characterData.stats.maxHealth}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: mode === 'dark' ? '#EF5350' : '#F44336',
                        width: `${getStatPercentage(characterData.stats.health, characterData.stats.maxHealth)}%`,
                      }
                    ]} />
                  </View>
                </View>

                {/* 마나 */}
                <View style={styles.statItem}>
                  <View style={styles.statHeader}>
                    <Text style={styles.statLabel}>마나</Text>
                    <Text style={styles.statValue}>
                      {characterData.stats.mana}/{characterData.stats.maxMana}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
                        width: `${getStatPercentage(characterData.stats.mana, characterData.stats.maxMana)}%`,
                      }
                    ]} />
                  </View>
                </View>

                {/* 기본 스탯들 */}
                <View style={styles.basicStats}>
                  <View style={styles.basicStatItem}>
                    <Text style={styles.basicStatLabel}>힘</Text>
                    <Text style={styles.basicStatValue}>
                      {characterData.stats.strength}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={styles.basicStatLabel}>지능</Text>
                    <Text style={styles.basicStatValue}>
                      {characterData.stats.intelligence}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={styles.basicStatLabel}>민첩</Text>
                    <Text style={styles.basicStatValue}>
                      {characterData.stats.agility}
                    </Text>
                  </View>
                  <View style={styles.basicStatItem}>
                    <Text style={styles.basicStatLabel}>방어</Text>
                    <Text style={styles.basicStatValue}>
                      {characterData.stats.defense}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 장비 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>장비</Text>
            <View style={styles.equipmentCard}>
              <View style={styles.equipmentList}>
                <View style={styles.equipmentItem}>
                  <View style={styles.equipmentInfo}>
                    <Text style={styles.equipmentName}>
                      {characterData.equipment.weapon}
                    </Text>
                    <Text style={styles.equipmentType}>무기</Text>
                  </View>
                </View>

                <View style={styles.equipmentItem}>
                  <View style={styles.equipmentInfo}>
                    <Text style={styles.equipmentName}>
                      {characterData.equipment.armor}
                    </Text>
                    <Text style={styles.equipmentType}>방어구</Text>
                  </View>
                </View>

                <View style={styles.equipmentItem}>
                  <View style={styles.equipmentInfo}>
                    <Text style={styles.equipmentName}>
                      {characterData.equipment.accessory}
                    </Text>
                    <Text style={styles.equipmentType}>장신구</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 스킬 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>스킬</Text>
            <View style={styles.skillsCard}>
              <View style={styles.skillsList}>
                {characterData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <View style={styles.skillHeader}>
                      <Text style={styles.skillName}>
                        {skill.name}
                      </Text>
                      <View style={styles.skillLevel}>
                        <Text style={styles.skillLevelText}>
                          Lv.{skill.level}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.skillDescription}>
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

export default CharacterScreen; 