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

type CreatureEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface CreatureItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  type?: string;
}

// Mock data for creatures
const CREATURE_DATA: CreatureItem[] = [
  {
    id: 'creature_1',
    name: '마법 고양이',
    description: '마법학원에서 기르는 특별한 고양이. 마법을 감지할 수 있는 능력이 있다.',
    icon: 'cat',
    discovered: true,
    type: '마법 생물',
  },
  {
    id: 'creature_2',
    name: '수정 드래곤',
    description: '수정으로 이루어진 작은 드래곤. 매우 희귀하며 마법의 힘을 증폭시킨다.',
    icon: 'dragon',
    discovered: false,
    rarity: 'legendary',
    type: '드래곤',
  },
  {
    id: 'creature_3',
    name: '요정',
    description: '자연의 힘을 다루는 작은 요정들. 숲을 지키는 수호자들이다.',
    icon: 'butterfly',
    discovered: true,
    type: '요정',
  },
  {
    id: 'creature_4',
    name: '마법 까마귀',
    description: '마법사들과 함께 사는 지능적인 까마귀. 메시지 전달을 도와준다.',
    icon: 'crow',
    discovered: true,
    type: '마법 생물',
  },
  {
    id: 'creature_5',
    name: '고대 거인',
    description: '산과 같은 거대한 고대 거인. 수천 년간 잠들어 있다가 깨어났다.',
    icon: 'account-group',
    discovered: false,
    rarity: 'epic',
    type: '거인',
  },
];

const CreatureEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<CreatureEncyclopediaScreenNavigationProp>();
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
    creatureCard: {
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
    creatureHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    creatureIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    creatureInfo: {
      flex: 1,
    },
    creatureName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    creatureType: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    creatureRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    creatureDescription: {
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
          title="생명체 도감" 
          onBackPress={handleBack}
        />

        {/* 콘텐츠 */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            생명체 목록 ({CREATURE_DATA.length})
          </Text>
          
          {CREATURE_DATA.map((creature) => (
            <View 
              key={creature.id} 
              style={[
                styles.creatureCard,
                !creature.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.creatureHeader}>
                <View style={styles.creatureIconContainer}>
                  <Icon 
                    name={creature.icon} 
                    size={24} 
                    color={creature.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.creatureInfo}>
                  <Text style={styles.creatureName}>
                    {creature.discovered ? creature.name : '??? 발견되지 않음'}
                  </Text>
                  {creature.type && creature.discovered && (
                    <Text style={styles.creatureType}>
                      {creature.type}
                    </Text>
                  )}
                  {creature.rarity && creature.discovered && (
                    <Text style={[
                      styles.creatureRarity,
                      { color: getRarityColor(creature.rarity) }
                    ]}>
                      {getRarityText(creature.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {creature.discovered && (
                <Text style={styles.creatureDescription}>
                  {creature.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default CreatureEncyclopediaScreen; 