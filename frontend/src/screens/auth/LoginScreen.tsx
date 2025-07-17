import React, { useState, useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
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
interface LoginFormData {
  email: string;
  password: string;
}

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
  
  // 5.1 Hooks
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 5.3 Event handlers with useCallback
  const handleEmailChange = useCallback((email: string) => {
    setFormData(prev => ({ ...prev, email }));
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setFormData(prev => ({ ...prev, password }));
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    if (!formData.email || !formData.password) {
      return;
    }
    
    setIsLoading(true);
    
    // TODO: 실제 API 호출로 교체
    setTimeout(() => {
      dispatch(setTokens({ 
        accessToken: 'dummy_access_token',
        refreshToken: 'dummy_refresh_token',
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24시간 후
      }));
      dispatch(setUser({ 
        id: '1', 
        email: formData.email, 
        username: 'Player1',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        status: 'active',
      }));
      setIsLoading(false);
      navigation.replace('Home');
    }, LOGIN_DELAY);
  }, [formData.email, formData.password, dispatch, navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleDemoMode = useCallback(() => {
    dispatch(setTokens({ 
      accessToken: 'demo_access_token',
      refreshToken: 'demo_refresh_token',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    }));
    dispatch(setUser(DEMO_USER_DATA));
    navigation.replace('Home');
  }, [dispatch, navigation]);

  // 5.5 JSX return
  return (
    <GlassmorphismBackground>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
                  { 
                    color: theme.colors.text,
                    fontSize: 24,
                    fontWeight: '700',
                  }
                ]}>다시 오신 것을{'\n'}환영합니다!</Text>
                <Text style={[
                  styles.welcomeSubtitle, 
                  { 
                    color: theme.colors.textSecondary,
                    fontSize: 13,
                    fontWeight: '400',
                  }
                ]}>모험을 계속하려면 로그인하세요</Text>
              </View>
            </View>

            {/* 로그인 폼 */}
            <GlassmorphismCard
              elevationLevel={2}
              style={styles.formCard}
            >
              {/* 이메일 입력 */}
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel, 
                  { 
                    color: theme.colors.text,
                    fontSize: 13,
                    fontWeight: '500',
                  }
                ]}>이메일</Text>
                <View style={[
                  styles.inputContainer, 
                  { 
                    backgroundColor: theme.colors.elevation2,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.divider,
                  }
                ]}>
                  <View style={styles.inputIcon}>
                    <Icon
                      name="email-outline"
                      size={20}
                      color={theme.colors.text}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput, 
                      { 
                        color: theme.colors.text,
                        fontSize: 15,
                        fontWeight: '400',
                      }
                    ]}
                    placeholder="이메일을 입력하세요"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={formData.email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* 비밀번호 입력 */}
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel, 
                  { 
                    color: theme.colors.text,
                    fontSize: 13,
                    fontWeight: '500',
                  }
                ]}>비밀번호</Text>
                <View style={[
                  styles.inputContainer, 
                  { 
                    backgroundColor: theme.colors.elevation2,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.divider,
                  }
                ]}>
                  <View style={styles.inputIcon}>
                    <Icon
                      name="lock-outline"
                      size={20}
                      color={theme.colors.text}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput, 
                      { 
                        color: theme.colors.text,
                        fontSize: 15,
                        fontWeight: '400',
                      }
                    ]}
                    placeholder="비밀번호를 입력하세요"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={formData.password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.passwordToggle}
                    onPress={handleTogglePassword}
                  >
                    <Icon
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* 로그인 버튼 */}
              <TouchableOpacity
                style={[
                  styles.loginButton, 
                  { 
                    backgroundColor: theme.colors.primary,
                    borderRadius: 12,
                  }
                ]}
                onPress={handleLogin}
                disabled={isLoading || !formData.email || !formData.password}
              >
                <Text style={[
                  styles.loginButtonText,
                  { 
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: '600',
                  }
                ]}>
                  {isLoading ? '로그인 중...' : '로그인'}
                </Text>
              </TouchableOpacity>

              {/* 회원가입 버튼 */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  {
                    backgroundColor: '#fff',
                    borderRadius: 12,
                  }
                ]}
                onPress={handleRegister}
              >
                <Text style={[
                  styles.registerButtonText,
                  {
                    color: theme.colors.primary,
                    fontSize: 15,
                    fontWeight: '600',
                  }
                ]}>계정 만들기</Text>
              </TouchableOpacity>
            </GlassmorphismCard>
          </View>

          {/* 다른 옵션들 */}
          <View style={styles.optionsContainer}>
            <GlassmorphismCard
              elevationLevel={1}
              style={styles.optionCard}
            >
              <TouchableOpacity 
                style={styles.optionContent}
                onPress={handleDemoMode}
              >
                <View style={styles.optionIconContainer}>
                  <Icon
                    name="play-outline"
                    size={24}
                    color={theme.colors.text}
                  />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={[
                    styles.optionTitle,
                    { 
                      color: theme.colors.text,
                      fontSize: 15,
                      fontWeight: '600',
                    }
                  ]}>데모 모드</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    { 
                      color: theme.colors.textSecondary,
                      fontSize: 13,
                      fontWeight: '400',
                    }
                  ]}>로그인 없이 체험해보세요</Text>
                </View>
                <View style={styles.optionArrow}>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={theme.colors.text}
                  />
                </View>
              </TouchableOpacity>
            </GlassmorphismCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GlassmorphismBackground>
  );
};

// Styles moved outside component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center' as const,
    padding: 24,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center' as const,
    width: '100%' as const,
  },
  header: {
    alignItems: 'center' as const,
    marginBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center' as const,
  },
  welcomeTitle: {
    textAlign: 'center' as const,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    textAlign: 'center' as const,
    marginTop: 12,
  },
  formCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400' as const,
  },
  passwordToggle: {
    padding: 8,
  },
  loginButton: {
    padding: 16,
    alignItems: 'center' as const,
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  registerButton: {
    padding: 16,
    alignItems: 'center' as const,
    marginTop: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  optionsContainer: {
    // Empty as styles are applied inline
  },
  optionCard: {
    marginBottom: 16,
    overflow: 'hidden' as const,
    maxWidth: 400,
    alignSelf: 'center' as const,
    width: '100%' as const,
  },
  optionContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: 20,
  },
  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 2,
  },
  optionSubtitle: {
    // Styles applied inline
  },
  optionArrow: {
    padding: 8,
  },
});

export default LoginScreen; 