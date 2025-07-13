// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
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

// Game types
export interface GameSession {
  id: string;
  userId: string;
  characterId: string;
  currentNodeId: string;
  gameState: GameState;
  createdAt: string;
  updatedAt: string;
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

// Story types
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

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  GameStart: undefined;
  Story: { nodeId: string };
  Result: { choiceId: string; consequences: ChoiceConsequence[] };
  Ending: { sessionId: string };
  Character: undefined;
  History: undefined;
  RecordDetail: { sessionId: string };
  Inventory: undefined;
  Status: undefined;
  Settings: undefined;
  Account: undefined;
  VersionInfo: undefined;
  Help: undefined;
};

// Redux types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface GameState {
  currentSession: GameSession | null;
  currentNode: StoryNode | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  game: GameState;
} 