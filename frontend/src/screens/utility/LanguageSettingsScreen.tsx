import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import FadeDivider from '../../components/FadeDivider';
import { RootStackParamList } from '../../types';

type LanguageSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LanguageSettings'>;

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  isSystem?: boolean;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: 'system',
    name: '시스템 언어',
    nativeName: 'System Language',
    flag: '🌐',
    isSystem: true,
  },
  {
    id: 'ko',
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    id: 'ja',
    name: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵',
  },
  {
    id: 'zh',
    name: '中文',
    nativeName: '中文',
    flag: '🇨🇳',
  },
  {
    id: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  {
    id: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    id: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
];

const LanguageSettingsScreen = () => {
  const navigation = useNavigation<LanguageSettingsScreenNavigationProp>();
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLanguageSelect = useCallback((languageId: string) => {
    setSelectedLanguage(languageId);
    // TODO: 실제 언어 변경 로직 구현
    const languageOption = LANGUAGE_OPTIONS.find(option => option.id === languageId);
    console.log(`언어가 ${languageOption?.name}로 변경되었습니다.`);
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
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>언어 설정</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              원하는 언어를 선택하세요
            </Text>
          </View>
        </GlassmorphismCard>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassmorphismCard style={styles.languageCard}>
            {LANGUAGE_OPTIONS.map((languageOption, index) => (
              <View key={languageOption.id}>
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => handleLanguageSelect(languageOption.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.languageLeft}>
                    <View style={[styles.languageIconContainer, { backgroundColor: theme.colors.elevated }]}>
                      <Text style={styles.flagText}>{languageOption.flag}</Text>
                    </View>
                    <View style={styles.languageInfo}>
                      <View style={styles.languageNameContainer}>
                        <Text style={[styles.languageName, { color: theme.colors.text }]}>
                          {languageOption.name}
                        </Text>
                        {languageOption.isSystem && (
                          <View style={[styles.systemBadge, { backgroundColor: theme.colors.secondary }]}>
                            <Text style={[styles.systemText, { color: '#FFFFFF' }]}>
                              기본
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.languageNativeName, { color: theme.colors.textSecondary }]}>
                        {languageOption.nativeName}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.languageRight}>
                    {selectedLanguage === languageOption.id && (
                      <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
                        <Icon name="check" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                
                {index < LANGUAGE_OPTIONS.length - 1 && (
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
  languageCard: {
    paddingVertical: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  languageLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  flagText: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  systemBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  systemText: {
    fontSize: 10,
    fontWeight: '700',
  },
  languageNativeName: {
    fontSize: 13,
    fontWeight: '400',
  },
  languageRight: {
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

export default LanguageSettingsScreen; 