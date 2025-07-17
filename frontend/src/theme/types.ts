/**
 * 🎨 Theme Types - 테마 시스템 타입 정의
 * 
 * 앱의 모든 테마 관련 타입을 중앙에서 관리합니다.
 * 다크/라이트 모드뿐만 아니라 이벤트성 테마(크리스마스, 할로윈 등)까지
 * 포함하는 확장 가능한 테마 시스템을 지원합니다.
 * 
 * @description
 * - 완전한 TypeScript 타입 안정성
 * - 다크/라이트/이벤트 테마 지원
 * - 색상, 타이포그래피, 디자인 시스템
 * - 그라데이션 및 애니메이션 속성
 * - 접근성 및 사용자 경험 고려
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. 기본 테마 타입들
// ========================================

/**
 * 테마 모드 타입
 * 
 * @description
 * 기본 테마(다크/라이트)와 이벤트성 테마들을 포함합니다.
 */
export type ThemeMode = 
  | 'light'           // 라이트 모드
  | 'dark'            // 다크 모드
  | 'christmas'       // 크리스마스 테마
  | 'halloween'       // 할로윈 테마
  | 'valentine'       // 발렌타인 테마
  | 'spring'          // 봄 테마
  | 'summer'          // 여름 테마
  | 'autumn'          // 가을 테마
  | 'winter'          // 겨울 테마
  | 'midnight'        // 미드나이트 테마
  | 'sunset'          // 선셋 테마
  | 'ocean'           // 오션 테마
  | 'forest';         // 포레스트 테마

/**
 * 그라데이션 타입
 */
export type GradientType = 
  | 'background'
  | 'surface'
  | 'card'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'magical'
  | 'natural'
  | 'festive'
  | 'seasonal';

/**
 * 테마 카테고리 타입
 */
export type ThemeCategory = 'basic' | 'seasonal' | 'special';

// ========================================
// 2. 색상 시스템 타입
// ========================================

/**
 * 기본 색상 팔레트 인터페이스
 * 
 * @interface ColorPalette
 */
export interface ColorPalette {
  // 배경 색상 계층
  background: string;
  surface: string;
  card: string;
  elevated: string;
  
  // 경계선과 구분선
  border: string;
  divider: string;
  
  // 텍스트 색상 계층
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  
  // 기능별 색상
  primary: string;
  secondary: string;
  accent: string;
  
  // 상태 색상
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // 특수 색상
  shadow: string;
  overlay: string;
  backdrop: string;
  
  // Elevation 색상들
  elevation1: string;
  elevation2: string;
  elevation3: string;
  elevation4: string;
  
  // 토글 버튼 색상
  toggleTrackActive: string;
  toggleTrackInactive: string;
  toggleThumb: string;
  toggleThumbShadow: string;
}

/**
 * 확장 색상 팔레트 (이벤트 테마용)
 * 
 * @interface ExtendedColorPalette
 */
export interface ExtendedColorPalette extends ColorPalette {
  // 이벤트 특화 색상
  festive?: string;
  seasonal?: string;
  special?: string;
  
  // 추가 테마 색상
  highlight?: string;
  glow?: string;
  sparkle?: string;
  
  // 그라데이션 색상
  gradientStart?: string;
  gradientEnd?: string;
  gradientMid?: string;
}

// ========================================
// 3. 타이포그래피 시스템 타입
// ========================================

/**
 * 폰트 크기 정의
 */
export interface FontSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

/**
 * 폰트 두께 정의
 */
export interface FontWeights {
  thin: '100';
  light: '300';
  regular: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
  black: '900';
}

/**
 * 줄 높이 정의
 */
export interface LineHeights {
  tight: number;
  normal: number;
  relaxed: number;
  loose: number;
}

/**
 * 타이포그래피 시스템 인터페이스
 * 
 * @interface Typography
 */
export interface Typography {
  sizes: FontSizes;
  weights: FontWeights;
  lineHeights: LineHeights;
  
  // 특별한 폰트 패밀리 (테마별)
  fontFamily?: {
    default: string;
    display?: string;
    mono?: string;
    seasonal?: string;
  };
}

// ========================================
// 4. 디자인 시스템 타입
// ========================================

/**
 * 간격 시스템
 */
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

/**
 * 테두리 반지름
 */
export interface BorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
}

/**
 * 그림자 시스템
 */
export interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
  
  // 테마별 특별한 그림자
  glow?: string;
  magical?: string;
  festive?: string;
}

/**
 * 애니메이션 시스템
 */
export interface Animations {
  durations: {
    fast: number;
    normal: number;
    slow: number;
  };
  
  easings: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
  
  // 테마별 특별한 애니메이션
  seasonal?: {
    snowfall?: any;
    sparkle?: any;
    glow?: any;
  };
}

/**
 * 디자인 시스템 인터페이스
 * 
 * @interface DesignSystem
 */
export interface DesignSystem {
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  animations: Animations;
}

// ========================================
// 5. 그라데이션 시스템 타입
// ========================================

/**
 * 그라데이션 색상 정의
 */
export interface GradientColors {
  colors: string[];
  locations?: number[];
}

/**
 * 그라데이션 방향
 */
export interface GradientDirection {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

/**
 * 그라데이션 정의
 */
export interface GradientDefinition {
  colors: string[];
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  type?: 'linear' | 'radial';
}

/**
 * 그라데이션 시스템
 * 
 * @interface Gradients
 */
export interface Gradients {
  background: GradientDefinition;
  surface: GradientDefinition;
  card: GradientDefinition;
  primary: GradientDefinition;
  secondary: GradientDefinition;
  accent: GradientDefinition;
  magical: GradientDefinition;
  natural: GradientDefinition;
  
  // 이벤트/시즌별 그라데이션
  festive?: GradientDefinition;
  seasonal?: GradientDefinition;
  special?: GradientDefinition;
}

// ========================================
// 6. 메인 테마 인터페이스
// ========================================

/**
 * 테마 메타데이터
 */
export interface ThemeMetadata {
  /** 테마 고유 ID */
  id: ThemeMode;
  
  /** 테마 표시 이름 */
  name: string;
  
  /** 테마 설명 */
  description: string;
  
  /** 테마 카테고리 */
  category: ThemeCategory;
  
  /** 시즌/이벤트 기간 (선택사항) */
  period?: {
    start: string; // ISO 날짜 문자열
    end: string;   // ISO 날짜 문자열
  };
  
  /** 테마 아이콘/이미지 */
  icon?: string;
  
  /** 테마 활성화 여부 */
  enabled: boolean;
  
  /** 접근성 정보 */
  accessibility?: {
    highContrast: boolean;
    reducedMotion: boolean;
    colorBlindFriendly: boolean;
  };
}

/**
 * 완전한 테마 정의 인터페이스
 * 
 * @interface Theme
 */
export interface Theme {
  /** 테마 메타데이터 */
  metadata: ThemeMetadata;
  
  /** 색상 시스템 */
  colors: ExtendedColorPalette;
  
  /** 타이포그래피 시스템 */
  typography: Typography;
  
  /** 디자인 시스템 */
  design: DesignSystem;
  
  /** 그라데이션 시스템 */
  gradients: Gradients;
}

// ========================================
// 7. 테마 컨텍스트 타입
// ========================================

/**
 * 테마 설정
 */
export interface ThemeSettings {
  /** 자동 다크 모드 (시스템 설정 따르기) */
  followSystem: boolean;
  
  /** 애니메이션 활성화 */
  animationsEnabled: boolean;
  
  /** 고대비 모드 */
  highContrast: boolean;
  
  /** 움직임 감소 모드 */
  reducedMotion: boolean;
  
  /** 시즌 테마 자동 적용 */
  autoSeasonalThemes: boolean;
  
  /** 커스텀 색상 덮어쓰기 */
  customColors?: Partial<ColorPalette>;
}

/**
 * 테마 컨텍스트 인터페이스
 * 
 * @interface ThemeContextType
 */
export interface ThemeContextType {
  /** 현재 테마 모드 */
  mode: ThemeMode;
  
  /** 현재 테마 객체 */
  theme: Theme;
  
  /** 사용 가능한 모든 테마들 */
  availableThemes: ThemeMode[];
  
  /** 현재 시즌 테마 */
  currentSeasonalTheme?: ThemeMode;
  
  /** 테마 설정 */
  settings: ThemeSettings;
  
  // 테마 관리 함수들
  /** 테마 변경 */
  setTheme: (mode: ThemeMode) => void;
  
  /** 다크/라이트 토글 */
  toggleTheme: () => void;
  
  /** 시스템 테마 따르기 토글 */
  toggleFollowSystem: () => void;
  
  /** 시즌 테마 적용 */
  applySeasonalTheme: () => void;
  
  /** 테마 설정 업데이트 */
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  
  /** 커스텀 색상 적용 */
  applyCustomColors: (colors: Partial<ColorPalette>) => void;
  
  /** 테마 초기화 */
  resetTheme: () => void;
  
  /** 테마 미리보기 */
  previewTheme: (mode: ThemeMode) => void;
  
  /** 미리보기 종료 */
  endPreview: () => void;
}

// ========================================
// 8. 유틸리티 타입들
// ========================================

/**
 * 테마 변경 옵션
 */
export interface ThemeChangeOptions {
  /** 애니메이션 사용 여부 */
  animated?: boolean;
  
  /** 애니메이션 지속 시간 */
  duration?: number;
  
  /** 콜백 함수 */
  onComplete?: () => void;
}

/**
 * 색상 유틸리티 함수 타입
 */
export type ColorUtility = {
  /** 색상 투명도 조절 */
  alpha: (color: string, alpha: number) => string;
  
  /** 색상 밝기 조절 */
  lighten: (color: string, amount: number) => string;
  
  /** 색상 어둡게 */
  darken: (color: string, amount: number) => string;
  
  /** 대비색 반환 */
  getContrastColor: (color: string) => string;
  
  /** 색상 유효성 검사 */
  isValidColor: (color: string) => boolean;
};

/**
 * 테마 유틸리티 함수 타입
 */
export type ThemeUtility = {
  /** 현재 시즌 감지 */
  getCurrentSeason: () => 'spring' | 'summer' | 'autumn' | 'winter';
  
  /** 특별한 날짜 감지 */
  getSpecialDate: () => ThemeMode | null;
  
  /** 시스템 다크 모드 감지 */
  getSystemTheme: () => 'light' | 'dark';
  
  /** 테마 호환성 검사 */
  isThemeCompatible: (mode: ThemeMode) => boolean;
  
  /** 접근성 검사 */
  checkAccessibility: (theme: Theme) => boolean;
};

// ========================================
// 9. 컴포넌트 Props 타입들
// ========================================

/**
 * ThemeProvider Props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
  settings?: Partial<ThemeSettings>;
}

/**
 * GradientBackground Props
 */
export interface GradientBackgroundProps {
  gradientType: GradientType;
  children?: React.ReactNode;
  style?: any;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
}

// ========================================
// 10. 이벤트 및 콜백 타입
// ========================================

/**
 * 테마 변경 이벤트
 */
export interface ThemeChangeEvent {
  previousTheme: ThemeMode;
  newTheme: ThemeMode;
  timestamp: number;
  triggeredBy: 'user' | 'system' | 'seasonal' | 'automatic';
}

/**
 * 테마 이벤트 리스너
 */
export type ThemeEventListener = (event: ThemeChangeEvent) => void; 