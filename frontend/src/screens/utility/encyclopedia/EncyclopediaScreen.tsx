import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 프로젝트 내부 컴포넌트들
import GlassmorphismBackground from '../../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../../components/GlassmorphismCard';
import ScreenHeader from '../../../components/ScreenHeader';

// 프로젝트 내부 타입 및 테마
import { RootStackParamList } from '../../../types';
import { useTheme } from '../../../theme/ThemeContext';

type EncyclopediaScreenNavigationProp = StackNavigationProp<any, any>;

interface EncyclopediaCategory {
  id: string;
  title: string;
  screenName: keyof RootStackParamList;
}

const EncyclopediaScreen: React.FC = () => {
  const navigation = useNavigation<EncyclopediaScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 도감 카테고리 데이터
  const categories: EncyclopediaCategory[] = useMemo(() => [
    { id: 'location', title: '장소', screenName: 'LocationEncyclopedia' as any },
    { id: 'character', title: '인물', screenName: 'CharacterEncyclopedia' as any },
    { id: 'creature', title: '생명체', screenName: 'CreatureEncyclopedia' as any },
    { id: 'companion', title: '동료', screenName: 'CompanionEncyclopedia' as any },
    { id: 'item', title: '아이템', screenName: 'ItemEncyclopedia' as any },
    { id: 'status', title: '상태', screenName: 'StatusEncyclopedia' as any },
    { id: 'skill', title: '기술', screenName: 'SkillEncyclopedia' as any },
    { id: 'ending', title: '엔딩', screenName: 'EndingEncyclopedia' as any },
  ], []);

  // 카테고리 버튼 클릭 핸들러
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCategoryPress = useCallback((category: EncyclopediaCategory) => {
    (navigation as any).navigate(category.screenName);
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
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 120,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingTop: 16,
    },
    categoryButton: {
      width: '48%',
      aspectRatio: 1,
      marginBottom: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
  }), [theme, mode]);

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
            <Text style={styles.headerTitle}>도감</Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>

        {/* 콘텐츠 */}
        <View style={styles.content}>
          <View style={styles.gridContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryText}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default EncyclopediaScreen; 