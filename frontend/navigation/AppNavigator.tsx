import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import GameStartScreen from '../screens/GameStartScreen';
import StoryScreen from '../screens/StoryScreen';
import ResultScreen from '../screens/ResultScreen';
import EndingScreen from '../screens/EndingScreen';
import CharacterScreen from '../screens/CharacterScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RecordDetailScreen from '../screens/RecordDetailScreen';
import InventoryScreen from '../screens/InventoryScreen';
import StatusScreen from '../screens/StatusScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import VersionInfoScreen from '../screens/VersionInfoScreen';
import HelpScreen from '../screens/HelpScreen';

import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Splash Screen - 항상 첫 번째 화면 */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      
      {!token ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GameStart" component={GameStartScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Ending" component={EndingScreen} />
          <Stack.Screen name="Character" component={CharacterScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Status" component={StatusScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="VersionInfo" component={VersionInfoScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 