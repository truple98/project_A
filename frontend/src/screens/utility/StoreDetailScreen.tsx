import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
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

type StoreDetailScreenNavigationProp = StackNavigationProp<any, any>;
type StoreDetailScreenRouteProp = RouteProp<{ StoreDetail: { storyId: string } }, 'StoreDetail'>;

interface StoryPackage {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice?: number;
  isOnSale: boolean;
  isOwned: boolean;
  storyCount: number;
  estimatedPlayTime: string;
  difficulty: 'easy' | 'normal' | 'hard';
  tags: string[];
  packageContents: string[];
  imageUrl?: string;
}

const StoreDetailScreen: React.FC = () => {
  const navigation = useNavigation<StoreDetailScreenNavigationProp>();
  const route = useRoute<StoreDetailScreenRouteProp>();
  const { theme, mode } = useTheme();

  // Mock 스토리 상세 데이터
  const storyData: StoryPackage = useMemo(() => {
    const storyId = route.params?.storyId;
    
    // 실제로는 API에서 데이터를 가져와야 함
    const mockStories: Record<string, StoryPackage> = {
      '1': {
        id: '1',
        title: '신비한 숲의 모험',
        description: '고대의 숲에서 펼쳐지는 신비로운 모험. 숲의 비밀을 탐험하며 새로운 친구들을 만나보세요.',
        detailedDescription: '해당 상품의 자세한 소개를 할겁니다 여기서 판매할 상품은 스토리 패키지 이기 때문에 스토리에 대한 개요를 쭉 읊어주는게 좋겠군요. 이 스토리는 고대의 숲을 배경으로 한 판타지 모험 이야기입니다. 플레이어는 숲의 수호자로서 숲의 비밀을 탐험하고, 다양한 생명체들과 만나며 성장해 나갑니다. 각 선택지마다 새로운 경험이 기다리고 있으며, 플레이어의 결정에 따라 스토리의 방향이 달라집니다.',
        price: 2900,
        originalPrice: 3900,
        isOnSale: true,
        isOwned: false,
        storyCount: 5,
        estimatedPlayTime: '2-3시간',
        difficulty: 'easy',
        tags: ['판타지', '모험', '친구'],
        packageContents: [
          '신비한 숲의 모험 스토리 팩',
          '게임 내 재화',
          '프로필 이미지',
          '새로운 동료 1',
          '새로운 동료 2',
          '새로운 엔딩 20가지'
        ],
      },
      '2': {
        id: '2',
        title: '고대 던전 탐험',
        description: '깊은 지하 던전에서 보물을 찾아라! 함정과 몬스터가 가득한 위험한 던전을 탐험하세요.',
        detailedDescription: '해당 상품의 자세한 소개를 할겁니다 여기서 판매할 상품은 스토리 패키지 이기 때문에 스토리에 대한 개요를 쭉 읊어주는게 좋겠군요. 이 스토리는 고대의 지하 던전을 배경으로 한 액션 모험 이야기입니다. 플레이어는 던전 탐험가로서 깊은 지하로 내려가 보물을 찾고, 함정을 피하며 강력한 몬스터들과 전투를 벌입니다. 전략적 사고와 빠른 판단이 요구되는 도전적인 모험이 기다리고 있습니다.',
        price: 3900,
        isOnSale: false,
        isOwned: true,
        storyCount: 7,
        estimatedPlayTime: '3-4시간',
        difficulty: 'normal',
        tags: ['던전', '보물', '전투'],
        packageContents: [
          '고대 던전 탐험 스토리 팩',
          '게임 내 재화',
          '프로필 이미지',
          '새로운 동료 1',
          '새로운 동료 2',
          '새로운 엔딩 25가지'
        ],
      },
      '3': {
        id: '3',
        title: '마법사의 탑',
        description: '마법의 힘을 배우며 탑을 정복하라. 강력한 마법과 지혜를 얻어 최고의 마법사가 되세요.',
        detailedDescription: '해당 상품의 자세한 소개를 할겁니다 여기서 판매할 상품은 스토리 패키지 이기 때문에 스토리에 대한 개요를 쭉 읊어주는게 좋겠군요. 이 스토리는 마법의 탑을 배경으로 한 성장 모험 이야기입니다. 플레이어는 견습 마법사로서 탑의 각 층을 올라가며 마법을 배우고, 강력한 적들과 맞서 싸우며 최고의 마법사가 되어갑니다. 지혜와 마법의 조화를 통해 탑의 정상에 도달하는 것이 목표입니다.',
        price: 4900,
        originalPrice: 5900,
        isOnSale: true,
        isOwned: false,
        storyCount: 8,
        estimatedPlayTime: '4-5시간',
        difficulty: 'hard',
        tags: ['마법', '학습', '성장'],
        packageContents: [
          '마법사의 탑 스토리 팩',
          '게임 내 재화',
          '프로필 이미지',
          '새로운 동료 1',
          '새로운 동료 2',
          '새로운 엔딩 30가지'
        ],
      },
    };

    return mockStories[storyId] || mockStories['1'];
  }, [route.params?.storyId]);

  // 이벤트 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePurchase = useCallback(() => {
    if (storyData.isOwned) {
      Alert.alert('이미 보유한 상품', '이 스토리 패키지는 이미 구매하셨습니다.');
      return;
    }

    Alert.alert(
      '구매 확인',
      `${storyData.title}\n가격: ${storyData.price.toLocaleString()}원\n\n이 상품을 구매하시겠습니까?`,
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
  }, [storyData]);

  const handlePlay = useCallback(() => {
    if (!storyData.isOwned) {
      Alert.alert('구매 필요', '이 스토리를 플레이하려면 먼저 구매해주세요.');
      return;
    }

    Alert.alert('플레이', '스토리를 시작합니다.');
    // TODO: 스토리 플레이 로직
  }, [storyData.isOwned]);

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
    priceText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    originalPriceText: {
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: theme.colors.textTertiary,
      marginRight: 8,
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
    packageTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 12,
    },
    packageList: {
      marginBottom: 16,
    },
    packageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    packageBullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
      marginRight: 12,
    },
    packageItemText: {
      fontSize: 14,
      color: theme.colors.text,
      flex: 1,
    },
    purchaseMessage: {
      fontSize: 14,
      fontStyle: 'italic',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
    purchaseButton: {
      borderRadius: 16,
      padding: 20,
      marginTop: 24,
      alignItems: 'center',
    },
    purchaseButtonText: {
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    ownedBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: theme.colors.success,
    },
    ownedText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    saleBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.error,
    },
    saleText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  }), [theme, mode]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="스토어" 
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
              {storyData.isOwned && (
                <View style={styles.ownedBadge}>
                  <Text style={styles.ownedText}>보유</Text>
                </View>
              )}
              {storyData.isOnSale && (
                <View style={styles.saleBadge}>
                  <Text style={styles.saleText}>할인</Text>
                </View>
              )}
            </View>

            {/* 스토리 타이틀 영역 */}
            <View style={styles.titleArea}>
              <Text style={styles.titleText}>{storyData.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {storyData.isOnSale && storyData.originalPrice && (
                  <Text style={styles.originalPriceText}>
                    {storyData.originalPrice.toLocaleString()}원
                  </Text>
                )}
                <Text style={styles.priceText}>
                  {storyData.price.toLocaleString()}원
                </Text>
              </View>
            </View>

            {/* 상품 상세 설명 및 구성품 영역 */}
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionTitle}>상품 소개</Text>
              <Text style={styles.descriptionText}>
                {storyData.detailedDescription}
              </Text>
              
              <Text style={styles.packageTitle}>패키지 상품</Text>
              <View style={styles.packageList}>
                {storyData.packageContents.map((item, index) => (
                  <View key={index} style={styles.packageItem}>
                    <View style={styles.packageBullet} />
                    <Text style={styles.packageItemText}>{item}</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.purchaseMessage}>
                마지막으로 상품을 구매하길 권유하는 메세지가 있을 겁니다.
              </Text>
            </View>

            {/* 구매 버튼 */}
            <TouchableOpacity
              style={[
                styles.purchaseButton,
                { backgroundColor: storyData.isOwned ? theme.colors.success : theme.colors.primary }
              ]}
              onPress={storyData.isOwned ? handlePlay : handlePurchase}
            >
              <Text style={[styles.purchaseButtonText, { color: '#FFFFFF' }]}>
                {storyData.isOwned ? '플레이하기' : '구매하기'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default StoreDetailScreen; 