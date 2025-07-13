import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import { ScreenHeader } from '../components/ScreenHeader';

type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

const HelpScreen = () => {
  const navigation = useNavigation<HelpScreenNavigationProp>();
  const { mode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const helpSections = [
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

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <ScreenHeader title="도움말" onBackPress={handleBack} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={[
              styles.headerTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              게임 가이드
            </Text>
            <Text style={[
              styles.headerSubtitle,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              아래 항목들을 탭해서 자세한 정보를 확인하세요
            </Text>
          </View>

          {helpSections.map((section) => (
            <GlassmorphismCard key={section.id} style={styles.helpCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.sectionTitle,
                  { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
                ]}>
                  {section.title}
                </Text>
                <Text style={[
                  styles.expandIcon,
                  { color: mode === 'dark' ? '#5A9FFF' : '#4285F4' }
                ]}>
                  {expandedSections.has(section.id) ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              
              {expandedSections.has(section.id) && (
                <View style={styles.sectionContent}>
                  {section.content.map((item, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.contentItem,
                        { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 26, 26, 0.8)' }
                      ]}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              )}
            </GlassmorphismCard>
          ))}

          <GlassmorphismCard style={styles.contactCard}>
            <Text style={[
              styles.contactTitle,
              { color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A' }
            ]}>
              추가 도움이 필요하신가요?
            </Text>
            <Text style={[
              styles.contactText,
              { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)' }
            ]}>
              설정 화면에서 고객지원 메뉴를 통해 문의하실 수 있습니다.
            </Text>
          </GlassmorphismCard>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  helpCard: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  contactCard: {
    marginTop: 12,
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HelpScreen; 