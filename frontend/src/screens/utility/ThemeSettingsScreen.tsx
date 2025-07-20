import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import FadeDivider from '../../components/FadeDivider';
import { RootStackParamList } from '../../types';

type ThemeSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ThemeSettings'>;

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  isPremium?: boolean;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: '기본 테마',
    description: '클래식한 기본 테마',
    icon: 'palette',
  },
  {
    id: 'dark',
    name: '다크 테마',
    description: '어두운 배경의 테마',
    icon: 'moon-waning-crescent',
  },
  {
    id: 'forest',
    name: '숲 테마',
    description: '자연스러운 녹색 테마',
    icon: 'tree',
    isPremium: true,
  },
  {
    id: 'ocean',
    name: '바다 테마',
    description: '시원한 파란색 테마',
    icon: 'waves',
    isPremium: true,
  },
  {
    id: 'sunset',
    name: '일몰 테마',
    description: '따뜻한 주황색 테마',
    icon: 'weather-sunset',
    isPremium: true,
  },
  {
    id: 'midnight',
    name: '자정 테마',
    description: '깊은 밤의 테마',
    icon: 'weather-night',
    isPremium: true,
  },
];

const ThemeSettingsScreen = () => {
  const navigation = useNavigation<ThemeSettingsScreenNavigationProp>();
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('default');

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleThemeSelect = useCallback((themeId: string) => {
    const themeOption = THEME_OPTIONS.find(option => option.id === themeId);
    
    if (themeOption?.isPremium) {
      Alert.alert(
        '프리미엄 테마',
        '이 테마는 프리미엄 사용자만 이용할 수 있습니다.',
        [
          { text: '취소', style: 'cancel' },
          { text: '프리미엄 가입', onPress: () => {
            // TODO: 프리미엄 가입 화면으로 이동
            Alert.alert('프리미엄 가입', '프리미엄 가입 기능은 추후 구현 예정입니다.');
          }}
        ]
      );
      return;
    }

    setSelectedTheme(themeId);
    // TODO: 실제 테마 적용 로직 구현
    Alert.alert('테마 변경', `${themeOption?.name}이 적용되었습니다.`);
  }, []);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* 헤더 */}
        <GlassmorphismCard style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Text style={[styles.backButtonText, { color: theme.colors.text }]}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>테마 설정</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              원하는 테마를 선택하세요
            </Text>
          </View>
        </GlassmorphismCard>

                <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassmorphismCard style={styles.themeCard}>
            {THEME_OPTIONS.map((themeOption, index) => (
              <View key={themeOption.id}>
                <TouchableOpacity
                  style={styles.themeItem}
                  onPress={() => handleThemeSelect(themeOption.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.themeLeft}>
                    <View style={[styles.themeIconContainer, { backgroundColor: theme.colors.elevated }]}>
                      <Icon name={themeOption.icon} size={24} color={theme.colors.text} />
                    </View>
                    <View style={styles.themeInfo}>
                      <View style={styles.themeNameContainer}>
                        <Text style={[styles.themeName, { color: theme.colors.text }]}>
                          {themeOption.name}
                        </Text>
                        {themeOption.isPremium && (
                          <View style={[styles.premiumBadge, { backgroundColor: theme.colors.primary }]}>
                            <Text style={[styles.premiumText, { color: '#FFFFFF' }]}>
                              PRO
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.themeDescription, { color: theme.colors.textSecondary }]}>
                        {themeOption.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.themeRight}>
                    {selectedTheme === themeOption.id && (
                      <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
                        <Icon name="check" size={16} color="#FFFFFF" />
                      </View>
                    )}
                    {themeOption.isPremium && (
                      <Icon name="crown" size={20} color={theme.colors.primary} />
                    )}
                  </View>
                </TouchableOpacity>
                
                {index < THEME_OPTIONS.length - 1 && (
                  <FadeDivider color={theme.colors.divider} marginHorizontal={0} />
                )}
              </View>
            ))}
          </GlassmorphismCard>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    marginHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '400',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  themeCard: {
    paddingVertical: 8,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  themeLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeInfo: {
    flex: 1,
  },
  themeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  premiumBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
  },
  themeDescription: {
    fontSize: 13,
    fontWeight: '400',
  },
  themeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeSettingsScreen; 