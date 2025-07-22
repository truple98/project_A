// 1. React/External imports
import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// 2. Internal imports
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import { RootState } from '../../store';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Types
type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

// 4. Component
const SplashScreen = () => {
  // 4.1 Hooks
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { theme, mode } = useTheme();

  // 4.2 Event handlers
  const navigateToScreen = useCallback(() => {
    if (accessToken) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  }, [navigation, accessToken]);

  // 4.3 Effects
  useEffect(() => {
    const timer = setTimeout(navigateToScreen, 1000); // 1초 후 상태에 따라 이동
    return () => clearTimeout(timer);
  }, [navigateToScreen]);

  // 4.4 Render
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.appSection}>
            <Text style={[styles.appName, { color: theme.colors.text }]}>
              project_A
            </Text>
            <Text style={[styles.appSubtitle, { color: theme.colors.textSecondary }]}>
              Binary Studio
            </Text>
          </View>
          
          <View style={styles.loadingSection}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
              로딩 중...
            </Text>
          </View>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

// 5. Styles
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

// 6. Export
export default SplashScreen; 