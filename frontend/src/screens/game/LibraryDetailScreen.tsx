import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../components/GlassmorphismHeader';

// 프로젝트 내부 타입 및 테마
import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';

type LibraryDetailScreenNavigationProp = StackNavigationProp<any, any>;
type LibraryDetailScreenRouteProp = RouteProp<{ LibraryDetail: { storyId: string } }, 'LibraryDetail'>;

interface StoryPackage {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  isActive: boolean;
  isPurchased: boolean;
  progress: number; // 0-100
  storyCount: number;
  estimatedPlayTime: string;
  difficulty: 'easy' | 'normal' | 'hard';
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  progress: number; // 0-100
}

const LibraryDetailScreen: React.FC = () => {
  const navigation = useNavigation<LibraryDetailScreenNavigationProp>();
  const route = useRoute<LibraryDetailScreenRouteProp>();
  const { theme, mode } = useTheme();

  // Mock 스토리 상세 데이터
  const storyData: StoryPackage = useMemo(() => {
    const storyId = route.params?.storyId;
    
    // 실제로는 API에서 데이터를 가져와야 함
    const mockStories: Record<string, StoryPackage> = {
      'story_1': {
        id: 'story_1',
        title: '마법학원 입학편',
        description: '마법학원에 입학하여 첫 번째 마법을 배우는 이야기입니다.',
        detailedDescription: '마법학원에 입학한 당신은 마법의 세계로의 첫 발걸음을 내딛게 됩니다. 새로운 친구들과의 만남, 첫 번째 마법 수업, 그리고 마법학원의 다양한 시험들을 경험하게 됩니다. 각 선택지마다 새로운 경험이 기다리고 있으며, 플레이어의 결정에 따라 스토리의 방향이 달라집니다. 마법의 기초를 배우며 성장해 나가는 과정에서 진정한 마법사가 되어가는 여정을 그린 이야기입니다.',
        isActive: true,
        isPurchased: true,
        progress: 75,
        storyCount: 5,
        estimatedPlayTime: '2-3시간',
        difficulty: 'easy',
        achievements: [
          {
            id: 'ach_1',
            title: '첫 번째 마법',
            description: '첫 번째 마법을 성공적으로 시전하세요',
            isCompleted: true,
            progress: 100,
          },
          {
            id: 'ach_2',
            title: '친구 만들기',
            description: '3명의 친구와 친밀도를 50 이상 달성하세요',
            isCompleted: true,
            progress: 100,
          },
          {
            id: 'ach_3',
            title: '시험 통과',
            description: '첫 번째 마법 시험에 합격하세요',
            isCompleted: false,
            progress: 60,
          },
          {
            id: 'ach_4',
            title: '마법의 이해',
            description: '모든 마법 이론 수업을 완료하세요',
            isCompleted: false,
            progress: 40,
          },
        ],
      },
      'story_2': {
        id: 'story_2',
        title: '고대 유적 탐험편',
        description: '신비로운 고대 유적을 탐험하며 잃어버린 마법의 비밀을 찾는 모험입니다.',
        detailedDescription: '고대의 마법사들이 남긴 신비로운 유적을 발견한 당신은 그 안에 숨겨진 마법의 비밀을 찾기 위해 위험한 탐험을 떠나게 됩니다. 함정이 가득한 지하 미로, 강력한 마법 생물들, 그리고 고대의 마법 장치들을 만나게 됩니다. 각 선택지마다 새로운 도전이 기다리고 있으며, 전략적 사고와 빠른 판단이 요구되는 모험입니다. 고대의 비밀을 밝혀내며 진정한 모험가가 되어가는 여정을 그린 이야기입니다.',
        isActive: false,
        isPurchased: true,
        progress: 30,
        storyCount: 7,
        estimatedPlayTime: '3-4시간',
        difficulty: 'normal',
        achievements: [
          {
            id: 'ach_1',
            title: '유적 발견',
            description: '고대 유적의 입구를 발견하세요',
            isCompleted: true,
            progress: 100,
          },
          {
            id: 'ach_2',
            title: '함정 회피',
            description: '모든 함정을 성공적으로 피하세요',
            isCompleted: false,
            progress: 30,
          },
          {
            id: 'ach_3',
            title: '고대 마법 해독',
            description: '고대 마법서를 해독하세요',
            isCompleted: false,
            progress: 0,
          },
          {
            id: 'ach_4',
            title: '보물 획득',
            description: '유적의 보물을 획득하세요',
            isCompleted: false,
            progress: 0,
          },
        ],
      },
    };

    return mockStories[storyId] || mockStories['story_1'];
  }, [route.params?.storyId]);

  // 이벤트 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
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
    storyOutputContainer: {
      flex: 1,
    },
    storyOutputContent: {
      paddingBottom: 20,
    },
    illustrationArea: {
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      minHeight: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.elevation1,
    },
    illustrationText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    titleArea: {
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      backgroundColor: theme.colors.elevation1,
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },

    descriptionArea: {
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      backgroundColor: theme.colors.elevation1,
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    descriptionText: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
      marginBottom: 20,
    },

    achievementButton: {
      borderRadius: 16,
      padding: 20,
      marginTop: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.elevation1,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    achievementButtonContent: {
      flex: 1,
    },
    achievementButtonTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    achievementButtonSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  }), [theme, mode]);



  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="서재 상세" 
          onBackPress={handleBack}
        />

        <View style={styles.mainContent}>
          <ScrollView 
            style={styles.storyOutputContainer}
            contentContainerStyle={styles.storyOutputContent}
            showsVerticalScrollIndicator={true}
          >
            {/* 스토리 일러스트 영역 */}
            <View style={styles.illustrationArea}>
              <Text style={styles.illustrationText}>스토리 일러스트</Text>
            </View>

            {/* 스토리 타이틀 영역 */}
            <View style={styles.titleArea}>
              <Text style={styles.titleText}>{storyData.title}</Text>
            </View>

            {/* 스토리 줄거리 영역 */}
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionTitle}>스토리 줄거리</Text>
              <Text style={styles.descriptionText}>
                {storyData.detailedDescription}
              </Text>
            </View>

            {/* 달성도 버튼 */}
            <TouchableOpacity style={styles.achievementButton}>
              <View style={styles.achievementButtonContent}>
                <Text style={styles.achievementButtonTitle}>달성도</Text>
                <Text style={styles.achievementButtonSubtitle}>
                  {storyData.achievements.filter(ach => ach.isCompleted).length} / {storyData.achievements.length}
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={24} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>


          </ScrollView>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default LibraryDetailScreen; 