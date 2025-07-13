# 그라데이션 테마 사용법

## 🎨 그라데이션 컴포넌트 사용하기

### 기본 사용법

```tsx
import GradientBackground from '../theme/GradientBackground';

// 배경 그라데이션
<GradientBackground gradientType="background" style={styles.container}>
  <Text>내용</Text>
</GradientBackground>

// 카드 그라데이션
<GradientBackground gradientType="card" style={styles.card}>
  <Text>카드 내용</Text>
</GradientBackground>

// 버튼 그라데이션
<GradientBackground gradientType="primary" style={styles.button}>
  <Text>버튼</Text>
</GradientBackground>
```

### 사용 가능한 그라데이션 타입

#### 다크모드
- `background`: 깊은 어둠 그라데이션
- `surface`: 돌벽 그라데이션
- `card`: 카드 입체감 그라데이션
- `primary`: 마법의 푸른 빛 그라데이션
- `secondary`: 밝은 마법 빛 그라데이션
- `accent`: 청록 빛 그라데이션
- `magical`: 4색 마법 그라데이션

#### 라이트모드
- `background`: 양피지 그라데이션
- `surface`: 나무 테이블 그라데이션
- `card`: 깨끗한 종이 그라데이션
- `primary`: 나무 손잡이 그라데이션
- `secondary`: 가죽 그라데이션
- `accent`: 숲의 초록 그라데이션
- `natural`: 4색 자연 그라데이션

### 고급 사용법

```tsx
// 방향 설정 (기본: 위에서 아래로)
<GradientBackground 
  gradientType="magical" 
  start={{ x: 0, y: 0 }} 
  end={{ x: 1, y: 1 }}  // 대각선
  style={styles.container}
>
  <Text>대각선 그라데이션</Text>
</GradientBackground>

// 위치 설정
<GradientBackground 
  gradientType="primary" 
  locations={[0, 0.5, 1]}  // 색상 위치 조정
  style={styles.container}
>
  <Text>위치 조정된 그라데이션</Text>
</GradientBackground>
```

### 💡 사용 팁

1. **성능**: 그라데이션은 렌더링 비용이 높으므로 필요한 곳에만 사용하세요
2. **가독성**: 텍스트가 있는 곳에는 대비가 충분한 그라데이션을 선택하세요
3. **일관성**: 같은 화면에서는 비슷한 그라데이션 타입을 사용하세요
4. **테마**: 다크/라이트 모드에 따라 자동으로 적절한 그라데이션이 적용됩니다

### 🎮 게임 컨셉에 맞는 활용법

- **StoryScreen**: `background`로 신비로운 분위기 연출
- **카드**: `card`로 입체감 있는 UI 구현
- **버튼**: `primary`로 마법적인 느낌의 인터랙션
- **헤더**: `magical` 또는 `natural`로 특별한 영역 강조 