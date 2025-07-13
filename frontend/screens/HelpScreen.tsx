import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

const HelpScreen = () => {
  const navigation = useNavigation<HelpScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Screen</Text>
      <Button onPress={() => navigation.goBack()}>
        Back
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

export default HelpScreen; 