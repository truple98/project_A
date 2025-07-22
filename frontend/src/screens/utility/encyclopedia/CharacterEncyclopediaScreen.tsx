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

type CharacterEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface CharacterItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  role?: string;
}

// Mock data for characters
const CHARACTER_DATA: CharacterItem[] = [
  {
    id: 'char_1',
    name: '엘드리치 장로',
    description: '마법사 길드의 현명한 장로. 수백 년간 마법을 연구해온 전설적인 마법사다.',
    icon: 'account-wizard',
    discovered: true,
    role: '마법사 길드 장로',
  },
  {
    id: 'char_2',
    name: '리나 파이어스피어',
    description: '같은 학년의 엘리트 마법사. 화염 마법에 특화되어 있으며 경쟁심이 강하다.',
    icon: 'account',
    discovered: true,
    role: '학생',
  },
  {
    id: 'char_3',
    name: '마스터 조르단',
    description: '마법 실습 담당 교수. 엄격하지만 학생들을 진심으로 아끼는 분이다.',
    icon: 'account-tie',
    discovered: true,
    role: '교수',
  },
  {
    id: 'char_4',
    name: '미스터리한 여행자',
    description: '정체를 알 수 없는 신비로운 여행자. 과거에 대한 기억을 잃어버린 것 같다.',
    icon: 'account-question',
    discovered: false,
    rarity: 'rare',
    role: '여행자',
  },
  {
    id: 'char_5',
    name: '드래곤 슬레이어',
    description: '전설적인 드래곤 사냥꾼. 수많은 드래곤을 물리친 영웅이다.',
    icon: 'sword-cross',
    discovered: false,
    rarity: 'legendary',
    role: '영웅',
  },
];

const CharacterEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<CharacterEncyclopediaScreenNavigationProp>();
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
    characterCard: {
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
    characterHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    characterIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    characterInfo: {
      flex: 1,
    },
    characterName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    characterRole: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    characterRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    characterDescription: {
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
          title="인물 도감" 
          onBackPress={handleBack}
        />

        {/* 콘텐츠 */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            인물 목록 ({CHARACTER_DATA.length})
          </Text>
          
          {CHARACTER_DATA.map((character) => (
            <View 
              key={character.id} 
              style={[
                styles.characterCard,
                !character.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.characterHeader}>
                <View style={styles.characterIconContainer}>
                  <Icon 
                    name={character.icon} 
                    size={24} 
                    color={character.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.characterInfo}>
                  <Text style={styles.characterName}>
                    {character.discovered ? character.name : '??? 발견되지 않음'}
                  </Text>
                  {character.role && character.discovered && (
                    <Text style={styles.characterRole}>
                      {character.role}
                    </Text>
                  )}
                  {character.rarity && character.discovered && (
                    <Text style={[
                      styles.characterRarity,
                      { color: getRarityColor(character.rarity) }
                    ]}>
                      {getRarityText(character.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {character.discovered && (
                <Text style={styles.characterDescription}>
                  {character.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default CharacterEncyclopediaScreen; 