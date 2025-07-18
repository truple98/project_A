import { CONSEQUENCE_LABELS } from '../constants/gameData';
import { ConsequenceType } from '../types/game';

/**
 * 결과 텍스트를 생성합니다.
 * @param type 결과 타입
 * @param value 결과 값
 * @returns 포맷된 결과 텍스트
 */
export const getConsequenceText = (type: ConsequenceType, value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${CONSEQUENCE_LABELS[type]} ${sign}${value}`;
};

/**
 * 결과 값에 따른 색상을 반환합니다.
 * @param value 결과 값
 * @param mode 테마 모드
 * @returns 색상 코드
 */
export const getConsequenceColor = (value: number, mode: string): string => {
  if (value > 0) {
    return mode === 'dark' ? '#66BB6A' : '#4CAF50';
  } else if (value < 0) {
    return mode === 'dark' ? '#EF5350' : '#F44336';
  }
  return mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)';
};

/**
 * 아이템 희귀도에 따른 색상을 반환합니다.
 * @param rarity 희귀도
 * @returns 색상 코드
 */
export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return '#9E9E9E';
    case 'uncommon': return '#4CAF50';
    case 'rare': return '#2196F3';
    case 'epic': return '#9C27B0';
    case 'legendary': return '#FF9800';
    default: return '#9E9E9E';
  }
};

/**
 * 아이템 타입에 따른 아이콘을 반환합니다.
 * @param type 아이템 타입
 * @returns 아이콘 이름
 */
export const getItemTypeIcon = (type: string): string => {
  switch (type) {
    case 'weapon': return 'sword';
    case 'armor': return 'shield';
    case 'consumable': return 'flask';
    case 'material': return 'crystal-ball';
    case 'quest': return 'book-open';
    default: return 'package-variant';
  }
};

/**
 * 스킬 타입에 따른 색상을 반환합니다.
 * @param type 스킬 타입
 * @returns 색상 코드
 */
export const getSkillTypeColor = (type: string): string => {
  switch (type) {
    case 'combat': return '#F44336';
    case 'magic': return '#9C27B0';
    case 'social': return '#4CAF50';
    case 'crafting': return '#FF9800';
    case 'exploration': return '#2196F3';
    default: return '#9E9E9E';
  }
};

/**
 * 스킬 타입에 따른 아이콘을 반환합니다.
 * @param type 스킬 타입
 * @returns 아이콘 이름
 */
export const getSkillTypeIcon = (type: string): string => {
  switch (type) {
    case 'combat': return 'sword-cross';
    case 'magic': return 'magic-staff';
    case 'social': return 'account-group';
    case 'crafting': return 'hammer-wrench';
    case 'exploration': return 'map-search';
    default: return 'star';
  }
};

/**
 * 동료 상태에 따른 색상을 반환합니다.
 * @param status 동료 상태
 * @returns 색상 코드
 */
export const getCompanionStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return '#4CAF50';
    case 'inactive': return '#9E9E9E';
    case 'unlocked': return '#2196F3';
    default: return '#9E9E9E';
  }
};

/**
 * 동료 상태에 따른 텍스트를 반환합니다.
 * @param status 동료 상태
 * @returns 상태 텍스트
 */
export const getCompanionStatusText = (status: string): string => {
  switch (status) {
    case 'active': return '활성';
    case 'inactive': return '비활성';
    case 'unlocked': return '해금됨';
    default: return '알 수 없음';
  }
}; 