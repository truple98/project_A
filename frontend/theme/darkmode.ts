// 다크모드 테마 - 검정과 흰색 조합 디자인
export const darkTheme = {
  colors: {
    // 배경 색상 계층 - 순검정 기반
    background: '#000000',     // 메인 배경 - 순검정색 (토글 버튼 검정색과 동일)
    surface: '#1c1c1c',        // 카드 배경 - 약간 밝은 어두운 회색
    card: '#2a2a2a',           // 강조 카드 - 더 밝은 어두운 회색
    elevated: '#353535',       // 상승된 요소 - 중간 회색
    
    // 경계선과 구분선
    border: '#404040',         // 기본 경계선 - 더 밝은 회색
    divider: '#4a4a4a',        // 구분선 - 조금 더 밝은 회색
    
    // 텍스트 색상 계층 - 순백 피하기
    text: '#f8f8f8',           // 주요 텍스트 - 부드러운 흰색
    textSecondary: '#b8b8b8',  // 보조 텍스트 - 중간 회색
    textTertiary: '#888888',   // 3차 텍스트 - 어두운 회색
    textDisabled: '#555555',   // 비활성 텍스트 - 더 어두운 회색
    
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
    shadow: 'rgba(0, 0, 0, 0.4)',      // 그림자 - 더 진하게
    overlay: 'rgba(0, 0, 0, 0.7)',     // 오버레이
    backdrop: 'rgba(0, 0, 0, 0.85)',   // 백드롭
    
    // elevation 색상들 - 순검정 기반에서 더 명확한 차이
    elevation1: '#1c1c1c',     // 1단계 elevation - 약간 밝은 어두운 회색
    elevation2: '#2a2a2a',     // 2단계 elevation - 더 밝은 어두운 회색
    elevation3: '#353535',     // 3단계 elevation - 중간 회색
    elevation4: '#404040',     // 4단계 elevation - 더 밝은 회색
    
    // 토글 버튼 색상 - 검정과 흰색 조합
    toggleTrackActive: '#ffffff',    // 활성 상태 트랙 - 흰색
    toggleTrackInactive: '#444444',  // 비활성 상태 트랙 - 어두운 회색
    toggleThumb: '#000000',          // 토글 썸 - 검정색
    toggleThumbShadow: 'rgba(0, 0, 0, 0.3)', // 토글 썸 그림자
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
    
    // 정교한 그림자 시스템 - 제시된 이미지의 어두운 그림자 기반
    shadows: {
      none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      // 부드러운 그림자 - 다크모드용
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
      },
      // 새로운 elevation 그림자들 - 제시된 이미지 스타일
      elevation1: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
      },
      elevation2: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 2,
      },
      elevation3: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      },
      elevation4: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
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