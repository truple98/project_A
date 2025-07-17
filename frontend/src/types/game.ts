/**
 * 🎲 Game Types - 게임 도메인 타입 정의
 * 
 * TRPG 게임의 모든 게임 관련 타입을 정의합니다.
 * 캐릭터, 인벤토리, 스토리, 게임 세션 등의 게임 핵심 로직을 포함합니다.
 * 
 * @description
 * - 캐릭터 시스템 (스탯, 특성, 레벨링)
 * - 인벤토리 시스템 (아이템, 장비)
 * - 스토리 시스템 (노드, 선택지, 결과)
 * - 게임 세션 관리
 * - 진행도 및 저장 시스템
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. 기본 게임 상수
// ========================================

/**
 * 게임 난이도 타입
 */
export type GameDifficulty = 'easy' | 'normal' | 'hard' | 'nightmare';

/**
 * 캐릭터 클래스 타입
 */
export type CharacterClass = 
  | 'warrior'     // 전사
  | 'mage'        // 마법사
  | 'rogue'       // 도적
  | 'cleric'      // 성직자
  | 'ranger'      // 레인저
  | 'paladin'     // 팔라딘
  | 'barbarian'   // 바바리안
  | 'sorcerer'    // 소서러
  | 'warlock'     // 워록
  | 'bard';       // 바드

/**
 * 아이템 타입 열거형
 */
export enum ItemType {
  WEAPON = 'WEAPON',           // 무기
  ARMOR = 'ARMOR',             // 방어구
  ACCESSORY = 'ACCESSORY',     // 액세서리
  CONSUMABLE = 'CONSUMABLE',   // 소모품
  QUEST = 'QUEST',             // 퀘스트 아이템
  MISC = 'MISC',               // 기타
  MATERIAL = 'MATERIAL',       // 재료
  BOOK = 'BOOK',               // 서적
  KEY = 'KEY'                  // 열쇠
}

/**
 * 아이템 희귀도
 */
export type ItemRarity = 
  | 'common'      // 일반
  | 'uncommon'    // 고급
  | 'rare'        // 희귀
  | 'epic'        // 서사
  | 'legendary'   // 전설
  | 'mythic';     // 신화

/**
 * 스탯 타입
 */
export type StatType = 
  | 'strength'     // 힘
  | 'dexterity'    // 민첩
  | 'constitution' // 체력
  | 'intelligence' // 지능
  | 'wisdom'       // 지혜
  | 'charisma';    // 매력

// ========================================
// 2. 캐릭터 시스템
// ========================================

/**
 * 캐릭터 기본 스탯
 */
export interface CharacterStats {
  /** 현재 체력 */
  health: number;
  
  /** 최대 체력 */
  maxHealth: number;
  
  /** 현재 마나 */
  mana: number;
  
  /** 최대 마나 */
  maxMana: number;
  
  /** 현재 경험치 */
  experience: number;
  
  /** 레벨 */
  level: number;
  
  /** 다음 레벨까지 필요한 경험치 */
  experienceToNext: number;
  
  /** 기본 능력치 */
  attributes: Record<StatType, number>;
  
  /** 방어력 */
  defense: number;
  
  /** 공격력 */
  attack: number;
  
  /** 마법 공격력 */
  magicPower: number;
  
  /** 크리티컬 확률 (%) */
  criticalRate: number;
  
  /** 회피율 (%) */
  dodgeRate: number;
  
  /** 이동 속도 */
  speed: number;
}

/**
 * 캐릭터 특성
 */
export interface CharacterTrait {
  /** 특성 고유 ID */
  id: string;
  
  /** 특성 이름 */
  name: string;
  
  /** 특성 설명 */
  description: string;
  
  /** 특성 아이콘 */
  icon?: string;
  
  /** 특성 레벨 */
  level: number;
  
  /** 최대 레벨 */
  maxLevel: number;
  
  /** 특성 효과 */
  effects: TraitEffect[];
  
  /** 습득 조건 */
  requirements?: TraitRequirement[];
  
  /** 특성 카테고리 */
  category: 'combat' | 'social' | 'utility' | 'passive' | 'special';
  
  /** 활성화 여부 */
  isActive: boolean;
  
  /** 쿨다운 (초) */
  cooldown?: number;
  
  /** 마나 소모량 */
  manaCost?: number;
}

/**
 * 특성 효과
 */
export interface TraitEffect {
  /** 효과 타입 */
  type: 'stat_bonus' | 'skill_bonus' | 'resistance' | 'special';
  
  /** 대상 스탯/스킬 */
  target: string;
  
  /** 효과 값 */
  value: number;
  
  /** 효과 타입 (가산/곱산/설정) */
  operation: 'add' | 'multiply' | 'set';
  
  /** 효과 설명 */
  description: string;
}

/**
 * 특성 습득 조건
 */
export interface TraitRequirement {
  /** 조건 타입 */
  type: 'level' | 'stat' | 'trait' | 'item' | 'quest' | 'choice_history';
  
  /** 대상 */
  target: string;
  
  /** 필요 값 */
  value: number | string;
  
  /** 조건 설명 */
  description: string;
}

/**
 * 완전한 캐릭터 정보
 */
export interface Character {
  /** 캐릭터 고유 ID */
  id: string;
  
  /** 사용자 ID */
  userId: string;
  
  /** 캐릭터 이름 */
  name: string;
  
  /** 캐릭터 클래스 */
  class: CharacterClass;
  
  /** 캐릭터 스탯 */
  stats: CharacterStats;
  
  /** 캐릭터 특성 목록 */
  traits: CharacterTrait[];
  
  /** 캐릭터 외형 설정 */
  appearance: {
    avatar?: string;
    portrait?: string;
    description?: string;
  };
  
  /** 생성 일시 */
  createdAt: string;
  
  /** 최종 업데이트 일시 */
  updatedAt: string;
  
  /** 마지막 플레이 일시 */
  lastPlayedAt?: string;
  
  /** 총 플레이 시간 (분) */
  totalPlayTime: number;
}

// ========================================
// 3. 인벤토리 시스템
// ========================================

/**
 * 아이템 정보
 */
export interface GameItem {
  /** 아이템 고유 ID */
  id: string;
  
  /** 아이템 이름 */
  name: string;
  
  /** 아이템 타입 */
  type: ItemType;
  
  /** 아이템 희귀도 */
  rarity: ItemRarity;
  
  /** 아이템 설명 */
  description: string;
  
  /** 아이템 아이콘 */
  icon?: string;
  
  /** 아이템 이미지 */
  image?: string;
  
  /** 판매 가격 */
  sellPrice: number;
  
  /** 구매 가격 */
  buyPrice: number;
  
  /** 최대 스택 개수 */
  maxStack: number;
  
  /** 사용 가능 여부 */
  usable: boolean;
  
  /** 장착 가능 여부 */
  equippable: boolean;
  
  /** 장착 슬롯 */
  equipSlot?: 'weapon' | 'armor' | 'accessory';
  
  /** 아이템 효과 */
  effects?: ItemEffect[];
  
  /** 사용 조건 */
  requirements?: ItemRequirement[];
  
  /** 퀘스트 아이템 여부 */
  isQuestItem: boolean;
  
  /** 거래 가능 여부 */
  tradeable: boolean;
}

/**
 * 아이템 효과
 */
export interface ItemEffect {
  /** 효과 타입 */
  type: 'heal' | 'restore_mana' | 'buff' | 'debuff' | 'stat_bonus' | 'special';
  
  /** 대상 */
  target: string;
  
  /** 효과 값 */
  value: number;
  
  /** 지속 시간 (초, 0이면 즉시 효과) */
  duration: number;
  
  /** 효과 설명 */
  description: string;
}

/**
 * 아이템 사용 조건
 */
export interface ItemRequirement {
  /** 조건 타입 */
  type: 'level' | 'class' | 'stat' | 'trait';
  
  /** 대상 */
  target: string;
  
  /** 필요 값 */
  value: number | string;
  
  /** 조건 설명 */
  description: string;
}

/**
 * 인벤토리 아이템
 */
export interface InventoryItem {
  /** 아이템 정보 */
  item: GameItem;
  
  /** 보유 개수 */
  quantity: number;
  
  /** 장착 여부 */
  equipped: boolean;
  
  /** 획득 일시 */
  acquiredAt: string;
  
  /** 인벤토리 슬롯 번호 */
  slotIndex?: number;
}

/**
 * 인벤토리 정보
 */
export interface Inventory {
  /** 캐릭터 ID */
  characterId: string;
  
  /** 인벤토리 아이템 목록 */
  items: InventoryItem[];
  
  /** 최대 슬롯 수 */
  maxSlots: number;
  
  /** 소지금 */
  gold: number;
  
  /** 최종 업데이트 일시 */
  updatedAt: string;
}

// ========================================
// 4. 스토리 시스템
// ========================================

/**
 * 선택지 결과 타입
 */
export type ConsequenceType = 
  | 'health'      // 체력 변화
  | 'mana'        // 마나 변화
  | 'experience'  // 경험치 변화
  | 'gold'        // 골드 변화
  | 'trait'       // 특성 습득/제거
  | 'item'        // 아이템 획득/제거
  | 'stat'        // 스탯 변화
  | 'reputation'  // 평판 변화
  | 'story_flag'  // 스토리 플래그 설정
  | 'unlock'      // 컨텐츠 잠금 해제
  | 'special';    // 특수 효과

/**
 * 노드 진입 조건 타입
 */
export type RequirementType = 
  | 'level'       // 레벨 조건
  | 'trait'       // 특성 조건
  | 'item'        // 아이템 보유 조건
  | 'stat'        // 스탯 조건
  | 'gold'        // 골드 조건
  | 'story_flag'  // 스토리 플래그 조건
  | 'choice_history' // 이전 선택 기록 조건
  | 'class';      // 클래스 조건

/**
 * 선택지 결과
 */
export interface ChoiceConsequence {
  /** 결과 타입 */
  type: ConsequenceType;
  
  /** 대상 (스탯명, 아이템ID, 특성ID 등) */
  target: string;
  
  /** 변화값 */
  value: number;
  
  /** 결과 설명 */
  description: string;
  
  /** 즉시 적용 여부 */
  immediate: boolean;
  
  /** 숨겨진 결과 여부 */
  hidden: boolean;
}

/**
 * 스토리 선택지
 */
export interface StoryChoice {
  /** 선택지 고유 ID */
  id: string;
  
  /** 선택지 텍스트 */
  text: string;
  
  /** 다음 노드 ID */
  nextNodeId: string;
  
  /** 선택지 결과 */
  consequences: ChoiceConsequence[];
  
  /** 선택 조건 */
  requirements?: NodeRequirement[];
  
  /** 선택지 활성화 여부 */
  enabled: boolean;
  
  /** 선택지 표시 조건 */
  visible: boolean;
  
  /** 선택지 아이콘 */
  icon?: string;
  
  /** 선택지 색상 (위험도 표시 등) */
  color?: 'default' | 'success' | 'warning' | 'danger';
  
  /** 선택 확률 (랜덤 이벤트용) */
  probability?: number;
}

/**
 * 노드 진입 조건
 */
export interface NodeRequirement {
  /** 조건 타입 */
  type: RequirementType;
  
  /** 대상 */
  target: string;
  
  /** 필요 값 */
  value: number | string;
  
  /** 비교 연산자 */
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'includes';
  
  /** 조건 설명 */
  description: string;
  
  /** 조건 실패 시 메시지 */
  failMessage?: string;
}

/**
 * 스토리 노드
 */
export interface StoryNode {
  /** 노드 고유 ID */
  id: string;
  
  /** 노드 제목 */
  title: string;
  
  /** 노드 내용 */
  content: string;
  
  /** 선택지 목록 */
  choices: StoryChoice[];
  
  /** 노드 진입 조건 */
  requirements?: NodeRequirement[];
  
  /** 노드 타입 */
  type: 'story' | 'combat' | 'puzzle' | 'ending' | 'shop' | 'rest';
  
  /** 배경 이미지 */
  backgroundImage?: string;
  
  /** 배경 음악 */
  backgroundMusic?: string;
  
  /** 효과음 */
  soundEffects?: string[];
  
  /** 노드 진입 시 자동 이벤트 */
  autoEvents?: ChoiceConsequence[];
  
  /** 노드 방문 여부 추적 */
  visited: boolean;
  
  /** 노드 태그 (카테고리, 검색용) */
  tags?: string[];
  
  /** 노드 난이도 */
  difficulty?: GameDifficulty;
}

// ========================================
// 5. 게임 세션 시스템
// ========================================

/**
 * 게임 상태
 */
export interface GameState {
  /** 현재 캐릭터 정보 */
  character: Character;
  
  /** 인벤토리 정보 */
  inventory: Inventory;
  
  /** 현재 스토리 노드 ID */
  currentNodeId: string;
  
  /** 방문한 노드 목록 */
  visitedNodes: string[];
  
  /** 선택 기록 */
  choiceHistory: ChoiceRecord[];
  
  /** 스토리 플래그 */
  storyFlags: Record<string, any>;
  
  /** 게임 설정 */
  settings: GameSettings;
  
  /** 게임 통계 */
  statistics: GameStatistics;
  
  /** 업적 목록 */
  achievements: Achievement[];
  
  /** 저장 일시 */
  savedAt: string;
}

/**
 * 선택 기록
 */
export interface ChoiceRecord {
  /** 노드 ID */
  nodeId: string;
  
  /** 선택지 ID */
  choiceId: string;
  
  /** 선택한 텍스트 */
  choiceText: string;
  
  /** 선택 일시 */
  timestamp: string;
  
  /** 결과 요약 */
  consequences: ChoiceConsequence[];
}

/**
 * 게임 설정
 */
export interface GameSettings {
  /** 자동 저장 활성화 */
  autoSave: boolean;
  
  /** 자동 저장 간격 (분) */
  autoSaveInterval: number;
  
  /** 애니메이션 속도 */
  animationSpeed: 'slow' | 'normal' | 'fast';
  
  /** 텍스트 표시 속도 */
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  
  /** 음성 효과 볼륨 */
  sfxVolume: number;
  
  /** 배경음 볼륨 */
  bgmVolume: number;
  
  /** 음성 음소거 */
  muteSfx: boolean;
  
  /** 배경음 음소거 */
  muteBgm: boolean;
  
  /** 확인 다이얼로그 표시 */
  showConfirmDialogs: boolean;
  
  /** 스포일러 방지 */
  spoilerProtection: boolean;
}

/**
 * 게임 통계
 */
export interface GameStatistics {
  /** 총 플레이 시간 (분) */
  totalPlayTime: number;
  
  /** 방문한 노드 수 */
  nodesVisited: number;
  
  /** 내린 선택 수 */
  choicesMade: number;
  
  /** 획득한 아이템 수 */
  itemsGained: number;
  
  /** 잃은 아이템 수 */
  itemsLost: number;
  
  /** 획득한 경험치 */
  experienceGained: number;
  
  /** 최대 레벨 */
  maxLevel: number;
  
  /** 획득한 골드 */
  goldGained: number;
  
  /** 소모한 골드 */
  goldSpent: number;
  
  /** 완료한 엔딩 수 */
  endingsReached: number;
  
  /** 사망 횟수 */
  deathCount: number;
  
  /** 시작 일시 */
  startedAt: string;
  
  /** 완료 일시 (게임 완료 시) */
  completedAt?: string;
}

/**
 * 업적
 */
export interface Achievement {
  /** 업적 고유 ID */
  id: string;
  
  /** 업적 이름 */
  name: string;
  
  /** 업적 설명 */
  description: string;
  
  /** 업적 아이콘 */
  icon?: string;
  
  /** 업적 달성 조건 */
  conditions: AchievementCondition[];
  
  /** 달성 여부 */
  unlocked: boolean;
  
  /** 달성 일시 */
  unlockedAt?: string;
  
  /** 업적 포인트 */
  points: number;
  
  /** 숨겨진 업적 여부 */
  hidden: boolean;
  
  /** 업적 카테고리 */
  category: 'story' | 'combat' | 'exploration' | 'collection' | 'special';
}

/**
 * 업적 달성 조건
 */
export interface AchievementCondition {
  /** 조건 타입 */
  type: 'stat' | 'count' | 'flag' | 'choice' | 'time' | 'sequence';
  
  /** 대상 */
  target: string;
  
  /** 필요 값 */
  value: number | string;
  
  /** 비교 연산자 */
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';
  
  /** 조건 설명 */
  description: string;
}

/**
 * 게임 세션
 */
export interface GameSession {
  /** 세션 고유 ID */
  id: string;
  
  /** 사용자 ID */
  userId: string;
  
  /** 캐릭터 ID */
  characterId: string;
  
  /** 세션 이름 */
  name: string;
  
  /** 게임 상태 */
  gameState: GameState;
  
  /** 게임 난이도 */
  difficulty: GameDifficulty;
  
  /** 세션 상태 */
  status: 'in_progress' | 'completed' | 'paused' | 'abandoned';
  
  /** 완료 타입 (완료된 경우) */
  completionType?: 'ending_reached' | 'death' | 'quit';
  
  /** 최종 점수 */
  finalScore?: number;
  
  /** 세션 생성 일시 */
  createdAt: string;
  
  /** 최종 업데이트 일시 */
  updatedAt: string;
  
  /** 마지막 플레이 일시 */
  lastPlayedAt: string;
  
  /** 완료 일시 */
  completedAt?: string;
}

// ========================================
// 6. 저장/로드 시스템
// ========================================

/**
 * 저장 슬롯 정보
 */
export interface SaveSlot {
  /** 슬롯 번호 */
  slotNumber: number;
  
  /** 저장 이름 */
  name: string;
  
  /** 게임 세션 정보 */
  session: GameSession;
  
  /** 스크린샷 (Base64) */
  screenshot?: string;
  
  /** 저장 일시 */
  savedAt: string;
  
  /** 플레이 시간 (분) */
  playTime: number;
  
  /** 현재 위치 설명 */
  locationDescription: string;
  
  /** 자동 저장 여부 */
  isAutoSave: boolean;
}

/**
 * 저장 데이터 메타정보
 */
export interface SaveMetadata {
  /** 저장 버전 */
  version: string;
  
  /** 게임 빌드 버전 */
  buildVersion: string;
  
  /** 플랫폼 정보 */
  platform: string;
  
  /** 저장 타입 */
  saveType: 'manual' | 'auto' | 'checkpoint';
  
  /** 압축 여부 */
  compressed: boolean;
  
  /** 체크섬 */
  checksum: string;
  
  /** 저장 크기 (바이트) */
  size: number;
} 