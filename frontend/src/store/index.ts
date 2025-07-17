/**
 * 🏪 Redux Store - 전역 상태 관리 설정
 * 
 * Redux Toolkit을 기반으로 한 앱의 중앙 상태 관리 스토어입니다.
 * 인증, 게임, UI 상태 등 앱 전반의 상태를 관리하며,
 * 미들웨어, 데브툴, 타입 안전성을 포함한 완전한 설정을 제공합니다.
 * 
 * @description
 * - Redux Toolkit 기반 현대적 상태 관리
 * - TypeScript 완전 지원
 * - 개발/프로덕션 환경별 최적화
 * - 커스텀 미들웨어 및 에러 핸들링
 * - Hot Reloading 지원
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. Redux 및 Toolkit
// ========================================
import { 
  configureStore, 
  combineReducers,
  Middleware,
  isRejectedWithValue,
  AnyAction,
} from '@reduxjs/toolkit';

// ========================================
// 2. React Native 플랫폼
// ========================================
import { Platform } from 'react-native';

// ========================================
// 3. 프로젝트 내부 - Slice Reducers
// ========================================
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';
import uiReducer from './slices/uiSlice';

// ========================================
// 4. 프로젝트 내부 - 미들웨어
// ========================================
import { loggingMiddleware } from './middlewares/loggingMiddleware';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

// ========================================
// 5. 상수 정의
// ========================================

/**
 * 개발 환경 여부 확인
 */
const __DEV__ = process.env.NODE_ENV === 'development';

/**
 * Redux DevTools 확장 사용 여부
 */
const ENABLE_DEVTOOLS = __DEV__ && Platform.OS !== 'ios'; // iOS에서는 Flipper 사용

/**
 * Serializable Check 무시할 액션들
 */
const IGNORED_ACTIONS = [
  'persist/PERSIST',
  'persist/REHYDRATE',
  'persist/PAUSE',
  'persist/PURGE',
  'persist/REGISTER',
];

/**
 * Serializable Check 무시할 액션 경로들
 */
const IGNORED_ACTION_PATHS = [
  'payload.timestamp',
  'payload.error',
  'meta.requestId',
  'meta.requestStatus',
];

/**
 * Serializable Check 무시할 상태 경로들
 */
const IGNORED_STATE_PATHS = [
  'auth.lastLoginAt',
  'game.sessionStartTime',
  'ui.notifications',
];

// ========================================
// 6. Root Reducer 설정
// ========================================

/**
 * 모든 slice reducer를 결합한 루트 리듀서
 */
const rootReducer = combineReducers({
  /** 인증 관련 상태 */
  auth: authReducer,
  
  /** 게임 관련 상태 */
  game: gameReducer,
  
  /** UI 관련 상태 (로딩, 모달, 토스트 등) */
  ui: uiReducer,
});

// ========================================
// 7. 커스텀 미들웨어 정의
// ========================================

/**
 * 토큰 만료 처리 미들웨어
 */
const tokenExpirationMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  // 401 에러 발생 시 자동 로그아웃
  if (isRejectedWithValue(action) && (action.payload as any)?.statusCode === 401) {
    console.warn('🔐 Token expired, logging out...');
    store.dispatch({ type: 'auth/clearAuth' });
  }
  
  return next(action);
};

/**
 * 게임 상태 동기화 미들웨어
 */
const gameSyncMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  const result = next(action);
  
  // 게임 세션 변경 시 자동 저장 (예시)
  if ((action as AnyAction).type?.startsWith('game/') && 
      (action as AnyAction).type.includes('fulfilled')) {
    const state = store.getState() as RootState;
    const gameState = state.game as any;
    if (gameState.currentSession && gameState.autoSave) {
      console.log('💾 Auto-saving game progress...');
      // 여기서 자동 저장 로직 실행
    }
  }
  
  return result;
};

// ========================================
// 8. Store 설정 함수
// ========================================

/**
 * Redux Store 생성 및 설정
 */
function createAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // 직렬화 검사 설정
        serializableCheck: {
          ignoredActions: IGNORED_ACTIONS,
          ignoredActionsPaths: IGNORED_ACTION_PATHS,
          ignoredPaths: IGNORED_STATE_PATHS,
          // 더 엄격한 검사를 위해 warnAfter 설정
          warnAfter: 128,
        },
        
        // 불변성 검사 설정
        immutableCheck: {
          warnAfter: 128,
          ignoredPaths: IGNORED_STATE_PATHS,
        },
        
        // thunk 미들웨어 설정
        thunk: {
          extraArgument: {
            // API 클라이언트나 추가 의존성 주입 가능
          },
        },
      })
      // 커스텀 미들웨어 추가
      .concat([
        tokenExpirationMiddleware,
        gameSyncMiddleware,
        errorHandlingMiddleware,
        ...((__DEV__ && [loggingMiddleware]) || []), // 개발 환경에서만 로깅
      ]),
    
    // DevTools 설정
    devTools: ENABLE_DEVTOOLS && {
      name: 'TRPG Game Store',
      trace: true,
      traceLimit: 25,
    },
    
    // 향상된 리듀서 설정
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers({
        autoBatch: true, // 자동 배칭 활성화
      }),
  });

  return store;
}

// ========================================
// 9. Store 인스턴스 생성
// ========================================

/**
 * 앱의 메인 Redux Store
 */
export const store = createAppStore();

// ========================================
// 10. 타입 정의 및 내보내기
// ========================================

/**
 * 루트 상태 타입
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * App Dispatch 타입
 */
export type AppDispatch = typeof store.dispatch;

/**
 * App Store 타입
 */
export type AppStore = typeof store;

/**
 * 상태 추출 헬퍼 타입
 */
export type StateSlice<T extends keyof RootState> = RootState[T];

// ========================================
// 11. 개발용 유틸리티 함수들
// ========================================

/**
 * 현재 스토어 상태를 콘솔에 출력 (개발용)
 */
export function logCurrentState(): void {
  if (__DEV__) {
    console.log('📊 Current Redux State:', store.getState());
  }
}

/**
 * 특정 액션 디스패치 후 상태 변화 관찰 (개발용)
 */
export function dispatchAndLog(action: AnyAction, statePath?: string): void {
  if (__DEV__) {
    const prevState = store.getState();
    console.log('🚀 Dispatching action:', action);
    
    store.dispatch(action);
    
    const nextState = store.getState();
    console.log('📈 State change:', {
      before: statePath ? getNestedValue(prevState, statePath) : prevState,
      after: statePath ? getNestedValue(nextState, statePath) : nextState,
    });
  }
}

/**
 * 중첩된 객체에서 값 추출 헬퍼 함수
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// ========================================
// 12. 기본 내보내기
// ========================================

export default store; 