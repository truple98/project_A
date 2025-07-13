import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type EndingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ending'>;

const EndingScreen = () => {
  const navigation = useNavigation<EndingScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>엔딩 화면</Text>
      <Button onPress={() => navigation.navigate('Home')}>
        홈으로 돌아가기
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

export default EndingScreen; 