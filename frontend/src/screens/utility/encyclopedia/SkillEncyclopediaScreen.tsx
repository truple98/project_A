import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../../components/GlassmorphismHeader';

// 프로젝트 내부 타입 및 테마
import { useTheme } from '../../../theme/ThemeContext';

type SkillEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface SkillData {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  type?: string;
  cost?: string;
}

// Mock data for skills
const SKILL_DATA: SkillData[] = [
  {
    id: 'skill_1',
    name: '화염 마법',
    description: '불을 다루는 기본적인 공격 마법. 적을 공격하거나 장애물을 제거할 수 있다.',
    icon: 'fire',
    discovered: true,
    type: '공격 마법',
    cost: '마법력 10',
  },
  {
    id: 'skill_2',
    name: '치유 마법',
    description: '상처를 치료하는 회복 마법. 생명력을 회복시킬 수 있다.',
    icon: 'medical-bag',
    discovered: false,
    rarity: 'rare',
    type: '회복 마법',
    cost: '마법력 15',
  },
  {
    id: 'skill_3',
    name: '빙결 마법',
    description: '적을 얼려서 행동을 제한하는 마법. 적의 공격을 막을 수 있다.',
    icon: 'snowflake',
    discovered: true,
    type: '제어 마법',
    cost: '마법력 12',
  },
  {
    id: 'skill_4',
    name: '번개 마법',
    description: '강력한 전기 공격 마법. 여러 적을 동시에 공격할 수 있다.',
    icon: 'lightning-bolt',
    discovered: true,
    type: '공격 마법',
    cost: '마법력 20',
  },
  {
    id: 'skill_5',
    name: '시간 정지',
    description: '시간을 잠시 멈추는 전설적인 마법. 모든 적의 행동을 중단시킨다.',
    icon: 'clock-outline',
    discovered: false,
    rarity: 'legendary',
    type: '시공간 마법',
    cost: '마법력 50',
  },
];

const SkillEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<SkillEncyclopediaScreenNavigationProp>();
  const { theme, mode } = useTheme();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'rare':
        return mode === 'dark' ? '#42A5F5' : '#2196F3';
      case 'epic':
        return mode === 'dark' ? '#AB47BC' : '#9C27B0';
      case 'legendary':
        return mode === 'dark' ? '#FFA726' : '#FF9800';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getRarityText = (rarity?: string) => {
    switch (rarity) {
      case 'common':
        return '일반';
      case 'rare':
        return '희귀';
      case 'epic':
        return '영웅';
      case 'legendary':
        return '전설';
      default:
        return '';
    }
  };

  // 스타일 정의
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      letterSpacing: -0.3,
      color: theme.colors.text,
    },
    skillCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      opacity: 1,
    },
    undiscoveredCard: {
      opacity: 0.6,
    },
    skillHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    skillIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    skillInfo: {
      flex: 1,
    },
    skillName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    skillType: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    skillCost: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    skillRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    skillDescription: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -0.2,
      color: theme.colors.textSecondary,
    },
  }), [theme, mode]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="기술 도감" 
          onBackPress={handleBack}
        />

        {/* 콘텐츠 */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            기술 목록 ({SKILL_DATA.length})
          </Text>
          
          {SKILL_DATA.map((skill) => (
            <View 
              key={skill.id} 
              style={[
                styles.skillCard,
                !skill.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.skillHeader}>
                <View style={styles.skillIconContainer}>
                  <Icon 
                    name={skill.icon} 
                    size={24} 
                    color={skill.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>
                    {skill.discovered ? skill.name : '??? 발견되지 않음'}
                  </Text>
                  {skill.type && skill.discovered && (
                    <Text style={styles.skillType}>
                      {skill.type}
                    </Text>
                  )}
                  {skill.cost && skill.discovered && (
                    <Text style={styles.skillCost}>
                      {skill.cost}
                    </Text>
                  )}
                  {skill.rarity && skill.discovered && (
                    <Text style={[
                      styles.skillRarity,
                      { color: getRarityColor(skill.rarity) }
                    ]}>
                      {getRarityText(skill.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {skill.discovered && (
                <Text style={styles.skillDescription}>
                  {skill.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default SkillEncyclopediaScreen; 