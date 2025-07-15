// 1. React/External imports
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. Internal imports
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface UserInfo {
  username: string;
  email: string;
  level: number;
  experience: number;
  totalPlayTime: string;
  gamesPlayed: number;
  victoriesCount: number;
  achievementsUnlocked: number;
}

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

interface ProfileSection {
  title: string;
  items: StatItem[];
}

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

// 4. Constants
const INITIAL_USER_INFO: UserInfo = {
  username: '모험가123',
  email: 'adventure@example.com',
  level: 25,
  experience: 15750,
  totalPlayTime: '48시간 32분',
  gamesPlayed: 127,
  victoriesCount: 89,
  achievementsUnlocked: 23,
};

const getProfileSections = (userInfo: UserInfo): ProfileSection[] => [
  {
    title: '게임 통계',
    items: [
      { label: '레벨', value: userInfo.level.toString(), icon: 'trending-up' },
      { label: '경험치', value: userInfo.experience.toLocaleString(), icon: 'star' },
      { label: '총 플레이 시간', value: userInfo.totalPlayTime, icon: 'clock' },
      { label: '플레이한 게임', value: userInfo.gamesPlayed.toString(), icon: 'gamepad-variant' },
    ]
  },
  {
    title: '성과',
    items: [
      { label: '승리 횟수', value: userInfo.victoriesCount.toString(), icon: 'trophy' },
      { label: '달성한 업적', value: userInfo.achievementsUnlocked.toString(), icon: 'medal' },
      { label: '승률', value: `${Math.round((userInfo.victoriesCount / userInfo.gamesPlayed) * 100)}%`, icon: 'chart-line' },
    ]
  }
];

// 5. Component
const AccountScreen = () => {
  // 5.1 Hooks
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { theme, mode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(INITIAL_USER_INFO);

  // 5.2 Data/Computed values
  const profileSections = getProfileSections(userInfo);

  // 5.3 Event handlers
  const handleSave = useCallback(() => {
    setIsEditing(false);
    Alert.alert('저장 완료', '계정 정보가 성공적으로 저장되었습니다.');
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      '로그아웃',
      '정말로 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '로그아웃', onPress: () => navigation.navigate('Login') },
      ]
    );
  }, [navigation]);

  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleUsernameChange = useCallback((text: string) => {
    setUserInfo(prev => ({ ...prev, username: text }));
  }, []);

  const handleEmailChange = useCallback((text: string) => {
    setUserInfo(prev => ({ ...prev, email: text }));
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 5.5 JSX Return
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        {/* Header */}
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.15}
          style={styles.header}
        >
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>계정 정보</Text>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.section}>
            <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
              <View style={[styles.avatarContainer, { backgroundColor: theme.colors.elevation1 }]}>
                <Icon
                  name="account"
                  size={44}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.username, { color: theme.colors.text }]}>{userInfo.username}</Text>
              <Text style={[styles.email, { color: theme.colors.textSecondary }]}>{userInfo.email}</Text>
              <TouchableOpacity 
                style={[styles.editButton, { backgroundColor: theme.colors.elevation1 }]}
                onPress={handleEditToggle}
              >
                <Text style={[styles.editButtonText, { color: theme.colors.text }]}>
                  {isEditing ? '편집 취소' : '프로필 편집'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {isEditing ? (
            /* Edit Form */
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>프로필 편집</Text>
              <View style={[styles.editForm, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: theme.colors.text }]}>사용자명</Text>
                  <TextInput
                    value={userInfo.username}
                    onChangeText={handleUsernameChange}
                    style={[styles.textInput, { backgroundColor: theme.colors.elevation1 }]}
                    mode="outlined"
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    textColor={theme.colors.text}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: theme.colors.text }]}>이메일</Text>
                  <TextInput
                    value={userInfo.email}
                    onChangeText={handleEmailChange}
                    style={[styles.textInput, { backgroundColor: theme.colors.elevation1 }]}
                    mode="outlined"
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    keyboardType="email-address"
                    textColor={theme.colors.text}
                  />
                </View>
                <View style={styles.formButtons}>
                  <Button 
                    onPress={handleEditCancel}
                    mode="contained"
                    style={[styles.formButton, { backgroundColor: theme.colors.elevation1 }]}
                    labelStyle={[styles.formButtonLabel, { color: theme.colors.text }]}
                  >
                    취소
                  </Button>
                  <Button 
                    onPress={handleSave}
                    mode="contained"
                    style={[styles.formButton, styles.primaryFormButton, { backgroundColor: theme.colors.primary }]}
                    labelStyle={styles.primaryFormButtonLabel}
                  >
                    저장
                  </Button>
                </View>
              </View>
            </View>
          ) : (
            /* Info Sections */
            profileSections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{section.title}</Text>
                <View style={[styles.infoSection, { backgroundColor: theme.colors.surface }]}>
                  <View style={styles.infoList}>
                    {section.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={[styles.infoItem, { backgroundColor: theme.colors.elevation1 }]}>
                        <View style={[styles.infoIcon, { backgroundColor: theme.colors.elevation2 }]}>
                          <Icon
                            name={item.icon}
                            size={24}
                            color={theme.colors.text}
                          />
                        </View>
                        <View style={styles.infoContent}>
                          <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>{item.label}</Text>
                          <Text style={[styles.infoValue, { color: theme.colors.text }]}>{item.value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button 
              onPress={handleLogout}
              mode="contained"
              style={[styles.actionButton, styles.logoutButton]}
              labelStyle={[styles.actionButtonLabel, styles.logoutButtonLabel]}
            >
              로그아웃
            </Button>
            <Button 
              onPress={handleGoBack}
              mode="contained"
              style={[styles.actionButton, styles.backButton, { backgroundColor: theme.colors.elevation1 }]}
              labelStyle={[styles.actionButtonLabel, styles.backButtonLabel, { color: theme.colors.text }]}
            >
              뒤로가기
            </Button>
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  avatarContainer: {
    borderRadius: 44,
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  editButton: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  infoSection: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  infoIcon: {
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  editForm: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  textInput: {
    borderRadius: 12,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  formButton: {
    flex: 1,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  formButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  primaryFormButton: {
    // backgroundColor will be set dynamically
  },
  primaryFormButtonLabel: {
    color: '#ffffff',
  },
  actionButtons: {
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  logoutButtonLabel: {
    color: '#ffffff',
  },
  backButton: {
    // backgroundColor will be set dynamically
  },
  backButtonLabel: {
    // color will be set dynamically
  },
});

// 7. Export
export default AccountScreen; 