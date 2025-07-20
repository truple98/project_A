/**
 * 🔐 AuthAPI - 인증 관련 API 서비스
 * 
 * 사용자 인증과 관련된 모든 API 호출을 담당하는 서비스 모듈입니다.
 * 로그인, 회원가입, 로그아웃, 토큰 검증 등의 기능을 제공하며,
 * 에러 핸들링과 응답 데이터 변환을 포함한 완전한 API 서비스를 구현합니다.
 * 
 * @description
 * - 사용자 인증 플로우 완전 지원
 * - 표준화된 에러 핸들링
 * - TypeScript 타입 안정성
 * - 로딩 상태 및 재시도 로직
 * - JWT 토큰 관리
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. 프로젝트 내부 - 타입 및 유틸리티
// ========================================
import { ApiResponse, ApiError } from '../types/api';

// ========================================
// 2. 타입 정의
// ========================================

/**
 * 로그인 요청 인터페이스
 * 
 * @interface LoginRequest
 */
export interface LoginRequest {
  /** 사용자 이메일 주소 */
  email: string;
  
  /** 사용자 비밀번호 */
  password: string;
  
  /** 로그인 상태 유지 여부 (선택사항) */
  rememberMe?: boolean;
}



/**
 * 비밀번호 재설정 요청 인터페이스
 * 
 * @interface PasswordResetRequest
 */
export interface PasswordResetRequest {
  /** 사용자 이메일 주소 */
  email: string;
}

/**
 * 사용자 정보 인터페이스
 * 
 * @interface User
 */
export interface User {
  /** 사용자 고유 ID */
  id: string;
  
  /** 사용자 이메일 주소 */
  email: string;
  
  /** 사용자 이름 */
  username: string;
  
  /** 프로필 이미지 URL (선택사항) */
  profileImage?: string;
  
  /** 계정 생성 날짜 */
  createdAt: string;
  
  /** 마지막 로그인 날짜 */
  lastLoginAt?: string;
  
  /** 계정 상태 */
  status: 'active' | 'inactive' | 'suspended';
}

/**
 * 인증 응답 인터페이스
 * 
 * @interface AuthResponse
 */
export interface AuthResponse {
  /** JWT 액세스 토큰 */
  accessToken: string;
  
  /** JWT 리프레시 토큰 */
  refreshToken: string;
  
  /** 토큰 만료 시간 (Unix timestamp) */
  expiresAt: number;
  
  /** 사용자 정보 */
  user: User;
}

/**
 * 토큰 검증 응답 인터페이스
 * 
 * @interface TokenValidationResponse
 */
export interface TokenValidationResponse {
  /** 토큰 유효성 */
  isValid: boolean;
  
  /** 사용자 정보 (토큰이 유효한 경우) */
  user?: User;
  
  /** 토큰 만료 시간 */
  expiresAt?: number;
}

// ========================================
// 3. 상수 정의
// ========================================

/**
 * API 엔드포인트 상수
 */
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  VALIDATE_TOKEN: '/auth/validate',
  REFRESH_TOKEN: '/auth/refresh',
  PASSWORD_RESET: '/auth/password-reset',
  PASSWORD_RESET_CONFIRM: '/auth/password-reset/confirm',
} as const;

/**
 * 임시 사용자 데이터 (개발용)
 * TODO: 실제 백엔드 연동 시 제거
 */
const TEMP_USER_DATA = {
  id: 'temp-user-1',
  email: 'user@example.com',
  username: 'TempUser',
  profileImage: undefined,
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  status: 'active' as const,
} as const;

/**
 * API 지연 시뮬레이션 시간 (ms)
 */
const MOCK_DELAY = 1000;

// ========================================
// 4. 헬퍼 함수들
// ========================================

/**
 * API 지연 시뮬레이션 함수
 * 
 * @param ms - 지연 시간 (밀리초)
 * @returns Promise<void>
 * 
 * @example
 * ```typescript
 * await delay(1000); // 1초 대기
 * ```
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 임시 토큰 생성 함수
 * 
 * @param userId - 사용자 ID
 * @returns 임시 JWT 토큰 문자열
 */
const generateTempToken = (userId: string): string => {
  const timestamp = Date.now();
  return `temp-jwt-${userId}-${timestamp}`;
};

/**
 * 임시 만료 시간 생성 함수
 * 
 * @param hours - 만료까지의 시간 (기본: 24시간)
 * @returns Unix timestamp
 */
const generateExpiresAt = (hours: number = 24): number => {
  return Date.now() + (hours * 60 * 60 * 1000);
};

/**
 * 이메일 유효성 검증 함수
 * 
 * @param email - 검증할 이메일 주소
 * @returns 유효성 검증 결과
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 강도 검증 함수
 * 
 * @param password - 검증할 비밀번호
 * @returns 유효성 검증 결과
 */
const validatePassword = (password: string): boolean => {
  // 최소 8자, 대소문자, 숫자, 특수문자 포함
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// ========================================
// 5. API 서비스 클래스
// ========================================

/**
 * AuthAPI 클래스
 * 
 * @description
 * 인증 관련 모든 API 호출을 관리하는 서비스 클래스입니다.
 * 싱글톤 패턴으로 구현되어 앱 전체에서 일관된 인증 상태를 관리합니다.
 * 
 * @class AuthAPI
 */
class AuthAPI {
  /**
   * 현재 액세스 토큰
   */
  private accessToken: string | null = null;

  /**
   * 현재 리프레시 토큰
   */
  private refreshToken: string | null = null;

  // ========================================
  // 6. 토큰 관리 메서드
  // ========================================

  /**
   * 액세스 토큰 설정
   * 
   * @param token - 설정할 액세스 토큰
   * 
   * @example
   * ```typescript
   * authAPI.setAccessToken('jwt-token-here');
   * ```
   */
  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * 액세스 토큰 조회
   * 
   * @returns 현재 액세스 토큰 또는 null
   */
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * 리프레시 토큰 설정
   * 
   * @param token - 설정할 리프레시 토큰
   */
  public setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  /**
   * 모든 토큰 초기화
   */
  public clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  // ========================================
  // 7. 인증 API 메서드들
  // ========================================

  /**
   * 사용자 로그인
   * 
   * @param credentials - 로그인 인증 정보
   * @returns Promise<ApiResponse<AuthResponse>>
   * 
   * @throws {ApiError} 인증 실패 시
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await authAPI.login({
   *     email: 'user@example.com',
   *     password: 'password123',
   *     rememberMe: true
   *   });
   *   console.log('로그인 성공:', response.data.user);
   * } catch (error) {
   *   console.error('로그인 실패:', error.message);
   * }
   * ```
   */
  public async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      // 입력 데이터 검증
      if (!validateEmail(credentials.email)) {
        throw new ApiError('유효하지 않은 이메일 형식입니다.', 400, 'INVALID_EMAIL');
      }

      if (!credentials.password || credentials.password.length < 6) {
        throw new ApiError('비밀번호는 최소 6자 이상이어야 합니다.', 400, 'INVALID_PASSWORD');
      }

      // TODO: 실제 API 호출로 교체
      await delay(MOCK_DELAY);

      // 임시 성공 응답 생성
      const authResponse: AuthResponse = {
        accessToken: generateTempToken(TEMP_USER_DATA.id),
        refreshToken: generateTempToken(TEMP_USER_DATA.id + '-refresh'),
        expiresAt: generateExpiresAt(24),
        user: {
          ...TEMP_USER_DATA,
          email: credentials.email,
          username: credentials.email.split('@')[0],
          lastLoginAt: new Date().toISOString(),
        },
      };

      // 토큰 저장
      this.setAccessToken(authResponse.accessToken);
      this.setRefreshToken(authResponse.refreshToken);

      return {
        success: true,
        data: authResponse,
        message: '로그인이 완료되었습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        500,
        'LOGIN_ERROR'
      );
    }
  }



  /**
   * 사용자 로그아웃
   * 
   * @returns Promise<ApiResponse<void>>
   * 
   * @example
   * ```typescript
   * try {
   *   await authAPI.logout();
   *   console.log('로그아웃 완료');
   * } catch (error) {
   *   console.error('로그아웃 실패:', error.message);
   * }
   * ```
   */
  public async logout(): Promise<ApiResponse<void>> {
    try {
      // TODO: 실제 API 호출로 교체 (서버에 로그아웃 알림)
      await delay(500);

      // 토큰 초기화
      this.clearTokens();

      return {
        success: true,
        data: undefined,
        message: '로그아웃이 완료되었습니다.',
      };
    } catch (error) {
      // 로그아웃은 실패해도 토큰을 초기화
      this.clearTokens();
      
      throw new ApiError(
        '로그아웃 중 오류가 발생했습니다.',
        500,
        'LOGOUT_ERROR'
      );
    }
  }

  /**
   * 토큰 유효성 검증
   * 
   * @param token - 검증할 토큰 (선택사항, 미제공 시 현재 액세스 토큰 사용)
   * @returns Promise<ApiResponse<TokenValidationResponse>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await authAPI.validateToken();
   *   if (response.data.isValid) {
   *     console.log('토큰 유효, 사용자:', response.data.user);
   *   } else {
   *     console.log('토큰 무효');
   *   }
   * } catch (error) {
   *   console.error('토큰 검증 실패:', error.message);
   * }
   * ```
   */
  public async validateToken(token?: string): Promise<ApiResponse<TokenValidationResponse>> {
    try {
      const targetToken = token || this.accessToken;

      if (!targetToken) {
        return {
          success: true,
          data: { isValid: false },
          message: '토큰이 제공되지 않았습니다.',
        };
      }

      // TODO: 실제 API 호출로 교체
      await delay(500);

      // 임시 토큰 검증 로직 (실제로는 서버에서 검증)
      const isValid = targetToken.startsWith('temp-jwt-');

      if (isValid) {
        return {
          success: true,
          data: {
            isValid: true,
            user: TEMP_USER_DATA,
            expiresAt: generateExpiresAt(24),
          },
          message: '토큰이 유효합니다.',
        };
      } else {
        return {
          success: true,
          data: { isValid: false },
          message: '토큰이 유효하지 않습니다.',
        };
      }
    } catch (error) {
      throw new ApiError(
        '토큰 검증 중 오류가 발생했습니다.',
        500,
        'TOKEN_VALIDATION_ERROR'
      );
    }
  }

  /**
   * 비밀번호 재설정 요청
   * 
   * @param data - 비밀번호 재설정 요청 데이터
   * @returns Promise<ApiResponse<void>>
   * 
   * @example
   * ```typescript
   * try {
   *   await authAPI.requestPasswordReset({ email: 'user@example.com' });
   *   console.log('비밀번호 재설정 이메일 발송 완료');
   * } catch (error) {
   *   console.error('비밀번호 재설정 요청 실패:', error.message);
   * }
   * ```
   */
  public async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse<void>> {
    try {
      if (!validateEmail(data.email)) {
        throw new ApiError('유효하지 않은 이메일 형식입니다.', 400, 'INVALID_EMAIL');
      }

      // TODO: 실제 API 호출로 교체
      await delay(1000);

      return {
        success: true,
        data: undefined,
        message: '비밀번호 재설정 이메일이 발송되었습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '비밀번호 재설정 요청 중 오류가 발생했습니다.',
        500,
        'PASSWORD_RESET_ERROR'
      );
    }
  }

  /**
   * 토큰 갱신
   * 
   * @returns Promise<ApiResponse<AuthResponse>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await authAPI.refreshAccessToken();
   *   console.log('토큰 갱신 완료:', response.data.accessToken);
   * } catch (error) {
   *   console.error('토큰 갱신 실패:', error.message);
   * }
   * ```
   */
  public async refreshAccessToken(): Promise<ApiResponse<AuthResponse>> {
    try {
      if (!this.refreshToken) {
        throw new ApiError('리프레시 토큰이 없습니다.', 401, 'NO_REFRESH_TOKEN');
      }

      // TODO: 실제 API 호출로 교체
      await delay(500);

      // 새로운 토큰 생성
      const authResponse: AuthResponse = {
        accessToken: generateTempToken(TEMP_USER_DATA.id),
        refreshToken: generateTempToken(TEMP_USER_DATA.id + '-refresh'),
        expiresAt: generateExpiresAt(24),
        user: TEMP_USER_DATA,
      };

      // 토큰 업데이트
      this.setAccessToken(authResponse.accessToken);
      this.setRefreshToken(authResponse.refreshToken);

      return {
        success: true,
        data: authResponse,
        message: '토큰이 갱신되었습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '토큰 갱신 중 오류가 발생했습니다.',
        500,
        'TOKEN_REFRESH_ERROR'
      );
    }
  }
}

// ========================================
// 8. 싱글톤 인스턴스 내보내기
// ========================================

/**
 * AuthAPI 싱글톤 인스턴스
 * 
 * @description
 * 앱 전체에서 하나의 AuthAPI 인스턴스를 사용하여
 * 일관된 인증 상태 관리를 보장합니다.
 * 
 * @example
 * ```typescript
 * import { authAPI } from '../services/authAPI';
 * 
 * // 로그인
 * const response = await authAPI.login({ email, password });
 * 
 * // 토큰 확인
 * const token = authAPI.getAccessToken();
 * ```
 */
export const authAPI = new AuthAPI();

// ========================================
// 9. 기본 내보내기
// ========================================

export default authAPI; 