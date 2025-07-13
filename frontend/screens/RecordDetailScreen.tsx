import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';

type RecordDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecordDetail'>;

const RecordDetailScreen = () => {
  const navigation = useNavigation<RecordDetailScreenNavigationProp>();
  const { theme, mode } = useTheme();

  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.2}
          style={styles.card}
        >
          <Text style={[styles.title, { color: mode === 'dark' ? '#ffffff' : '#000000' }]}>기록 상세</Text>
          <Button 
            onPress={() => navigation.goBack()}
            mode="outlined"
            style={{ borderColor: mode === 'dark' ? '#5A9FFF' : '#4285F4' }}
            labelStyle={{ color: mode === 'dark' ? '#5A9FFF' : '#4285F4' }}
          >
            뒤로가기
          </Button>
        </GlassmorphismCard>
      </View>
    </GlassmorphismBackground>
  );
};

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

export default RecordDetailScreen; 