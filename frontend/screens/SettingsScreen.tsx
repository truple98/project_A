import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../constants/theme';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { mode, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
      <Button onPress={toggleTheme} mode="contained" style={{ marginBottom: 16 }}>
        {mode === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
      </Button>
      <Button onPress={() => navigation.goBack()}>
        뒤로가기
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SettingsScreen; 