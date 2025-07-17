/**
 * 🌐 API 공통 타입 정의
 * 
 * 모든 API 서비스에서 사용되는 공통 타입과 인터페이스를 정의합니다.
 * 일관된 API 응답 형태와 에러 처리를 위한 표준화된 타입을 제공합니다.
 * 
 * @description
 * - 표준화된 API 응답 형태
 * - 공통 에러 처리 클래스
 * - HTTP 상태 코드 타입
 * - API 요청/응답 메타데이터
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. HTTP 상태 코드 타입
// ========================================

/**
 * HTTP 상태 코드 타입 정의
 */
export type HttpStatusCode = 
  | 200 | 201 | 202 | 204  // 성공
  | 400 | 401 | 403 | 404 | 409 | 422  // 클라이언트 오류
  | 500 | 502 | 503 | 504;  // 서버 오류

/**
 * API 에러 코드 타입 정의
 */
export type ApiErrorCode = 
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'PASSWORD_MISMATCH'
  | 'INVALID_USERNAME'
  | 'INVALID_CHARACTER_NAME'
  | 'INVALID_CHARACTER_CLASS'
  | 'INVALID_DIFFICULTY'
  | 'TERMS_NOT_AGREED'
  | 'LOGIN_ERROR'
  | 'REGISTER_ERROR'
  | 'LOGOUT_ERROR'
  | 'TOKEN_VALIDATION_ERROR'
  | 'TOKEN_REFRESH_ERROR'
  | 'PASSWORD_RESET_ERROR'
  | 'NO_REFRESH_TOKEN'
  | 'START_GAME_ERROR'
  | 'STORY_PROGRESS_ERROR'
  | 'LOAD_GAME_ERROR'
  | 'SAVE_GAME_ERROR'
  | 'USE_ITEM_ERROR'
  | 'GET_STORY_NODE_ERROR'
  | 'MISSING_SESSION_ID'
  | 'MISSING_CHOICE_ID'
  | 'MISSING_SAVE_SLOT_ID'
  | 'MISSING_STORY_NODE_ID'
  | 'MISSING_REQUIRED_DATA'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR';

// ========================================
// 2. API 응답 인터페이스
// ========================================

/**
 * 표준 API 응답 인터페이스
 * 
 * @interface ApiResponse
 * @template T - 응답 데이터 타입
 */
export interface ApiResponse<T = any> {
  /** 요청 성공 여부 */
  success: boolean;
  
  /** 응답 데이터 */
  data: T;
  
  /** 응답 메시지 */
  message: string;
  
  /** 응답 메타데이터 (선택사항) */
  meta?: {
    /** 현재 페이지 (페이지네이션) */
    page?: number;
    
    /** 페이지당 항목 수 */
    limit?: number;
    
    /** 전체 항목 수 */
    total?: number;
    
    /** 전체 페이지 수 */
    totalPages?: number;
    
    /** 요청 처리 시간 (ms) */
    processingTime?: number;
    
    /** API 버전 */
    version?: string;
  };
}

/**
 * 페이지네이션된 API 응답 인터페이스
 * 
 * @interface PaginatedApiResponse
 * @template T - 응답 데이터 배열의 아이템 타입
 */
export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
  /** 페이지네이션 메타데이터 (필수) */
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ========================================
// 3. API 에러 클래스
// ========================================

/**
 * API 에러 클래스
 * 
 * @description
 * 모든 API 관련 에러를 표준화된 형태로 처리하기 위한 커스텀 에러 클래스입니다.
 * HTTP 상태 코드, 에러 코드, 상세 메시지 등을 포함합니다.
 * 
 * @class ApiError
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * HTTP 상태 코드
   */
  public readonly statusCode: HttpStatusCode;
  
  /**
   * API 에러 코드
   */
  public readonly errorCode: ApiErrorCode;
  
  /**
   * 원본 에러 객체 (선택사항)
   */
  public readonly originalError?: Error;
  
  /**
   * 에러 발생 시간
   */
  public readonly timestamp: string;
  
  /**
   * 추가 에러 데이터 (선택사항)
   */
  public readonly data?: any;

  /**
   * ApiError 생성자
   * 
   * @param message - 에러 메시지
   * @param statusCode - HTTP 상태 코드 (기본값: 500)
   * @param errorCode - API 에러 코드 (기본값: 'UNKNOWN_ERROR')
   * @param originalError - 원본 에러 객체 (선택사항)
   * @param data - 추가 에러 데이터 (선택사항)
   */
  constructor(
    message: string,
    statusCode: HttpStatusCode = 500,
    errorCode: ApiErrorCode = 'UNKNOWN_ERROR',
    originalError?: Error,
    data?: any
  ) {
    super(message);
    
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
    this.data = data;
    
    // Error.captureStackTrace가 있는 경우에만 사용 (V8 엔진)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * JSON 직렬화를 위한 메서드
   * 
   * @returns 직렬화 가능한 에러 객체
   */
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      timestamp: this.timestamp,
      data: this.data,
      stack: this.stack,
    };
  }

  /**
   * 에러가 네트워크 관련인지 확인
   * 
   * @returns 네트워크 에러 여부
   */
  isNetworkError(): boolean {
    return this.errorCode === 'NETWORK_ERROR' || this.errorCode === 'TIMEOUT_ERROR';
  }

  /**
   * 에러가 인증 관련인지 확인
   * 
   * @returns 인증 에러 여부
   */
  isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }

  /**
   * 에러가 클라이언트 측 오류인지 확인
   * 
   * @returns 클라이언트 에러 여부
   */
  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * 에러가 서버 측 오류인지 확인
   * 
   * @returns 서버 에러 여부
   */
  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}

// ========================================
// 4. API 요청 옵션 인터페이스
// ========================================

/**
 * API 요청 옵션 인터페이스
 * 
 * @interface ApiRequestOptions
 */
export interface ApiRequestOptions {
  /** 요청 타임아웃 (ms) */
  timeout?: number;
  
  /** 재시도 횟수 */
  retries?: number;
  
  /** 재시도 간격 (ms) */
  retryDelay?: number;
  
  /** 로딩 표시 여부 */
  showLoading?: boolean;
  
  /** 에러 토스트 표시 여부 */
  showErrorToast?: boolean;
  
  /** 커스텀 헤더 */
  headers?: Record<string, string>;
  
  /** 캐시 사용 여부 */
  useCache?: boolean;
  
  /** 캐시 TTL (ms) */
  cacheTTL?: number;
}

// ========================================
// 5. 페이지네이션 요청 인터페이스
// ========================================

/**
 * 페이지네이션 요청 파라미터 인터페이스
 * 
 * @interface PaginationParams
 */
export interface PaginationParams {
  /** 페이지 번호 (1부터 시작) */
  page?: number;
  
  /** 페이지당 항목 수 */
  limit?: number;
  
  /** 정렬 필드 */
  sortBy?: string;
  
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
  
  /** 검색 쿼리 */
  search?: string;
  
  /** 필터 조건 */
  filters?: Record<string, any>;
}

// ========================================
// 6. API 환경 설정 타입
// ========================================

/**
 * API 환경 타입 정의
 */
export type ApiEnvironment = 'development' | 'staging' | 'production';

/**
 * API 설정 인터페이스
 * 
 * @interface ApiConfig
 */
export interface ApiConfig {
  /** 기본 API URL */
  baseURL: string;
  
  /** API 버전 */
  version: string;
  
  /** 환경 */
  environment: ApiEnvironment;
  
  /** 기본 타임아웃 (ms) */
  timeout: number;
  
  /** 기본 재시도 횟수 */
  retries: number;
  
  /** 기본 헤더 */
  defaultHeaders: Record<string, string>;
  
  /** 로깅 활성화 여부 */
  enableLogging: boolean;
  
  /** 캐시 활성화 여부 */
  enableCache: boolean;
}

// ========================================
// 7. 헬퍼 타입들
// ========================================

/**
 * API 메서드 타입 정의
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * 컨텐츠 타입 정의
 */
export type ContentType = 
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

/**
 * API 엔드포인트 정보 인터페이스
 * 
 * @interface ApiEndpoint
 */
export interface ApiEndpoint {
  /** HTTP 메서드 */
  method: ApiMethod;
  
  /** 엔드포인트 경로 */
  path: string;
  
  /** 설명 */
  description?: string;
  
  /** 인증 필요 여부 */
  requiresAuth?: boolean;
  
  /** 요청 본문 타입 */
  requestBodyType?: ContentType;
  
  /** 응답 타입 */
  responseType?: ContentType;
}

// ========================================
// 8. 유틸리티 함수들
// ========================================

/**
 * API 응답이 성공적인지 확인하는 타입 가드
 * 
 * @param response - 확인할 API 응답
 * @returns 성공 응답 여부
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true } {
  return response.success === true;
}

/**
 * 에러가 ApiError 인스턴스인지 확인하는 타입 가드
 * 
 * @param error - 확인할 에러 객체
 * @returns ApiError 인스턴스 여부
 */
export function isApiError(error: any): error is ApiError {
  return error instanceof ApiError;
}

/**
 * HTTP 상태 코드에 따른 기본 에러 메시지 생성
 * 
 * @param statusCode - HTTP 상태 코드
 * @returns 기본 에러 메시지
 */
export function getDefaultErrorMessage(statusCode: HttpStatusCode): string {
  const messages: Record<HttpStatusCode, string> = {
    400: '잘못된 요청입니다.',
    401: '인증이 필요합니다.',
    403: '권한이 없습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    409: '요청이 현재 서버 상태와 충돌합니다.',
    422: '요청 데이터가 유효하지 않습니다.',
    500: '서버 내부 오류가 발생했습니다.',
    502: '게이트웨이 오류가 발생했습니다.',
    503: '서비스를 사용할 수 없습니다.',
    504: '게이트웨이 타임아웃이 발생했습니다.',
    200: '요청이 성공했습니다.',
    201: '리소스가 생성되었습니다.',
    202: '요청이 접수되었습니다.',
    204: '요청이 성공했습니다.',
  };
  
  return messages[statusCode] || '알 수 없는 오류가 발생했습니다.';
} 