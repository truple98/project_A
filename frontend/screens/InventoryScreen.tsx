import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type InventoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inventory'>;

const InventoryScreen = () => {
  const navigation = useNavigation<InventoryScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>인벤토리</Text>
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

export default InventoryScreen; 