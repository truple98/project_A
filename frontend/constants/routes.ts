// Navigation Routes
export const ROUTES = {
  // Auth Routes
  SPLASH: 'Splash',
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main Routes
  HOME: 'Home',
  GAME_START: 'GameStart',
  STORY: 'Story',
  RESULT: 'Result',
  ENDING: 'Ending',
  
  // Character Routes
  CHARACTER: 'Character',
  HISTORY: 'History',
  RECORD_DETAIL: 'RecordDetail',
  INVENTORY: 'Inventory',
  STATUS: 'Status',
  
  // Settings Routes
  SETTINGS: 'Settings',
  ACCOUNT: 'Account',
  VERSION_INFO: 'VersionInfo',
  HELP: 'Help',
} as const;

// API Routes
export const API_ROUTES = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  
  // Game
  GAME: {
    SESSION: '/game/session',
    START: '/game/start',
    CHOICE: '/game/choice',
    HISTORY: '/game/history',
    CHARACTER: '/game/character',
  },
  
  // Story
  STORY: {
    NODE: '/story/node',
    NODES: '/story/nodes',
    GENERATE: '/story/generate',
  },
  
  // User
  USER: {
    PROFILE: '/user/profile',
    ACCOUNT: '/user/account',
  },
} as const; 