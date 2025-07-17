/**
 * 🗺️ Application Routes Constants
 * 
 * 이 파일은 애플리케이션의 모든 네비게이션 경로와 API 엔드포인트를 중앙 집중식으로 관리합니다.
 * 
 * @description
 * - 네비게이션 경로: React Navigation에서 사용되는 스크린 이름들
 * - API 경로: 백엔드 서버와 통신할 때 사용되는 엔드포인트들
 * 
 * @guidelines
 * - 모든 경로는 여기서만 정의하고 다른 곳에서는 import하여 사용
 * - 'as const'를 사용하여 타입 안정성과 불변성 보장
 * - 명확한 그룹핑으로 가독성 향상
 */

// ========================================
// 📱 Navigation Routes (Screen Names)
// ========================================

/**
 * React Navigation에서 사용되는 모든 스크린 이름들
 * 
 * @usage
 * ```tsx
 * navigation.navigate(ROUTES.AUTH.LOGIN);
 * navigation.navigate(ROUTES.MAIN.HOME);
 * ```
 */
export const ROUTES = {
  // 🔐 Authentication Flow
  AUTH: {
    SPLASH: 'Splash',
    WELCOME: 'Welcome', 
    LOGIN: 'Login',
    REGISTER: 'Register',
  },
  
  // 🎮 Main Game Flow
  MAIN: {
    HOME: 'Home',
    GAME_START: 'GameStart',
    STORY: 'Story',
    RESULT: 'Result',
    ENDING: 'Ending',
  },
  
  // 👤 Character & Progress Management
  CHARACTER: {
    OVERVIEW: 'Character',
    HISTORY: 'History',
    RECORD_DETAIL: 'RecordDetail',
    INVENTORY: 'Inventory',
    STATUS: 'Status',
  },
  
  // ⚙️ Settings & Account
  SETTINGS: {
    MAIN: 'Settings',
    ACCOUNT: 'Account',
    VERSION_INFO: 'VersionInfo',
    HELP: 'Help',
  },
} as const;

// ========================================
// 🌐 API Endpoints
// ========================================

/**
 * 백엔드 서버와 통신할 때 사용되는 모든 API 엔드포인트들
 * 
 * @usage
 * ```tsx
 * const response = await fetch(`${API_BASE_URL}${API_ROUTES.AUTH.LOGIN}`, {...});
 * const data = await apiClient.get(API_ROUTES.GAME.SESSION);
 * ```
 */
export const API_ROUTES = {
  // 🔐 Authentication Endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  
  // 🎮 Game Session Management
  GAME: {
    SESSION: '/game/session',
    START: '/game/start',
    CHOICE: '/game/choice',
    SAVE: '/game/save',
    LOAD: '/game/load',
    HISTORY: '/game/history',
    CHARACTER: '/game/character',
  },
  
  // 📖 Story Content Management
  STORY: {
    NODE: '/story/node',
    NODES: '/story/nodes',
    GENERATE: '/story/generate',
    CONTENT: '/story/content',
  },
  
  // 👤 User Profile Management
  USER: {
    PROFILE: '/user/profile',
    ACCOUNT: '/user/account',
    PREFERENCES: '/user/preferences',
    STATISTICS: '/user/statistics',
  },
} as const;

// ========================================
// 📚 Type Definitions
// ========================================

/**
 * Navigation Routes 타입 정의
 * 
 * @description
 * React Navigation의 타입 안정성을 위한 타입 추출
 */
export type NavigationRoute = typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];

/**
 * API Routes 타입 정의
 * 
 * @description
 * API 호출 시 타입 안정성을 위한 타입 추출
 */
export type ApiRoute = typeof API_ROUTES[keyof typeof API_ROUTES][keyof typeof API_ROUTES[keyof typeof API_ROUTES]];

// ========================================
// 🔧 Route Helper Functions
// ========================================

/**
 * 동적 경로 생성을 위한 헬퍼 함수들
 */
export const ROUTE_HELPERS = {
  /**
   * 사용자 프로필 페이지 경로 생성
   * @param userId - 사용자 ID
   * @returns 동적 API 경로
   */
  getUserProfile: (userId: string): string => `${API_ROUTES.USER.PROFILE}/${userId}`,
  
  /**
   * 특정 스토리 노드 경로 생성
   * @param nodeId - 스토리 노드 ID
   * @returns 동적 API 경로
   */
  getStoryNode: (nodeId: string): string => `${API_ROUTES.STORY.NODE}/${nodeId}`,
  
  /**
   * 게임 세션 상세 경로 생성
   * @param sessionId - 게임 세션 ID
   * @returns 동적 API 경로
   */
  getGameSession: (sessionId: string): string => `${API_ROUTES.GAME.SESSION}/${sessionId}`,
} as const; 