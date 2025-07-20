// 1. React/External imports
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../../theme/ThemeContext';
import CustomToggle from '../../components/CustomToggle';
import FadeDivider from '../../components/FadeDivider';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import WarningModal from '../../components/common/WarningModal';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface SettingItem {
  label: string;
  icon: string;
  value?: boolean | string;
  onToggle?: () => void;
  onPress?: () => void;
  type: 'switch' | 'button' | 'select';
  description?: string;
}

interface SettingSection {
  title: string;
  icon: string;
  items: SettingItem[];
}

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

// 4. Component
const SettingsScreen = () => {
  // 4.1 Hooks
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { mode, toggleTheme, theme } = useTheme();
  
  // 4.2 State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [textEffect, setTextEffect] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [eventNotificationEnabled, setEventNotificationEnabled] = useState(true);
  const [language, setLanguage] = useState('한국어');
  const [customTheme, setCustomTheme] = useState(false);
  
  // 모달 상태
  const [cacheModalVisible, setCacheModalVisible] = useState(false);
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  
  // 텍스트 설정 상태
  const [fontFamily, setFontFamily] = useState('바탕체');
  const [fontWeight, setFontWeight] = useState('굵음');
  const [textSize, setTextSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(28);
  const [outputSpeed, setOutputSpeed] = useState('느림');
  const [outputEffect, setOutputEffect] = useState('익스트림');

  // 4.3 Event handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLanguagePress = useCallback(() => {
    navigation.navigate('LanguageSettings' as any);
  }, [navigation]);

  // 텍스트 설정 핸들러들
  const handleFontChange = useCallback((direction: 'prev' | 'next') => {
    const fonts = ['바탕체', '고딕체', '명조체', '손글씨체'];
    const currentIndex = fonts.indexOf(fontFamily);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : fonts.length - 1;
    } else {
      newIndex = currentIndex < fonts.length - 1 ? currentIndex + 1 : 0;
    }
    
    setFontFamily(fonts[newIndex]);
  }, [fontFamily]);

  const handleFontWeightChange = useCallback((direction: 'prev' | 'next') => {
    const weights = ['얇음', '보통', '굵음', '매우굵음'];
    const currentIndex = weights.indexOf(fontWeight);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : weights.length - 1;
    } else {
      newIndex = currentIndex < weights.length - 1 ? currentIndex + 1 : 0;
    }
    
    setFontWeight(weights[newIndex]);
  }, [fontWeight]);

  const handleTextSizeChange = useCallback((direction: 'increase' | 'decrease') => {
    if (direction === 'increase' && textSize < 24) {
      setTextSize(textSize + 1);
    } else if (direction === 'decrease' && textSize > 12) {
      setTextSize(textSize - 1);
    }
  }, [textSize]);

  const handleLineHeightChange = useCallback((direction: 'increase' | 'decrease') => {
    if (direction === 'increase' && lineHeight < 40) {
      setLineHeight(lineHeight + 2);
    } else if (direction === 'decrease' && lineHeight > 20) {
      setLineHeight(lineHeight - 2);
    }
  }, [lineHeight]);

  const handleOutputSpeedChange = useCallback((direction: 'prev' | 'next') => {
    const speeds = ['느림', '보통', '빠름'];
    const currentIndex = speeds.indexOf(outputSpeed);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : speeds.length - 1;
    } else {
      newIndex = currentIndex < speeds.length - 1 ? currentIndex + 1 : 0;
    }
    
    setOutputSpeed(speeds[newIndex]);
  }, [outputSpeed]);

  const handleOutputEffectChange = useCallback((direction: 'prev' | 'next') => {
    const effects = ['없음', '기본', '강화', '익스트림'];
    const currentIndex = effects.indexOf(outputEffect);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : effects.length - 1;
    } else {
      newIndex = currentIndex < effects.length - 1 ? currentIndex + 1 : 0;
    }
    
    setOutputEffect(effects[newIndex]);
  }, [outputEffect]);

  const handleCacheClear = useCallback(() => {
    setCacheModalVisible(true);
  }, []);

  const handleAccountDelete = useCallback(() => {
    setAccountModalVisible(true);
  }, []);

  const handleCacheConfirm = useCallback(() => {
    setCacheModalVisible(false);
    // TODO: 실제 캐시 삭제 로직 구현
    Alert.alert('완료', '캐시가 삭제되었습니다.');
  }, []);

  const handleAccountConfirm = useCallback(() => {
    setAccountModalVisible(false);
    // TODO: 실제 계정 삭제 로직 구현
    Alert.alert('완료', '계정 정보가 삭제되었습니다.');
  }, []);

  const handleHelpPress = useCallback(() => {
    navigation.navigate('Help');
  }, [navigation]);

  const handleTermsPress = useCallback(() => {
    navigation.navigate('TermsOfService' as any);
  }, [navigation]);

  const handleAppInfoPress = useCallback(() => {
    navigation.navigate('AppInfo' as any);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '로그아웃', 
          style: 'destructive',
          onPress: () => {
            // TODO: 실제 로그아웃 로직 구현
            navigation.navigate('Login');
          }
        }
      ]
    );
  }, [navigation]);

  // 4.4 Settings data
  const settingsData: SettingSection[] = [
    {
      title: '개인 설정',
      icon: 'account-cog',
      items: [
        {
          label: '다크모드',
          icon: 'moon-waning-crescent',
          value: mode === 'dark',
          onToggle: toggleTheme,
          type: 'switch',
          description: '다크 모드를 사용합니다'
        },
        {
          label: '테마 설정',
          icon: 'palette',
          value: customTheme ? '사용자 테마' : '기본 테마',
          onPress: () => navigation.navigate('ThemeSettings' as any),
          type: 'button',
        },
        {
          label: '언어 설정',
          icon: 'earth',
          value: language,
          onPress: handleLanguagePress,
          type: 'button',
        },
      ],
    },
    {
      title: '게임 설정',
      icon: 'gamepad-variant',
      items: [
        {
          label: '사운드',
          icon: 'volume-high',
          value: soundEnabled,
          onToggle: () => setSoundEnabled(!soundEnabled),
          type: 'switch',
          description: '게임 사운드를 켭니다'
        },
        {
          label: '진동',
          icon: 'vibrate',
          value: vibrationEnabled,
          onToggle: () => setVibrationEnabled(!vibrationEnabled),
          type: 'switch',
          description: '게임 진동을 켭니다'
        },
        {
          label: '알림',
          icon: 'bell',
          value: notificationEnabled,
          onToggle: () => setNotificationEnabled(!notificationEnabled),
          type: 'switch',
          description: '핸드폰 설정에서 알림 허용'
        },
        {
          label: '이벤트 수신',
          icon: 'bell-ring',
          value: eventNotificationEnabled,
          onToggle: () => setEventNotificationEnabled(!eventNotificationEnabled),
          type: 'switch',
          description: '이벤트 알림 수신 허용'
        },
      ],
    },
    {
      title: '텍스트 설정',
      icon: 'format-text',
      items: [], // 빈 배열로 설정 (별도 렌더링)
    },
    {
      title: '시스템 설정',
      icon: 'cog',
      items: [
        {
          label: '캐시 삭제',
          icon: 'delete-outline',
          onPress: handleCacheClear,
          type: 'button',
          description: '게임 내 모든 캐시 삭제'
        },
        {
          label: '계정 정보 삭제',
          icon: 'account-remove',
          onPress: handleAccountDelete,
          type: 'button',
          description: '게임에 등록된 유저 정보 모두 삭제'
        },
        {
          label: '도움말',
          icon: 'help-circle-outline',
          onPress: handleHelpPress,
          type: 'button',
          description: '게임 용어 정리 및 이용 방법'
        },
        {
          label: '이용약관',
          icon: 'file-document-outline',
          onPress: handleTermsPress,
          type: 'button',
          description: '각종 법적 약관'
        },
        {
          label: '앱 정보',
          icon: 'information-outline',
          value: 'v1.0.0',
          onPress: handleAppInfoPress,
          type: 'button',
          description: '앱 버전 정보 및 업데이트'
        },
      ],
    },
  ];

  // 4.5 JSX Return
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
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>설정</Text>
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
                <View style={[styles.sectionIconContainer, { backgroundColor: theme.colors.elevated }]}>
                  <Icon name={section.icon} size={20} color={theme.colors.text} />
                </View>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  {section.title}
                </Text>
              </View>
              
              {/* 설정 항목들 */}
              <GlassmorphismCard style={styles.categoryCard}>
                {section.title === '텍스트 설정' ? (
                  // 텍스트 설정 특별 렌더링
                  <>
                    {/* 첫 번째 행: 글꼴, 글 두께 */}
                    <View style={styles.textSettingRow}>
                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>글꼴</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{fontFamily}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleFontChange('prev')}
                          >
                            <Icon name="chevron-left" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleFontChange('next')}
                          >
                            <Icon name="chevron-right" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>글 두께</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{fontWeight}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleFontWeightChange('prev')}
                          >
                            <Icon name="minus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleFontWeightChange('next')}
                          >
                            <Icon name="plus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <FadeDivider color={theme.colors.divider} marginHorizontal={0} />

                    {/* 두 번째 행: 텍스트 크기, 행 높이 */}
                    <View style={styles.textSettingRow}>
                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>텍스트 크기</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{textSize}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleTextSizeChange('decrease')}
                          >
                            <Icon name="minus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleTextSizeChange('increase')}
                          >
                            <Icon name="plus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>행 높이</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{lineHeight}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleLineHeightChange('decrease')}
                          >
                            <Icon name="minus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleLineHeightChange('increase')}
                          >
                            <Icon name="plus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <FadeDivider color={theme.colors.divider} marginHorizontal={0} />

                    {/* 세 번째 행: 출력 속도, 출력 효과 */}
                    <View style={styles.textSettingRow}>
                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>출력 속도</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{outputSpeed}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleOutputSpeedChange('prev')}
                          >
                            <Icon name="minus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleOutputSpeedChange('next')}
                          >
                            <Icon name="plus" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.textSettingItem}>
                        <Text style={[styles.textSettingLabel, { color: theme.colors.text }]}>출력 효과</Text>
                        <View style={[styles.textSettingValue, { backgroundColor: theme.colors.elevated }]}>
                          <Text style={[styles.textSettingValueText, { color: theme.colors.primary }]}>{outputEffect}</Text>
                        </View>
                        <View style={styles.textSettingControls}>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleOutputEffectChange('prev')}
                          >
                            <Icon name="chevron-left" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={[styles.textSettingButton, { backgroundColor: theme.colors.elevated }]}
                            onPress={() => handleOutputEffectChange('next')}
                          >
                            <Icon name="chevron-right" size={16} color={theme.colors.text} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <FadeDivider color={theme.colors.divider} marginHorizontal={0} />

                    {/* 텍스트 미리보기 영역 */}
                    <View style={styles.textPreviewContainer}>
                      <Text style={[styles.textPreviewTitle, { color: theme.colors.text }]}>
                        텍스트 미리보기
                      </Text>
                      <View style={[styles.textPreviewArea, { backgroundColor: theme.colors.elevated }]}>
                        <Text 
                          style={[
                            styles.textPreviewText,
                            { 
                              color: theme.colors.text,
                              fontSize: textSize,
                              lineHeight: lineHeight,
                            }
                          ]}
                        >
                          텍스트 설정에 따른 입력 결과를 보여주는 예시 문장 입니다.{'\n'}
                          선택된 글꼴과 색상이 적용이 되었고 텍스트의 크기에 맞춰서 크기가 변화할 것 입니다.{'\n'}
                          행간격을 변경함에 따라서 텍스트의 행이 바뀌게 될 것이고{'\n'}
                          출력 속도와 출력 효과는 이미지로는 보여줄 수 없다는 단점이 있지만,{'\n'}
                          해당 영역에서 텍스트가 출력이 될 때 동적으로 확인할 수 있습니다.
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  // 일반 설정 항목들 렌더링
                  section.items.map((item, itemIndex) => (
                    <View key={itemIndex}>
                      {item.type === 'switch' ? (
                        <View style={styles.settingItem}>
                          <View style={styles.settingLeft}>
                            <View style={[styles.settingIconContainer, { backgroundColor: theme.colors.elevated }]}>
                              <Icon name={item.icon} size={20} color={theme.colors.text} />
                            </View>
                            <View style={styles.settingInfo}>
                              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                                {item.label}
                              </Text>
                              {item.description && (
                                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                                  {item.description}
                                </Text>
                              )}
                            </View>
                          </View>
                          
                          <View style={styles.settingRight}>
                            <CustomToggle
                              value={item.value as boolean}
                              onValueChange={item.onToggle!}
                            />
                          </View>
                        </View>
                      ) : (
                        <TouchableOpacity 
                          style={styles.settingItem}
                          onPress={item.onPress}
                          activeOpacity={0.7}
                        >
                          <View style={styles.settingLeft}>
                            <View style={[styles.settingIconContainer, { backgroundColor: theme.colors.elevated }]}>
                              <Icon name={item.icon} size={20} color={theme.colors.text} />
                            </View>
                            <View style={styles.settingInfo}>
                              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                                {item.label}
                              </Text>
                              {item.description && (
                                <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                                  {item.description}
                                </Text>
                              )}
                              {item.value && (
                                <Text style={[styles.settingValue, { color: theme.colors.primary }]}>
                                  {item.value}
                                </Text>
                              )}
                            </View>
                          </View>
                          
                          <View style={styles.settingRight}>
                            <Text style={[styles.settingButtonText, { color: theme.colors.textSecondary }]}>
                              →
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      
                      {/* 구분선 */}
                      {itemIndex < section.items.length - 1 && (
                        <FadeDivider color={theme.colors.divider} marginHorizontal={0} />
                      )}
                    </View>
                  ))
                )}
              </GlassmorphismCard>
            </View>
          ))}

          {/* 로그아웃 버튼 */}
          <View style={styles.logoutSection}>
            <GlassmorphismCard style={styles.logoutCard}>
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <View style={styles.logoutContent}>
                  <View style={[styles.logoutIconContainer, { backgroundColor: theme.colors.error + '20' }]}>
                    <Icon name="logout" size={20} color={theme.colors.error} />
                  </View>
                  <Text style={[styles.logoutText, { color: theme.colors.error }]}>
                    로그아웃
                  </Text>
                </View>
              </TouchableOpacity>
            </GlassmorphismCard>
          </View>
        </ScrollView>
      </View>

      {/* 캐시 삭제 경고 모달 */}
      <WarningModal
        visible={cacheModalVisible}
        title="캐시 삭제"
        message="게임 내 모든 캐시를 삭제하시겠습니까?\n\n삭제된 캐시는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        type="warning"
        onConfirm={handleCacheConfirm}
        onCancel={() => setCacheModalVisible(false)}
      />

      {/* 계정 정보 삭제 경고 모달 */}
      <WarningModal
        visible={accountModalVisible}
        title="계정 정보 삭제"
        message="게임에 등록된 모든 사용자 정보를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 모든 게임 데이터가 영구적으로 삭제됩니다."
        confirmText="삭제"
        cancelText="취소"
        type="danger"
        onConfirm={handleAccountConfirm}
        onCancel={() => setAccountModalVisible(false)}
      />
    </GlassmorphismBackground>
  );
};

// 5. Styles
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
    fontSize: 18,
    fontWeight: '600',
  },
  categoryCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    fontSize: 15,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
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
    fontSize: 15,
    fontWeight: '500',
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
    fontSize: 15,
    fontWeight: '500',
  },
  // 텍스트 설정 스타일
  textSettingsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  textSettingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  textSettingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  textSettingItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    minHeight: 60,
  },
  textSettingLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    textAlign: 'center',
  },
  textSettingValue: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  textSettingValueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textSettingControls: {
    flexDirection: 'row',
    gap: 8,
  },
  textSettingButton: {
    width: 26,
    height: 26,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSettingButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  textPreviewContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  textPreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'left',
  },
  textPreviewArea: {
    padding: 16,
    borderRadius: 12,
    minHeight: 120,
  },
  textPreviewText: {
    textAlign: 'left',
  },
});

// 6. Export
export default SettingsScreen; 