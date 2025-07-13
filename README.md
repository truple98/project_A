# 🎮 TRPG Game Project

**텍스트 기반 RPG 게임 with LLM 지원 시스템**

> LLM을 활용한 동적 스토리 생성과 사용자 선택에 따른 분기 스토리를 제공하는 크로스플랫폼 RPG 게임

## 📝 프로젝트 설명

이 프로젝트는 LLM(대규모 언어 모델)을 활용하여 매번 다른 경험을 제공하는 텍스트 기반 RPG 게임입니다. 사용자의 선택에 따라 스토리가 분기되며, LLM이 실시간으로 게임 내 리액션, 묘사, NPC 대사를 생성합니다.

### 🎯 주요 특징
- **LLM 통합**: 실시간 스토리 및 NPC 대화 생성
- **크로스플랫폼**: React Native (모바일) → React (웹) → Electron (PC)
- **동적 스토리**: 사용자 선택에 따른 분기 스토리
- **캐릭터 성향**: 플레이어 성향에 따른 맞춤형 게임 경험

## 📦 기술 스택

### Frontend
- **React Native** + **Expo** - 크로스플랫폼 모바일 앱
- **TypeScript** - 타입 안전성
- **Redux Toolkit** - 상태 관리
- **React Navigation** - 네비게이션
- **React Native Paper** - UI 컴포넌트

### Backend
- **Node.js** + **Express** - API 서버
- **TypeScript** - 타입 안전성
- **PostgreSQL** - 데이터베이스
- **Prisma** - ORM
- **JWT** - 인증

### AI/LLM
- **Mistral 7B** / **OpenChat 3.5** - 로컬 LLM 모델
- **Ollama** - LLM 실행 환경

## 📂 폴더 구조

```
ProjectA/
├── frontend/                 # React Native 앱
│   ├── screens/             # 화면 컴포넌트 (18개)
│   ├── components/          # 재사용 컴포넌트
│   ├── navigation/          # 네비게이션 설정
│   ├── store/              # Redux 상태 관리
│   ├── services/           # API 서비스
│   └── types/              # TypeScript 타입 정의
├── backend/                 # Node.js API 서버
│   ├── src/
│   │   ├── controllers/    # API 컨트롤러
│   │   ├── routes/         # API 라우트
│   │   ├── middleware/     # 미들웨어
│   │   ├── services/       # 비즈니스 로직
│   │   └── prisma/         # 데이터베이스 스키마
│   └── prisma/             # Prisma 설정
└── docs/                   # 프로젝트 문서
```

## 🚀 설치 방법

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/trpg-game-project.git
cd trpg-game-project
```

### 2. 백엔드 설정
```bash
cd backend
npm install
cp .env.example .env
# .env 파일 편집 (데이터베이스 연결 정보)
npm run db:generate
npm run db:migrate
npm run dev
```

### 3. 프론트엔드 설정
```bash
cd frontend
npm install
cp .env.example .env
# .env 파일 편집 (API 서버 주소)
npm start
```

## 🔧 사용법

### 앱 실행
1. **Expo Go** 앱 설치 (모바일)
2. 프론트엔드에서 `npm start` 실행
3. QR 코드 스캔하여 앱 실행

### 주요 화면 흐름
```
Splash → Login → Home → GameStart → Story
```

### 게임 플레이
1. **캐릭터 생성**: 이름, 클래스, 난이도 선택
2. **스토리 진행**: 선택지에 따라 스토리 분기
3. **캐릭터 관리**: 레벨업, 아이템 관리, 진행 상황 확인

## ✅ 구현된 기능

### ✅ 완료된 기능
- [x] **프로젝트 구조 설정** - 프론트엔드/백엔드 기본 구조
- [x] **의존성 설치** - 모든 패키지 설치 및 버전 호환성 해결
- [x] **네비게이션 구조** - React Navigation 기반 화면 전환
- [x] **기본 화면 구현** - 18개 화면 UI 컴포넌트
- [x] **화면 흐름** - Splash → Login → Home → GameStart → Story
- [x] **Redux 설정** - 상태 관리 구조
- [x] **TypeScript 타입** - 타입 정의 및 인터페이스
- [x] **Prisma 스키마** - 데이터베이스 모델 설계

### 🔄 진행 중인 기능
- [ ] **API 서버 구현** - 백엔드 컨트롤러 및 서비스 로직
- [ ] **인증 시스템** - JWT 기반 로그인/회원가입
- [ ] **게임 로직** - 스토리 진행 및 선택지 처리

### 📌 TODO (예정)

#### Phase 1: 기본 기능
- [ ] **데이터베이스 연동** - PostgreSQL 연결 및 테이블 생성
- [ ] **API 엔드포인트** - RESTful API 구현
- [ ] **인증 시스템** - 로그인/회원가입 완성
- [ ] **게임 상태 관리** - Redux와 API 연동

#### Phase 2: 게임 기능
- [ ] **스토리 시스템** - 정적 스토리 데이터 구현
- [ ] **선택지 처리** - 사용자 선택에 따른 분기
- [ ] **캐릭터 시스템** - 레벨업, 스탯 관리
- [ ] **인벤토리** - 아이템 관리 시스템

#### Phase 3: LLM 통합
- [ ] **LLM 설정** - Ollama 환경 구성
- [ ] **스토리 생성** - LLM 기반 동적 스토리 생성
- [ ] **NPC 대화** - AI 기반 NPC 응답 시스템
- [ ] **캐싱 시스템** - LLM 응답 캐싱

#### Phase 4: 고급 기능
- [ ] **멀티플레이어** - 실시간 협동 플레이
- [ ] **커스텀 스토리** - 사용자 생성 콘텐츠
- [ ] **소셜 기능** - 친구 시스템, 리더보드
- [ ] **웹/PC 버전** - React/Electron 포팅

## 📊 현재 진행 상황

### 🎯 마일스톤 달성도
- **프로젝트 설정**: 100% ✅
- **UI/UX 구현**: 100% ✅
- **네비게이션**: 100% ✅
- **데이터베이스 설계**: 80% 🔄
- **API 구현**: 20% 📌
- **게임 로직**: 10% 📌
- **LLM 통합**: 0% 📌

### 📈 다음 목표
1. **백엔드 API 완성** - 인증 및 게임 로직 구현
2. **데이터베이스 연동** - 실제 데이터 저장/조회
3. **게임 플레이 테스트** - 기본 스토리 진행 확인

## 👥 기여 방법

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 개발 가이드라인
- TypeScript 사용 필수
- ESLint 규칙 준수
- 커밋 메시지 컨벤션 준수
- 테스트 코드 작성 권장

## 📄 라이선스

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다.

---

**버전**: v0.1.0  
**최종 업데이트**: 2024년 12월  
**개발 상태**: 🟡 개발 중 (UI 완성, 기능 구현 진행 중) 