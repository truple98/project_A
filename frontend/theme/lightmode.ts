// 라이트모드 테마 - 제시된 이미지 "Light shadows" 스타일 기반
export const lightTheme = {
  colors: {
    // 배경 색상 계층 - 순백색 기반
    background: '#ffffff',     // 메인 배경 - 순백색 (토글 버튼 흰색과 동일)
    surface: '#ffffff',        // 카드 배경 - 순백
    card: '#ffffff',           // 강조 카드 - 순백
    elevated: '#ffffff',       // 상승된 요소 - 순백
    
    // 경계선과 구분선 - 더 명확한 구분
    border: '#e9ecef',         // 기본 경계선
    divider: '#dee2e6',        // 구분선
    
    // 텍스트 색상 계층 - 순흑 피하기
    text: '#1a1a1a',           // 주요 텍스트 - 부드러운 검정
    textSecondary: '#666666',  // 보조 텍스트 - 중간 회색
    textTertiary: '#999999',   // 3차 텍스트 - 밝은 회색
    textDisabled: '#cccccc',   // 비활성 텍스트 - 더 밝은 회색
    
    // 기능별 색상 - 채도 낮춤
    primary: '#4a90e2',        // 주요 액션 - 덜 선명한 블루
    secondary: '#7b68ee',      // 보조 액션 - 덜 선명한 퍼플
    accent: '#ff8c42',         // 강조 - 덜 선명한 오렌지
    
    // 상태 색상 - 채도 낮춤
    success: '#5cb85c',        // 성공 - 덜 선명한 초록
    warning: '#f0ad4e',        // 경고 - 덜 선명한 오렌지  
    error: '#d9534f',          // 에러 - 덜 선명한 빨강
    info: '#5bc0de',           // 정보 - 덜 선명한 블루
    
    // 특수 색상 - 더 섬세한 그림자
    shadow: 'rgba(0, 0, 0, 0.1)',      // 그림자 - 라이트모드용
    overlay: 'rgba(0, 0, 0, 0.3)',     // 오버레이
    backdrop: 'rgba(0, 0, 0, 0.5)',    // 백드롭
    
    // elevation 색상들 - 순백색 기반에서 미세한 차이
    elevation1: '#fafafa',     // 1단계 elevation - 아주 연한 회색
    elevation2: '#f5f5f5',     // 2단계 elevation - 연한 회색
    elevation3: '#f0f0f0',     // 3단계 elevation - 중간 회색
    elevation4: '#ebebeb',     // 4단계 elevation - 어두운 회색
    
    // 토글 버튼 색상 - 검정과 흰색 조합
    toggleTrackActive: '#000000',    // 활성 상태 트랙 - 검정색
    toggleTrackInactive: '#e5e5e5',  // 비활성 상태 트랙 - 연한 회색
    toggleThumb: '#ffffff',          // 토글 썸 - 흰색
    toggleThumbShadow: 'rgba(0, 0, 0, 0.1)', // 토글 썸 그림자
  },
  
  // 타이포그래피 시스템
  typography: {
    fontFamily: 'system',
    weights: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    sizes: {
      xs: 11,    // 작은 라벨
      sm: 13,    // 보조 텍스트
      md: 15,    // 기본 텍스트
      lg: 17,    // 제목
      xl: 20,    // 큰 제목
      xxl: 24,   // 매우 큰 제목
      xxxl: 32,  // 헤더
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  
  // 세련된 디자인 시스템
  design: {
    // 둥근 모서리
    borderRadius: {
      none: 0,
      sm: 6,
      md: 12,
      lg: 16,
      xl: 20,
      full: 9999,
    },
    
    // 정교한 그림자 시스템 - 제시된 이미지의 부드러운 그림자 기반
    shadows: {
      none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      // 부드러운 그림자 - 이미지와 동일한 스타일
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
      },
      // 새로운 elevation 그림자들 - 제시된 이미지 스타일
      elevation1: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1,
      },
      elevation2: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
      },
      elevation3: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
      elevation4: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
      },
    },
    
    // 간격 시스템
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    
    // 애니메이션
    animation: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
  },
}; 