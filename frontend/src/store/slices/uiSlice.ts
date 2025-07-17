/**
 * 🎨 UI Slice - UI 상태 관리
 * 
 * 앱의 UI 관련 전역 상태를 관리하는 Redux slice입니다.
 * 로딩 인디케이터, 모달, 토스트, 알림 등 UI 컴포넌트의 상태를 중앙에서 관리합니다.
 * 
 * @description
 * - 로딩 상태 관리 (전역/개별)
 * - 모달 및 오버레이 제어
 * - 토스트 알림 시스템
 * - 앱 테마 및 설정
 * - 네트워크 상태 추적
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. Redux Toolkit
// ========================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ========================================
// 2. 타입 정의
// ========================================

/**
 * 토스트 메시지 타입
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * 토스트 메시지 인터페이스
 * 
 * @interface ToastMessage
 */
export interface ToastMessage {
  /** 토스트 고유 ID */
  id: string;
  
  /** 토스트 타입 */
  type: ToastType;
  
  /** 메시지 제목 */
  title: string;
  
  /** 메시지 내용 */
  message: string;
  
  /** 자동 숨김 시간 (ms, 0이면 수동으로만 닫힘) */
  duration?: number;
  
  /** 액션 버튼 (선택사항) */
  action?: {
    label: string;
    onPress: () => void;
  };
  
  /** 생성 시간 */
  createdAt: number;
}

/**
 * 모달 상태 인터페이스
 * 
 * @interface ModalState
 */
export interface ModalState {
  /** 모달 고유 ID */
  id: string;
  
  /** 모달 타입/이름 */
  type: string;
  
  /** 모달에 전달할 데이터 */
  data?: any;
  
  /** 모달 옵션 */
  options?: {
    closable?: boolean;
    backdrop?: boolean;
    animated?: boolean;
  };
}

/**
 * 로딩 상태 인터페이스
 * 
 * @interface LoadingState
 */
export interface LoadingState {
  /** 전역 로딩 상태 */
  global: boolean;
  
  /** 개별 로딩 상태들 (키별 관리) */
  individual: Record<string, boolean>;
}

/**
 * 네트워크 상태 타입
 */
export type NetworkStatus = 'online' | 'offline' | 'slow' | 'unknown';

/**
 * UI 상태 인터페이스
 * 
 * @interface UiState
 */
export interface UiState {
  /** 로딩 상태 */
  loading: LoadingState;
  
  /** 활성 토스트 메시지들 */
  toasts: ToastMessage[];
  
  /** 활성 모달들 */
  modals: ModalState[];
  
  /** 네트워크 연결 상태 */
  networkStatus: NetworkStatus;
  
  /** 키보드 표시 여부 */
  keyboardVisible: boolean;
  
  /** 앱이 포그라운드에 있는지 여부 */
  appState: 'active' | 'background' | 'inactive';
  
  /** 사이드 메뉴 열림 상태 */
  sideMenuOpen: boolean;
  
  /** 하단 탭 표시 여부 */
  tabBarVisible: boolean;
  
  /** 상태바 스타일 */
  statusBarStyle: 'light' | 'dark';
  
  /** 안전 영역 인셋 */
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// ========================================
// 3. 초기 상태
// ========================================

/**
 * UI 상태 초기값
 */
const initialState: UiState = {
  loading: {
    global: false,
    individual: {},
  },
  toasts: [],
  modals: [],
  networkStatus: 'unknown',
  keyboardVisible: false,
  appState: 'active',
  sideMenuOpen: false,
  tabBarVisible: true,
  statusBarStyle: 'dark',
  safeAreaInsets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

// ========================================
// 4. 헬퍼 함수들
// ========================================

/**
 * 고유 ID 생성 함수
 * 
 * @returns 고유 ID 문자열
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ========================================
// 5. UI Slice 정의
// ========================================

/**
 * UI 상태 관리 slice
 * 
 * @description
 * UI 관련 모든 상태와 액션을 정의합니다.
 * 로딩, 토스트, 모달, 네트워크 상태 등을 포함합니다.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ========================================
    // 로딩 상태 관리
    // ========================================
    
    /**
     * 전역 로딩 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 로딩 상태 (boolean)
     */
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    
    /**
     * 개별 로딩 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - { key: string, loading: boolean }
     */
    setIndividualLoading: (
      state, 
      action: PayloadAction<{ key: string; loading: boolean }>
    ) => {
      const { key, loading } = action.payload;
      if (loading) {
        state.loading.individual[key] = true;
      } else {
        delete state.loading.individual[key];
      }
    },
    
    /**
     * 모든 로딩 상태 초기화
     * 
     * @param state - 현재 상태
     */
    clearAllLoading: (state) => {
      state.loading.global = false;
      state.loading.individual = {};
    },

    // ========================================
    // 토스트 메시지 관리
    // ========================================
    
    /**
     * 토스트 메시지 추가
     * 
     * @param state - 현재 상태
     * @param action - 토스트 메시지 데이터
     */
    addToast: (
      state, 
      action: PayloadAction<Omit<ToastMessage, 'id' | 'createdAt'>>
    ) => {
      const toast: ToastMessage = {
        ...action.payload,
        id: generateId(),
        createdAt: Date.now(),
      };
      state.toasts.push(toast);
    },
    
    /**
     * 토스트 메시지 제거
     * 
     * @param state - 현재 상태
     * @param action - 제거할 토스트 ID
     */
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    /**
     * 모든 토스트 메시지 제거
     * 
     * @param state - 현재 상태
     */
    clearAllToasts: (state) => {
      state.toasts = [];
    },

    // ========================================
    // 모달 관리
    // ========================================
    
    /**
     * 모달 열기
     * 
     * @param state - 현재 상태
     * @param action - 모달 정보
     */
    openModal: (
      state, 
      action: PayloadAction<Omit<ModalState, 'id'>>
    ) => {
      const modal: ModalState = {
        ...action.payload,
        id: generateId(),
      };
      state.modals.push(modal);
    },
    
    /**
     * 모달 닫기
     * 
     * @param state - 현재 상태
     * @param action - 닫을 모달 ID
     */
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.id !== action.payload);
    },
    
    /**
     * 특정 타입의 모든 모달 닫기
     * 
     * @param state - 현재 상태
     * @param action - 모달 타입
     */
    closeModalsByType: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.type !== action.payload);
    },
    
    /**
     * 모든 모달 닫기
     * 
     * @param state - 현재 상태
     */
    closeAllModals: (state) => {
      state.modals = [];
    },

    // ========================================
    // 앱 상태 관리
    // ========================================
    
    /**
     * 네트워크 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 네트워크 상태
     */
    setNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.networkStatus = action.payload;
    },
    
    /**
     * 키보드 표시 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 키보드 표시 여부
     */
    setKeyboardVisible: (state, action: PayloadAction<boolean>) => {
      state.keyboardVisible = action.payload;
    },
    
    /**
     * 앱 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 앱 상태
     */
    setAppState: (
      state, 
      action: PayloadAction<'active' | 'background' | 'inactive'>
    ) => {
      state.appState = action.payload;
    },
    
    /**
     * 사이드 메뉴 토글
     * 
     * @param state - 현재 상태
     */
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen;
    },
    
    /**
     * 사이드 메뉴 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 사이드 메뉴 열림 상태
     */
    setSideMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.sideMenuOpen = action.payload;
    },
    
    /**
     * 하단 탭 바 표시 상태 설정
     * 
     * @param state - 현재 상태
     * @param action - 탭 바 표시 여부
     */
    setTabBarVisible: (state, action: PayloadAction<boolean>) => {
      state.tabBarVisible = action.payload;
    },
    
    /**
     * 상태바 스타일 설정
     * 
     * @param state - 현재 상태
     * @param action - 상태바 스타일
     */
    setStatusBarStyle: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.statusBarStyle = action.payload;
    },
    
    /**
     * 안전 영역 인셋 설정
     * 
     * @param state - 현재 상태
     * @param action - 안전 영역 인셋 값들
     */
    setSafeAreaInsets: (
      state, 
      action: PayloadAction<{
        top: number;
        bottom: number;
        left: number;
        right: number;
      }>
    ) => {
      state.safeAreaInsets = action.payload;
    },
  },
});

// ========================================
// 6. 액션 및 리듀서 내보내기
// ========================================

export const {
  // 로딩 관련
  setGlobalLoading,
  setIndividualLoading,
  clearAllLoading,
  
  // 토스트 관련
  addToast,
  removeToast,
  clearAllToasts,
  
  // 모달 관련
  openModal,
  closeModal,
  closeModalsByType,
  closeAllModals,
  
  // 앱 상태 관련
  setNetworkStatus,
  setKeyboardVisible,
  setAppState,
  toggleSideMenu,
  setSideMenuOpen,
  setTabBarVisible,
  setStatusBarStyle,
  setSafeAreaInsets,
} = uiSlice.actions;

export default uiSlice.reducer; 