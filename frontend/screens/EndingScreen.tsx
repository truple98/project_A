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
      <Text style={styles.title}>Ending Screen</Text>
      <Button onPress={() => navigation.navigate('Home')}>
        Back to Home
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