// 1. React/External imports
import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. Internal imports
import CustomToggle from '../../src/components/CustomToggle';
import FadeDivider from '../../src/components/FadeDivider';
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface SettingItem {
  label: string;
  icon: string;
  value?: boolean | string;
  onToggle?: () => void;
  onPress?: () => void;
  type: 'switch' | 'button';
}

interface SettingSection {
  title: string;
  icon: string;
  items: SettingItem[];
}

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

// 4. Constants
const SETTINGS_DATA: SettingSection[] = [
  {
    title: '개인화',
    icon: 'tune',
    items: [
      {
        label: '다크 모드',
        icon: 'moon-waning-crescent',
        type: 'switch',
      },
      {
        label: '언어 설정',
        icon: 'earth',
        value: '한국어',
        type: 'button',
      },
    ],
  },
  {
    title: '게임 경험',
    icon: 'controller',
    items: [
      {
        label: '자동 저장',
        icon: 'content-save-outline',
        value: true,
        type: 'switch',
      },
      {
        label: '효과음',
        icon: 'volume-high',
        value: true,
        type: 'switch',
      },
      {
        label: '배경음악',
        icon: 'music-note',
        value: true,
        type: 'switch',
      },
    ],
  },
  {
    title: '알림',
    icon: 'bell-outline',
    items: [
      {
        label: '푸시 알림',
        icon: 'cellphone',
        value: true,
        type: 'switch',
      },
      {
        label: '일일 미션',
        icon: 'star-outline',
        value: false,
        type: 'switch',
      },
    ],
  },
  {
    title: '지원',
    icon: 'help-circle-outline',
    items: [
      {
        label: '도움말',
        icon: 'help-circle-outline',
        type: 'button',
      },
      {
        label: '캐시 삭제',
        icon: 'delete-outline',
        type: 'button',
      },
      {
        label: '앱 정보',
        icon: 'information-outline',
        value: 'v1.0.0',
        type: 'button',
      },
    ],
  },
];

// 5. Component
const SettingsScreen = () => {
  // 5.1 Hooks
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { mode, toggleTheme, theme } = useTheme();

  // 5.2 Data/Computed values
  const getSettingsData = useCallback((): SettingSection[] => {
    return SETTINGS_DATA.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        value: item.label === '다크 모드' ? mode === 'dark' : item.value,
        onToggle: item.label === '다크 모드' ? toggleTheme : item.onToggle || (() => {}),
        onPress: item.onPress || (() => {}),
      }))
    }));
  }, [mode, toggleTheme]);

  const settingsData = getSettingsData();

  // 5.3 Event handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogout = useCallback(() => {
    // TODO: 로그아웃 로직 구현
    navigation.navigate('Login');
  }, [navigation]);

  // 5.5 JSX Return
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        {/* 헤더 - 글래스모피즘 효과 */}
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.2}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Text style={[
              styles.backButtonText,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.xl,
              }
            ]}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={[
              styles.headerTitle, 
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.xxl,
                fontWeight: theme.typography.weights.bold,
              }
            ]}>설정</Text>
            <Text style={[
              styles.headerSubtitle, 
              { 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.sizes.sm,
                fontWeight: theme.typography.weights.regular,
              }
            ]}>앱을 개인화하세요</Text>
          </View>
        </GlassmorphismCard>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {settingsData.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              {/* 섹션 헤더 */}
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconContainer}>
                  <Icon
                    name={section.icon}
                    size={20}
                    color={theme.colors.text}
                  />
                </View>
                <Text style={[
                  styles.sectionTitle, 
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.lg,
                    fontWeight: theme.typography.weights.bold,
                  }
                ]}>{section.title}</Text>
              </View>
              
              {/* 카테고리 단일 박스 */}
              <GlassmorphismCard
                isDark={mode === 'dark'}
                opacity={0.18}
                style={styles.categoryCard}
              >
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex}>
                    <View style={styles.settingItem}>
                      <View style={styles.settingLeft}>
                        <View style={styles.settingIconContainer}>
                          <Icon
                            name={item.icon}
                            size={20}
                            color={theme.colors.text}
                          />
                        </View>
                        <View style={styles.settingInfo}>
                          <Text style={[
                            styles.settingLabel, 
                            { 
                              color: theme.colors.text,
                              fontSize: theme.typography.sizes.md,
                              fontWeight: theme.typography.weights.semibold,
                            }
                          ]}>{item.label}</Text>
                          {item.type === 'button' && item.value && (
                            <Text style={[
                              styles.settingValue, 
                              { 
                                color: theme.colors.textSecondary,
                                fontSize: theme.typography.sizes.sm,
                                fontWeight: theme.typography.weights.regular,
                              }
                            ]}>{item.value}</Text>
                          )}
                        </View>
                      </View>
                      
                      <View style={styles.settingRight}>
                        {item.type === 'switch' ? (
                          <CustomToggle
                            value={item.value as boolean}
                            onValueChange={item.onToggle!}
                          />
                        ) : (
                          <TouchableOpacity 
                            style={styles.settingButton}
                            onPress={item.onPress}
                          >
                            <Text style={[
                              styles.settingButtonText,
                              { 
                                color: theme.colors.textSecondary,
                                fontSize: theme.typography.sizes.md,
                                fontWeight: theme.typography.weights.semibold,
                              }
                            ]}>→</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    
                    {/* 마지막 항목이 아니면 구분선 추가 */}
                    {itemIndex < section.items.length - 1 && (
                      <FadeDivider
                        color={theme.colors.divider}
                        marginHorizontal={0}
                      />
                    )}
                  </View>
                ))}
              </GlassmorphismCard>
            </View>
          ))}

          {/* 로그아웃 버튼 */}
          <View style={styles.logoutSection}>
            <GlassmorphismCard
              isDark={mode === 'dark'}
              opacity={0.18}
              style={styles.logoutCard}
            >
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <View style={styles.logoutContent}>
                  <View style={styles.logoutIconContainer}>
                    <Icon
                      name="logout"
                      size={20}
                      color={theme.colors.error}
                    />
                  </View>
                  <Text style={[
                    styles.logoutText,
                    { 
                      color: theme.colors.error,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>로그아웃</Text>
                </View>
              </TouchableOpacity>
            </GlassmorphismCard>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60, // 상태바 높이 고려
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
    // fontSize and color will be set dynamically
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    // fontSize, fontWeight, and color will be set dynamically
  },
  headerSubtitle: {
    marginTop: 4,
    // fontSize, fontWeight, and color will be set dynamically
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    // fontSize, fontWeight, and color will be set dynamically
  },
  categoryCard: {
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    // fontSize, fontWeight, and color will be set dynamically
  },
  settingValue: {
    marginTop: 4,
    // fontSize, fontWeight, and color will be set dynamically
  },
  settingRight: {
    marginLeft: 16,
  },
  settingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingButtonText: {
    // fontSize, fontWeight, and color will be set dynamically
  },
  logoutSection: {
    marginTop: 32,
  },
  logoutCard: {
    paddingVertical: 4,
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutText: {
    // fontSize, fontWeight, and color will be set dynamically
  },
});

// 7. Export
export default SettingsScreen; 