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
type StatusScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Status'>;

// 4. Component
const StatusScreen = () => {
  // 4.1 Hooks
  const navigation = useNavigation<StatusScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 4.2 Event handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
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
          <Text style={[styles.title, { color: theme.colors.text }]}>상태 정보</Text>
          <Button 
            onPress={handleGoBack}
            mode="outlined"
            style={{ borderColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.primary }}
          >
            뒤로가기
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
});

// 6. Export
export default StatusScreen; 