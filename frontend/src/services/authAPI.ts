// 인증 관련 API 서비스
// TODO: 실제 백엔드 API 연동 시 구현

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

// 임시 API 함수들 (실제 구현 전까지 사용)
export const authAPI = {
  // 로그인
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'temp-token-' + Date.now(),
          user: {
            id: '1',
            email: credentials.email,
            username: credentials.email.split('@')[0],
          },
        });
      }, 1000);
    });
  },

  // 회원가입
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'temp-token-' + Date.now(),
          user: {
            id: '1',
            email: userData.email,
            username: userData.username,
          },
        });
      }, 1000);
    });
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  // 토큰 검증
  validateToken: async (token: string): Promise<boolean> => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },
}; 