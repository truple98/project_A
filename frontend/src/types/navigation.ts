/**
 * 🧭 Navigation Types - 네비게이션 타입 정의
 * 
 * React Navigation과 관련된 모든 타입을 정의합니다.
 * 스크린 파라미터, 네비게이션 Props, 라우트 타입 등을 포함합니다.
 * 
 * @description
 * - React Navigation 스택 파라미터
 * - 스크린별 Props 타입
 * - 네비게이션 훅 타입
 * - 라우트 파라미터 검증
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ChoiceConsequence } from './game';

// ========================================
// 1. 루트 스택 파라미터
// ========================================

/**
 * 메인 네비게이션 스택 파라미터 타입
 * 
 * @description
 * 앱의 모든 스크린과 그에 필요한 파라미터를 정의합니다.
 */
export type RootStackParamList = {
  // 인증 관련 스크린
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  
  // 메인 게임 스크린
  Home: undefined;
  GameStart: undefined;
  
  // 스토리 관련 스크린
  Story: { 
    nodeId: string;
    previousNodeId?: string;
    autoSave?: boolean;
  };
  
  Result: { 
    choiceId: string; 
    consequences: ChoiceConsequence[];
    nextNodeId?: string;
  };
  
  Ending: { 
    sessionId: string;
    endingType: 'success' | 'failure' | 'neutral';
    finalScore?: number;
  };
  
  // 도감 스크린
  Encyclopedia: {
    category?: 'places' | 'characters' | 'creatures' | 'companions' | 'tools' | 'status' | 'skills';
  };
  
  // 게임 기록 관련 스크린
  History: {
    sortBy?: 'date' | 'score' | 'duration';
    filter?: 'completed' | 'in_progress' | 'all';
  };
  
  RecordDetail: { 
    sessionId: string;
    showComparison?: boolean;
  };
  
  // 상태 스크린
  
  Status: {
    tab?: 'stats' | 'traits' | 'achievements';
  };
  
  // 설정 관련 스크린
  Settings: {
    section?: 'general' | 'gameplay' | 'audio' | 'display' | 'account';
  };
  
  Account: undefined;
  Achievement: undefined;
  Store: undefined;
  VersionInfo: undefined;
  Help: {
    topic?: 'gameplay' | 'controls' | 'troubleshooting' | 'contact';
  };
};

// ========================================
// 2. 네비게이션 Props 타입
// ========================================

/**
 * 스크린별 네비게이션 Props 타입
 */
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * 특정 스크린의 네비게이션 Props 타입
 */
export type ScreenNavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

/**
 * 특정 스크린의 라우트 Props 타입
 */
export type ScreenRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

// ========================================
// 3. 스크린별 Props 인터페이스
// ========================================

/**
 * 기본 스크린 Props 인터페이스
 */
export interface BaseScreenProps<T extends keyof RootStackParamList> {
  navigation: ScreenNavigationProp<T>;
  route: ScreenRouteProp<T>;
}

/**
 * 스토리 스크린 Props
 */
export interface StoryScreenProps extends BaseScreenProps<'Story'> {}

/**
 * 결과 스크린 Props
 */
export interface ResultScreenProps extends BaseScreenProps<'Result'> {}

/**
 * 엔딩 스크린 Props
 */
export interface EndingScreenProps extends BaseScreenProps<'Ending'> {}

/**
 * 도감 스크린 Props
 */
export interface EncyclopediaScreenProps extends BaseScreenProps<'Encyclopedia'> {}

/**
 * 히스토리 스크린 Props
 */
export interface HistoryScreenProps extends BaseScreenProps<'History'> {}

/**
 * 기록 상세 스크린 Props
 */
export interface RecordDetailScreenProps extends BaseScreenProps<'RecordDetail'> {}



/**
 * 상태 스크린 Props
 */
export interface StatusScreenProps extends BaseScreenProps<'Status'> {}

/**
 * 설정 스크린 Props
 */
export interface SettingsScreenProps extends BaseScreenProps<'Settings'> {}

/**
 * 도움말 스크린 Props
 */
export interface HelpScreenProps extends BaseScreenProps<'Help'> {}

// ========================================
// 4. 네비게이션 유틸리티 타입
// ========================================

/**
 * 네비게이션 옵션 타입
 */
export interface NavigationOptions {
  /** 애니메이션 사용 여부 */
  animated?: boolean;
  
  /** 이전 스크린으로 돌아갈 수 있는지 여부 */
  canGoBack?: boolean;
  
  /** 스택 초기화 여부 */
  reset?: boolean;
  
  /** 현재 스크린 교체 여부 */
  replace?: boolean;
}

/**
 * 네비게이션 상태 타입
 */
export interface NavigationState {
  /** 현재 활성 스크린 이름 */
  currentScreen: keyof RootStackParamList;
  
  /** 이전 스크린 이름 */
  previousScreen?: keyof RootStackParamList;
  
  /** 네비게이션 스택 깊이 */
  stackDepth: number;
  
  /** 루트 스크린 여부 */
  isRootScreen: boolean;
}

// ========================================
// 5. 딥링크 관련 타입
// ========================================

/**
 * 딥링크 파라미터 타입
 */
export interface DeepLinkParams {
  /** 스크린 이름 */
  screen: keyof RootStackParamList;
  
  /** 스크린 파라미터 */
  params?: RootStackParamList[keyof RootStackParamList];
  
  /** 초기 스크린으로 설정할지 여부 */
  initial?: boolean;
}

/**
 * URL 스킴 패턴 타입
 */
export type UrlScheme = 
  | 'trpg://story/:nodeId'
  | 'trpg://character/:characterId'
  | 'trpg://session/:sessionId'
  | 'trpg://settings/:section';

// ========================================
// 6. 네비게이션 가드 타입
// ========================================

/**
 * 네비게이션 가드 함수 타입
 */
export type NavigationGuard = (
  targetScreen: keyof RootStackParamList,
  params?: any
) => boolean | Promise<boolean>;

/**
 * 네비게이션 가드 설정
 */
export interface NavigationGuardConfig {
  /** 인증이 필요한 스크린들 */
  authRequired: (keyof RootStackParamList)[];
  
  /** 게임 세션이 필요한 스크린들 */
  gameSessionRequired: (keyof RootStackParamList)[];
  
  /** 커스텀 가드 함수들 */
  customGuards: Record<keyof RootStackParamList, NavigationGuard>;
} 