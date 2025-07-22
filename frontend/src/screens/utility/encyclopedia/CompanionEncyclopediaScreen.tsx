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

type CompanionEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface CompanionItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  role?: string;
}

// Mock data for companions
const COMPANION_DATA: CompanionItem[] = [
  {
    id: 'companion_1',
    name: '아리아 스톰윈드',
    description: '당신의 캐릭터. 마법학원에 입학한 신입 마법사로, 잠재력이 무한하다.',
    icon: 'account-star',
    discovered: true,
    role: '주인공',
  },
  {
    id: 'companion_2',
    name: '마법 고양이 루나',
    description: '당신의 충실한 동반자. 마법을 감지하고 위험을 미리 알려준다.',
    icon: 'cat',
    discovered: true,
    role: '펫',
  },
  {
    id: 'companion_3',
    name: '수호 정령',
    description: '당신을 보호하는 마법 정령. 위험한 상황에서 도움을 준다.',
    icon: 'ghost',
    discovered: false,
    rarity: 'rare',
    role: '수호자',
  },
  {
    id: 'companion_4',
    name: '드래곤 라이더',
    description: '드래곤과 함께 싸우는 전설적인 동료. 하늘을 날아다닌다.',
    icon: 'dragon',
    discovered: false,
    rarity: 'legendary',
    role: '전사',
  },
];

const CompanionEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<CompanionEncyclopediaScreenNavigationProp>();
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
    companionCard: {
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
    companionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    companionIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    companionInfo: {
      flex: 1,
    },
    companionName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    companionRole: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    companionRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    companionDescription: {
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
          title="동료 도감" 
          onBackPress={handleBack}
        />

        {/* 콘텐츠 */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            동료 목록 ({COMPANION_DATA.length})
          </Text>
          
          {COMPANION_DATA.map((companion) => (
            <View 
              key={companion.id} 
              style={[
                styles.companionCard,
                !companion.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.companionHeader}>
                <View style={styles.companionIconContainer}>
                  <Icon 
                    name={companion.icon} 
                    size={24} 
                    color={companion.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.companionInfo}>
                  <Text style={styles.companionName}>
                    {companion.discovered ? companion.name : '??? 발견되지 않음'}
                  </Text>
                  {companion.role && companion.discovered && (
                    <Text style={styles.companionRole}>
                      {companion.role}
                    </Text>
                  )}
                  {companion.rarity && companion.discovered && (
                    <Text style={[
                      styles.companionRarity,
                      { color: getRarityColor(companion.rarity) }
                    ]}>
                      {getRarityText(companion.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {companion.discovered && (
                <Text style={styles.companionDescription}>
                  {companion.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default CompanionEncyclopediaScreen; 