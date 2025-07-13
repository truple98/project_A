import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { theme, mode } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
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
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

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
      fontSize: 32,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      textAlign: 'center',
      letterSpacing: -0.2,
    },
    formCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
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
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    textInput: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      color: mode === 'dark' ? '#ffffff' : '#000000',
      borderWidth: 1,
      borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
    },
    buttonContainer: {
      gap: 12,
    },
    registerButton: {
      backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    registerButtonDisabled: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    },
    registerButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    loginButton: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    loginButtonText: {
      color: mode === 'dark' ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    footer: {
      alignItems: 'center',
      marginTop: 24,
    },
    footerText: {
      fontSize: 14,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      textAlign: 'center',
      letterSpacing: -0.1,
    },
  });

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
              <Text style={styles.title}>새로운 모험을{'\n'}시작해보세요!</Text>
              <Text style={styles.subtitle}>계정을 만들어 게임을 시작하세요</Text>
            </View>

            {/* 회원가입 폼 */}
            <View style={styles.formCard}>
              {/* 사용자명 입력 */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>사용자명</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="사용자명을 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 이메일 입력 */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이메일</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 비밀번호 입력 */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* 비밀번호 확인 입력 */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <TextInput
                  style={styles.textInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="비밀번호를 다시 입력하세요"
                  placeholderTextColor={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
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
                    (!username || !email || !password || !confirmPassword || isLoading) && styles.registerButtonDisabled
                  ]}
                  onPress={handleRegister}
                  disabled={!username || !email || !password || !confirmPassword || isLoading}
                >
                  <Text style={styles.registerButtonText}>
                    {isLoading ? '계정 생성 중...' : '계정 생성하기'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleBackToLogin}
                >
                  <Text style={styles.loginButtonText}>로그인으로 돌아가기</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 푸터 */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                계정을 생성하면 서비스 이용약관에 동의하게 됩니다
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GlassmorphismBackground>
  );
};

export default RegisterScreen; 