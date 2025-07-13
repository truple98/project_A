import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type VersionInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VersionInfo'>;

const VersionInfoScreen = () => {
  const navigation = useNavigation<VersionInfoScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>버전 정보</Text>
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

export default VersionInfoScreen; 