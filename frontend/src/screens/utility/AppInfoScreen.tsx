import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { RootStackParamList } from '../../types';

type AppInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AppInfo'>;

interface AppInfo {
  version: string;
  buildNumber: string;
  lastUpdated: string;
  developer: string;
  supportEmail: string;
  website: string;
  hasUpdate: boolean;
  latestVersion?: string;
}

const APP_INFO: AppInfo = {
  version: '1.0.0',
  buildNumber: '1',
  lastUpdated: '2024년 1월 1일',
  developer: 'Binary Studio',
  supportEmail: 'support@binarystudio.com',
  website: 'https://binarystudio.com',
  hasUpdate: false,
  latestVersion: '1.0.0',
};

const AppInfoScreen = () => {
  const navigation = useNavigation<AppInfoScreenNavigationProp>();
  const { theme } = useTheme();
  const [appInfo] = useState<AppInfo>(APP_INFO);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdatePress = useCallback(async () => {
    try {
      // TODO: 실제 앱스토어 URL로 변경
      const storeUrl = 'https://apps.apple.com/app/id123456789'; // iOS
      // const storeUrl = 'https://play.google.com/store/apps/details?id=com.binarystudio.trpg'; // Android
      
      const supported = await Linking.canOpenURL(storeUrl);
      if (supported) {
        await Linking.openURL(storeUrl);
      } else {
        Alert.alert('오류', '앱스토어를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '앱스토어로 이동하는 중 오류가 발생했습니다.');
    }
  }, []);

  const handleEmailPress = useCallback(async () => {
    try {
      const emailUrl = `mailto:${appInfo.supportEmail}?subject=TRPG 게임 문의`;
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert('오류', '이메일 앱을 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '이메일을 보내는 중 오류가 발생했습니다.');
    }
  }, [appInfo.supportEmail]);

  const handleWebsitePress = useCallback(async () => {
    try {
      const supported = await Linking.canOpenURL(appInfo.website);
      if (supported) {
        await Linking.openURL(appInfo.website);
      } else {
        Alert.alert('오류', '웹사이트를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '웹사이트로 이동하는 중 오류가 발생했습니다.');
    }
  }, [appInfo.website]);

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
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>앱 정보</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              앱 버전 및 개발자 정보
            </Text>
          </View>
        </GlassmorphismCard>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 앱 아이콘 및 기본 정보 */}
          <GlassmorphismCard style={styles.appInfoCard}>
            <View style={styles.appIconContainer}>
              <View style={[styles.appIcon, { backgroundColor: theme.colors.primary }]}>
                <Icon name="gamepad-variant" size={48} color="#FFFFFF" />
              </View>
              <Text style={[styles.appName, { color: theme.colors.text }]}>TRPG 모바일 게임</Text>
              <Text style={[styles.appVersion, { color: theme.colors.textSecondary }]}>
                버전 {appInfo.version} ({appInfo.buildNumber})
              </Text>
            </View>

            {appInfo.hasUpdate && (
              <TouchableOpacity
                style={[styles.updateButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleUpdatePress}
              >
                <Icon name="update" size={20} color="#FFFFFF" />
                <Text style={[styles.updateButtonText, { color: '#FFFFFF' }]}>
                  업데이트 가능 (v{appInfo.latestVersion})
                </Text>
              </TouchableOpacity>
            )}
          </GlassmorphismCard>

          {/* 상세 정보 */}
          <GlassmorphismCard style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>앱 정보</Text>
            
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>개발자</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{appInfo.developer}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>최종 업데이트</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{appInfo.lastUpdated}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>빌드 번호</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{appInfo.buildNumber}</Text>
            </View>
          </GlassmorphismCard>

          {/* 연락처 정보 */}
          <GlassmorphismCard style={styles.contactCard}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>연락처</Text>
            
            <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
              <View style={[styles.contactIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="email" size={20} color={theme.colors.text} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactLabel, { color: theme.colors.text }]}>고객 지원</Text>
                <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
                  {appInfo.supportEmail}
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
              <View style={[styles.contactIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="web" size={20} color={theme.colors.text} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactLabel, { color: theme.colors.text }]}>웹사이트</Text>
                <Text style={[styles.contactValue, { color: theme.colors.textSecondary }]}>
                  {appInfo.website}
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </GlassmorphismCard>

          {/* 라이선스 정보 */}
          <GlassmorphismCard style={styles.licenseCard}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>라이선스</Text>
            <Text style={[styles.licenseText, { color: theme.colors.textSecondary }]}>
              이 앱은 MIT 라이선스 하에 배포됩니다. 자세한 내용은 웹사이트를 참조하세요.
            </Text>
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
  appInfoCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '400',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailCard: {
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactCard: {
    padding: 20,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 12,
    fontWeight: '400',
  },
  licenseCard: {
    padding: 20,
  },
  licenseText: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default AppInfoScreen; 