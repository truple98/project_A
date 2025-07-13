import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { mode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 1000); // 1초 후 상태에 따라 이동
    return () => clearTimeout(timer);
  }, [navigation, token]);

  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.appSection}>
            <Text style={[styles.appName, { color: mode === 'dark' ? '#ffffff' : '#000000' }]}>
              project_A
            </Text>
            <Text style={[styles.appSubtitle, { color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
              텍스트 기반 RPG 게임
            </Text>
          </View>
          
          <View style={styles.loadingSection}>
            <ActivityIndicator size="large" color={mode === 'dark' ? '#5A9FFF' : '#4285F4'} />
            <Text style={[styles.loadingText, { color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
              로딩 중...
            </Text>
          </View>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingSection: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default SplashScreen; 