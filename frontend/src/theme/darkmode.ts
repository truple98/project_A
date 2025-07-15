// 다크모드 테마 - 검정과 흰색 조합 디자인
export const darkTheme = {
  colors: {
    // 배경 색상 계층 - 이미지 기반의 어둡고 불투명한 스타일
    background: '#1C1C1F',     // 메인 배경 - 매우 어두운 회색 (이미지의 전반적인 배경색)
    surface: '#2C2C30',        // 카드 배경 - 배경보다 살짝 밝은 어두운 회색 (이미지의 카드 배경)
    card: '#2C2C30',           // 강조 카드 - surface와 동일하게 어둡고 불투명하게
    elevated: '#3A3A3F',       // 상승된 요소 - 좀 더 밝은 어두운 회색 (깊이감 표현)

    // 경계선과 구분선 - 매우 미세하게 보이도록
    border: '#3F3F45',         // 기본 경계선 - 아주 미세한 어두운 회색 선
    divider: '#35353A',        // 구분선 - border보다 약간 더 어둡고 얇게 (이미지의 구분선)

    // 텍스트 색상 계층 - 가독성을 최우선으로
    text: '#FFFFFF',           // 주요 텍스트 - 흰색 (이미지 'Paris', '47°')
    textSecondary: '#E0E0E0',  // 보조 텍스트 - 밝은 회색 (이미지 'Heavy Rain', 'H:62° L:41°')
    textTertiary: '#A0A0A0',   // 3차 텍스트 - 중간 회색 (데이터의 보조 정보)
    textDisabled: '#606060',   // 비활성 텍스트 - 어두운 회색 (유지)

    // 기능별 색상 - 이미지의 온도가 표시된 바와 유사한 톤 (강렬한 포인트 컬러 지양)
    primary: '#4A90E2',        // 주요 액션/강조 - 파란색 (이미지 온도 바의 밝은 파란색)
    secondary: '#62B9CC',      // 보조 액션 - 청록색 (이미지 온도 바의 파란-초록 경계)
    accent: '#4A90E2',         // 강조 - primary와 동일하게 (통일성)

    // 상태 색상 - 기존 유지 (구분이 명확해야 함)
    success: '#5cb85c',        // 성공 - 덜 선명한 초록
    warning: '#f0ad4e',        // 경고 - 덜 선명한 오렌지
    error: '#d9534f',          // 에러 - 덜 선명한 빨강
    info: '#5bc0de',           // 정보 - 덜 선명한 블루

    // 특수 색상 - 더욱 깊고 진한 그림자 및 오버레이
    shadow: 'rgba(0, 0, 0, 0.6)',      // 그림자 - 더 진하게 (깊이감)
    overlay: 'rgba(0, 0, 0, 0.8)',     // 오버레이 - 더욱 불투명하게
    backdrop: 'rgba(0, 0, 0, 0.9)',   // 백드롭 - 거의 검은색으로

    // elevation 색상들 - 반투명 흰색 계열 대신 불투명한 어두운 회색 계열로 조정
    elevation1: '#2C2C30',    // surface와 동일하게 시작
    elevation2: '#303035',
    elevation3: '#36363B',
    elevation4: '#3C3C41',

    // 토글 버튼 색상 - 이미지의 미니멀한 톤에 맞춰 조정
    toggleTrackActive: '#4A90E2',    // 활성 상태 트랙 - primary 색상과 통일
    toggleTrackInactive: '#606060',  // 비활성 상태 트랙 - 어두운 회색
    toggleThumb: '#FFFFFF',          // 토글 썸 - 흰색 (명확한 대비)
    toggleThumbShadow: 'rgba(0, 0, 0, 0.4)', // 토글 썸 그림자
  },

  // 타이포그래피, 디자인 시스템의 shadows, borderRadius, spacing 등은 이미지의 시각적 요소와 직접적인 관련이 적으므로 기존 값을 유지합니다.
  // 다만, '정교한 그림자 시스템' 부분의 shadowColor는 이미지를 고려할 때 '#000000' (검정)이 적합합니다.
  design: {
    // ... (기존 borderRadius, spacing, animation 유지)

    // 정교한 그림자 시스템 - 제시된 이미지의 어두운 그림자 기반
    shadows: {
      none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      // 부드러운 그림자 - 다크모드용 (기존 값 유지, 검정 그림자가 적합)
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
      // 새로운 elevation 그림자들 - 제시된 이미지 스타일 (그림자 색상은 기존 검정 유지)
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

    // ... (기존 spacing, animation 유지)
  },
};