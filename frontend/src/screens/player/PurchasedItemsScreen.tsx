import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../components/GlassmorphismHeader';

// 프로젝트 내부 타입 및 테마
import { useTheme } from '../../theme/ThemeContext';

type PurchasedItemsScreenNavigationProp = StackNavigationProp<any, any>;

interface PurchasedItem {
  id: string;
  name: string;
  price: number;
  purchaseDate: string;
  type: 'story' | 'theme' | 'item';
  status: 'active' | 'expired' | 'refunded';
}

// Mock 데이터
const MOCK_PURCHASED_ITEMS: PurchasedItem[] = [
  {
    id: '1',
    name: '마법학원 입학편',
    price: 5000,
    purchaseDate: '2024-01-15',
    type: 'story',
    status: 'active',
  },
  {
    id: '2',
    name: '고대 유적 탐험편',
    price: 8000,
    purchaseDate: '2024-01-10',
    type: 'story',
    status: 'active',
  },
  {
    id: '3',
    name: '다크 테마',
    price: 2000,
    purchaseDate: '2024-01-05',
    type: 'theme',
    status: 'active',
  },
  {
    id: '4',
    name: '프리미엄 아이템 팩',
    price: 3000,
    purchaseDate: '2023-12-20',
    type: 'item',
    status: 'expired',
  },
];

const PurchasedItemsScreen: React.FC = () => {
  const navigation = useNavigation<PurchasedItemsScreenNavigationProp>();
  const { theme } = useTheme();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const formatPrice = useCallback((price: number) => {
    return `${price.toLocaleString()}원`;
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active':
        return theme.colors.primary;
      case 'expired':
        return theme.colors.textSecondary;
      case 'refunded':
        return '#F44336';
      default:
        return theme.colors.textSecondary;
    }
  }, [theme]);

  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case 'active':
        return '사용 가능';
      case 'expired':
        return '만료됨';
      case 'refunded':
        return '환불됨';
      default:
        return '알 수 없음';
    }
  }, []);

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'story':
        return 'book-open-variant';
      case 'theme':
        return 'palette';
      case 'item':
        return 'package-variant';
      default:
        return 'package';
    }
  }, []);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    itemCard: {
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    itemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '500',
    },
    itemDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemDate: {
      fontSize: 12,
    },
    itemStatus: {
      fontSize: 12,
      fontWeight: '500',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      textAlign: 'center',
    },
  }), [theme]);

  const renderPurchasedItem = useCallback((item: PurchasedItem) => (
    <GlassmorphismCard key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={[styles.itemIcon, { backgroundColor: theme.colors.elevated }]}>
          <Icon 
            name={getTypeIcon(item.type)} 
            size={20} 
            color={theme.colors.text} 
          />
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
            {formatPrice(item.price)}
          </Text>
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={[styles.itemDate, { color: theme.colors.textSecondary }]}>
          구매일: {formatDate(item.purchaseDate)}
        </Text>
        <View style={[
          styles.itemStatus, 
          { 
            backgroundColor: getStatusColor(item.status) + '20'
          }
        ]}>
          <Text style={{ color: getStatusColor(item.status) }}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </GlassmorphismCard>
  ), [styles, theme, getTypeIcon, formatPrice, formatDate, getStatusColor, getStatusText]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="구매 내역" 
          onBackPress={handleBack}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {MOCK_PURCHASED_ITEMS.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                구매한 상품 ({MOCK_PURCHASED_ITEMS.length}개)
              </Text>
              {MOCK_PURCHASED_ITEMS.map(renderPurchasedItem)}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Icon 
                name="package-variant" 
                size={64}
                color={theme.colors.textSecondary}
                style={styles.emptyIcon}
              />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                구매한 상품이 없습니다
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
                스토어에서 다양한 상품을 구매해보세요!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default PurchasedItemsScreen; 