import React, { useState, useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';

// TypeScript Interfaces
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

// Constants
const INITIAL_FORM_DATA: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const REGISTER_DELAY = 2000;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { theme, mode } = useTheme();
  
  // 5.1 Hooks
  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // 5.3 Event handlers with useCallback
  const handleFieldChange = useCallback((field: keyof RegisterFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(async () => {
    const { username, email, password, confirmPassword } = formData;
    
    if (!username || !email || !password || !confirmPassword) {
      // TODO: 에러 메시지 표시
      return;
    }

    if (password !== confirmPassword) {
      // TODO: 비밀번호 불일치 에러 표시
      return;
    }

    setIsLoading(true);
    
    // TODO: 실제 회원가입 로직 구현
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
    }, REGISTER_DELAY);
  }, [formData, navigation]);

  const handleBackToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  // 5.5 JSX return
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* 헤더 */}
            <View style={styles.header}>
              <Text style={[
                styles.title,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.xxl,
                  fontWeight: theme.typography.weights.bold,
                }
              ]}>새로운 모험을{'\n'}시작해보세요!</Text>
              <Text style={[
                styles.subtitle,
                { 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>계정을 만들어 게임을 시작하세요</Text>
            </View>

            {/* 회원가입 폼 */}
            <View style={[
              styles.formCard,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              {/* 사용자명 입력 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>사용자명</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { 
                      backgroundColor: theme.colors.elevation2,
                      color: theme.colors.text,
                      borderColor: theme.colors.divider,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  value={formData.username}
                  onChangeText={handleFieldChange('username')}
                  placeholder="사용자명을 입력하세요"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 이메일 입력 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>이메일</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { 
                      backgroundColor: theme.colors.elevation2,
                      color: theme.colors.text,
                      borderColor: theme.colors.divider,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  value={formData.email}
                  onChangeText={handleFieldChange('email')}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 비밀번호 입력 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>비밀번호</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { 
                      backgroundColor: theme.colors.elevation2,
                      color: theme.colors.text,
                      borderColor: theme.colors.divider,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  value={formData.password}
                  onChangeText={handleFieldChange('password')}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor={theme.colors.textSecondary}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 비밀번호 확인 입력 */}
              <View style={styles.inputContainer}>
                <Text style={[
                  styles.inputLabel,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                  }
                ]}>비밀번호 확인</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { 
                      backgroundColor: theme.colors.elevation2,
                      color: theme.colors.text,
                      borderColor: theme.colors.divider,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  value={formData.confirmPassword}
                  onChangeText={handleFieldChange('confirmPassword')}
                  placeholder="비밀번호를 다시 입력하세요"
                  placeholderTextColor={theme.colors.textSecondary}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 버튼들 */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.registerButton,
                    { 
                      backgroundColor: '#fff',
                      borderRadius: theme.design.borderRadius.lg,
                    },
                    (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || isLoading) && styles.registerButtonDisabled
                  ]}
                  onPress={handleRegister}
                  disabled={!formData.username || !formData.email || !formData.password || !formData.confirmPassword || isLoading}
                >
                  <Text style={[
                    styles.registerButtonText,
                    { 
                      color: theme.colors.primary,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>
                    {isLoading ? '계정 생성 중...' : '계정 생성하기'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    { 
                      backgroundColor: theme.colors.elevation2,
                      borderRadius: theme.design.borderRadius.md,
                    }
                  ]}
                  onPress={handleBackToLogin}
                >
                  <Text style={[
                    styles.loginButtonText,
                    { 
                      color: theme.colors.text,
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>로그인으로 돌아가기</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 푸터 */}
            <View style={styles.footer}>
              <Text style={[
                styles.footerText,
                { 
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.sizes.sm,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>
                계정을 생성하면 서비스 이용약관에 동의하게 됩니다
              </Text>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    letterSpacing: -0.2,
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  textInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  buttonContainer: {
    gap: 12,
  },
  registerButton: {
    paddingVertical: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  registerButtonDisabled: {
    opacity: 0.5,
  },
  registerButtonText: {
    letterSpacing: -0.2,
  },
  loginButton: {
    paddingVertical: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  loginButtonText: {
    letterSpacing: -0.2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});

export default RegisterScreen; 