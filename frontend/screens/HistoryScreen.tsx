import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { theme, mode } = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const historyData = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'failed':
        return '#d9534f';
      default:
        return '#f0ad4e';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'failed':
        return '실패';
      default:
        return '진행중';
    }
  };

  const styles = StyleSheet.create({
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
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    statCard: {
      flex: 1,
      marginHorizontal: 4,
      padding: 20,
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
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
    statIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.4)',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 13,
      fontWeight: '500',
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: -0.2,
    },
    historyList: {
      gap: 12,
    },
    historyCard: {
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
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    historyCardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
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
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    historyDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      padding: 16,
    },
    historyDetailItem: {
      alignItems: 'center',
    },
    historyDetailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    historyDetailLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
      letterSpacing: -0.1,
    },
    achievementsContainer: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      padding: 16,
    },
    achievementsTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    achievementItem: {
      fontSize: 13,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 4,
      lineHeight: 18,
    },
    backButton: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 16,
      marginTop: 24,
      marginBottom: 32,
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
    backButtonLabel: {
      color: mode === 'dark' ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
  });

  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        {/* Header */}
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.15}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>기록</Text>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>게임 통계</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Icon name="gamepad-variant" size={24} color={mode === 'dark' ? '#ffffff' : '#000000'} />
                </View>
                <Text style={styles.statValue}>127</Text>
                <Text style={styles.statLabel}>총 게임</Text>
              </View>
              
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Icon name="star" size={24} color={mode === 'dark' ? '#ffffff' : '#000000'} />
                </View>
                <Text style={styles.statValue}>89</Text>
                <Text style={styles.statLabel}>승리</Text>
              </View>
              
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Icon name="trophy" size={24} color={mode === 'dark' ? '#ffffff' : '#000000'} />
                </View>
                <Text style={styles.statValue}>23</Text>
                <Text style={styles.statLabel}>업적</Text>
              </View>
            </View>
          </View>

          {/* History Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>최근 게임 기록</Text>
            <View style={styles.historyList}>
              {historyData.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyCardTitle}>{item.title}</Text>
                    <View style={[styles.historyStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                      <Text style={[styles.historyStatusText, { color: getStatusColor(item.status) }]}>
                        {getStatusText(item.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.historyDetails}>
                    <View style={styles.historyDetailItem}>
                      <Text style={styles.historyDetailValue}>{item.date}</Text>
                      <Text style={styles.historyDetailLabel}>날짜</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={styles.historyDetailValue}>{item.duration}</Text>
                      <Text style={styles.historyDetailLabel}>시간</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={styles.historyDetailValue}>Lv.{item.level}</Text>
                      <Text style={styles.historyDetailLabel}>레벨</Text>
                    </View>
                    <View style={styles.historyDetailItem}>
                      <Text style={styles.historyDetailValue}>{item.experience}</Text>
                      <Text style={styles.historyDetailLabel}>경험치</Text>
                    </View>
                  </View>
                  
                  <View style={styles.achievementsContainer}>
                    <Text style={styles.achievementsTitle}>업적</Text>
                    {item.achievements.map((achievement, index) => (
                      <Text key={index} style={styles.achievementItem}>• {achievement}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <Button 
            onPress={handleGoBack}
            mode="contained"
            style={styles.backButton}
            labelStyle={styles.backButtonLabel}
          >
            뒤로가기
          </Button>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default HistoryScreen; 