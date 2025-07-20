// 1. React/External imports
import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. Internal imports
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Type definitions
interface UserInfo {
  username: string;
  email: string;
  accountLevel: number;
  profileImage?: string;
}

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

// 4. Constants
const MOCK_USER_INFO: UserInfo = {
  username: '모험가123',
  email: 'adventure@example.com',
  accountLevel: 5,
};

// 5. Component
const AccountScreen = () => {
  // 5.1 Hooks
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { theme } = useTheme();

  // 5.2 Event handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditProfile = useCallback(() => {
    // TODO: 프로필 편집 화면으로 이동
    console.log('프로필 편집');
  }, []);

  const handleMyProducts = useCallback(() => {
    // TODO: 내 상품 화면으로 이동
    console.log('내 상품');
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

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      '계정 탈퇴',
      '정말로 계정을 탈퇴하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '탈퇴', style: 'destructive', onPress: () => {
          // TODO: 계정 탈퇴 절차 구현
          console.log('계정 탈퇴');
        }},
      ]
    );
  }, []);

  const handleTermsOfService = useCallback(() => {
    // TODO: 이용 약관 화면으로 이동
    console.log('이용 약관');
  }, []);

  const handleAchievement = useCallback(() => {
    (navigation as any).navigate('Achievement');
  }, [navigation]);

  const handleHistory = useCallback(() => {
    navigation.navigate('History');
  }, [navigation]);

  // 5.3 Styles
  const styles = StyleSheet.create({
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    placeholder: {
      width: 48,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    profileCard: {
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    username: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    email: {
      fontSize: 16,
      marginBottom: 20,
      letterSpacing: -0.2,
    },
    editButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      marginBottom: 12,
    },
    menuIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      letterSpacing: -0.2,
    },
    menuSubtitle: {
      fontSize: 14,
      letterSpacing: -0.1,
    },
    menuArrow: {
      marginLeft: 8,
    },
    levelCard: {
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
    },
    levelTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      letterSpacing: -0.3,
    },
    levelValue: {
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    levelDescription: {
      fontSize: 14,
      textAlign: 'center',
      letterSpacing: -0.1,
    },
    dangerButton: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 12,
    },
    dangerButtonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
  });

  // 5.4 JSX Return
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* Header */}
        <GlassmorphismCard style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
              onPress={handleGoBack}
            >
              <Icon
                name="arrow-left"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              계정 정보
            </Text>
            <View style={styles.placeholder} />
          </View>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 내 정보 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>내 정보</Text>
            <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
              <View style={[styles.avatarContainer, { backgroundColor: theme.colors.elevated }]}>
                <Icon
                  name="account"
                  size={40}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.username, { color: theme.colors.text }]}>
                {MOCK_USER_INFO.username}
              </Text>
              <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
                {MOCK_USER_INFO.email}
              </Text>
              <TouchableOpacity 
                style={[styles.editButton, { backgroundColor: theme.colors.elevated }]}
                onPress={handleEditProfile}
              >
                <Text style={[styles.editButtonText, { color: theme.colors.text }]}>
                  프로필 편집
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 계정 레벨 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>계정 레벨</Text>
            <View style={[styles.levelCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.levelTitle, { color: theme.colors.text }]}>
                현재 레벨
              </Text>
              <Text style={[styles.levelValue, { color: theme.colors.primary }]}>
                Lv.{MOCK_USER_INFO.accountLevel}
              </Text>
              <Text style={[styles.levelDescription, { color: theme.colors.textSecondary }]}>
                게임을 플레이하며 레벨을 올려보세요!
              </Text>
            </View>
          </View>

          {/* 내 상품 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>내 상품</Text>
            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
              onPress={handleMyProducts}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="package-variant" size={24} color={theme.colors.text} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  구매한 상품
                </Text>
                <Text style={[styles.menuSubtitle, { color: theme.colors.textSecondary }]}>
                  앱 내에서 구매한 상품들을 확인하세요
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={20} 
                color={theme.colors.textSecondary}
                style={styles.menuArrow}
              />
            </TouchableOpacity>
          </View>

          {/* 게임 기록 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>게임 기록</Text>
            
            {/* 업적 */}
            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
              onPress={handleAchievement}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="trophy" size={24} color={theme.colors.text} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  업적
                </Text>
                <Text style={[styles.menuSubtitle, { color: theme.colors.textSecondary }]}>
                  달성한 업적들을 확인하세요
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={20} 
                color={theme.colors.textSecondary}
                style={styles.menuArrow}
              />
            </TouchableOpacity>

            {/* 기록 */}
            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
              onPress={handleHistory}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="history" size={24} color={theme.colors.text} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  기록
                </Text>
                <Text style={[styles.menuSubtitle, { color: theme.colors.textSecondary }]}>
                  플레이 기록을 확인하세요
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={20} 
                color={theme.colors.textSecondary}
                style={styles.menuArrow}
              />
            </TouchableOpacity>
          </View>

          {/* 이용 약관 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>기타</Text>
            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
              onPress={handleTermsOfService}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.colors.elevated }]}>
                <Icon name="file-document-outline" size={24} color={theme.colors.text} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  이용 약관
                </Text>
                <Text style={[styles.menuSubtitle, { color: theme.colors.textSecondary }]}>
                  게임 이용에 대한 약관을 확인하세요
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={20} 
                color={theme.colors.textSecondary}
                style={styles.menuArrow}
              />
            </TouchableOpacity>
          </View>

          {/* 계정 관리 */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>계정 관리</Text>
            
            {/* 로그아웃 */}
            <TouchableOpacity 
              style={[styles.dangerButton, { backgroundColor: theme.colors.warning }]}
              onPress={handleLogout}
            >
              <Text style={[styles.dangerButtonText, { color: '#FFFFFF' }]}>
                로그아웃
              </Text>
            </TouchableOpacity>

            {/* 계정 탈퇴 */}
            <TouchableOpacity 
              style={[styles.dangerButton, { backgroundColor: theme.colors.error }]}
              onPress={handleDeleteAccount}
            >
              <Text style={[styles.dangerButtonText, { color: '#FFFFFF' }]}>
                계정 탈퇴
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. Export
export default AccountScreen; 