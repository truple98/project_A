import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store/slices/authSlice';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      // TODO: 에러 메시지 표시
      return;
    }

    setIsLoading(true);
    
    // TODO: 실제 로그인 로직 구현
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Home');
    }, 2000);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleDemoMode = () => {
    // 임시 유저/토큰 정보
    const now = new Date().toISOString();
    const demoUser = {
      id: 'demo',
      email: 'demo@demo.com',
      username: 'DemoUser',
      createdAt: now,
      updatedAt: now,
    };
    const demoToken = 'demo-token';

    dispatch(setUser(demoUser));
    dispatch(setToken(demoToken));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Title style={styles.title}>다시 오신 것을 환영합니다</Title>
            <Paragraph style={styles.subtitle}>
              모험을 계속하려면 로그인하세요
            </Paragraph>
          </View>

          {/* 로그인 폼 */}
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="이메일"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="비밀번호"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon 
                    icon={showPassword ? "eye-off" : "eye"} 
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading || !email || !password}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </Card.Content>
          </Card>

          {/* 회원가입 링크 */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>계정이 없으신가요? </Text>
            <Button
              mode="text"
              onPress={handleRegister}
              style={styles.registerButton}
            >
              회원가입
            </Button>
          </View>

          {/* 데모 버튼 */}
          <View style={styles.demoContainer}>
            <Button
              mode="outlined"
              onPress={handleDemoMode}
              style={styles.demoButton}
            >
              데모 모드 (로그인 건너뛰기)
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 30,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#666666',
  },
  registerButton: {
    marginLeft: 4,
  },
  demoContainer: {
    alignItems: 'center',
  },
  demoButton: {
    borderColor: '#6200ee',
    borderWidth: 1,
  },
});

export default LoginScreen; 