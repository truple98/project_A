// 게임 관련 API 서비스
// TODO: 실제 백엔드 API 연동 시 구현

export interface StartGameRequest {
  characterName: string;
  characterClass: string;
  difficulty: string;
}

export interface GameSession {
  sessionId: string;
  character: {
    name: string;
    class: string;
    level: number;
    health: number;
    mana: number;
  };
  storyNodeId: string;
}

export const gameAPI = {
  // 새 게임 시작
  startGame: async (data: StartGameRequest): Promise<GameSession> => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sessionId: 'session-' + Date.now(),
          character: {
            name: data.characterName,
            class: data.characterClass,
            level: 1,
            health: 100,
            mana: 50,
          },
          storyNodeId: 'start',
        });
      }, 1000);
    });
  },

  // 스토리 진행
  nextStory: async (sessionId: string, choiceId: string) => {
    // TODO: 실제 API 호출로 교체
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          storyNodeId: 'next-' + choiceId,
        });
      }, 1000);
    });
  },
}; 