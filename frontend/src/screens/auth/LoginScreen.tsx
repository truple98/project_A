import React, { useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../types';
import { setTokens, setUser } from '../../store/slices/authSlice';
import { User } from '../../services/authAPI';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';

// TypeScript Interfaces
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Constants
const DEMO_USER_DATA: User = {
  id: 'demo',
  email: 'demo@example.com',
  username: 'DemoUser',
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  status: 'active',
};

const LOGIN_DELAY = 1500;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const { theme, mode } = useTheme();

  // Event handlers with useCallback
  const handleGoogleLogin = useCallback(async () => {
    // TODO: 실제 Google 로그인 구현
    console.log('Google 로그인 시도');
    
    // 임시 구현 - 실제로는 Google OAuth 플로우를 구현해야 함
    setTimeout(() => {
      dispatch(setTokens({ 
        accessToken: 'google_access_token',
        refreshToken: 'google_refresh_token',
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24시간 후
      }));
      dispatch(setUser({ 
        id: 'google_user_1', 
        email: 'user@gmail.com', 
        username: 'GoogleUser',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        status: 'active',
      }));
      navigation.replace('Home');
    }, LOGIN_DELAY);
  }, [dispatch, navigation]);

  const handleAppleLogin = useCallback(async () => {
    // TODO: 실제 Apple 로그인 구현
    console.log('Apple 로그인 시도');
    
    // 임시 구현 - 실제로는 Apple Sign-In 플로우를 구현해야 함
    setTimeout(() => {
      dispatch(setTokens({ 
        accessToken: 'apple_access_token',
        refreshToken: 'apple_refresh_token',
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24시간 후
      }));
      dispatch(setUser({ 
        id: 'apple_user_1', 
        email: 'user@icloud.com', 
        username: 'AppleUser',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        status: 'active',
      }));
      navigation.replace('Home');
    }, LOGIN_DELAY);
  }, [dispatch, navigation]);

  const handleGuestLogin = useCallback(() => {
    dispatch(setTokens({ 
      accessToken: 'guest_access_token',
      refreshToken: 'guest_refresh_token',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    }));
    dispatch(setUser(DEMO_USER_DATA));
    navigation.replace('Home');
  }, [dispatch, navigation]);

  // JSX return
  return (
    <GlassmorphismBackground>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <Text style={[
                styles.welcomeTitle, 
                { color: theme.colors.text }
              ]}>
                모험의 세계에{'\n'}오신 것을 환영합니다!
              </Text>
              <Text style={[
                styles.welcomeSubtitle, 
                { color: theme.colors.textSecondary }
              ]}>
                계정으로 로그인하여 모험을 시작하세요
              </Text>
            </View>
          </View>

          {/* 로그인 옵션들 */}
          <View style={styles.loginOptionsContainer}>
            {/* 구글 로그인 */}
            <GlassmorphismCard style={styles.loginOptionCard}>
              <TouchableOpacity 
                style={[
                  styles.loginButton,
                  { backgroundColor: '#4285F4' }
                ]}
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
              >
                <Icon name="google" size={24} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>
                  구글 계정으로 로그인
                </Text>
              </TouchableOpacity>
            </GlassmorphismCard>

            {/* 애플 로그인 */}
            <GlassmorphismCard style={styles.loginOptionCard}>
              <TouchableOpacity 
                style={[
                  styles.loginButton,
                  { backgroundColor: '#000000' }
                ]}
                onPress={handleAppleLogin}
                activeOpacity={0.8}
              >
                <Icon name="apple" size={24} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>
                  애플 계정으로 로그인
                </Text>
              </TouchableOpacity>
            </GlassmorphismCard>

            {/* 게스트 로그인 */}
            <GlassmorphismCard style={styles.loginOptionCard}>
              <TouchableOpacity 
                style={[
                  styles.loginButton,
                  { backgroundColor: theme.colors.elevated }
                ]}
                onPress={handleGuestLogin}
                activeOpacity={0.8}
              >
                <Icon name="account-outline" size={24} color={theme.colors.text} />
                <Text style={[
                  styles.loginButtonText,
                  { color: theme.colors.text }
                ]}>
                  게스트로 진행하기
                </Text>
              </TouchableOpacity>
            </GlassmorphismCard>
          </View>

          {/* 안내 텍스트 */}
          <View style={styles.infoContainer}>
            <Text style={[
              styles.infoText,
              { color: theme.colors.textSecondary }
            ]}>
              게스트 모드로 진행하면 일부 기능이 제한될 수 있습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </GlassmorphismBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  loginOptionsContainer: {
    marginBottom: 32,
  },
  loginOptionCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen; 