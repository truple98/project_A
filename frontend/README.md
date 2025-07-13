# TRPG Game Frontend

텍스트 기반 RPG 게임의 모바일 앱입니다. React Native, Expo, TypeScript를 기반으로 구축되었습니다.

## 🚀 기술 스택

- **Framework**: React Native
- **Language**: TypeScript
- **Build Tool**: Expo
- **UI Library**: React Native Paper
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit
- **Server State**: React Query
- **HTTP Client**: Axios

## 📁 프로젝트 구조

```
frontend/
├── assets/           # 이미지, 폰트 등 정적 자원
├── components/       # 재사용 가능한 UI 컴포넌트
├── features/         # 기능 단위 상태 및 UI
├── navigation/       # 화면 이동 구조 정의
├── screens/          # 페이지별 UI 화면 컴포넌트
├── store/            # Redux store, slice 통합
├── hooks/            # 커스텀 훅
├── constants/        # 상수값, config
├── services/         # API 호출 로직
├── utils/            # 유틸리티 함수 모음
├── types/            # 공통 타입 정의
├── App.tsx           # 앱 진입점
└── index.ts          # 루트 등록
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp env.example .env
```

`.env` 파일을 편집하여 필요한 설정값을 입력하세요:

```env
# API Configuration
API_BASE_URL=http://localhost:3000/api

# App Configuration
APP_NAME=TRPG Game
APP_VERSION=1.0.0

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_CRASH_REPORTING=false

# Development
DEBUG_MODE=true
```

### 3. 개발 서버 실행

```bash
# Expo 개발 서버 시작
npm start

# Android 에뮬레이터에서 실행
npm run android

# iOS 시뮬레이터에서 실행
npm run ios

# 웹에서 실행
npm run web
```

## 📱 화면 구성

### 인증 화면
- **SplashScreen**: 앱 로딩 중 상태 확인
- **WelcomeScreen**: 앱 첫 실행 시 인트로
- **LoginScreen**: 로그인 입력 폼
- **RegisterScreen**: 회원가입

### 메인 게임 화면
- **HomeScreen**: 로그인 후 진입, 주요 메뉴 목록
- **GameStartScreen**: 새 게임 시작 / 이어하기
- **StoryScreen**: 나레이션 + 선택지 (텍스트 기반 플레이)
- **ResultScreen**: 선택 결과 요약
- **EndingScreen**: 엔딩 장면 표시 및 결과 요약

### 캐릭터/진행 화면
- **CharacterScreen**: 직업/성격/성향/레벨 등 캐릭터 요약
- **HistoryScreen**: 이전 플레이 내역 보기
- **RecordDetailScreen**: 과거 선택지, 이야기 경로 등 상세
- **InventoryScreen**: 보유 아이템 목록
- **StatusScreen**: 성향, 능력치, 점수 등 요약

### 설정/정보 화면
- **SettingsScreen**: 언어, 테마, 진동 등 설정
- **AccountScreen**: 로그아웃, 계정 삭제, 정보 수정
- **VersionInfoScreen**: 앱 버전, 업데이트 내용 등
- **HelpScreen**: 조작법, 규칙 설명, FAQ

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm start

# Android 빌드
npm run build:android

# iOS 빌드
npm run build:ios

# 코드 린팅
npm run lint

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check
```

## 🎨 UI/UX 특징

- **Material Design**: React Native Paper 기반 일관된 디자인
- **다크/라이트 테마**: 사용자 선호도에 따른 테마 전환
- **반응형 디자인**: 다양한 화면 크기에 대응
- **접근성**: 스크린 리더 지원 및 키보드 네비게이션

## 📊 상태 관리

### Redux Toolkit
- **Auth Slice**: 사용자 인증 상태 관리
- **Game Slice**: 게임 세션 및 진행 상태 관리

### React Query
- **서버 상태 캐싱**: API 응답 데이터 캐싱
- **자동 재시도**: 네트워크 오류 시 자동 재시도
- **백그라운드 업데이트**: 앱 포그라운드 시 데이터 갱신

## 🔗 API 통신

### Axios 기반 HTTP 클라이언트
- **인터셉터**: 요청/응답 자동 처리
- **토큰 관리**: JWT 토큰 자동 첨부
- **에러 핸들링**: 통합된 에러 처리

### API 서비스
- **authAPI**: 인증 관련 API
- **gameAPI**: 게임 관련 API
- **storyAPI**: 스토리 관련 API
- **userAPI**: 사용자 관련 API

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 📦 배포

### Expo EAS Build
```bash
# Android APK 빌드
eas build --platform android

# iOS IPA 빌드
eas build --platform ios
```

### 스토어 배포
- **Google Play Store**: Android APK 업로드
- **App Store**: iOS IPA 업로드

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 