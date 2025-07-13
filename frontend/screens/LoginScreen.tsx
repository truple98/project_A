import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store/slices/authSlice';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const { theme, mode } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    
    setIsLoading(true);
    
    // TODO: 실제 API 호출로 교체
    setTimeout(() => {
      dispatch(setToken('dummy_token'));
      dispatch(setUser({ 
        id: '1', 
        email, 
        username: 'Player1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setIsLoading(false);
      navigation.replace('Home');
    }, 1500);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleDemoMode = () => {
    // 데모 모드용 토큰과 사용자 정보 설정
    dispatch(setToken('demo_token'));
    dispatch(setUser({ 
      id: 'demo', 
      email: 'demo@example.com', 
      username: 'DemoUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    navigation.replace('Home');
  };

  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <Text style={[
                styles.welcomeTitle, 
                { 
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                  fontSize: theme.typography.sizes.xxl,
                  fontWeight: theme.typography.weights.bold,
                }
              ]}>다시 오신 것을{'\n'}환영합니다!</Text>
              <Text style={[
                styles.welcomeSubtitle, 
                { 
                  color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontSize: theme.typography.sizes.sm,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>모험을 계속하려면 로그인하세요</Text>
            </View>
          </View>

          {/* 로그인 폼 */}
          <GlassmorphismCard
            isDark={mode === 'dark'}
            opacity={0.2}
            style={styles.formContainer}
          >
            {/* 이메일 입력 */}
            <View style={styles.inputGroup}>
              <Text style={[
                styles.inputLabel, 
                { 
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                  fontSize: theme.typography.sizes.sm,
                  fontWeight: theme.typography.weights.medium,
                }
              ]}>이메일</Text>
              <View style={[
                styles.inputContainer, 
                { 
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                  borderRadius: theme.design.borderRadius.md,
                  borderWidth: 1,
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }
              ]}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="email-outline"
                    size={20}
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <TextInput
                  style={[
                    styles.textInput, 
                    { 
                      color: mode === 'dark' ? '#ffffff' : '#000000',
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  value={email}
                  onChangeText={setEmail}
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
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                  fontSize: theme.typography.sizes.sm,
                  fontWeight: theme.typography.weights.medium,
                }
              ]}>비밀번호</Text>
              <View style={[
                styles.inputContainer, 
                { 
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                  borderRadius: theme.design.borderRadius.md,
                  borderWidth: 1,
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }
              ]}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="lock-outline"
                    size={20}
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <TextInput
                  style={[
                    styles.textInput, 
                    { 
                      color: mode === 'dark' ? '#ffffff' : '#000000',
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={[
                styles.loginButton, 
                { 
                  backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
                  borderRadius: theme.design.borderRadius.lg,
                  shadowColor: mode === 'dark' ? '#000' : '#4285F4',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }
              ]}
              onPress={handleLogin}
              disabled={isLoading || !email || !password}
            >
              <Text style={[
                styles.loginButtonText,
                { 
                  color: '#ffffff',
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.semibold,
                }
              ]}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Text>
            </TouchableOpacity>

            {/* 회원가입 링크 */}
            <View style={styles.registerContainer}>
              <Text style={[
                styles.registerText, 
                { 
                  color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontSize: theme.typography.sizes.sm,
                  fontWeight: theme.typography.weights.regular,
                }
              ]}>계정이 없으신가요?</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={[
                  styles.registerLink, 
                  { 
                    color: mode === 'dark' ? '#5A9FFF' : '#4285F4',
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </GlassmorphismCard>

          {/* 다른 옵션들 */}
          <View style={styles.optionsContainer}>
            <GlassmorphismCard
              isDark={mode === 'dark'}
              opacity={0.18}
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
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={[
                    styles.optionTitle,
                    { 
                      color: mode === 'dark' ? '#ffffff' : '#000000',
                      fontSize: theme.typography.sizes.md,
                      fontWeight: theme.typography.weights.semibold,
                    }
                  ]}>데모 모드</Text>
                  <Text style={[
                    styles.optionSubtitle,
                    { 
                      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                      fontSize: theme.typography.sizes.sm,
                      fontWeight: theme.typography.weights.regular,
                    }
                  ]}>로그인 없이 체험해보세요</Text>
                </View>
                <View style={styles.optionArrow}>
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={mode === 'dark' ? '#ffffff' : '#000000'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeEmoji: {
    marginBottom: 12,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    textAlign: 'center',
    marginTop: 12,
  },
  formContainer: {
    padding: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  passwordToggle: {
    padding: 8,
  },
  loginButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    marginRight: 8,
  },
  registerLink: {
    fontWeight: '600',
  },
  optionsContainer: {
    // 스타일은 인라인으로 적용
  },
  optionCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 2,
  },
  optionSubtitle: {
    // 스타일은 인라인으로 적용
  },
  optionArrow: {
    padding: 8,
  },
});

export default LoginScreen; 