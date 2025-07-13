import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

const ResultScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>결과 화면</Text>
      <Button onPress={() => navigation.navigate('Story', { nodeId: 'next' })}>
        다음 스토리 진행
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

export default ResultScreen; 