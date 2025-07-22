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

type LocationEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface LocationItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

// Mock data for locations
const LOCATION_DATA: LocationItem[] = [
  {
    id: 'location_1',
    name: '아르카니아 마법학원',
    description: '고대 마법의 비밀을 배우는 마법사들의 성지. 높은 탑과 도서관이 있는 웅장한 건물이다.',
    icon: 'castle',
    discovered: true,
  },
  {
    id: 'location_2',
    name: '마을 여관',
    description: '여행자들이 쉬어가는 따뜻한 여관. 마을의 소문과 정보를 얻을 수 있는 곳이다.',
    icon: 'home',
    discovered: true,
  },
  {
    id: 'location_3',
    name: '고대 유적',
    description: '신비로운 힘이 깃든 고대 유적. 아직 탐험되지 않은 곳이 많다.',
    icon: 'temple-buddhist',
    discovered: false,
    rarity: 'rare',
  },
  {
    id: 'location_4',
    name: '마법 상점',
    description: '마법사들이 사용하는 다양한 도구와 재료를 판매하는 상점.',
    icon: 'store',
    discovered: true,
  },
  {
    id: 'location_5',
    name: '숲속 신전',
    description: '자연의 힘을 숭배하는 드루이드들의 신전. 치유의 마법이 깃들어 있다.',
    icon: 'tree',
    discovered: false,
    rarity: 'epic',
  },
];

const LocationEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<LocationEncyclopediaScreenNavigationProp>();
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
    locationCard: {
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
    locationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    locationInfo: {
      flex: 1,
    },
    locationName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    locationRarity: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: -0.1,
    },
    locationDescription: {
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
          title="장소 도감" 
          onBackPress={handleBack}
        />

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            장소 목록 ({LOCATION_DATA.length})
          </Text>
          
          {LOCATION_DATA.map((location) => (
            <View 
              key={location.id} 
              style={[
                styles.locationCard,
                !location.discovered && styles.undiscoveredCard
              ]}
            >
              <View style={styles.locationHeader}>
                <View style={styles.locationIconContainer}>
                  <Icon 
                    name={location.icon} 
                    size={24} 
                    color={location.discovered ? theme.colors.primary : theme.colors.textSecondary} 
                  />
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>
                    {location.discovered ? location.name : '??? 발견되지 않음'}
                  </Text>
                  {location.rarity && location.discovered && (
                    <Text style={[
                      styles.locationRarity,
                      { color: getRarityColor(location.rarity) }
                    ]}>
                      {getRarityText(location.rarity)}
                    </Text>
                  )}
                </View>
              </View>
              
              {location.discovered && (
                <Text style={styles.locationDescription}>
                  {location.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default LocationEncyclopediaScreen; 