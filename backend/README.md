# TRPG Game Backend

텍스트 기반 RPG 게임의 백엔드 API 서버입니다. Node.js, Express, TypeScript, PostgreSQL을 기반으로 구축되었습니다.

## 🚀 기술 스택

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── config/          # 설정 파일들
│   ├── constants/       # 상수 정의
│   ├── controllers/     # API 컨트롤러
│   ├── routes/          # 라우터 정의
│   ├── middlewares/     # 미들웨어
│   ├── services/        # 비즈니스 로직
│   ├── utils/           # 유틸리티 함수
│   ├── types/           # TypeScript 타입 정의
│   ├── validations/     # 데이터 검증 스키마
│   ├── app.ts           # Express 앱 설정
│   └── server.ts        # 서버 진입점
├── prisma/              # Prisma 스키마
├── package.json
├── tsconfig.json
└── README.md
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
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/trpg_game_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3001

# LLM Configuration
LLM_API_URL=http://localhost:11434
LLM_MODEL_NAME=mistral
LLM_API_KEY=your-llm-api-key
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 마이그레이션
npm run db:migrate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

## 📚 API 엔드포인트

### 인증 (Authentication)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

### 게임 (Game)
- `GET /api/game/session` - 현재 게임 세션 조회
- `POST /api/game/start` - 새 게임 시작
- `POST /api/game/choice` - 선택지 선택
- `GET /api/game/history` - 게임 히스토리 조회
- `GET /api/game/character` - 캐릭터 정보 조회

### 스토리 (Story)
- `GET /api/story/node/:id` - 스토리 노드 조회
- `GET /api/story/nodes` - 모든 스토리 노드 조회
- `POST /api/story/generate` - LLM을 통한 스토리 생성

### 사용자 (User)
- `GET /api/user/profile` - 사용자 프로필 조회
- `PUT /api/user/profile` - 사용자 프로필 수정
- `DELETE /api/user/account` - 계정 삭제

## 🔧 개발 스크립트

```bash
# 개발 서버 실행 (핫 리로드)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint

# 코드 포맷팅
npm run format

# 테스트 실행
npm test

# Prisma Studio 실행
npm run db:studio
```

## 🗄️ 데이터베이스 모델

### 주요 엔티티
- **User**: 사용자 정보
- **Character**: 캐릭터 정보
- **GameSession**: 게임 세션
- **StoryNode**: 스토리 노드
- **StoryChoice**: 스토리 선택지
- **CharacterTrait**: 캐릭터 특성
- **InventoryItem**: 인벤토리 아이템

## 🔐 보안

- JWT 기반 인증
- Helmet을 통한 보안 헤더 설정
- CORS 설정
- bcrypt를 통한 비밀번호 해싱
- Zod를 통한 입력 데이터 검증

## 📝 로깅

- 개발 환경: Morgan을 통한 HTTP 요청 로깅
- 프로덕션 환경: Winston을 통한 구조화된 로깅

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 