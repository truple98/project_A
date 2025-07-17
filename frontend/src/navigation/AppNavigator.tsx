/**
 * 🗺️ Application Navigator
 * 
 * React Navigation을 사용한 앱의 중앙 네비게이션 관리자입니다.
 * 인증 상태에 따라 Auth Stack과 Main App Stack을 조건부로 렌더링합니다.
 * 
 * @description
 * - 인증되지 않은 사용자: Splash → Welcome → Login/Register 플로우
 * - 인증된 사용자: 전체 앱 기능에 접근 가능
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. React 및 내장 Hooks
// ========================================
import React, { useMemo } from 'react';

// ========================================
// 2. React Navigation 관련
// ========================================
import { createStackNavigator } from '@react-navigation/stack';

// ========================================
// 3. 외부 상태 관리 라이브러리
// ========================================
import { useSelector } from 'react-redux';

// ========================================
// 4. 프로젝트 내부 - 스크린 컴포넌트들
// ========================================
// 🔐 Authentication Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// 🎮 Game Flow Screens  
import HomeScreen from '../screens/game/HomeScreen';
import GameStartScreen from '../screens/game/GameStartScreen';
import ResultScreen from '../screens/game/ResultScreen';
import EndingScreen from '../screens/game/EndingScreen';

// 👤 Character & Progress Screens
import CharacterScreen from '../screens/player/CharacterScreen';
import HistoryScreen from '../screens/player/HistoryScreen';
import InventoryScreen from '../screens/player/InventoryScreen';
import AccountScreen from '../screens/player/AccountScreen';

// ⚙️ Utility & Settings Screens
import SettingsScreen from '../screens/utility/SettingsScreen';
import HelpScreen from '../screens/utility/HelpScreen';

// ========================================
// 5. 프로젝트 내부 - 타입 및 스토어
// ========================================
import { RootState } from '../store';
import { RootStackParamList } from '../types';
import { ROUTES } from '../constants/routes';

// ========================================
// 6. 상수 정의
// ========================================

/**
 * React Navigation Stack Navigator 인스턴스
 */
const Stack = createStackNavigator<RootStackParamList>();

/**
 * 공통 네비게이터 설정
 */
const NAVIGATOR_OPTIONS = {
  headerShown: false,
} as const;

// ========================================
// 7. 컴포넌트 정의
// ========================================

/**
 * AppNavigator 컴포넌트
 */
const AppNavigator: React.FC = () => {
  // ========================================
  // 8. Hooks 및 상태 관리
  // ========================================
  
  /**
   * Redux store에서 인증 상태 가져오기
   */
  const { accessToken } = useSelector((state: RootState) => state.auth);

  /**
   * 인증 상태 기반 네비게이션 스택 결정
   */
  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken]);

  // ========================================
  // 9. 렌더링 헬퍼 함수들
  // ========================================

  /**
   * 인증 관련 스크린들을 렌더링
   */
  const renderAuthScreens = (): JSX.Element[] => [
    <Stack.Screen 
      key={ROUTES.AUTH.WELCOME}
      name={ROUTES.AUTH.WELCOME} 
      component={WelcomeScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.AUTH.LOGIN}
      name={ROUTES.AUTH.LOGIN} 
      component={LoginScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.AUTH.REGISTER}
      name={ROUTES.AUTH.REGISTER} 
      component={RegisterScreen} 
    />,
  ];

  /**
   * 메인 앱 스크린들을 렌더링
   */
  const renderMainAppScreens = (): JSX.Element[] => [
    // 🎮 게임 플로우 스크린들
    <Stack.Screen 
      key={ROUTES.MAIN.HOME}
      name={ROUTES.MAIN.HOME} 
      component={HomeScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.MAIN.GAME_START}
      name={ROUTES.MAIN.GAME_START} 
      component={GameStartScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.MAIN.RESULT}
      name={ROUTES.MAIN.RESULT} 
      component={ResultScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.MAIN.ENDING}
      name={ROUTES.MAIN.ENDING} 
      component={EndingScreen} 
    />,
    
    // 👤 캐릭터 및 진행상황 스크린들
    <Stack.Screen 
      key={ROUTES.CHARACTER.OVERVIEW}
      name={ROUTES.CHARACTER.OVERVIEW} 
      component={CharacterScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.CHARACTER.HISTORY}
      name={ROUTES.CHARACTER.HISTORY} 
      component={HistoryScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.CHARACTER.INVENTORY}
      name={ROUTES.CHARACTER.INVENTORY} 
      component={InventoryScreen} 
    />,
    
    // ⚙️ 설정 및 계정 스크린들
    <Stack.Screen 
      key={ROUTES.SETTINGS.MAIN}
      name={ROUTES.SETTINGS.MAIN} 
      component={SettingsScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.SETTINGS.ACCOUNT}
      name={ROUTES.SETTINGS.ACCOUNT} 
      component={AccountScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.SETTINGS.HELP}
      name={ROUTES.SETTINGS.HELP} 
      component={HelpScreen} 
    />,
  ];

  // ========================================
  // 10. JSX 반환
  // ========================================
  
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      {/* �� 인증 상태에 따른 조건부 스크린 렌더링 */}
      {!isAuthenticated ? (
        // 🔐 인증되지 않은 사용자: Auth Flow
        <>
          {renderAuthScreens()}
        </>
      ) : (
        // 🎮 인증된 사용자: Main App Flow  
        <>
          {renderMainAppScreens()}
        </>
      )}
    </Stack.Navigator>
  );
};

// ========================================
// 11. 컴포넌트 내보내기
// ========================================

export default AppNavigator; 