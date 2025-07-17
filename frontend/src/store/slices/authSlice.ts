/**
 * 🔐 Auth Slice - 인증 상태 관리
 * 
 * 사용자 인증과 관련된 모든 상태를 관리하는 Redux slice입니다.
 * 로그인, 회원가입, 로그아웃, 토큰 관리 등 인증 플로우를 포함하며,
 * API 서비스와 연동하여 비동기 작업을 처리합니다.
 * 
 * @description
 * - 사용자 인증 상태 관리
 * - JWT 토큰 관리 (액세스/리프레시)
 * - 로그인/회원가입/로그아웃 플로우
 * - 에러 처리 및 로딩 상태
 * - 자동 토큰 갱신 로직
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. Redux Toolkit
// ========================================
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ========================================
// 2. 프로젝트 내부 - API 서비스
// ========================================
import { authAPI } from '../../services/authAPI';
import type { 
  LoginRequest, 
  RegisterRequest, 
  PasswordResetRequest, 
  AuthResponse, 
  User, 
  TokenValidationResponse 
} from '../../services/authAPI';

// ========================================
// 3. 프로젝트 내부 - 타입
// ========================================
import { ApiError } from '../../types/api';

// ========================================
// 4. 타입 정의
// ========================================

/**
 * 인증 상태 인터페이스
 * 
 * @interface AuthState
 */
export interface AuthState {
  /** 현재 로그인된 사용자 정보 */
  user: User | null;
  
  /** JWT 액세스 토큰 */
  accessToken: string | null;
  
  /** JWT 리프레시 토큰 */
  refreshToken: string | null;
  
  /** 토큰 만료 시간 (Unix timestamp) */
  tokenExpiresAt: number | null;
  
  /** 인증 상태 (로그인 여부) */
  isAuthenticated: boolean;
  
  /** 로딩 상태 */
  loading: {
    /** 전역 로딩 */
    global: boolean;
    
    /** 개별 작업별 로딩 */
    login: boolean;
    register: boolean;
    logout: boolean;
    tokenValidation: boolean;
    tokenRefresh: boolean;
    passwordReset: boolean;
  };
  
  /** 에러 상태 */
  error: string | null;
  
  /** 마지막 로그인 시간 */
  lastLoginAt: string | null;
  
  /** 로그인 상태 유지 여부 */
  rememberMe: boolean;
  
  /** 초기화 완료 여부 (앱 시작 시 토큰 검증 등) */
  initialized: boolean;
}

/**
 * 로그인 성공 응답 타입
 */
export type LoginSuccessPayload = AuthResponse;

/**
 * 회원가입 성공 응답 타입
 */
export type RegisterSuccessPayload = AuthResponse;

// ========================================
// 5. 초기 상태
// ========================================

/**
 * 인증 상태 초기값
 */
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenExpiresAt: null,
  isAuthenticated: false,
  loading: {
    global: false,
    login: false,
    register: false,
    logout: false,
    tokenValidation: false,
    tokenRefresh: false,
    passwordReset: false,
  },
  error: null,
  lastLoginAt: null,
  rememberMe: false,
  initialized: false,
};

// ========================================
// 6. 비동기 Thunk Actions
// ========================================

/**
 * 사용자 로그인 액션
 * 
 * @description
 * 이메일과 비밀번호로 사용자를 인증하고 토큰을 저장합니다.
 * 로그인 성공 시 사용자 정보와 토큰을 상태에 저장합니다.
 * 
 * @param credentials - 로그인 인증 정보
 * @returns Promise<AuthResponse>
 * 
 * @example
 * ```typescript
 * dispatch(login({ 
 *   email: 'user@example.com', 
 *   password: 'password123',
 *   rememberMe: true 
 * }));
 * ```
 */
export const login = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('로그인 중 오류가 발생했습니다.');
    }
  }
);

/**
 * 사용자 회원가입 액션
 * 
 * @description
 * 새 사용자 계정을 생성하고 자동으로 로그인 처리합니다.
 * 
 * @param userData - 회원가입 정보
 * @returns Promise<AuthResponse>
 * 
 * @example
 * ```typescript
 * dispatch(register({
 *   email: 'new@example.com',
 *   password: 'SecurePass123!',
 *   confirmPassword: 'SecurePass123!',
 *   username: 'NewUser',
 *   agreeToTerms: true,
 *   agreeToPrivacy: true
 * }));
 * ```
 */
export const register = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('회원가입 중 오류가 발생했습니다.');
    }
  }
);

/**
 * 사용자 로그아웃 액션
 * 
 * @description
 * 서버에 로그아웃을 알리고 로컬 상태를 초기화합니다.
 * 
 * @returns Promise<void>
 * 
 * @example
 * ```typescript
 * dispatch(logout());
 * ```
 */
export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      // 로그아웃은 실패해도 로컬 상태는 초기화
      console.warn('로그아웃 API 호출 실패:', error);
    }
  }
);

/**
 * 토큰 유효성 검증 액션
 * 
 * @description
 * 저장된 토큰이 여전히 유효한지 확인합니다.
 * 앱 시작 시 또는 주기적으로 호출됩니다.
 * 
 * @param token - 검증할 토큰 (선택사항)
 * @returns Promise<TokenValidationResponse>
 * 
 * @example
 * ```typescript
 * dispatch(validateToken());
 * ```
 */
export const validateToken = createAsyncThunk<
  TokenValidationResponse,
  string | undefined,
  { rejectValue: string }
>(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authAPI.validateToken(token);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('토큰 검증 중 오류가 발생했습니다.');
    }
  }
);

/**
 * 토큰 갱신 액션
 * 
 * @description
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.
 * 
 * @returns Promise<AuthResponse>
 * 
 * @example
 * ```typescript
 * dispatch(refreshToken());
 * ```
 */
export const refreshToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refreshAccessToken();
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('토큰 갱신 중 오류가 발생했습니다.');
    }
  }
);

/**
 * 비밀번호 재설정 요청 액션
 * 
 * @description
 * 이메일로 비밀번호 재설정 링크를 발송합니다.
 * 
 * @param data - 비밀번호 재설정 요청 데이터
 * @returns Promise<void>
 * 
 * @example
 * ```typescript
 * dispatch(requestPasswordReset({ email: 'user@example.com' }));
 * ```
 */
export const requestPasswordReset = createAsyncThunk<
  void,
  PasswordResetRequest,
  { rejectValue: string }
>(
  'auth/requestPasswordReset',
  async (data, { rejectWithValue }) => {
    try {
      await authAPI.requestPasswordReset(data);
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
  }
);

// ========================================
// 7. Auth Slice 정의
// ========================================

/**
 * 인증 상태 관리 slice
 * 
 * @description
 * 인증 관련 모든 상태와 액션을 정의합니다.
 * 동기 액션(reducers)과 비동기 액션(extraReducers) 모두 포함합니다.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ========================================
    // 동기 액션들
    // ========================================
    
    /**
     * 에러 상태 초기화
     * 
     * @param state - 현재 상태
     */
    clearError: (state) => {
      state.error = null;
    },
    
    /**
     * 토큰 수동 설정 (외부에서 받은 토큰)
     * 
     * @param state - 현재 상태
     * @param action - 토큰 정보
     */
    setTokens: (
      state, 
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
      }>
    ) => {
      const { accessToken, refreshToken, expiresAt } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.tokenExpiresAt = expiresAt;
      state.isAuthenticated = true;
      
      // API 서비스에도 토큰 설정
      authAPI.setAccessToken(accessToken);
      authAPI.setRefreshToken(refreshToken);
    },
    
    /**
     * 사용자 정보 수동 설정
     * 
     * @param state - 현재 상태
     * @param action - 사용자 정보
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    
    /**
     * 인증 상태 완전 초기화
     * 
     * @param state - 현재 상태
     */
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiresAt = null;
      state.isAuthenticated = false;
      state.error = null;
      state.lastLoginAt = null;
      state.rememberMe = false;
      
      // API 서비스 토큰도 초기화
      authAPI.clearTokens();
    },
    
    /**
     * 로그인 상태 유지 설정
     * 
     * @param state - 현재 상태
     * @param action - 상태 유지 여부
     */
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    
    /**
     * 초기화 완료 표시
     * 
     * @param state - 현재 상태
     */
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
  
  // ========================================
  // 비동기 액션 처리
  // ========================================
  extraReducers: (builder) => {
    // 로그인 처리
    builder
      .addCase(login.pending, (state) => {
        state.loading.login = true;
        state.loading.global = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, expiresAt, user } = action.payload;
        
        state.loading.login = false;
        state.loading.global = false;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.tokenExpiresAt = expiresAt;
        state.isAuthenticated = true;
        state.lastLoginAt = new Date().toISOString();
        state.error = null;
        
        // API 서비스에 토큰 설정
        authAPI.setAccessToken(accessToken);
        authAPI.setRefreshToken(refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.loading.global = false;
        state.error = action.payload || '로그인에 실패했습니다.';
        state.isAuthenticated = false;
      });

    // 회원가입 처리
    builder
      .addCase(register.pending, (state) => {
        state.loading.register = true;
        state.loading.global = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, refreshToken, expiresAt, user } = action.payload;
        
        state.loading.register = false;
        state.loading.global = false;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.tokenExpiresAt = expiresAt;
        state.isAuthenticated = true;
        state.lastLoginAt = new Date().toISOString();
        state.error = null;
        
        // API 서비스에 토큰 설정
        authAPI.setAccessToken(accessToken);
        authAPI.setRefreshToken(refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading.register = false;
        state.loading.global = false;
        state.error = action.payload || '회원가입에 실패했습니다.';
      });

    // 로그아웃 처리
    builder
      .addCase(logout.pending, (state) => {
        state.loading.logout = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // 상태 완전 초기화
        return {
          ...initialState,
          initialized: true, // 초기화는 유지
        };
      })
      .addCase(logout.rejected, (state) => {
        // 에러가 있어도 로그아웃 처리
        return {
          ...initialState,
          initialized: true,
        };
      });

    // 토큰 검증 처리
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading.tokenValidation = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading.tokenValidation = false;
        
        if (action.payload.isValid && action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.tokenExpiresAt = action.payload.expiresAt || null;
        } else {
          // 토큰이 무효한 경우 초기화
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.tokenExpiresAt = null;
          state.isAuthenticated = false;
          authAPI.clearTokens();
        }
        
        state.initialized = true;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading.tokenValidation = false;
        state.error = action.payload || '토큰 검증에 실패했습니다.';
        state.isAuthenticated = false;
        state.initialized = true;
        
        // 토큰 무효화
        authAPI.clearTokens();
      });

    // 토큰 갱신 처리
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading.tokenRefresh = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { accessToken, refreshToken, expiresAt, user } = action.payload;
        
        state.loading.tokenRefresh = false;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.tokenExpiresAt = expiresAt;
        state.user = user;
        state.isAuthenticated = true;
        
        // API 서비스에 새 토큰 설정
        authAPI.setAccessToken(accessToken);
        authAPI.setRefreshToken(refreshToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading.tokenRefresh = false;
        state.error = action.payload || '토큰 갱신에 실패했습니다.';
        
        // 갱신 실패 시 로그아웃 처리
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenExpiresAt = null;
        state.isAuthenticated = false;
        authAPI.clearTokens();
      });

    // 비밀번호 재설정 처리
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading.passwordReset = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading.passwordReset = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading.passwordReset = false;
        state.error = action.payload || '비밀번호 재설정 요청에 실패했습니다.';
      });
  },
});

// ========================================
// 8. 액션 및 리듀서 내보내기
// ========================================

export const {
  clearError,
  setTokens,
  setUser,
  clearAuth,
  setRememberMe,
  setInitialized,
} = authSlice.actions;

export default authSlice.reducer; 