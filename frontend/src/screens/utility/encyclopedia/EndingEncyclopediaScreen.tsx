import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../../components/GlassmorphismHeader';

// 프로젝트 내부 타입 및 테마
import { RootStackParamList } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';

type EndingEncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface EndingData {
  id: string;
  title: string;
  description: string;
  type: 'good' | 'bad' | 'neutral';
  unlockCondition: string;
  isUnlocked: boolean;
  achievementDate?: string;
}

const EndingEncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<EndingEncyclopediaScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // Mock 엔딩 데이터
  const endings: EndingData[] = useMemo(() => [
    {
      id: 'true-mage',
      title: '진정한 마법사',
      description: '마법의 진정한 의미를 깨달아 진정한 마법사가 되었습니다.',
      type: 'good',
      unlockCondition: '마법 레벨 5 이상 달성',
      isUnlocked: true,
      achievementDate: '2024.01.15',
    },
    {
      id: 'knowledge-seeker',
      title: '지식의 탐구자',
      description: '고대 마법서를 완전히 해독하여 지식의 탐구자가 되었습니다.',
      type: 'good',
      unlockCondition: '고대 마법서 해독 완료',
      isUnlocked: true,
      achievementDate: '2024.01.20',
    },
    {
      id: 'dark-mage',
      title: '어둠의 마법사',
      description: '금지된 마법을 사용하여 어둠의 마법사가 되었습니다.',
      type: 'bad',
      unlockCondition: '금지된 마법 사용',
      isUnlocked: false,
    },
    {
      id: 'wanderer',
      title: '방랑자',
      description: '마법학원을 떠나 자유로운 방랑자가 되었습니다.',
      type: 'neutral',
      unlockCondition: '학원 중퇴',
      isUnlocked: false,
    },
    {
      id: 'master-mage',
      title: '마스터 마법사',
      description: '모든 마법을 마스터하여 최고의 마법사가 되었습니다.',
      type: 'good',
      unlockCondition: '모든 마법 레벨 최대 달성',
      isUnlocked: false,
    },
    {
      id: 'fallen-hero',
      title: '타락한 영웅',
      description: '힘에 취해 타락한 영웅이 되었습니다.',
      type: 'bad',
      unlockCondition: '어둠의 힘 사용',
      isUnlocked: false,
    },
  ], []);

  // 이벤트 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEndingPress = useCallback((ending: EndingData) => {
    if (ending.isUnlocked) {
      navigation.navigate('EndingDetail', { endingId: ending.id });
    }
  }, [navigation]);

  // 스타일 정의
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    gridContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginHorizontal: 4,
    },
    thumbnailContainer: {
      aspectRatio: 1,
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: theme.colors.elevation1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    thumbnailText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
    lockIcon: {
      fontSize: 32,
      color: theme.colors.textSecondary,
    },
    titleContainer: {
      height: 60,
      borderRadius: 16,
      marginBottom: 16,
      backgroundColor: theme.colors.elevation1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    titleText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      paddingHorizontal: 12,
    },
    lockedTitleText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
  }), [theme, mode]);

  const getEndingTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'good':
        return mode === 'dark' ? '#4CAF50' : '#66BB6A';
      case 'bad':
        return mode === 'dark' ? '#F44336' : '#EF5350';
      case 'neutral':
        return mode === 'dark' ? '#9E9E9E' : '#757575';
      default:
        return theme.colors.textSecondary;
    }
  }, [theme.colors.textSecondary, mode]);

  // 2열 그리드로 데이터 재구성
  const gridData = useMemo(() => {
    const leftColumn: EndingData[] = [];
    const rightColumn: EndingData[] = [];
    
    endings.forEach((ending, index) => {
      if (index % 2 === 0) {
        leftColumn.push(ending);
      } else {
        rightColumn.push(ending);
      }
    });

    return { leftColumn, rightColumn };
  }, [endings]);

  const renderEndingItem = useCallback((ending: EndingData, isLeft: boolean) => (
    <View key={ending.id} style={isLeft ? styles.column : styles.column}>
      {/* 일러스트 썸네일 */}
      <TouchableOpacity 
        style={styles.thumbnailContainer}
        onPress={() => handleEndingPress(ending)}
        disabled={!ending.isUnlocked}
      >
        {ending.isUnlocked ? (
          <Text style={styles.thumbnailText}>엔딩 일러스트 썸네일</Text>
        ) : (
          <Icon name="lock" style={styles.lockIcon} />
        )}
      </TouchableOpacity>
      
      {/* 엔딩 타이틀 */}
      <TouchableOpacity 
        style={styles.titleContainer}
        onPress={() => handleEndingPress(ending)}
        disabled={!ending.isUnlocked}
      >
        <Text style={ending.isUnlocked ? styles.titleText : styles.lockedTitleText}>
          {ending.isUnlocked ? ending.title : '???'}
        </Text>
      </TouchableOpacity>
    </View>
  ), [styles, handleEndingPress]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="엔딩 도감" 
          onBackPress={handleBack}
        />

        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 게임 요약 섹션 */}
            <GlassmorphismCard style={{ marginBottom: 20, padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: theme.colors.text,
                textAlign: 'center'
              }}>
                게임 요약
              </Text>
            </GlassmorphismCard>

            {/* 2열 그리드 레이아웃 */}
            <View style={styles.gridContainer}>
              {/* 왼쪽 컬럼 */}
              <View style={styles.column}>
                {gridData.leftColumn.map((ending, index) => 
                  renderEndingItem(ending, true)
                )}
              </View>
              
              {/* 오른쪽 컬럼 */}
              <View style={styles.column}>
                {gridData.rightColumn.map((ending, index) => 
                  renderEndingItem(ending, false)
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default EndingEncyclopediaScreen; 