/**
 * 🎮 GameAPI - 게임 관련 API 서비스
 * 
 * TRPG 게임의 모든 게임플레이 관련 API 호출을 담당하는 서비스 모듈입니다.
 * 게임 세션 관리, 스토리 진행, 캐릭터 상태 관리, 인벤토리 관리 등
 * 게임 진행에 필요한 모든 API 기능을 제공합니다.
 * 
 * @description
 * - 게임 세션 생명주기 관리
 * - 스토리 노드 및 선택지 시스템
 * - 캐릭터 상태 및 진행 상황 동기화
 * - 인벤토리 및 아이템 관리
 * - 세이브/로드 시스템
 * - 실시간 게임 상태 업데이트
 * 
 * @author Binary Studio
 * @version 1.0.0
 */

// ========================================
// 1. 프로젝트 내부 - 타입 및 유틸리티
// ========================================
import { ApiResponse, ApiError } from '../types/api';

// ========================================
// 2. 타입 정의
// ========================================

/**
 * 캐릭터 클래스 타입 정의
 */
export type CharacterClass = 'warrior' | 'mage' | 'rogue' | 'archer' | 'paladin' | 'priest';

/**
 * 게임 난이도 타입 정의
 */
export type GameDifficulty = 'easy' | 'normal' | 'hard' | 'nightmare';

/**
 * 게임 상태 타입 정의
 */
export type GameStatus = 'active' | 'paused' | 'completed' | 'failed' | 'abandoned';

/**
 * 아이템 유형 타입 정의
 */
export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'quest' | 'material';

/**
 * 아이템 등급 타입 정의
 */
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';



/**
 * 스토리 선택 요청 인터페이스
 * 
 * @interface StoryChoiceRequest
 */
export interface StoryChoiceRequest {
  /** 게임 세션 ID */
  sessionId: string;
  
  /** 선택한 선택지 ID */
  choiceId: string;
  
  /** 선택 시점 타임스탬프 */
  timestamp: number;
}

/**
 * 캐릭터 능력치 인터페이스
 * 
 * @interface CharacterStats
 */
export interface CharacterStats {
  /** 생명력 */
  health: number;
  
  /** 최대 생명력 */
  maxHealth: number;
  
  /** 마나 */
  mana: number;
  
  /** 최대 마나 */
  maxMana: number;
  
  /** 레벨 */
  level: number;
  
  /** 경험치 */
  experience: number;
  
  /** 다음 레벨까지 필요한 경험치 */
  experienceToNext: number;
  
  /** 기본 능력치 */
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    wisdom: number;
    charisma: number;
  };
  
  /** 추가 스킬 포인트 */
  skillPoints: number;
}

/**
 * 아이템 정보 인터페이스
 * 
 * @interface GameItem
 */
export interface GameItem {
  /** 아이템 고유 ID */
  id: string;
  
  /** 아이템 이름 */
  name: string;
  
  /** 아이템 설명 */
  description: string;
  
  /** 아이템 유형 */
  type: ItemType;
  
  /** 아이템 등급 */
  rarity: ItemRarity;
  
  /** 아이템 수량 */
  quantity: number;
  
  /** 아이템 아이콘 URL */
  iconUrl?: string;
  
  /** 아이템 능력치 효과 */
  effects?: Record<string, number>;
  
  /** 사용 가능 여부 */
  usable: boolean;
  
  /** 장착 가능 여부 */
  equipable: boolean;
  
  /** 현재 장착 상태 */
  equipped: boolean;
}

/**
 * 스토리 노드 인터페이스
 * 
 * @interface StoryNode
 */
export interface StoryNode {
  /** 노드 고유 ID */
  id: string;
  
  /** 스토리 텍스트 */
  text: string;
  
  /** 노드 제목 */
  title?: string;
  
  /** 배경 이미지 URL */
  backgroundImage?: string;
  
  /** 캐릭터 이미지 URL */
  characterImage?: string;
  
  /** 사운드 효과 URL */
  soundEffect?: string;
  
  /** 배경 음악 URL */
  backgroundMusic?: string;
  
  /** 선택지 목록 */
  choices: StoryChoice[];
  
  /** 자동 진행 여부 */
  autoProgress?: boolean;
  
  /** 자동 진행 지연 시간 (ms) */
  autoProgressDelay?: number;
  
  /** 스토리 태그 */
  tags?: string[];
}

/**
 * 스토리 선택지 인터페이스
 * 
 * @interface StoryChoice
 */
export interface StoryChoice {
  /** 선택지 고유 ID */
  id: string;
  
  /** 선택지 텍스트 */
  text: string;
  
  /** 선택지 아이콘 */
  icon?: string;
  
  /** 선택 가능 여부 */
  enabled: boolean;
  
  /** 선택 조건 */
  requirements?: {
    level?: number;
    attributes?: Record<string, number>;
    items?: string[];
    previousChoices?: string[];
  };
  
  /** 선택 결과 효과 */
  consequences?: {
    statsChange?: Record<string, number>;
    itemsGained?: string[];
    itemsLost?: string[];
  };
}

/**
 * 게임 세션 인터페이스
 * 
 * @interface GameSession
 */
export interface GameSession {
  /** 세션 고유 ID */
  sessionId: string;
  
  /** 세션 생성 날짜 */
  createdAt: string;
  
  /** 마지막 업데이트 날짜 */
  updatedAt: string;
  
  /** 게임 상태 */
  status: GameStatus;
  
  /** 게임 진행 시간 (분) */
  playTime: number;
  
  /** 캐릭터 정보 */
  character: {
    name: string;
    class: CharacterClass;
    stats: CharacterStats;
  };
  
  /** 현재 스토리 노드 ID */
  currentStoryNodeId: string;
  
  /** 인벤토리 */
  inventory: GameItem[];
  
  /** 게임 설정 */
  gameSettings: {
    difficulty: GameDifficulty;
    scenarioId?: string;
    autoSave: boolean;
    soundEnabled: boolean;
    musicEnabled: boolean;
  };
  
  /** 게임 진행 통계 */
  gameStats: {
    totalChoicesMade: number;
    totalPlayTime: number;
    checkpointsReached: number;
    achievementsUnlocked: string[];
  };
}

/**
 * 스토리 진행 응답 인터페이스
 * 
 * @interface StoryProgressResponse
 */
export interface StoryProgressResponse {
  /** 새로운 스토리 노드 */
  newStoryNode: StoryNode;
  
  /** 업데이트된 캐릭터 상태 */
  updatedCharacter: CharacterStats;
  
  /** 인벤토리 변경 사항 */
  inventoryChanges?: {
    itemsAdded?: GameItem[];
    itemsRemoved?: string[];
    itemsModified?: GameItem[];
  };
  
  /** 획득한 업적 */
  newAchievements?: string[];
  
  /** 체크포인트 도달 여부 */
  checkpointReached?: boolean;
  
  /** 게임 완료 여부 */
  gameCompleted?: boolean;
}

/**
 * 게임 저장 데이터 인터페이스
 * 
 * @interface GameSaveData
 */
export interface GameSaveData {
  /** 저장 슬롯 ID */
  saveSlotId: string;
  
  /** 저장 데이터 이름 */
  saveName: string;
  
  /** 저장 날짜 */
  savedAt: string;
  
  /** 게임 세션 데이터 */
  sessionData: GameSession;
  
  /** 스크린샷 URL (선택사항) */
  screenshotUrl?: string;
}

// ========================================
// 3. 상수 정의
// ========================================

/**
 * API 엔드포인트 상수
 */
const GAME_ENDPOINTS = {
  LOAD_GAME: '/game/load',
  SAVE_GAME: '/game/save',
  DELETE_SAVE: '/game/save/delete',
  STORY_PROGRESS: '/game/story/progress',
  UPDATE_CHARACTER: '/game/character/update',
  MANAGE_INVENTORY: '/game/inventory',
  USE_ITEM: '/game/inventory/use',
  EQUIP_ITEM: '/game/inventory/equip',
  GET_ACHIEVEMENTS: '/game/achievements',
  GET_LEADERBOARD: '/game/leaderboard',
} as const;

/**
 * 기본 캐릭터 능력치
 */
const DEFAULT_CHARACTER_STATS: Record<CharacterClass, CharacterStats> = {
  warrior: {
    health: 120, maxHealth: 120,
    mana: 30, maxMana: 30,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 15, dexterity: 10, intelligence: 8, constitution: 14, wisdom: 9, charisma: 10 },
    skillPoints: 0,
  },
  mage: {
    health: 80, maxHealth: 80,
    mana: 100, maxMana: 100,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 8, dexterity: 10, intelligence: 16, constitution: 9, wisdom: 14, charisma: 11 },
    skillPoints: 0,
  },
  rogue: {
    health: 90, maxHealth: 90,
    mana: 50, maxMana: 50,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 11, dexterity: 16, intelligence: 12, constitution: 10, wisdom: 13, charisma: 10 },
    skillPoints: 0,
  },
  archer: {
    health: 100, maxHealth: 100,
    mana: 60, maxMana: 60,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 12, dexterity: 15, intelligence: 11, constitution: 12, wisdom: 14, charisma: 9 },
    skillPoints: 0,
  },
  paladin: {
    health: 110, maxHealth: 110,
    mana: 70, maxMana: 70,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 14, dexterity: 9, intelligence: 10, constitution: 13, wisdom: 12, charisma: 15 },
    skillPoints: 0,
  },
  priest: {
    health: 85, maxHealth: 85,
    mana: 90, maxMana: 90,
    level: 1, experience: 0, experienceToNext: 100,
    attributes: { strength: 9, dexterity: 10, intelligence: 13, constitution: 11, wisdom: 16, charisma: 14 },
    skillPoints: 0,
  },
} as const;

/**
 * 시작 스토리 노드
 */
const START_STORY_NODE: StoryNode = {
  id: 'start',
  title: '모험의 시작',
  text: '당신은 신비로운 숲의 입구에 서 있습니다. 앞으로 펼쳐질 모험이 당신을 기다리고 있습니다.',
  choices: [
    {
      id: 'forest_enter',
      text: '숲으로 들어간다',
      enabled: true,
    },
    {
      id: 'village_visit',
      text: '근처 마을을 방문한다',
      enabled: true,
    },
    {
      id: 'camp_setup',
      text: '여기서 야영을 준비한다',
      enabled: true,
    },
  ],
} as const;

/**
 * API 지연 시뮬레이션 시간 (ms)
 */
const MOCK_DELAY = 1000;

// ========================================
// 4. 헬퍼 함수들
// ========================================

/**
 * API 지연 시뮬레이션 함수
 * 
 * @param ms - 지연 시간 (밀리초)
 * @returns Promise<void>
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 고유 ID 생성 함수
 * 
 * @param prefix - ID 접두사
 * @returns 고유 ID 문자열
 */
const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 캐릭터명 유효성 검증 함수
 * 
 * @param name - 검증할 캐릭터명
 * @returns 유효성 검증 결과
 */
const validateCharacterName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 20 && /^[a-zA-Z가-힣0-9\s]+$/.test(name);
};

/**
 * 다음 스토리 노드 생성 함수 (임시)
 * 
 * @param choiceId - 선택된 선택지 ID
 * @returns 다음 스토리 노드
 */
const generateNextStoryNode = (choiceId: string): StoryNode => {
  const storyNodes: Record<string, StoryNode> = {
    forest_enter: {
      id: 'forest_path',
      title: '숲속 길',
      text: '울창한 나무들 사이로 난 길을 따라 걷습니다. 멀리서 이상한 소리가 들려옵니다.',
      choices: [
        { id: 'investigate_sound', text: '소리를 조사한다', enabled: true },
        { id: 'continue_path', text: '길을 계속 간다', enabled: true },
        { id: 'hide_behind_tree', text: '나무 뒤에 숨는다', enabled: true },
      ],
    },
    village_visit: {
      id: 'village_square',
      title: '마을 광장',
      text: '작은 마을의 광장에 도착했습니다. 몇몇 주민들이 당신을 호기심 어린 눈으로 바라봅니다.',
      choices: [
        { id: 'talk_to_elder', text: '마을 어르신과 대화한다', enabled: true },
        { id: 'visit_shop', text: '상점을 방문한다', enabled: true },
        { id: 'check_inn', text: '여관을 확인한다', enabled: true },
      ],
    },
    camp_setup: {
      id: 'camp_night',
      title: '야영지',
      text: '모닥불을 피우고 간단한 야영지를 만들었습니다. 밤이 깊어가고 있습니다.',
      choices: [
        { id: 'sleep_immediately', text: '바로 잠을 잔다', enabled: true },
        { id: 'keep_watch', text: '경계를 서며 밤을 샌다', enabled: true },
        { id: 'explore_nearby', text: '주변을 탐색한다', enabled: true },
      ],
    },
  };

  return storyNodes[choiceId] || START_STORY_NODE;
};

// ========================================
// 5. API 서비스 클래스
// ========================================

/**
 * GameAPI 클래스
 * 
 * @description
 * 게임 관련 모든 API 호출을 관리하는 서비스 클래스입니다.
 * 게임 세션 관리, 스토리 진행, 캐릭터 관리, 인벤토리 관리 등
 * 게임 플레이에 필요한 모든 기능을 제공합니다.
 * 
 * @class GameAPI
 */
class GameAPI {
  /**
   * 현재 게임 세션 ID
   */
  private currentSessionId: string | null = null;

  // ========================================
  // 6. 세션 관리 메서드
  // ========================================

  /**
   * 현재 세션 ID 설정
   * 
   * @param sessionId - 설정할 세션 ID
   */
  public setCurrentSession(sessionId: string): void {
    this.currentSessionId = sessionId;
  }

  /**
   * 현재 세션 ID 조회
   * 
   * @returns 현재 세션 ID 또는 null
   */
  public getCurrentSession(): string | null {
    return this.currentSessionId;
  }

  /**
   * 세션 초기화
   */
  public clearCurrentSession(): void {
    this.currentSessionId = null;
  }

  // ========================================
  // 7. 게임 API 메서드들
  // ========================================




  /**
   * 스토리 진행 (선택지 선택)
   * 
   * @param choiceData - 스토리 선택 데이터
   * @returns Promise<ApiResponse<StoryProgressResponse>>
   * 
   * @throws {ApiError} 스토리 진행 실패 시
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await gameAPI.progressStory({
   *     sessionId: 'session-123',
   *     choiceId: 'forest_enter',
   *     timestamp: Date.now()
   *   });
   *   console.log('다음 스토리:', response.data.newStoryNode.text);
   * } catch (error) {
   *   console.error('스토리 진행 실패:', error.message);
   * }
   * ```
   */
  public async progressStory(choiceData: StoryChoiceRequest): Promise<ApiResponse<StoryProgressResponse>> {
    try {
      // 입력 데이터 검증
      if (!choiceData.sessionId) {
        throw new ApiError('게임 세션 ID가 필요합니다.', 400, 'MISSING_SESSION_ID');
      }

      if (!choiceData.choiceId) {
        throw new ApiError('선택지 ID가 필요합니다.', 400, 'MISSING_CHOICE_ID');
      }

      // TODO: 실제 API 호출로 교체
      await delay(MOCK_DELAY);

      // 다음 스토리 노드 생성
      const newStoryNode = generateNextStoryNode(choiceData.choiceId);
      
      // 기본 캐릭터 상태 (변경 없음)
      const updatedCharacter: CharacterStats = {
        ...DEFAULT_CHARACTER_STATS.warrior, // 임시로 warrior 사용
        experience: DEFAULT_CHARACTER_STATS.warrior.experience + 10, // 경험치 약간 증가
      };

      const progressResponse: StoryProgressResponse = {
        newStoryNode,
        updatedCharacter,
        inventoryChanges: {
          itemsAdded: [], // 임시로 빈 배열
        },
        newAchievements: [],
        checkpointReached: false,
        gameCompleted: false,
      };

      return {
        success: true,
        data: progressResponse,
        message: '스토리가 진행되었습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '스토리 진행 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        500,
        'STORY_PROGRESS_ERROR'
      );
    }
  }

  /**
   * 게임 세션 로드
   * 
   * @param saveSlotId - 저장 슬롯 ID
   * @returns Promise<ApiResponse<GameSession>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await gameAPI.loadGame('save-slot-1');
   *   console.log('게임 로드 완료:', response.data.character.name);
   * } catch (error) {
   *   console.error('게임 로드 실패:', error.message);
   * }
   * ```
   */
  public async loadGame(saveSlotId: string): Promise<ApiResponse<GameSession>> {
    try {
      if (!saveSlotId) {
        throw new ApiError('저장 슬롯 ID가 필요합니다.', 400, 'MISSING_SAVE_SLOT_ID');
      }

      // TODO: 실제 API 호출로 교체
      await delay(MOCK_DELAY);

      // 임시 로드된 게임 세션 데이터
      const gameSession: GameSession = {
        sessionId: generateId('session'),
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1일 전
        updatedAt: new Date().toISOString(),
        status: 'active',
        playTime: 120, // 2시간
        character: {
          name: '저장된캐릭터',
          class: 'warrior',
          stats: {
            ...DEFAULT_CHARACTER_STATS.warrior,
            level: 3,
            experience: 250,
            health: 95,
          },
        },
        currentStoryNodeId: 'forest_path',
        inventory: [],
        gameSettings: {
          difficulty: 'normal',
          autoSave: true,
          soundEnabled: true,
          musicEnabled: true,
        },
        gameStats: {
          totalChoicesMade: 15,
          totalPlayTime: 120,
          checkpointsReached: 3,
          achievementsUnlocked: ['first_choice', 'first_hour'],
        },
      };

      this.setCurrentSession(gameSession.sessionId);

      return {
        success: true,
        data: gameSession,
        message: '게임을 성공적으로 불러왔습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '게임 로드 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        500,
        'LOAD_GAME_ERROR'
      );
    }
  }

  /**
   * 게임 저장
   * 
   * @param sessionId - 저장할 세션 ID
   * @param saveName - 저장 파일명 (선택사항)
   * @returns Promise<ApiResponse<GameSaveData>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await gameAPI.saveGame('session-123', '첫 번째 모험');
   *   console.log('게임 저장 완료:', response.data.saveSlotId);
   * } catch (error) {
   *   console.error('게임 저장 실패:', error.message);
   * }
   * ```
   */
  public async saveGame(sessionId: string, saveName?: string): Promise<ApiResponse<GameSaveData>> {
    try {
      if (!sessionId) {
        throw new ApiError('게임 세션 ID가 필요합니다.', 400, 'MISSING_SESSION_ID');
      }

      // TODO: 실제 API 호출로 교체
      await delay(MOCK_DELAY);

      const saveData: GameSaveData = {
        saveSlotId: generateId('save'),
        saveName: saveName || `저장 ${new Date().toLocaleString()}`,
        savedAt: new Date().toISOString(),
        sessionData: {
          sessionId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active',
          playTime: 60,
          character: {
            name: '현재캐릭터',
            class: 'warrior',
            stats: DEFAULT_CHARACTER_STATS.warrior,
          },
          currentStoryNodeId: 'start',
          inventory: [],
          gameSettings: {
            difficulty: 'normal',
            autoSave: true,
            soundEnabled: true,
            musicEnabled: true,
          },
          gameStats: {
            totalChoicesMade: 5,
            totalPlayTime: 60,
            checkpointsReached: 1,
            achievementsUnlocked: [],
          },
        },
      };

      return {
        success: true,
        data: saveData,
        message: '게임이 성공적으로 저장되었습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '게임 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        500,
        'SAVE_GAME_ERROR'
      );
    }
  }

  /**
   * 아이템 사용
   * 
   * @param sessionId - 게임 세션 ID
   * @param itemId - 사용할 아이템 ID
   * @returns Promise<ApiResponse<{ updatedCharacter: CharacterStats; updatedInventory: GameItem[] }>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await gameAPI.useItem('session-123', 'health-potion');
   *   console.log('아이템 사용 완료, 체력:', response.data.updatedCharacter.health);
   * } catch (error) {
   *   console.error('아이템 사용 실패:', error.message);
   * }
   * ```
   */
  public async useItem(sessionId: string, itemId: string): Promise<ApiResponse<{ updatedCharacter: CharacterStats; updatedInventory: GameItem[] }>> {
    try {
      if (!sessionId || !itemId) {
        throw new ApiError('세션 ID와 아이템 ID가 필요합니다.', 400, 'MISSING_REQUIRED_DATA');
      }

      // TODO: 실제 API 호출로 교체
      await delay(500);

      // 아이템 사용 결과 (임시)
      const updatedCharacter: CharacterStats = {
        ...DEFAULT_CHARACTER_STATS.warrior,
        health: Math.min(DEFAULT_CHARACTER_STATS.warrior.maxHealth, DEFAULT_CHARACTER_STATS.warrior.health + 50),
      };

      const updatedInventory: GameItem[] = []; // 임시로 빈 배열

      return {
        success: true,
        data: { updatedCharacter, updatedInventory },
        message: '아이템을 사용했습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '아이템 사용 중 오류가 발생했습니다.',
        500,
        'USE_ITEM_ERROR'
      );
    }
  }

  /**
   * 현재 스토리 노드 조회
   * 
   * @param storyNodeId - 스토리 노드 ID
   * @returns Promise<ApiResponse<StoryNode>>
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await gameAPI.getCurrentStoryNode('start');
   *   console.log('현재 스토리:', response.data.text);
   * } catch (error) {
   *   console.error('스토리 조회 실패:', error.message);
   * }
   * ```
   */
  public async getCurrentStoryNode(storyNodeId: string): Promise<ApiResponse<StoryNode>> {
    try {
      if (!storyNodeId) {
        throw new ApiError('스토리 노드 ID가 필요합니다.', 400, 'MISSING_STORY_NODE_ID');
      }

      // TODO: 실제 API 호출로 교체
      await delay(300);

      // 스토리 노드 반환 (임시)
      const storyNode = storyNodeId === 'start' ? START_STORY_NODE : generateNextStoryNode(storyNodeId);

      return {
        success: true,
        data: storyNode,
        message: '스토리 노드를 불러왔습니다.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        '스토리 노드 조회 중 오류가 발생했습니다.',
        500,
        'GET_STORY_NODE_ERROR'
      );
    }
  }
}

// ========================================
// 8. 싱글톤 인스턴스 내보내기
// ========================================

/**
 * GameAPI 싱글톤 인스턴스
 * 
 * @description
 * 앱 전체에서 하나의 GameAPI 인스턴스를 사용하여
 * 일관된 게임 상태 관리를 보장합니다.
 * 
 * @example
 * ```typescript
 * import { gameAPI } from '../services/gameAPI';
 * 
 * // 새 게임 시작
 * const session = await gameAPI.startGame({ characterName, characterClass, difficulty });
 * 
 * // 스토리 진행
 * const progress = await gameAPI.progressStory({ sessionId, choiceId, timestamp });
 * ```
 */
export const gameAPI = new GameAPI();

// ========================================
// 9. 기본 내보내기
// ========================================

export default gameAPI; 