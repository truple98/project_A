import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomToggle from '../components/CustomToggle';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import FadeDivider from '../components/FadeDivider';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { mode, toggleTheme, theme } = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const settingsData = [
    {
      title: '개인화',
      icon: 'tune',
      items: [
        {
          label: '다크 모드',
          icon: 'moon-waning-crescent',
          value: mode === 'dark',
          onToggle: toggleTheme,
          type: 'switch' as const,
        },
        {
          label: '언어 설정',
          icon: 'earth',
          value: '한국어',
          onPress: () => {},
          type: 'button' as const,
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
          onToggle: () => {},
          type: 'switch' as const,
        },
        {
          label: '효과음',
          icon: 'volume-high',
          value: true,
          onToggle: () => {},
          type: 'switch' as const,
        },
        {
          label: '배경음악',
          icon: 'music-note',
          value: true,
          onToggle: () => {},
          type: 'switch' as const,
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
          onToggle: () => {},
          type: 'switch' as const,
        },
        {
          label: '일일 미션',
          icon: 'star-outline',
          value: false,
          onToggle: () => {},
          type: 'switch' as const,
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
          onPress: () => {},
          type: 'button' as const,
        },
        {
          label: '캐시 삭제',
          icon: 'delete-outline',
          onPress: () => {},
          type: 'button' as const,
        },
        {
          label: '앱 정보',
          icon: 'information-outline',
          value: 'v1.0.0',
          onPress: () => {},
          type: 'button' as const,
        },
      ],
    },
  ];

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
                color: mode === 'dark' ? '#ffffff' : '#000000',
                fontSize: theme.typography.sizes.xl,
              }
            ]}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={[
              styles.headerTitle, 
              { 
                color: mode === 'dark' ? '#ffffff' : '#000000',
                fontSize: theme.typography.sizes.xxl,
                fontWeight: theme.typography.weights.bold,
              }
            ]}>설정</Text>
            <Text style={[
              styles.headerSubtitle, 
              { 
                color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
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
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <Text style={[
                  styles.sectionTitle, 
                  { 
                    color: mode === 'dark' ? '#ffffff' : '#000000',
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
                            color={mode === 'dark' ? '#ffffff' : '#000000'}
                          />
                        </View>
                        <View style={styles.settingInfo}>
                          <Text style={[
                            styles.settingLabel, 
                            { 
                              color: mode === 'dark' ? '#ffffff' : '#000000',
                              fontSize: theme.typography.sizes.md,
                              fontWeight: theme.typography.weights.semibold,
                            }
                          ]}>{item.label}</Text>
                          {item.type === 'button' && item.value && (
                            <Text style={[
                              styles.settingValue, 
                              { 
                                color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
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
                                color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
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
                        color={mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
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
                onPress={() => {
                  // TODO: 로그아웃 로직 구현
                  navigation.navigate('Login');
                }}
              >
                <View style={styles.logoutContent}>
                  <View style={styles.logoutIconContainer}>
                    <Icon
                      name="logout"
                      size={20}
                      color="#ff4444"
                    />
                  </View>
                  <Text style={[
                    styles.logoutText,
                    { 
                      color: '#ff4444',
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
    // 스타일은 인라인으로 적용
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    // 스타일은 인라인으로 적용
  },
  headerSubtitle: {
    marginTop: 4,
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
    // 스타일은 인라인으로 적용
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
    // 스타일은 인라인으로 적용
  },
  settingValue: {
    marginTop: 4,
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
    // 스타일은 인라인으로 적용
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
    // 스타일은 인라인으로 적용
  },
});

export default SettingsScreen; 