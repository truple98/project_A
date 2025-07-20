import { 
  StoryData, 
  StoryCharacterStats, 
  Quest, 
  Achievement, 
  MetPerson, 
  StoryNode,
  InventoryItem,
  Skill,
  Companion,
  StatusEffect
} from '../types/story';

// 스토리 관련 상수
export const CONSEQUENCE_LABELS = {
  health: '체력',
  mana: '마나',
  experience: '경험치',
  gold: '골드',
  trait: '특성',
  item: '아이템',
  stat: '스탯',
  reputation: '평판',
  story_flag: '스토리 플래그',
  unlock: '잠금 해제',
  special: '특수 효과',
} as const;

export const CONSEQUENCE_ICONS = {
  health: 'heart',
  mana: 'flash',
  experience: 'star',
  trait: 'account',
  item: 'package-variant',
} as const;

// 초기 스토리 데이터
export const INITIAL_STORY_DATA: StoryData = {
  id: 'start',
  title: '마법학원의 첫날',
  content: '아르카니아 마법학원의 대형 도서관에 서 있습니다. 고대 마법서들이 빽빽이 쌓인 책장들 사이로 은은한 마법의 빛이 새어나오고 있습니다. 마법사 길드의 장로인 엘드리치가 당신을 불러 새로운 임무를 맡기려고 합니다. 그의 눈빛에는 당신에 대한 기대와 함께 약간의 우려도 보입니다.\n\n도서관의 창가로 걸어가니 마을의 풍경이 한눈에 들어옵니다. 아침 햇살이 마을의 지붕들을 금빛으로 물들이고 있고, 멀리서는 마법사들이 연습하는 모습도 보입니다. 이곳에서 당신의 모험이 시작될 것입니다.',
  choices: [
    { id: 'confident', text: '자신감을 가지고 임무를 받아들인다', consequence: { type: 'mana', value: -15 }, nextNodeId: 'next1', enabled: true, visible: true },
    { id: 'careful', text: '신중하게 임무의 내용을 파악한다', consequence: { type: 'mana', value: -8 }, nextNodeId: 'next2', enabled: true, visible: true },
    { id: 'rest', text: '잠시 휴식을 취하고 마음을 정리한다', consequence: { type: 'mana', value: 20 }, nextNodeId: 'next3', enabled: true, visible: true },
  ],
  type: 'story',
  visited: false,
};

// 초기 캐릭터 스탯
export const INITIAL_CHARACTER_STATS: StoryCharacterStats = {
  daysPassed: 45,
  energy: 3,
  maxEnergy: 4,
  health: 4,
  maxHealth: 4,
  motivation: 7,
  maxMotivation: 10,
  stress: 3,
  maxStress: 10,
};

// 목 데이터
export const MOCK_QUESTS: Quest[] = [
  {
    id: 'main1',
    title: '고대 마법서 해독',
    description: '아르카니아 도서관에서 발견된 고대 마법서를 해독하여 잃어버린 마법을 복원해야 합니다.',
    type: 'main',
    status: 'active',
    progress: 3,
    maxProgress: 10,
    rewards: ['고대 마법 지식', '경험치 500', '골드 1000'],
  },
  {
    id: 'sub1',
    title: '마법 재료 수집',
    description: '마법 실습에 필요한 희귀한 재료들을 수집합니다.',
    type: 'sub',
    status: 'active',
    progress: 7,
    maxProgress: 10,
    rewards: ['마법 재료', '경험치 200'],
  },
  {
    id: 'sub2',
    title: '동료 마법사들과의 협력',
    description: '다른 학생들과 함께 마법 프로젝트를 완성합니다.',
    type: 'sub',
    status: 'completed',
    progress: 10,
    maxProgress: 10,
    rewards: ['협력 기술', '평판 +10'],
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_quest',
    title: '첫 번째 퀘스트',
    description: '첫 번째 퀘스트를 완료했습니다.',
    category: 'story',
    status: 'unlocked',
    icon: 'flag-checkered',
    unlockCondition: '첫 번째 퀘스트 완료',
    rewards: ['경험치 100'],
  },
  {
    id: 'social_butterfly',
    title: '사교적',
    description: '10명의 NPC와 친밀도를 50 이상으로 높였습니다.',
    category: 'social',
    status: 'unlocked',
    icon: 'account-group',
    unlockCondition: '10명의 NPC와 친밀도 50+',
    rewards: ['평판 +20'],
  },
  {
    id: 'explorer',
    title: '탐험가',
    description: '5개의 새로운 장소를 발견했습니다.',
    category: 'exploration',
    status: 'locked',
    icon: 'map-marker-path',
    unlockCondition: '5개 장소 발견',
    rewards: ['탐험 지식'],
  },
];

export const MOCK_MET_PEOPLE: MetPerson[] = [
  {
    id: 'person1',
    name: '엘드리치 장로',
    relationship: 75,
    maxRelationship: 100,
    lastMet: '오늘',
    description: '마법사 길드의 현명한 장로. 당신의 스승이자 멘토 역할을 합니다.',
    location: '마법사 길드',
    importance: 'main',
  },
  {
    id: 'person2',
    name: '리나 파이어스피어',
    relationship: 60,
    maxRelationship: 100,
    lastMet: '어제',
    description: '같은 학년의 엘리트 마법사. 경쟁 관계이지만 때로는 협력합니다.',
    location: '마법학원',
    importance: 'main',
  },
  {
    id: 'person3',
    name: '마스터 조르단',
    relationship: 45,
    maxRelationship: 100,
    lastMet: '3일 전',
    description: '마법 실습 담당 교수. 엄격하지만 학생들을 진심으로 아끼는 분입니다.',
    location: '실습실',
    importance: 'sub',
  },
];

export const MOCK_STORY_FLOW: StoryNode[] = [
  {
    id: 'start',
    title: '마법학원 입학',
    type: 'story',
    status: 'visited',
    timestamp: '1일차',
    choices: ['마법사 길드 가입', '독립 마법사 선택'],
    consequences: ['길드 멤버십 획득', '자유로운 마법 연구'],
  },
  {
    id: 'quest1',
    title: '첫 번째 퀘스트',
    type: 'choice',
    status: 'visited',
    timestamp: '3일차',
    choices: ['고대 마법서 해독', '마법 재료 수집'],
    consequences: ['지식 +10', '재료 +5'],
  },
  {
    id: 'current',
    title: '현재 진행 중',
    type: 'story',
    status: 'current',
    timestamp: '45일차',
    choices: ['계속 진행'],
  },
];

// 푸터 탭 목 데이터
export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'sword1',
    name: '마법검',
    description: '고대 마법이 깃든 검',
    quantity: 1,
    type: 'weapon',
    rarity: 'rare',
  },
  {
    id: 'potion1',
    name: '체력 물약',
    description: '체력을 회복시키는 물약',
    quantity: 5,
    type: 'consumable',
    rarity: 'common',
  },
  {
    id: 'material1',
    name: '마법 결정',
    description: '마법 주문에 필요한 재료',
    quantity: 12,
    type: 'material',
    rarity: 'uncommon',
  },
];

export const MOCK_SKILLS: Skill[] = [
  {
    id: 'fire_magic',
    name: '화염 마법',
    description: '강력한 화염 주문을 사용할 수 있습니다',
    level: 3,
    maxLevel: 10,
    experience: 450,
    experienceToNext: 550,
    type: 'magic',
  },
  {
    id: 'sword_fighting',
    name: '검술',
    description: '검을 사용한 전투 기술',
    level: 2,
    maxLevel: 10,
    experience: 200,
    experienceToNext: 300,
    type: 'combat',
  },
  {
    id: 'diplomacy',
    name: '외교술',
    description: 'NPC들과의 대화에서 유리한 조건을 얻을 수 있습니다',
    level: 4,
    maxLevel: 10,
    experience: 750,
    experienceToNext: 250,
    type: 'social',
  },
];

export const MOCK_COMPANIONS: Companion[] = [
  {
    id: 'companion1',
    name: '리나 파이어스피어',
    description: '같은 학년의 엘리트 마법사',
    relationship: 60,
    maxRelationship: 100,
    status: 'active',
    skills: ['화염 마법', '마법 이론'],
  },
  {
    id: 'companion2',
    name: '토마스 스톤',
    description: '전사 길드의 견습생',
    relationship: 45,
    maxRelationship: 100,
    status: 'active',
    skills: ['검술', '방어술'],
  },
  {
    id: 'companion3',
    name: '엘라 윈드워커',
    description: '자연의 힘을 다루는 드루이드',
    relationship: 30,
    maxRelationship: 100,
    status: 'unlocked',
    skills: ['자연 마법', '치유술'],
  },
];

export const MOCK_STATUS_EFFECTS: StatusEffect[] = [
  {
    id: 'magic_enhancement',
    name: '마법 강화',
    description: '마법 공격력이 증가합니다',
    type: 'buff',
    category: 'enhancement',
    icon: 'magic-staff',
    duration: 3600, // 1시간
    remainingTime: 1800, // 30분 남음
    intensity: 3,
    effects: [
      {
        stat: 'magic_power',
        value: 15,
        description: '마법 공격력 +15'
      }
    ]
  },
  {
    id: 'curious_personality',
    name: '호기심',
    description: '새로운 것을 발견하고 싶어합니다',
    type: 'neutral',
    category: 'personality',
    icon: 'eye',
    intensity: 2,
    effects: [
      {
        description: '탐험 시 추가 정보 획득 확률 증가'
      }
    ]
  },
  {
    id: 'common_cold',
    name: '감기',
    description: '몸이 약간 아픕니다',
    type: 'debuff',
    category: 'disease',
    icon: 'virus',
    duration: 3600, // 1시간
    remainingTime: 1800, // 30분 남음
    intensity: 1,
    effects: [
      {
        stat: 'health',
        value: -5,
        description: '체력 -5'
      }
    ]
  },
  {
    id: 'adrenaline_rush',
    name: '아드레날린 분출',
    description: '위험한 상황에서 능력이 향상됩니다',
    type: 'buff',
    category: 'temporary',
    icon: 'lightning-bolt',
    duration: 1800, // 30분
    remainingTime: 900, // 15분 남음
    intensity: 4,
    effects: [
      {
        stat: 'attack',
        value: 20,
        description: '공격력 +20'
      },
      {
        stat: 'speed',
        value: 10,
        description: '이동 속도 +10'
      }
    ]
  }
]; 