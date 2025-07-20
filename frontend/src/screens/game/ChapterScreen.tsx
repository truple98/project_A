import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';

// 프로젝트 내부 타입 및 테마
import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';

type ChapterScreenNavigationProp = StackNavigationProp<any, any>;

interface StoryPackage {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isPurchased: boolean;
  progress: number; // 0-100
  storyCount: number;
  estimatedPlayTime: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

// Mock data - 보유한 스토리 패키지만
const STORY_PACKAGES: StoryPackage[] = [
  {
    id: 'story_1',
    title: '마법학원 입학편',
    description: '마법학원에 입학하여 첫 번째 마법을 배우는 이야기입니다. 친구들과의 만남, 첫 번째 시험, 그리고 마법의 세계로의 첫 발걸음을 경험하세요.',
    isActive: true,
    isPurchased: true,
    progress: 75,
    storyCount: 5,
    estimatedPlayTime: '2-3시간',
    difficulty: 'easy',
  },
  {
    id: 'story_2',
    title: '고대 유적 탐험편',
    description: '신비로운 고대 유적을 탐험하며 잃어버린 마법의 비밀을 찾는 모험입니다. 위험한 함정과 강력한 마법 생물들을 만나게 됩니다.',
    isActive: false,
    isPurchased: true,
    progress: 30,
    storyCount: 7,
    estimatedPlayTime: '3-4시간',
    difficulty: 'normal',
  },
];

const ChapterScreen = () => {
  const navigation = useNavigation<ChapterScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 이벤트 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStoryPress = useCallback((storyPackage: StoryPackage) => {
    // 스토리 상세 페이지로 이동
    (navigation as any).navigate('ChapterDetail', { storyId: storyPackage.id });
  }, [navigation]);

  // 스타일 정의
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: 80,
      paddingBottom: 32,
      paddingHorizontal: 24,
      marginHorizontal: 24,
      marginTop: 24,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.5,
      color: theme.colors.text,
      flex: 1,
      textAlign: 'center',
    },
    placeholder: {
      width: 48,
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
      height: 100,
      borderRadius: 16,
      marginBottom: 16,
      backgroundColor: theme.colors.elevation1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 12,
    },
    titleText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: 18,
      marginBottom: 4,
    },
    progressText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    lockedTitleText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },

  }), [theme, mode]);

  const getProgressColor = useCallback((progress: number) => {
    if (progress >= 80) return mode === 'dark' ? '#66BB6A' : '#4CAF50';
    if (progress >= 50) return mode === 'dark' ? '#FFA726' : '#FF9800';
    return mode === 'dark' ? '#EF5350' : '#F44336';
  }, [mode]);

  // 2열 그리드로 데이터 재구성
  const gridData = useMemo(() => {
    const leftColumn: StoryPackage[] = [];
    const rightColumn: StoryPackage[] = [];
    
    STORY_PACKAGES.forEach((storyPackage, index) => {
      if (index % 2 === 0) {
        leftColumn.push(storyPackage);
      } else {
        rightColumn.push(storyPackage);
      }
    });

    return { leftColumn, rightColumn };
  }, []);

  const renderStoryItem = useCallback((storyPackage: StoryPackage, isLeft: boolean) => (
    <View key={storyPackage.id} style={isLeft ? styles.column : styles.column}>
      {/* 스토리 일러스트 썸네일 */}
      <TouchableOpacity 
        style={styles.thumbnailContainer}
        onPress={() => handleStoryPress(storyPackage)}
      >
        <Text style={styles.thumbnailText}>스토리 일러스트 썸네일</Text>
        {!storyPackage.isPurchased && (
          <Icon name="lock" style={styles.lockIcon} />
        )}
      </TouchableOpacity>
      
      {/* 스토리 타이틀 */}
      <TouchableOpacity 
        style={styles.titleContainer}
        onPress={() => handleStoryPress(storyPackage)}
      >
        <Text style={storyPackage.isPurchased ? styles.titleText : styles.lockedTitleText}>
          {storyPackage.isPurchased ? storyPackage.title : '???'}
        </Text>
        {storyPackage.isPurchased && (
          <Text style={styles.progressText}>
            진행률: {storyPackage.progress}%
          </Text>
        )}
      </TouchableOpacity>
    </View>
  ), [styles, handleStoryPress]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* 헤더 */}
        <GlassmorphismCard style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Icon
                name="arrow-left"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>챕터</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 스토리 패키지 섹션 */}
            <GlassmorphismCard style={{ marginBottom: 20, padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: theme.colors.text,
                textAlign: 'center'
              }}>
                스토리 패키지
              </Text>
            </GlassmorphismCard>

            {/* 2열 그리드 레이아웃 */}
            <View style={styles.gridContainer}>
              {/* 왼쪽 컬럼 */}
              <View style={styles.column}>
                {gridData.leftColumn.map((storyPackage, index) => 
                  renderStoryItem(storyPackage, true)
                )}
              </View>
              
              {/* 오른쪽 컬럼 */}
              <View style={styles.column}>
                {gridData.rightColumn.map((storyPackage, index) => 
                  renderStoryItem(storyPackage, false)
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default ChapterScreen; 