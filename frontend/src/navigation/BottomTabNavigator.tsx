import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EncyclopediaScreen from '../screens/utility/encyclopedia/EncyclopediaScreen';
import StoreScreen from '../screens/utility/StoreScreen';
import LibraryScreen from '../screens/game/LibraryScreen';
import AccountScreen from '../screens/player/AccountScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme, mode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Encyclopedia':
              iconName = 'book-open-variant';
              break;
            case 'Store':
              iconName = 'store';
              break;
            case 'Library':
              iconName = 'book-open-variant';
              break;
            case 'Account':
              iconName = 'account';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.elevation1,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          ...Platform.select({
            ios: {
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Encyclopedia" 
        component={EncyclopediaScreen}
        options={{ tabBarLabel: '도감' }}
      />
      <Tab.Screen 
        name="Store" 
        component={StoreScreen}
        options={{ tabBarLabel: '스토어' }}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{ tabBarLabel: '서재' }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{ tabBarLabel: '내 정보' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 