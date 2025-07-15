// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

// Game related types
export interface GameSession {
  id: string;
  userId: string;
  characterId: string;
  currentNodeId: string;
  gameState: GameState;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameState {
  health: number;
  mana: number;
  experience: number;
  level: number;
  inventory: InventoryItem[];
  traits: CharacterTrait[];
}

export interface CharacterTrait {
  id: string;
  name: string;
  value: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  quantity: number;
  description: string;
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  CONSUMABLE = 'CONSUMABLE',
  QUEST = 'QUEST',
  MISC = 'MISC'
}

// Story related types
export interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices: StoryChoice[];
  requirements?: NodeRequirement[];
}

export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
  consequences?: ChoiceConsequence[];
}

export interface ChoiceConsequence {
  type: ConsequenceType;
  value: number;
  description: string;
}

export enum ConsequenceType {
  HEALTH = 'HEALTH',
  MANA = 'MANA',
  EXPERIENCE = 'EXPERIENCE',
  TRAIT = 'TRAIT',
  ITEM = 'ITEM'
}

export interface NodeRequirement {
  type: RequirementType;
  value: number;
  traitId?: string;
}

export enum RequirementType {
  LEVEL = 'LEVEL',
  TRAIT = 'TRAIT',
  ITEM = 'ITEM'
}

// LLM related types
export interface LLMRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// JWT types
export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
} 