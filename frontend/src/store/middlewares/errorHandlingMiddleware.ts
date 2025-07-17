/**
 * ⚠️ Error Handling Middleware - Redux 에러 처리 미들웨어
 * 
 * Redux 액션에서 발생하는 에러를 처리하고 사용자에게 적절한 피드백을 제공하는 미들웨어입니다.
 * API 에러, 네트워크 에러, 예상치 못한 에러 등을 분류하여 처리합니다.
 * 
 * @description
 * - API 에러 처리 및 사용자 알림
 * - 네트워크 연결 문제 감지
 * - 에러 로깅 및 추적
 * - 사용자 친화적 에러 메시지
 * - 자동 재시도 로직
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. Redux Toolkit
// ========================================
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

// ========================================
// 2. 프로젝트 내부 - 타입 및 액션
// ========================================
import { ApiError } from '../../types/api';

// ========================================
// 3. 타입 정의
// ========================================

/**
 * 에러 카테고리 타입
 */
export type ErrorCategory = 
  | 'network'
  | 'authentication'
  | 'authorization'
  | 'validation'
  | 'server'
  | 'client'
  | 'unknown';

/**
 * 에러 처리 설정 인터페이스
 */
interface ErrorHandlingConfig {
  /** 에러 핸들링 활성화 여부 */
  enabled: boolean;
  
  /** 토스트 알림 표시 여부 */
  showToastNotifications: boolean;
  
  /** 에러 로깅 여부 */
  enableErrorLogging: boolean;
  
  /** 자동 재시도 활성화 */
  enableAutoRetry: boolean;
  
  /** 최대 재시도 횟수 */
  maxRetryAttempts: number;
  
  /** 재시도 지연 시간 (ms) */
  retryDelay: number;
  
  /** 무시할 에러 코드들 */
  ignoredErrorCodes: string[];
  
  /** 무시할 액션 타입들 */
  ignoredActionTypes: string[];
}

/**
 * 에러 처리 결과 인터페이스
 */
interface ErrorHandlingResult {
  /** 처리된 에러 카테고리 */
  category: ErrorCategory;
  
  /** 사용자에게 표시할 메시지 */
  userMessage: string;
  
  /** 토스트 표시 여부 */
  shouldShowToast: boolean;
  
  /** 재시도 가능 여부 */
  canRetry: boolean;
  
  /** 로그아웃 필요 여부 */
  requiresLogout: boolean;
}

// ========================================
// 4. 상수 정의
// ========================================

/**
 * 기본 에러 처리 설정
 */
const DEFAULT_CONFIG: ErrorHandlingConfig = {
  enabled: true,
  showToastNotifications: true,
  enableErrorLogging: true,
  enableAutoRetry: false,
  maxRetryAttempts: 3,
  retryDelay: 1000,
  ignoredErrorCodes: ['CANCELLED_REQUEST'],
  ignoredActionTypes: ['ui/setKeyboardVisible'],
};

/**
 * 에러 카테고리별 기본 메시지
 */
const DEFAULT_ERROR_MESSAGES: Record<ErrorCategory, string> = {
  network: '네트워크 연결을 확인해주세요.',
  authentication: '로그인이 필요합니다.',
  authorization: '접근 권한이 없습니다.',
  validation: '입력한 정보를 다시 확인해주세요.',
  server: '서버에 일시적인 문제가 발생했습니다.',
  client: '요청을 처리할 수 없습니다.',
  unknown: '알 수 없는 오류가 발생했습니다.',
};

/**
 * 재시도 가능한 에러 상태 코드들
 */
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * 네트워크 관련 에러 코드들
 */
const NETWORK_ERROR_CODES = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'CONNECTION_ERROR'];

// ========================================
// 5. 헬퍼 함수들
// ========================================

/**
 * API 에러인지 확인하는 타입 가드
 */
const isApiError = (error: any): error is ApiError => {
  return error && 
         typeof error === 'object' && 
         'statusCode' in error && 
         'message' in error;
};

/**
 * 에러 카테고리 결정 함수
 */
const categorizeError = (error: any): ErrorCategory => {
  if (isApiError(error)) {
    const apiError = error as ApiError;
    
    if (apiError.statusCode === 401) return 'authentication';
    if (apiError.statusCode === 403) return 'authorization';
    if (apiError.statusCode >= 400 && apiError.statusCode < 500) return 'validation';
    if (apiError.statusCode >= 500) return 'server';
    
    return 'client';
  }
  
  // 네트워크 에러 확인
  if (error?.code && NETWORK_ERROR_CODES.includes(error.code)) {
    return 'network';
  }
  
  // 일반적인 에러 타입 확인
  if (error?.name === 'NetworkError' || error?.message?.includes('network')) {
    return 'network';
  }
  
  return 'unknown';
};

/**
 * 사용자 친화적 에러 메시지 생성
 */
const generateUserMessage = (error: any, category: ErrorCategory): string => {
  // API 에러인 경우 서버에서 제공하는 메시지 우선 사용
  if (isApiError(error) && error.message) {
    return error.message;
  }
  
  // 일반 에러의 경우 기본 메시지 사용
  if (error?.message && typeof error.message === 'string') {
    return error.message;
  }
  
  return DEFAULT_ERROR_MESSAGES[category];
};

/**
 * 재시도 가능한 에러인지 확인
 */
const isRetryableError = (error: any, category: ErrorCategory): boolean => {
  // 네트워크 에러는 재시도 가능
  if (category === 'network') return true;
  
  // 서버 에러 중 일부는 재시도 가능
  if (category === 'server') {
    if (isApiError(error)) {
      return RETRYABLE_STATUS_CODES.includes(error.statusCode);
    }
    return true;
  }
  
  return false;
};

/**
 * 로그아웃이 필요한 에러인지 확인
 */
const requiresLogout = (error: any, category: ErrorCategory): boolean => {
  return category === 'authentication' || 
         (isApiError(error) && error.statusCode === 401);
};

/**
 * 에러 로깅 함수
 */
const logError = (error: any, actionType: string, category: ErrorCategory): void => {
  const errorInfo = {
    actionType,
    category,
    error: error?.message || error,
    stack: error?.stack,
    timestamp: new Date().toISOString(),
  };
  
  console.error('🚨 Redux Error:', errorInfo);
  
  // 프로덕션에서는 외부 에러 추적 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // Sentry, Bugsnag 등 에러 추적 서비스 연동
    // errorTrackingService.captureException(error, errorInfo);
  }
};

/**
 * 에러를 종합적으로 처리하는 함수
 */
const processError = (
  error: any, 
  actionType: string, 
  config: ErrorHandlingConfig
): ErrorHandlingResult => {
  const category = categorizeError(error);
  const userMessage = generateUserMessage(error, category);
  const canRetry = isRetryableError(error, category);
  const requiresLogoutFlag = requiresLogout(error, category);
  
  // 에러 로깅
  if (config.enableErrorLogging) {
    logError(error, actionType, category);
  }
  
  return {
    category,
    userMessage,
    shouldShowToast: config.showToastNotifications && 
                     !config.ignoredActionTypes.includes(actionType),
    canRetry: canRetry && config.enableAutoRetry,
    requiresLogout: requiresLogoutFlag,
  };
};

// ========================================
// 6. 에러 핸들링 미들웨어 생성 함수
// ========================================

/**
 * 에러 핸들링 미들웨어 생성 함수
 */
export function createErrorHandlingMiddleware(
  config: Partial<ErrorHandlingConfig> = {}
): Middleware {
  const finalConfig: ErrorHandlingConfig = { ...DEFAULT_CONFIG, ...config };
  
  if (!finalConfig.enabled) {
    // 비활성화된 경우 pass-through 미들웨어 반환
    return () => (next) => (action) => next(action);
  }

  return (store) => (next) => (action) => {
    // Rejected 액션만 처리
    if (!isRejectedWithValue(action)) {
      return next(action);
    }
    
    const actionType = action.type;
    const error = action.payload;
    
    // 무시할 액션 타입인지 확인
    if (finalConfig.ignoredActionTypes.includes(actionType)) {
      return next(action);
    }
    
    // 무시할 에러 코드인지 확인
    if (isApiError(error) && 
        finalConfig.ignoredErrorCodes.includes(error.errorCode || '')) {
      return next(action);
    }
    
    // 에러 처리
    const result = processError(error, actionType, finalConfig);
    
    // 토스트 알림 표시
    if (result.shouldShowToast) {
      store.dispatch({
        type: 'ui/addToast',
        payload: {
          type: 'error',
          title: '오류 발생',
          message: result.userMessage,
          duration: 5000,
        },
      });
    }
    
    // 네트워크 상태 업데이트
    if (result.category === 'network') {
      store.dispatch({
        type: 'ui/setNetworkStatus',
        payload: 'offline',
      });
    }
    
    // 로그아웃 필요한 경우
    if (result.requiresLogout) {
      console.warn('🔐 Authentication error detected, clearing auth state...');
      store.dispatch({ type: 'auth/clearAuth' });
    }
    
    // 자동 재시도 (간단한 구현)
    if (result.canRetry && !(action.meta as any)?.retryCount) {
      setTimeout(() => {
        const retryAction = {
          ...action,
          meta: {
            ...action.meta,
            retryCount: 1,
          },
        };
        
        if (((action.meta as any)?.retryCount || 0) < finalConfig.maxRetryAttempts) {
          console.log(`🔄 Retrying action: ${actionType}`);
          store.dispatch(retryAction);
        }
      }, finalConfig.retryDelay);
    }
    
    return next(action);
  };
}

// ========================================
// 7. 기본 에러 핸들링 미들웨어 인스턴스
// ========================================

/**
 * 기본 설정으로 생성된 에러 핸들링 미들웨어
 */
export const errorHandlingMiddleware = createErrorHandlingMiddleware();

// ========================================
// 8. 기본 내보내기
// ========================================

export default errorHandlingMiddleware; 