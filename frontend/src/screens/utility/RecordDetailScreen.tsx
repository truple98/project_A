// 1. React/External imports
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. Internal imports
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. Types
type RecordDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecordDetail'>;

// 4. Component
const RecordDetailScreen = () => {
  // 4.1 Hooks
  const navigation = useNavigation<RecordDetailScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 4.2 Event handlers
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // 4.3 Render
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismCard
          style={styles.card}
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>기록 상세</Text>
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
export default RecordDetailScreen; 