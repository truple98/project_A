/**
 * ☀️ Light Theme - 라이트 모드 테마 정의
 * 
 * TRPG 게임의 라이트 모드 테마입니다.
 * 양피지와 자연스러운 나무 톤을 기반으로 한 따뜻하고 편안한 디자인을 제공합니다.
 * 게임의 판타지 세계관과 어울리는 클래식하고 우아한 색상 조합을 사용합니다.
 * 
 * @description
 * - 순백색 기반의 깔끔하고 밝은 배경
 * - 부드러운 그림자와 경계선
 * - 자연스러운 색상 팔레트
 * - 높은 가독성과 접근성
 * - TRPG 판타지 컨셉에 맞는 디자인
 * 
 * @author TRPG Game Team
 * @version 1.0.0
 */

// ========================================
// 1. 타입 임포트
// ========================================
import type { Theme } from './types';

// ========================================
// 2. 색상 상수 정의
// ========================================

/**
 * 라이트 테마 기본 색상 상수
 */
const LIGHT_COLORS = {
  // 기본 배경 톤
  WHITE: '#ffffff',
  PURE_WHITE: '#ffffff',
  SOFT_WHITE: '#fafafa',
  LIGHT_GRAY: '#f5f5f5',
  MEDIUM_GRAY: '#f0f0f0',
  BORDER_GRAY: '#e9ecef',
  
  // 텍스트 톤
  SOFT_BLACK: '#1a1a1a',
  DARK_GRAY: '#666666',
  MEDIUM_TEXT: '#999999',
  LIGHT_TEXT: '#cccccc',
  
  // 기능 색상
  CALM_BLUE: '#4a90e2',
  SOFT_PURPLE: '#7b68ee',
  WARM_ORANGE: '#ff8c42',
  
  // 상태 색상
  SUCCESS_GREEN: '#5cb85c',
  WARNING_ORANGE: '#f0ad4e',
  ERROR_RED: '#d9534f',
  INFO_BLUE: '#5bc0de',
  
  // 그림자 및 오버레이
  LIGHT_SHADOW: 'rgba(0, 0, 0, 0.1)',
  LIGHT_OVERLAY: 'rgba(0, 0, 0, 0.3)',
  LIGHT_BACKDROP: 'rgba(0, 0, 0, 0.5)',
  
  // 토글 컬러
  TOGGLE_BLACK: '#000000',
  TOGGLE_GRAY: '#e5e5e5',
} as const;

/**
 * 자연/판타지 테마 특화 색상
 */
const FANTASY_COLORS = {
  // 양피지/종이 톤
  PARCHMENT: '#fdf6e3',
  OLD_PAPER: '#f4f1de',
  CREAM: '#faf0e6',
  
  // 나무/자연 톤
  WOOD_BROWN: '#d2b48c',
  FOREST_GREEN: '#228b22',
  EARTH_BROWN: '#8b4513',
  
  // 마법적 색상
  MYSTIC_GOLD: '#ffd700',
  ENCHANTED_BLUE: '#4169e1',
  MAGIC_PURPLE: '#9370db',
} as const;

// ========================================
// 3. 라이트 테마 정의
// ========================================

/**
 * 라이트 모드 테마 객체
 * 
 * @description
 * TRPG 게임에 최적화된 라이트 모드 테마입니다.
 * 양피지 느낌의 따뜻한 배경과 자연스러운 색상을 사용하여
 * 판타지 게임의 분위기를 연출합니다.
 */
export const lightTheme: Theme = {
  // ========================================
  // 메타데이터
  // ========================================
  metadata: {
    id: 'light',
    name: '라이트 모드',
    description: '밝고 깔끔한 기본 테마입니다. 양피지 느낌의 따뜻한 톤을 사용합니다.',
    category: 'basic',
    enabled: true,
    icon: '☀️',
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      colorBlindFriendly: true,
    },
  },

  // ========================================
  // 색상 시스템
  // ========================================
  colors: {
    // 배경 색상 계층 - 순백색 기반
    background: LIGHT_COLORS.WHITE,
    surface: LIGHT_COLORS.WHITE,
    card: LIGHT_COLORS.WHITE,
    elevated: LIGHT_COLORS.SOFT_WHITE,
    
    // 경계선과 구분선 - 부드러운 구분
    border: LIGHT_COLORS.BORDER_GRAY,
    divider: '#dee2e6',
    
    // 텍스트 색상 계층 - 높은 가독성
    text: LIGHT_COLORS.SOFT_BLACK,
    textSecondary: LIGHT_COLORS.DARK_GRAY,
    textTertiary: LIGHT_COLORS.MEDIUM_TEXT,
    textDisabled: LIGHT_COLORS.LIGHT_TEXT,
    
    // 기능별 색상 - 차분하고 우아한 톤
    primary: LIGHT_COLORS.CALM_BLUE,
    secondary: LIGHT_COLORS.SOFT_PURPLE,
    accent: LIGHT_COLORS.WARM_ORANGE,
    
    // 상태 색상 - 명확한 의미 전달
    success: LIGHT_COLORS.SUCCESS_GREEN,
    warning: LIGHT_COLORS.WARNING_ORANGE,
    error: LIGHT_COLORS.ERROR_RED,
    info: LIGHT_COLORS.INFO_BLUE,
    
    // 특수 색상 - 섬세한 그림자
    shadow: LIGHT_COLORS.LIGHT_SHADOW,
    overlay: LIGHT_COLORS.LIGHT_OVERLAY,
    backdrop: LIGHT_COLORS.LIGHT_BACKDROP,
    
    // Elevation 색상들 - 미세한 차이로 깊이감 표현
    elevation1: LIGHT_COLORS.SOFT_WHITE,
    elevation2: LIGHT_COLORS.LIGHT_GRAY,
    elevation3: LIGHT_COLORS.MEDIUM_GRAY,
    elevation4: '#ebebeb',
    
    // 토글 버튼 색상 - 명확한 대비
    toggleTrackActive: LIGHT_COLORS.TOGGLE_BLACK,
    toggleTrackInactive: LIGHT_COLORS.TOGGLE_GRAY,
    toggleThumb: LIGHT_COLORS.WHITE,
    toggleThumbShadow: LIGHT_COLORS.LIGHT_SHADOW,
    
    // 확장 색상 (판타지 테마용)
    festive: FANTASY_COLORS.MYSTIC_GOLD,
    seasonal: FANTASY_COLORS.FOREST_GREEN,
    special: FANTASY_COLORS.ENCHANTED_BLUE,
    highlight: FANTASY_COLORS.PARCHMENT,
    glow: FANTASY_COLORS.MYSTIC_GOLD,
    sparkle: FANTASY_COLORS.MAGIC_PURPLE,
    
    // 그라데이션 색상
    gradientStart: LIGHT_COLORS.WHITE,
    gradientEnd: LIGHT_COLORS.SOFT_WHITE,
    gradientMid: LIGHT_COLORS.LIGHT_GRAY,
  },

  // ========================================
  // 타이포그래피 시스템
  // ========================================
  typography: {
    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    
    weights: {
      thin: '100',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2.0,
    },
    
    fontFamily: {
      default: 'System',
      display: 'Georgia', // 판타지 느낌의 세리프 폰트
      mono: 'Monaco',
      seasonal: 'Papyrus', // 양피지 느낌 (시즌 테마용)
    },
  },

  // ========================================
  // 디자인 시스템
  // ========================================
  design: {
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    
    borderRadius: {
      xs: 2,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
      full: 9999,
    },
    
    shadows: {
      none: 'none',
      sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0px 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0px 20px 25px rgba(0, 0, 0, 0.15)',
      inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
      
      // 테마별 특별한 그림자
      glow: `0px 0px 20px ${FANTASY_COLORS.MYSTIC_GOLD}33`,
      magical: `0px 0px 15px ${FANTASY_COLORS.ENCHANTED_BLUE}40`,
      festive: `0px 4px 12px ${FANTASY_COLORS.FOREST_GREEN}20`,
    },
    
    animations: {
      durations: {
        fast: 150,
        normal: 300,
        slow: 500,
      },
      
      easings: {
        linear: 'ease-linear',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      seasonal: {
        // 라이트 테마의 자연스러운 애니메이션
        sparkle: {
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
        },
        glow: {
          shadowOpacity: [0.2, 0.6, 0.2],
        },
      },
    },
  },

  // ========================================
  // 그라데이션 시스템
  // ========================================
  gradients: {
    // 기본 배경 그라데이션 - 양피지 느낌
    background: {
      colors: [FANTASY_COLORS.PARCHMENT, FANTASY_COLORS.CREAM, LIGHT_COLORS.WHITE],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 표면 그라데이션 - 나무 테이블 느낌
    surface: {
      colors: [FANTASY_COLORS.WOOD_BROWN + '20', FANTASY_COLORS.OLD_PAPER, LIGHT_COLORS.WHITE],
      locations: [0, 0.3, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 카드 그라데이션 - 깨끗한 종이
    card: {
      colors: [LIGHT_COLORS.WHITE, LIGHT_COLORS.SOFT_WHITE],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 주요 액션 그라데이션 - 나무 손잡이 느낌
    primary: {
      colors: [LIGHT_COLORS.CALM_BLUE, LIGHT_COLORS.CALM_BLUE + 'dd'],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 보조 액션 그라데이션 - 가죽 느낌
    secondary: {
      colors: [FANTASY_COLORS.EARTH_BROWN, FANTASY_COLORS.WOOD_BROWN],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 강조 그라데이션 - 숲의 초록
    accent: {
      colors: [FANTASY_COLORS.FOREST_GREEN, FANTASY_COLORS.FOREST_GREEN + 'cc'],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 마법적 그라데이션 - 신비로운 빛
    magical: {
      colors: [
        FANTASY_COLORS.ENCHANTED_BLUE,
        FANTASY_COLORS.MAGIC_PURPLE,
        FANTASY_COLORS.MYSTIC_GOLD,
        FANTASY_COLORS.ENCHANTED_BLUE,
      ],
      locations: [0, 0.33, 0.66, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      type: 'linear',
    },
    
    // 자연 그라데이션 - 4색 자연 조합
    natural: {
      colors: [
        FANTASY_COLORS.FOREST_GREEN,
        FANTASY_COLORS.WOOD_BROWN,
        FANTASY_COLORS.EARTH_BROWN,
        FANTASY_COLORS.PARCHMENT,
      ],
      locations: [0, 0.25, 0.75, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
      type: 'linear',
    },
    
    // 축제 그라데이션 (이벤트용)
    festive: {
      colors: [FANTASY_COLORS.MYSTIC_GOLD, FANTASY_COLORS.ENCHANTED_BLUE],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      type: 'linear',
    },
    
    // 시즌 그라데이션 (계절별)
    seasonal: {
      colors: [FANTASY_COLORS.FOREST_GREEN, FANTASY_COLORS.WOOD_BROWN],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      type: 'linear',
    },
    
    // 특별 그라데이션
    special: {
      colors: [FANTASY_COLORS.MAGIC_PURPLE, FANTASY_COLORS.MYSTIC_GOLD],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
      type: 'linear',
    },
  },
}; 