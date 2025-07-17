import React, { useCallback } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';

// TypeScript Interfaces
interface HistoryData {
  id: string;
  title: string;
  date: string;
  duration: string;
  level: number;
  experience: number;
  status: 'completed' | 'failed' | 'in_progress';
  achievements: string[];
}

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

// Constants
const MOCK_HISTORY_DATA: HistoryData[] = [
  {
    id: '1',
    title: '신비한 숲의 모험',
    date: '2024-01-15',
    duration: '45분',
    level: 5,
    experience: 1250,
    status: 'completed',
    achievements: ['첫 번째 몬스터 처치', '보물 발견'],
  },
  {
    id: '2',
    title: '고대 던전 탐험',
    date: '2024-01-14',
    duration: '1시간 20분',
    level: 4,
    experience: 980,
    status: 'completed',
    achievements: ['방어구 획득', '마법 아이템 발견'],
  },
  {
    id: '3',
    title: '마법사의 탑',
    date: '2024-01-13',
    duration: '30분',
    level: 3,
    experience: 750,
    status: 'failed',
    achievements: ['마법 서적 발견'],
  },
];

const STATS_DATA: StatItem[] = [
  { icon: 'gamepad-variant', value: '127', label: '총 게임' },
  { icon: 'star', value: '89', label: '승리' },
  { icon: 'trophy', value: '23', label: '업적' },
];

const DETAILED_STATS_DATA: StatItem[] = [
  { icon: 'clock-outline', value: '156시간', label: '총 플레이 시간' },
  { icon: 'trending-up', value: '78%', label: '승률' },
  { icon: 'sword-cross', value: '1,234', label: '처치한 몬스터' },
  { icon: 'package-variant', value: '567', label: '획득한 아이템' },
  { icon: 'map-marker-path', value: '89', label: '탐험한 지역' },
  { icon: 'account-group', value: '12', label: '만난 NPC' },
];

const STATUS_COLORS = {
  completed: '#4CAF50',
  failed: '#d9534f',
  in_progress: '#f0ad4e',
} as const;

const STATUS_LABELS = {
  completed: '완료',
  failed: '실패',
  in_progress: '진행중',
} as const;

// Utility functions
const getStatusColor = (status: HistoryData['status']) => STATUS_COLORS[status];
const getStatusText = (status: HistoryData['status']) => STATUS_LABELS[status];

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.3 Event handlers with useCallback
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleViewAllHistory = useCallback(() => {
    // TODO: 전체 기록 보기 화면으로 이동
    console.log('전체 기록 보기');
  }, []);

  // 5.5 JSX return
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* Header */}
        <GlassmorphismCard
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
              onPress={handleGoBack}
            >
              <Icon
                name="arrow-left"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <Text style={[
              styles.headerTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.xxl,
                fontWeight: theme.typography.weights.bold,
              }
            ]}>기록</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>게임 통계</Text>
            <View style={styles.statsGrid}>
              {STATS_DATA.map((stat, index) => (
                <View key={index} style={[
                  styles.statCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={[
                    styles.statIconContainer,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <Icon name={stat.icon} size={24} color={theme.colors.text} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.xl,
                      fontWeight: theme.typography.weights.bold,
                    }
                  ]}>{stat.value}</Text>
                  <Text style={[
                    styles.statLabel,
                    { 
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.medium,
                    }
                  ]}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Detailed Stats Section */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>상세 통계</Text>
            <View style={styles.detailedStatsGrid}>
              {DETAILED_STATS_DATA.map((stat, index) => (
                <View key={index} style={[
                  styles.detailedStatCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={[
                    styles.detailedStatIconContainer,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <Icon name={stat.icon} size={20} color={theme.colors.text} />
                  </View>
                  <View style={styles.detailedStatContent}>
                    <Text style={[
                      styles.detailedStatValue,
                      { 
                        color: theme.colors.text,
                        fontSize: theme.typography.sizes.md,
                        fontWeight: theme.typography.weights.semibold,
                      }
                    ]}>{stat.value}</Text>
                    <Text style={[
                      styles.detailedStatLabel,
                      { 
                        color: theme.colors.textSecondary,
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.medium,
                      }
                    ]}>{stat.label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* History Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[
                styles.sectionTitle,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>최근 게임 기록</Text>
              <TouchableOpacity 
                style={[styles.viewAllButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleViewAllHistory}
              >
                <Text style={[styles.viewAllButtonText, { color: '#FFFFFF' }]}>
                  더보기
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.historyList}>
              {MOCK_HISTORY_DATA.map((item) => (
                <View key={item.id} style={[
                  styles.historyCard,
                  { backgroundColor: theme.colors.surface }
                ]}>
                  <View style={styles.historyHeader}>
                    <Text style={[
                      styles.historyCardTitle,
                      { 
                        color: theme.colors.text,
                        fontSize: theme.typography.sizes.md,
                        fontWeight: theme.typography.weights.semibold,
                      }
                    ]}>{item.title}</Text>
                    <View style={[
                      styles.historyStatus, 
                      { backgroundColor: getStatusColor(item.status) + '20' }
                    ]}>
                      <Text style={[
                        styles.historyStatusText, 
                        { color: getStatusColor(item.status) }
                      ]}>
                        {getStatusText(item.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.historyDetails,
                    { backgroundColor: theme.colors.elevation1 }
                  ]}>
                    <View style={styles.historyDetailItem}>
                      <Text style={[
                        styles.historyDetailValue,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>{item.date}</Text>
                      <Text style={[
                        styles.historyDetailLabel,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.xs,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>날짜</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={[
                        styles.historyDetailValue,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>{item.duration}</Text>
                      <Text style={[
                        styles.historyDetailLabel,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.xs,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>시간</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={[
                        styles.historyDetailValue,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>Lv.{item.level}</Text>
                      <Text style={[
                        styles.historyDetailLabel,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.xs,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>레벨</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={[
                        styles.historyDetailValue,
                        { 
                          color: theme.colors.text,
                          fontSize: theme.typography.sizes.md,
                          fontWeight: theme.typography.weights.semibold,
                        }
                      ]}>{item.experience}</Text>
                      <Text style={[
                        styles.historyDetailLabel,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.xs,
                          fontWeight: theme.typography.weights.medium,
                        }
                      ]}>경험치</Text>
                    </View>
                  </View>
                  
                  <View style={[
                    styles.achievementsContainer,
                    { backgroundColor: theme.colors.elevation1 }
                  ]}>
                    <Text style={[
                      styles.achievementsTitle,
                      { 
                        color: theme.colors.text,
                        fontSize: theme.typography.sizes.sm,
                        fontWeight: theme.typography.weights.semibold,
                      }
                    ]}>업적</Text>
                    {item.achievements.map((achievement, index) => (
                      <Text key={index} style={[
                        styles.achievementItem,
                        { 
                          color: theme.colors.textSecondary,
                          fontSize: theme.typography.sizes.sm,
                          fontWeight: theme.typography.weights.regular,
                        }
                      ]}>• {achievement}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>


        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// Styles moved outside component
const styles = {
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  headerContent: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  headerTitle: {
    textAlign: 'center' as const,
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    letterSpacing: -0.3,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  statsGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 20,
    alignItems: 'center' as const,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  statValue: {
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    letterSpacing: -0.2,
  },
  detailedStatsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },
  detailedStatCard: {
    width: '48%' as any,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  detailedStatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  detailedStatContent: {
    flex: 1,
  },
  detailedStatValue: {
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  detailedStatLabel: {
    letterSpacing: -0.1,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    borderRadius: 16,
    padding: 20,
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
  historyHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  historyCardTitle: {
    letterSpacing: -0.3,
    flex: 1,
  },
  historyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  historyStatusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  historyDetails: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  historyDetailItem: {
    alignItems: 'center' as const,
  },
  historyDetailValue: {
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  historyDetailLabel: {
    letterSpacing: -0.1,
  },
  achievementsContainer: {
    borderRadius: 12,
    padding: 16,
  },
  achievementsTitle: {
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  achievementItem: {
    marginBottom: 4,
    lineHeight: 18,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  bottomBackButton: {
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButtonLabel: {
    letterSpacing: -0.2,
  },
};

export default HistoryScreen; 