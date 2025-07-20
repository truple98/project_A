import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../../components/GlassmorphismCard';

// 프로젝트 내부 타입 및 테마
import { RootStackParamList } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';

type EndingDetailScreenNavigationProp = StackNavigationProp<any, any>;
type EndingDetailScreenRouteProp = RouteProp<{ EndingDetail: { endingId: string } }, 'EndingDetail'>;

interface EndingDetailData {
  id: string;
  title: string;
  description: string;
  type: 'good' | 'bad' | 'neutral';
  illustration: string;
  story: string;
  unlockCondition: string;
  achievementDate?: string;
}

const EndingDetailScreen: React.FC = () => {
  const navigation = useNavigation<EndingDetailScreenNavigationProp>();
  const route = useRoute<EndingDetailScreenRouteProp>();
  const { theme, mode } = useTheme();

  // Mock 엔딩 상세 데이터
  const endingData: EndingDetailData = useMemo(() => {
    const endingId = route.params?.endingId;
    
    // 실제로는 API에서 데이터를 가져와야 함
    const mockEndings: Record<string, EndingDetailData> = {
      'true-mage': {
        id: 'true-mage',
        title: '진정한 마법사',
        description: '마법의 진정한 의미를 깨달아 진정한 마법사가 되었습니다.',
        type: 'good',
        illustration: '일러스트',
        story: `당신은 마법학원에서의 모험을 통해 진정한 마법의 의미를 깨달았습니다.

고대 마법서를 해독하면서 발견한 것은 단순한 힘이 아닌, 지식과 지혜의 가치였습니다. 엘드리치 장로는 당신의 성장을 지켜보며 미래의 마법사로서의 가능성을 확인했습니다.

리나와의 경쟁은 서로를 성장시키는 동반자 관계로 발전했고, 마스터 조르단의 엄격한 지도는 당신을 더욱 견고하게 만들었습니다.

이제 당신은 진정한 마법사가 되었습니다. 하지만 이것은 끝이 아닌 새로운 시작입니다. 마법의 세계는 무한한 가능성으로 가득하고, 당신 앞에는 더욱 흥미로운 모험이 기다리고 있습니다.

당신의 여정을 함께해주셔서 감사합니다.`,
        unlockCondition: '마법 레벨 5 이상 달성',
        achievementDate: '2024.01.15',
      },
      'knowledge-seeker': {
        id: 'knowledge-seeker',
        title: '지식의 탐구자',
        description: '고대 마법서를 완전히 해독하여 지식의 탐구자가 되었습니다.',
        type: 'good',
        illustration: '일러스트',
        story: `고대 마법서를 해독하면서 발견한 것은 단순한 힘이 아닌, 지식과 지혜의 가치였습니다.

도서관의 먼지 쌓인 책장들 사이에서 당신은 고대 마법사들이 남긴 지식의 보물을 발견했습니다. 각 페이지마다 새로운 발견이 있었고, 해독할 때마다 마법의 본질에 대한 이해가 깊어졌습니다.

엘드리치 장로는 당신의 학구열에 감탄하며 "진정한 마법사는 힘을 추구하는 자가 아니라 지식을 추구하는 자"라고 말했습니다.

이제 당신은 지식의 탐구자로서 마법의 세계에 새로운 빛을 비추게 되었습니다.`,
        unlockCondition: '고대 마법서 해독 완료',
        achievementDate: '2024.01.20',
      },
    };

    return mockEndings[endingId] || mockEndings['true-mage'];
  }, [route.params?.endingId]);

  // 이벤트 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
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
    textOutputArea: {
      borderRadius: 16,
      padding: 24,
      backgroundColor: theme.colors.elevation1,
    },
    storyText: {
      fontSize: 16,
      lineHeight: 28,
      color: theme.colors.text,
      textAlign: 'left',
      letterSpacing: -0.2,
    },
    endingInfo: {
      marginBottom: 20,
      padding: 20,
      borderRadius: 16,
      backgroundColor: theme.colors.elevation1,
    },
    endingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    endingDescription: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 16,
      lineHeight: 22,
    },
    endingMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    endingType: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      fontSize: 14,
      fontWeight: '600',
    },
    achievementDate: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  }), [theme, mode]);

  const getEndingTypeStyle = useCallback((type: string) => {
    switch (type) {
      case 'good':
        return {
          ...styles.endingType,
          backgroundColor: mode === 'dark' ? '#4CAF50' : '#66BB6A',
          color: '#FFFFFF',
        };
      case 'bad':
        return {
          ...styles.endingType,
          backgroundColor: mode === 'dark' ? '#F44336' : '#EF5350',
          color: '#FFFFFF',
        };
      case 'neutral':
        return {
          ...styles.endingType,
          backgroundColor: mode === 'dark' ? '#9E9E9E' : '#757575',
          color: '#FFFFFF',
        };
      default:
        return styles.endingType;
    }
  }, [styles.endingType, mode]);

  const getEndingTypeText = useCallback((type: string) => {
    switch (type) {
      case 'good':
        return '좋은 엔딩';
      case 'bad':
        return '나쁜 엔딩';
      case 'neutral':
        return '중립 엔딩';
      default:
        return '알 수 없음';
    }
  }, []);

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
            <Text style={styles.headerTitle}>엔딩 상세</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <View style={styles.mainContent}>
          <ScrollView 
            style={styles.storyOutputContainer}
            contentContainerStyle={styles.storyOutputContent}
            showsVerticalScrollIndicator={true}
          >
            {/* 엔딩 정보 */}
            <View style={styles.endingInfo}>
              <Text style={styles.endingTitle}>{endingData.title}</Text>
              <Text style={styles.endingDescription}>
                {endingData.description}
              </Text>
              <View style={styles.endingMeta}>
                <Text style={getEndingTypeStyle(endingData.type)}>
                  {getEndingTypeText(endingData.type)}
                </Text>
                {endingData.achievementDate && (
                  <Text style={styles.achievementDate}>
                    달성일: {endingData.achievementDate}
                  </Text>
                )}
              </View>
            </View>

            {/* 일러스트 영역 */}
            <View style={styles.illustrationArea}>
              <Text style={styles.illustrationText}>{endingData.illustration}</Text>
            </View>

            {/* 스토리 텍스트 영역 */}
            <View style={styles.textOutputArea}>
              <Text style={styles.storyText}>{endingData.story}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default EndingDetailScreen; 