import { ConsequenceType, StoryChoice as GameStoryChoice, StoryNode as GameStoryNode } from './game';

// 스토리 관련 타입들 (게임 타입과 호환되는 간소화된 버전)
export interface StoryChoice extends Omit<GameStoryChoice, 'consequences'> {
  consequence?: {
    type: ConsequenceType;
    value: number;
  };
}

export interface StoryData extends Omit<GameStoryNode, 'choices'> {
  choices: StoryChoice[];
}

// 게임 화면에서 사용하는 간소화된 캐릭터 스탯
export interface StoryCharacterStats {
  daysPassed: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  motivation: number;
  maxMotivation: number;
  stress: number;
  maxStress: number;
}

export interface PlayerInfo {
  name: string;
  daysPassed: number;
  energy: number;
  maxEnergy: number;
  health: number;
  maxHealth: number;
  motivation: number;
  maxMotivation: number;
  stress: number;
  maxStress: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'sub';
  status: 'active' | 'completed' | 'failed';
  progress: number;
  maxProgress: number;
}

export interface NPC {
  id: string;
  name: string;
  relationship: number;
  maxRelationship: number;
  lastMet: string;
  description: string;
}

export interface DialogueRecord {
  id: string;
  timestamp: string;
  npcName: string;
  content: string;
  playerChoice: string;
  consequence: string;
}

// 푸터 탭 관련 타입들
export type FooterTabType = 'inventory' | 'proficiency' | 'companions' | 'status';

// 상태 관련 타입들
export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  type: 'buff' | 'debuff' | 'neutral';
  category: 'enhancement' | 'personality' | 'disease' | 'temporary';
  icon: string;
  duration?: number; // 지속 시간 (초, undefined면 영구)
  remainingTime?: number; // 남은 시간
  intensity: number; // 강도 (1-5)
  effects: {
    stat?: string; // 영향받는 스탯
    value?: number; // 효과 값
    description: string; // 효과 설명
  }[];
}

// 게임 화면에서 사용하는 간소화된 아이템 타입
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// 게임 화면에서 사용하는 간소화된 스킬 타입
export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
  type: 'combat' | 'magic' | 'social' | 'crafting' | 'exploration';
}

// 게임 화면에서 사용하는 간소화된 동료 타입
export interface Companion {
  id: string;
  name: string;
  description: string;
  relationship: number;
  maxRelationship: number;
  status: 'active' | 'inactive' | 'unlocked';
  skills: string[];
} 