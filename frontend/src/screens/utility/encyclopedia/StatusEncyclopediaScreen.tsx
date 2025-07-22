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

type StatusEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface StatusData {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
}

// Mock data for status effects
const STATUS_DATA: StatusData[] = [
  {
    id: 'status_1',
    name: '행동력',
    description: '하루에 할 수 있는 행동의 수. 마법 사용이나 탐험에 소모된다.',
    icon: 'lightning-bolt',
    discovered: true,
    effect: '게임 진행에 필수',
  },
  {
    id: 'status_2',
    name: '생명력',
    description: '캐릭터의 생명을 나타내는 수치. 위험한 상황에서 소모될 수 있다.',
    icon: 'heart',
    discovered: true,
    effect: '생존에 필수',
  },
  {
    id: 'status_3',
    name: '마법력',
    description: '마법을 사용할 수 있는 힘. 강력한 마법일수록 더 많이 소모된다.',
    icon: 'magic-staff',
    discovered: true,
    effect: '마법 사용에 필요',
  },
  {
    id: 'status_4',
    name: '독 상태',
    description: '독에 걸린 상태. 시간이 지나면서 생명력이 감소한다.',
    icon: 'poison',
    discovered: false,
    rarity: 'rare',
    effect: '생명력 감소',
  },
  {
    id: 'status_5',
    name: '신성한 보호',
    description: '신의 축복을 받은 상태. 모든 피해를 절반으로 줄인다.',
    icon: 'shield-cross',
    discovered: false,
    rarity: 'epic',
    effect: '피해 감소 50%',
  },
];

const StatusEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<StatusEncyclopediaScreenNavigationProp>();
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
    statusCard: {
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
    statusHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    statusInfo: {
      flex: 1,
    },
    statusName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    statusEffect: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 2,
      letterSpacing: -0.1,
      color: theme.colors.textSecondary,
    },
    statusRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    statusDescription: {
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
          title="상태 도감" 
          onBackPress={handleBack}
        />

        {/* 콘텐츠 */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            상태 목록 ({STATUS_DATA.length})
          </Text>
          
          {STATUS_DATA.map((status) => (
            <View 
              key={status.id} 
              style={[
                styles.statusCard,
                !status.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.statusHeader}>
                <View style={styles.statusIconContainer}>
                  <Icon 
                    name={status.icon} 
                    size={24} 
                    color={status.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusName}>
                    {status.discovered ? status.name : '??? 발견되지 않음'}
                  </Text>
                  {status.effect && status.discovered && (
                    <Text style={styles.statusEffect}>
                      {status.effect}
                    </Text>
                  )}
                  {status.rarity && status.discovered && (
                    <Text style={[
                      styles.statusRarity,
                      { color: getRarityColor(status.rarity) }
                    ]}>
                      {getRarityText(status.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {status.discovered && (
                <Text style={styles.statusDescription}>
                  {status.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default StatusEncyclopediaScreen; 