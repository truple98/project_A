// 1. React/External imports
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. Internal imports
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Types
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

// 4. Component
const WelcomeScreen = () => {
  // 4.1 Hooks
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 4.2 Event handlers
  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  // 4.3 Render
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.2}
          style={styles.card}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>환영합니다</Text>
          <Button 
            onPress={handleNavigateToLogin}
            mode="contained"
            style={[
              styles.button,
              { backgroundColor: theme.colors.primary }
            ]}
            labelStyle={styles.buttonLabel}
          >
            로그인 화면으로 이동
          </Button>
        </GlassmorphismCard>
      </View>
    </GlassmorphismBackground>
  );
};

// 5. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    padding: 40,
    alignItems: 'center',
    minWidth: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonLabel: {
    color: '#ffffff',
  },
});

// 6. Export
export default WelcomeScreen; 