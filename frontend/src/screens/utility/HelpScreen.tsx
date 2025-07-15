// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../src/components/GlassmorphismBackground';
import GlassmorphismCard from '../../src/components/GlassmorphismCard';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

interface HelpSection {
  id: number;
  title: string;
  content: string[];
}

// 4. 상수 및 유틸리티 변수 정의
const HELP_SECTIONS: HelpSection[] = [
  {
    id: 1,
    title: '게임 시작하기',
    content: [
      '1. 홈 화면에서 "게임 시작" 버튼을 누르세요',
      '2. 캐릭터를 선택하고 능력치를 확인하세요',
      '3. 스토리 모드를 선택하여 모험을 시작하세요',
      '4. 각 선택지를 신중히 고려하여 진행하세요',
    ]
  },
  {
    id: 2,
    title: '전투 시스템',
    content: [
      '• 턴 기반 전투 시스템을 사용합니다',
      '• 공격, 방어, 스킬 사용 중 선택하세요',
      '• 적의 패턴을 파악하여 전략을 세우세요',
      '• 체력이 0이 되면 게임이 종료됩니다',
    ]
  },
  {
    id: 3,
    title: '아이템 관리',
    content: [
      '• 인벤토리에서 아이템을 관리할 수 있습니다',
      '• 포션은 전투 중에 사용할 수 있습니다',
      '• 장비를 착용하여 능력치를 향상시키세요',
      '• 희귀한 아이템일수록 더 강력한 효과를 가집니다',
    ]
  },
  {
    id: 4,
    title: '캐릭터 성장',
    content: [
      '• 경험치를 획득하여 레벨을 올리세요',
      '• 레벨업 시 능력치가 향상됩니다',
      '• 새로운 스킬을 배울 수 있습니다',
      '• 스킬 포인트를 투자하여 스킬을 강화하세요',
    ]
  },
  {
    id: 5,
    title: '게임 팁',
    content: [
      '• 다양한 선택지를 시도해보세요',
      '• 저장 기능을 활용하여 진행상황을 보관하세요',
      '• 인벤토리를 정기적으로 확인하세요',
      '• 어려운 전투 전에는 충분히 준비하세요',
    ]
  },
  {
    id: 6,
    title: '문의사항',
    content: [
      '• 게임 관련 문의는 설정 > 고객지원으로 연락하세요',
      '• 버그 신고는 상세한 내용과 함께 제보해주세요',
      '• 게임 개선 제안은 언제든지 환영합니다',
    ]
  }
];

// 5. 메인 스크린 컴포넌트 함수 정의
const HelpScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<HelpScreenNavigationProp>();
  const { theme, mode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // 5.2. 데이터 (현재는 상수 데이터 사용)
  const helpSections = HELP_SECTIONS;

  // 5.3. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleSection = useCallback((sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  }, [expandedSections]);

  // 5.4. JSX 반환
  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        <ScreenHeader title="도움말" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {helpSections.map((section) => (
            <GlassmorphismCard key={section.id} style={styles.sectionCard}>
              <TouchableOpacity
                onPress={() => toggleSection(section.id)}
                style={styles.sectionHeader}
                activeOpacity={0.7}
              >
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  {section.title}
                </Text>
                <Text style={[styles.expandIcon, { color: theme.colors.textSecondary }]}>
                  {expandedSections.has(section.id) ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedSections.has(section.id) && (
                <View style={styles.sectionContent}>
                  {section.content.map((item, index) => (
                    <Text key={index} style={[styles.contentItem, { color: theme.colors.textSecondary }]}>
                      {item}
                    </Text>
                  ))}
                </View>
              )}
            </GlassmorphismCard>
          ))}

          {/* 추가 도움말 */}
          <GlassmorphismCard style={styles.additionalHelpCard}>
            <Text style={[styles.additionalHelpTitle, { color: theme.colors.text }]}>
              추가 도움이 필요하신가요?
            </Text>
            <Text style={[styles.additionalHelpText, { color: theme.colors.textSecondary }]}>
              설정 메뉴에서 고객지원으로 문의하시거나, 게임 내 피드백 기능을 이용해주세요.
            </Text>
          </GlassmorphismCard>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

// 6. 스타일 정의 (theme 객체 활용)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.3,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    width: 30,
    textAlign: 'center',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  contentItem: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  additionalHelpCard: {
    padding: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  additionalHelpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  additionalHelpText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
});

// 7. 컴포넌트 내보내기
export default HelpScreen; 