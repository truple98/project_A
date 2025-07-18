/**
 * 🔗 Types Index - 중앙 타입 익스포트
 * 
 * 모든 타입 정의를 중앙에서 관리하고 익스포트합니다.
 * 컴포넌트와 서비스에서 타입을 쉽게 임포트할 수 있도록 합니다.
 * 
 * @description
 * - API 관련 타입
 * - 게임 도메인 타입
 * - 네비게이션 타입
 * - Redux 상태 타입
 * - 공통 유틸리티 타입
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. API 타입 exports
// ========================================
export * from './api';

// ========================================
// 2. 게임 도메인 타입 exports
// ========================================
export * from './game';
export * from './story';

// ========================================
// 3. 네비게이션 타입 exports
// ========================================
export * from './navigation';

// ========================================
// 4. 기존 호환성을 위한 타입들 (Deprecated)
// ========================================

/**
 * @deprecated Use types from './api' instead
 * API Response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * @deprecated Use types from './game' instead
 * User types
 */
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

/**
 * @deprecated Use GameSession from './game' instead
 * Game types
 */
export interface GameSession {
  id: string;
  userId: string;
  characterId: string;
  currentNodeId: string;
  gameState: GameState;
  createdAt: string;
  updatedAt: string;
}

/**
 * @deprecated Use GameState from './game' instead
 */
export interface GameState {
  health: number;
  mana: number;
  experience: number;
  level: number;
  inventory: InventoryItem[];
  traits: CharacterTrait[];
}

/**
 * @deprecated Use CharacterTrait from './game' instead
 */
export interface CharacterTrait {
  id: string;
  name: string;
  value: number;
  description: string;
}

/**
 * @deprecated Use InventoryItem from './game' instead
 */
export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  quantity: number;
  description: string;
}

/**
 * @deprecated Use ItemType from './game' instead
 */
export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  CONSUMABLE = 'CONSUMABLE',
  QUEST = 'QUEST',
  MISC = 'MISC'
}

/**
 * @deprecated Use StoryNode from './game' instead
 * Story types
 */
export interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices: StoryChoice[];
  requirements?: NodeRequirement[];
}

/**
 * @deprecated Use StoryChoice from './game' instead
 */
export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
  consequences?: ChoiceConsequence[];
}

/**
 * @deprecated Use ChoiceConsequence from './game' instead
 */
export interface ChoiceConsequence {
  type: ConsequenceType;
  value: number;
  description: string;
}

/**
 * @deprecated Use ConsequenceType from './game' instead
 */
export enum ConsequenceType {
  HEALTH = 'HEALTH',
  MANA = 'MANA',
  EXPERIENCE = 'EXPERIENCE',
  TRAIT = 'TRAIT',
  ITEM = 'ITEM'
}

/**
 * @deprecated Use NodeRequirement from './game' instead
 */
export interface NodeRequirement {
  type: RequirementType;
  value: number;
  traitId?: string;
}

/**
 * @deprecated Use RequirementType from './game' instead
 */
export enum RequirementType {
  LEVEL = 'LEVEL',
  TRAIT = 'TRAIT',
  ITEM = 'ITEM'
}

/**
 * @deprecated Use RootStackParamList from './navigation' instead
 * Navigation types
 */
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  GameStart: undefined;
  Story: { nodeId: string };
  Result: { choiceId: string; consequences: ChoiceConsequence[] };
  Ending: { sessionId: string };
  Character: undefined;
  History: undefined;
  RecordDetail: { sessionId: string };
  Inventory: undefined;
  Status: undefined;
  Settings: undefined;
  Account: undefined;
  VersionInfo: undefined;
  Help: undefined;
};

// ========================================
// 5. Redux 상태 타입들
// ========================================

/**
 * 인증 상태 인터페이스
 */
export interface AuthState {
  /** 현재 로그인한 사용자 */
  user: User | null;
  
  /** 인증 토큰 */
  token: string | null;
  
  /** 로딩 상태 */
  isLoading: boolean;
  
  /** 에러 메시지 */
  error: string | null;
  
  /** 로그인 여부 */
  isAuthenticated: boolean;
  
  /** 리프레시 토큰 */
  refreshToken: string | null;
  
  /** 토큰 만료 시간 */
  tokenExpiresAt: string | null;
}

/**
 * @deprecated Use types from './game' instead
 * 게임 상태 인터페이스
 */
export interface GameReduxState {
  /** 현재 게임 세션 */
  currentSession: GameSession | null;
  
  /** 현재 스토리 노드 */
  currentNode: StoryNode | null;
  
  /** 로딩 상태 */
  isLoading: boolean;
  
  /** 에러 메시지 */
  error: string | null;
  
  /** 저장된 게임 목록 */
  savedGames: GameSession[];
  
  /** 게임 설정 */
  settings: {
    autoSave: boolean;
    soundEnabled: boolean;
    musicEnabled: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
}

/**
 * UI 상태 인터페이스
 */
export interface UIState {
  /** 전역 로딩 상태 */
  isGlobalLoading: boolean;
  
  /** 네트워크 연결 상태 */
  isOnline: boolean;
  
  /** 토스트 메시지 */
  toast: {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null;
  
  /** 모달 상태 */
  modal: {
    visible: boolean;
    type: string;
    data?: any;
  } | null;
  
  /** 사이드바 상태 */
  sidebar: {
    visible: boolean;
    currentSection: string;
  };
  
  /** 키보드 높이 */
  keyboardHeight: number;
}

/**
 * 루트 애플리케이션 상태
 */
export interface RootState {
  /** 인증 상태 */
  auth: AuthState;
  
  /** 게임 상태 */
  game: GameReduxState;
  
  /** UI 상태 */
  ui: UIState;
}

// ========================================
// 6. 공통 유틸리티 타입들
// ========================================

/**
 * 선택적 속성을 가진 타입
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 필수 속성을 가진 타입
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * ID를 가진 엔티티 타입
 */
export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 정렬 정보
 */
export interface SortInfo {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * 필터 정보
 */
export interface FilterInfo {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in';
  value: any;
}

/**
 * 검색 쿼리
 */
export interface SearchQuery {
  keyword?: string;
  filters?: FilterInfo[];
  sort?: SortInfo;
  pagination?: {
    page: number;
    limit: number;
  };
}

/**
 * 폼 필드 타입
 */
export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  valid: boolean;
}

/**
 * 폼 상태 타입
 */
export type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

/**
 * 비동기 작업 상태
 */
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: string | null;
}

/**
 * 이벤트 핸들러 타입
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * 콜백 함수 타입
 */
export type Callback<T = void> = () => T;

/**
 * 프로미스 콜백 타입
 */
export type AsyncCallback<T = void> = () => Promise<T>;

// ========================================
// 7. 컴포넌트 Props 공통 타입들
// ========================================

/**
 * 기본 컴포넌트 Props
 */
export interface BaseComponentProps {
  /** 컴포넌트 테스트 ID */
  testID?: string;
  
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  
  /** 커스텀 스타일 */
  style?: any;
  
  /** 자식 컴포넌트 */
  children?: React.ReactNode;
}

/**
 * 터치 가능한 컴포넌트 Props
 */
export interface TouchableComponentProps extends BaseComponentProps {
  /** 터치 이벤트 핸들러 */
  onPress?: () => void;
  
  /** 길게 누르기 이벤트 핸들러 */
  onLongPress?: () => void;
  
  /** 비활성화 여부 */
  disabled?: boolean;
  
  /** 햅틱 피드백 활성화 */
  hapticFeedback?: boolean;
}

/**
 * 입력 컴포넌트 Props
 */
export interface InputComponentProps extends BaseComponentProps {
  /** 입력값 */
  value: string;
  
  /** 값 변경 핸들러 */
  onChangeText: (text: string) => void;
  
  /** 플레이스홀더 */
  placeholder?: string;
  
  /** 에러 메시지 */
  error?: string;
  
  /** 필수 입력 여부 */
  required?: boolean;
  
  /** 비활성화 여부 */
  disabled?: boolean;
}

// ========================================
// 8. 업그레이드 가이드 (JSDoc)
// ========================================

/**
 * @fileoverview 타입 업그레이드 가이드
 * 
 * 기존 코드에서 새로운 타입 시스템으로 마이그레이션하는 방법:
 * 
 * @example
 * // 기존 (Deprecated)
 * import { ApiResponse, GameSession } from '@/types';
 * 
 * // 새로운 방식 (Recommended)
 * import { ApiResponse } from '@/types/api';
 * import { GameSession } from '@/types/game';
 * import { RootStackParamList } from '@/types/navigation';
 * 
 * @example
 * // 또는 특정 타입만 필요한 경우
 * import type { CharacterStats, InventoryItem } from '@/types/game';
 * import type { StoryScreenProps } from '@/types/navigation';
 */ 