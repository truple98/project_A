// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface StoryPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  isOnSale: boolean;
  isOwned: boolean;
  storyCount: number;
  estimatedPlayTime: string;
  difficulty: 'easy' | 'normal' | 'hard';
  tags: string[];
  imageUrl?: string;
}

// 4. 상수 및 유틸리티 변수 정의
const MOCK_STORY_PACKAGES: StoryPackage[] = [
  {
    id: '1',
    title: '신비한 숲의 모험',
    description: '고대의 숲에서 펼쳐지는 신비로운 모험. 숲의 비밀을 탐험하며 새로운 친구들을 만나보세요.',
    price: 2900,
    originalPrice: 3900,
    isOnSale: true,
    isOwned: false,
    storyCount: 5,
    estimatedPlayTime: '2-3시간',
    difficulty: 'easy',
    tags: ['판타지', '모험', '친구'],
  },
  {
    id: '2',
    title: '고대 던전 탐험',
    description: '깊은 지하 던전에서 보물을 찾아라! 함정과 몬스터가 가득한 위험한 던전을 탐험하세요.',
    price: 3900,
    isOnSale: false,
    isOwned: true,
    storyCount: 7,
    estimatedPlayTime: '3-4시간',
    difficulty: 'normal',
    tags: ['던전', '보물', '전투'],
  },
  {
    id: '3',
    title: '마법사의 탑',
    description: '마법의 힘을 배우며 탑을 정복하라. 강력한 마법과 지혜를 얻어 최고의 마법사가 되세요.',
    price: 4900,
    originalPrice: 5900,
    isOnSale: true,
    isOwned: false,
    storyCount: 8,
    estimatedPlayTime: '4-5시간',
    difficulty: 'hard',
    tags: ['마법', '학습', '성장'],
  },
  {
    id: '4',
    title: '해적의 보물섬',
    description: '바다를 건너 보물섬으로 향하라! 해적들과의 전투와 보물 찾기 모험이 기다리고 있습니다.',
    price: 3500,
    isOnSale: false,
    isOwned: false,
    storyCount: 6,
    estimatedPlayTime: '2-3시간',
    difficulty: 'normal',
    tags: ['해적', '보물', '바다'],
  },
  {
    id: '5',
    title: '우주 탐험대',
    description: '우주를 탐험하며 새로운 행성을 발견하라! 외계 생명체와의 만남과 우주의 비밀을 탐구하세요.',
    price: 5900,
    isOnSale: false,
    isOwned: false,
    storyCount: 10,
    estimatedPlayTime: '5-6시간',
    difficulty: 'hard',
    tags: ['우주', '탐험', 'SF'],
  },
  {
    id: '6',
    title: '시간 여행자',
    description: '시간을 넘나드는 모험을 떠나보세요. 과거와 미래를 오가며 역사의 비밀을 밝혀내세요.',
    price: 4500,
    isOnSale: false,
    isOwned: false,
    storyCount: 9,
    estimatedPlayTime: '4-5시간',
    difficulty: 'hard',
    tags: ['시간여행', '역사', '모험'],
  },
];

// 5. 메인 스크린 컴포넌트 함수 정의
const StoreScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStoryPress = useCallback((storyPackage: StoryPackage) => {
    // 스토리 상세 페이지로 이동
    (navigation as any).navigate('StoreDetail', { storyId: storyPackage.id });
  }, [navigation]);

  const handlePurchase = useCallback((storyPackage: StoryPackage) => {
    if (storyPackage.isOwned) {
      Alert.alert('이미 보유한 상품', '이 스토리 패키지는 이미 구매하셨습니다.');
      return;
    }

    Alert.alert(
      '구매 확인',
      `${storyPackage.title}\n가격: ${storyPackage.price.toLocaleString()}원\n\n이 상품을 구매하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '구매', 
          onPress: () => {
            // TODO: 실제 결제 로직 구현
            Alert.alert('구매 완료', '스토리 패키지가 성공적으로 구매되었습니다!');
          }
        },
      ]
    );
  }, []);

  // 5.3. 스타일 정의 (theme 객체 활용)
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
    titleContainer: {
      height: 80,
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
    },
    priceText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    ownedBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.success,
    },
    ownedText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    saleBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      backgroundColor: theme.colors.error,
    },
    saleText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  }), [theme, mode]);

  // 2열 그리드로 데이터 재구성
  const gridData = useMemo(() => {
    const leftColumn: StoryPackage[] = [];
    const rightColumn: StoryPackage[] = [];
    
    MOCK_STORY_PACKAGES.forEach((storyPackage, index) => {
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
        {storyPackage.isOwned && (
          <View style={styles.ownedBadge}>
            <Text style={styles.ownedText}>보유</Text>
          </View>
        )}
        {storyPackage.isOnSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>할인</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* 스토리 타이틀 */}
      <TouchableOpacity 
        style={styles.titleContainer}
        onPress={() => handleStoryPress(storyPackage)}
      >
        <Text style={styles.titleText}>{storyPackage.title}</Text>
        <Text style={styles.priceText}>
          {storyPackage.isOnSale && storyPackage.originalPrice && (
            <Text style={{ textDecorationLine: 'line-through', color: theme.colors.textTertiary }}>
              {storyPackage.originalPrice.toLocaleString()}원{' '}
            </Text>
          )}
          {storyPackage.price.toLocaleString()}원
        </Text>
      </TouchableOpacity>
    </View>
  ), [styles, handleStoryPress, theme.colors.textTertiary]);

  // 5.4. JSX 반환
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* 헤더 */}
        <GlassmorphismCard style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleGoBack}
            >
              <Icon
                name="arrow-left"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>스토어</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
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

// 6. 컴포넌트 내보내기
export default StoreScreen; 