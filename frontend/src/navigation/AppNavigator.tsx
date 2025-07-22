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
import * as React from 'react';
import { useMemo } from 'react';

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
import TitleScreen from '../screens/app/TitleScreen';
import LoginScreen from '../screens/auth/LoginScreen';

// 🎮 Game Flow Screens  
import HomeScreen from '../screens/game/HomeScreen';
import StoryScreen from '../screens/game/StoryScreen';
import ResultScreen from '../screens/game/ResultScreen';
import EndingScreen from '../screens/game/EndingScreen';
import LibraryScreen from '../screens/game/LibraryScreen';
import LibraryDetailScreen from '../screens/game/LibraryDetailScreen';

// 👤 Character & Progress Screens
import HistoryScreen from '../screens/player/HistoryScreen';
import AccountScreen from '../screens/player/AccountScreen';
import PurchasedItemsScreen from '../screens/player/PurchasedItemsScreen';
import AccountDeactivateScreen from '../screens/player/AccountDeactivateScreen';

// ⚙️ Utility & Settings Screens
import SettingsScreen from '../screens/utility/SettingsScreen';
import ThemeSettingsScreen from '../screens/utility/ThemeSettingsScreen';
import LanguageSettingsScreen from '../screens/utility/LanguageSettingsScreen';
import TermsOfServiceScreen from '../screens/utility/TermsOfServiceScreen';
import AppInfoScreen from '../screens/utility/AppInfoScreen';
import StoreScreen from '../screens/utility/StoreScreen';
import StoreDetailScreen from '../screens/utility/StoreDetailScreen';
import HelpScreen from '../screens/utility/HelpScreen';
import EncyclopediaScreen from '../screens/utility/encyclopedia/EncyclopediaScreen';

// 🏆 Achievement Screen
import AchievementScreen from '../screens/player/AchievementScreen';

// 📚 Encyclopedia Detail Screens
import LocationEncyclopediaScreen from '../screens/utility/encyclopedia/LocationEncyclopediaScreen';
import CharacterEncyclopediaScreen from '../screens/utility/encyclopedia/CharacterEncyclopediaScreen';
import CreatureEncyclopediaScreen from '../screens/utility/encyclopedia/CreatureEncyclopediaScreen';
import CompanionEncyclopediaScreen from '../screens/utility/encyclopedia/CompanionEncyclopediaScreen';
import ItemEncyclopediaScreen from '../screens/utility/encyclopedia/ItemEncyclopediaScreen';
import StatusEncyclopediaScreen from '../screens/utility/encyclopedia/StatusEncyclopediaScreen';
import SkillEncyclopediaScreen from '../screens/utility/encyclopedia/SkillEncyclopediaScreen';
import EndingEncyclopediaScreen from '../screens/utility/encyclopedia/EndingEncyclopediaScreen';
import EndingDetailScreen from '../screens/utility/encyclopedia/EndingDetailScreen';

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
  const renderAuthScreens = (): React.ReactElement[] => [
    <Stack.Screen 
      key={ROUTES.APP.TITLE}
      name={ROUTES.APP.TITLE}
      component={TitleScreen}
    />, 
    <Stack.Screen 
      key={ROUTES.AUTH.LOGIN}
      name={ROUTES.AUTH.LOGIN}
      component={LoginScreen}
    />,
  ];

  /**
   * 메인 앱 스크린들을 렌더링
   */
  const renderMainAppScreens = (): React.ReactElement[] => [
    // 🎮 게임 플로우 스크린들
    <Stack.Screen 
      key={ROUTES.MAIN.HOME}
      name={ROUTES.MAIN.HOME} 
      component={HomeScreen} 
    />,
    <Stack.Screen 
      key="Story"
      name="Story" 
      component={StoryScreen} 
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
      key="Account"
      name={"Account" as any} 
      component={AccountScreen} 
    />,
    <Stack.Screen 
      key="PurchasedItems"
      name={"PurchasedItems" as any} 
      component={PurchasedItemsScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.CHARACTER.HISTORY}
      name={ROUTES.CHARACTER.HISTORY} 
      component={HistoryScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.SETTINGS.ACCOUNT_DEACTIVATE}
      name={ROUTES.SETTINGS.ACCOUNT_DEACTIVATE}
      component={AccountDeactivateScreen}
    />,
    
    // 📚 도감 및 스토어 스크린들
    <Stack.Screen 
      key="Encyclopedia"
      name={"Encyclopedia" as any} 
      component={EncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="Store"
      name={"Store" as any} 
      component={StoreScreen} 
    />,
    <Stack.Screen 
      key="StoreDetail"
      name={"StoreDetail" as any} 
      component={StoreDetailScreen} 
    />,
    <Stack.Screen 
      key="Library"
      name={"Library" as any} 
      component={LibraryScreen} 
    />,
    <Stack.Screen 
      key="LibraryDetail"
      name={"LibraryDetail" as any} 
      component={LibraryDetailScreen} 
    />,
    
    // 📚 도감 상세 페이지들
    <Stack.Screen 
      key="LocationEncyclopedia"
      name={"LocationEncyclopedia" as any} 
      component={LocationEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="CharacterEncyclopedia"
      name={"CharacterEncyclopedia" as any} 
      component={CharacterEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="CreatureEncyclopedia"
      name={"CreatureEncyclopedia" as any} 
      component={CreatureEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="CompanionEncyclopedia"
      name={"CompanionEncyclopedia" as any} 
      component={CompanionEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="ItemEncyclopedia"
      name={"ItemEncyclopedia" as any} 
      component={ItemEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="StatusEncyclopedia"
      name={"StatusEncyclopedia" as any} 
      component={StatusEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="SkillEncyclopedia"
      name={"SkillEncyclopedia" as any} 
      component={SkillEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="EndingEncyclopedia"
      name={"EndingEncyclopedia" as any} 
      component={EndingEncyclopediaScreen} 
    />,
    <Stack.Screen 
      key="EndingDetail"
      name={"EndingDetail" as any} 
      component={EndingDetailScreen} 
    />,
    
    // ⚙️ 설정 및 계정 스크린들
    <Stack.Screen 
      key={ROUTES.SETTINGS.MAIN}
      name={ROUTES.SETTINGS.MAIN} 
      component={SettingsScreen} 
    />,
    <Stack.Screen 
      key="ThemeSettings"
      name={"ThemeSettings" as any} 
      component={ThemeSettingsScreen} 
    />,
    <Stack.Screen 
      key="LanguageSettings"
      name={"LanguageSettings" as any} 
      component={LanguageSettingsScreen} 
    />,
    <Stack.Screen 
      key="TermsOfService"
      name={"TermsOfService" as any} 
      component={TermsOfServiceScreen} 
    />,
    <Stack.Screen 
      key="AppInfo"
      name={"AppInfo" as any} 
      component={AppInfoScreen} 
    />,
    <Stack.Screen 
      key={ROUTES.SETTINGS.ACHIEVEMENT}
      name={ROUTES.SETTINGS.ACHIEVEMENT as keyof RootStackParamList}
      component={AchievementScreen} 
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