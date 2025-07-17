/**
 * 📋 Logging Middleware - Redux 액션 로깅 미들웨어
 * 
 * 개발 환경에서 Redux 액션과 상태 변화를 로깅하는 미들웨어입니다.
 * 디버깅과 개발 과정에서 상태 변화 추적을 위해 사용됩니다.
 * 
 * @description
 * - Redux 액션 로깅
 * - 상태 변화 추적
 * - 성능 측정
 * - 개발 환경에서만 활성화
 * - 색상 코딩으로 가독성 향상
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. Redux Toolkit
// ========================================
import { Middleware, AnyAction } from '@reduxjs/toolkit';

// ========================================
// 2. 타입 정의
// ========================================

/**
 * 로그 레벨 타입
 */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * 액션 분류 타입
 */
type ActionCategory = 'async' | 'sync' | 'pending' | 'fulfilled' | 'rejected';

/**
 * 로그 설정 인터페이스
 */
interface LoggingConfig {
  /** 로깅 활성화 여부 */
  enabled: boolean;
  
  /** 로깅할 액션 타입 필터 */
  actionFilter?: (actionType: string) => boolean;
  
  /** 상태 diff 표시 여부 */
  showStateDiff: boolean;
  
  /** 성능 측정 여부 */
  measurePerformance: boolean;
  
  /** 최대 로그 출력 길이 */
  maxLogLength: number;
  
  /** 색상 사용 여부 */
  useColors: boolean;
}

// ========================================
// 3. 상수 정의
// ========================================

/**
 * 기본 로깅 설정
 */
const DEFAULT_CONFIG: LoggingConfig = {
  enabled: process.env.NODE_ENV === 'development',
  showStateDiff: true,
  measurePerformance: true,
  maxLogLength: 1000,
  useColors: true,
};

/**
 * 색상 코드 (콘솔 출력용)
 */
const COLORS = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  DIM: '\x1b[2m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  GRAY: '\x1b[90m',
} as const;

/**
 * 액션 타입별 색상 매핑
 */
const ACTION_COLORS: Record<ActionCategory, string> = {
  async: COLORS.BLUE,
  sync: COLORS.GREEN,
  pending: COLORS.YELLOW,
  fulfilled: COLORS.GREEN,
  rejected: COLORS.RED,
};

/**
 * 무시할 액션 타입들 (너무 빈번하거나 불필요한 로깅)
 */
const IGNORED_ACTIONS = [
  'persist/PERSIST',
  'persist/REHYDRATE',
  '@@redux-form',
  'ui/setKeyboardVisible',
] as const;

// ========================================
// 4. 헬퍼 함수들
// ========================================

/**
 * 액션 카테고리 결정 함수
 */
const getActionCategory = (actionType: string): ActionCategory => {
  if (actionType.endsWith('/pending')) return 'pending';
  if (actionType.endsWith('/fulfilled')) return 'fulfilled';
  if (actionType.endsWith('/rejected')) return 'rejected';
  if (actionType.includes('async') || actionType.includes('thunk')) return 'async';
  return 'sync';
};

/**
 * 액션 타입이 무시 목록에 있는지 확인
 */
const shouldIgnoreAction = (actionType: string): boolean => {
  return IGNORED_ACTIONS.some(ignored => actionType.includes(ignored));
};

/**
 * 객체를 문자열로 변환 (순환 참조 처리)
 */
const stringifyWithLimit = (obj: any, maxLength: number = 1000): string => {
  try {
    const str = JSON.stringify(obj, null, 2);
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  } catch (error) {
    return '[Circular or Invalid Object]';
  }
};

/**
 * 색상이 적용된 텍스트 생성
 */
const colorize = (text: string, color: string, useColors: boolean = true): string => {
  return useColors ? `${color}${text}${COLORS.RESET}` : text;
};

/**
 * 상태 변화 감지 및 diff 생성
 */
const getStateDiff = (prevState: any, nextState: any): string[] => {
  const changes: string[] = [];
  
  const compare = (prev: any, next: any, path: string = '') => {
    if (prev === next) return;
    
    if (typeof prev !== typeof next) {
      changes.push(`${path}: ${typeof prev} → ${typeof next}`);
      return;
    }
    
    if (prev === null || next === null || typeof prev !== 'object') {
      changes.push(`${path}: ${stringifyWithLimit(prev, 50)} → ${stringifyWithLimit(next, 50)}`);
      return;
    }
    
    const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);
    for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key;
      compare(prev[key], next[key], newPath);
    }
  };
  
  compare(prevState, nextState);
  return changes;
};

/**
 * 성능 측정 결과 포맷팅
 */
const formatPerformance = (duration: number): string => {
  if (duration < 1) return `${duration.toFixed(2)}ms`;
  if (duration < 1000) return `${duration.toFixed(1)}ms`;
  return `${(duration / 1000).toFixed(2)}s`;
};

// ========================================
// 5. 로깅 미들웨어 생성 함수
// ========================================

/**
 * 로깅 미들웨어 생성 함수
 */
export function createLoggingMiddleware(config: Partial<LoggingConfig> = {}): Middleware {
  const finalConfig: LoggingConfig = { ...DEFAULT_CONFIG, ...config };
  
  if (!finalConfig.enabled) {
    // 비활성화된 경우 pass-through 미들웨어 반환
    return () => (next) => (action) => next(action);
  }

  return (store) => (next) => (action: unknown) => {
    const actionType = (action as AnyAction).type;
    
    // 무시할 액션인지 확인
    if (shouldIgnoreAction(actionType)) {
      return next(action);
    }
    
    // 사용자 정의 필터 적용
    if (finalConfig.actionFilter && !finalConfig.actionFilter(actionType)) {
      return next(action);
    }
    
    const startTime = finalConfig.measurePerformance ? performance.now() : 0;
    const prevState = finalConfig.showStateDiff ? store.getState() : null;
    
    // 액션 실행 전 로깅
    const category = getActionCategory(actionType);
    const actionColor = ACTION_COLORS[category];
    
    console.group(
      colorize(`🚀 ACTION: ${actionType}`, actionColor, finalConfig.useColors)
    );
    
    // 액션 정보 로깅
    console.log(
      colorize('📋 Action:', COLORS.CYAN, finalConfig.useColors),
      stringifyWithLimit(action, finalConfig.maxLogLength)
    );
    
    // 이전 상태 로깅 (간략히)
    if (prevState) {
      console.log(
        colorize('📊 Previous State:', COLORS.GRAY, finalConfig.useColors),
        '(Use Redux DevTools for full state inspection)'
      );
    }
    
    // 액션 실행
    const result = next(action);
    
    // 액션 실행 후 로깅
    if (finalConfig.showStateDiff && prevState) {
      const nextState = store.getState();
      const stateDiff = getStateDiff(prevState, nextState);
      
      if (stateDiff.length > 0) {
        console.log(
          colorize('🔄 State Changes:', COLORS.YELLOW, finalConfig.useColors)
        );
        stateDiff.forEach(change => {
          console.log(colorize(`  • ${change}`, COLORS.WHITE, finalConfig.useColors));
        });
      } else {
        console.log(
          colorize('🔄 State Changes:', COLORS.GRAY, finalConfig.useColors),
          'No changes detected'
        );
      }
    }
    
    // 성능 측정 결과 로깅
    if (finalConfig.measurePerformance) {
      const duration = performance.now() - startTime;
      const performanceColor = duration > 10 ? COLORS.RED : duration > 5 ? COLORS.YELLOW : COLORS.GREEN;
      
      console.log(
        colorize('⏱️ Performance:', performanceColor, finalConfig.useColors),
        formatPerformance(duration)
      );
    }
    
    console.groupEnd();
    
    return result;
  };
}

// ========================================
// 6. 기본 로깅 미들웨어 인스턴스
// ========================================

/**
 * 기본 설정으로 생성된 로깅 미들웨어
 */
export const loggingMiddleware = createLoggingMiddleware();

// ========================================
// 7. 기본 내보내기
// ========================================

export default loggingMiddleware; 