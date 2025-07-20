// 1. React 및 외부 라이브러리 임포트 (알파벳 순서)
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 2. 내부 컴포넌트 및 유틸리티 임포트 (알파벳 순서)
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../types';

// 3. 타입 정의
type EndingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ending'>;

interface EndingData {
  title: string;
  illustration: string;
  story: string;
  endingType: 'good' | 'bad' | 'neutral';
}

// 4. 상수 및 유틸리티 변수 정의
const MOCK_ENDING_DATA: EndingData = {
  title: '진실의 발견',
  illustration: '일러스트',
  story: `해당 페이지는 게임이 종료된 이후로
에필로그처럼 출력이 되는
영역입니다.

일러스트에는 플레이어의 엔딩에
해당이 되는 일러스트가 출력이
될것이고 텍스트 영역에는 플레이어의
엔딩 스토리를 출력할 것입니다.

당신은 마법학원에서의 모험을 통해
진정한 마법의 의미를 깨달았습니다.
고대 마법서를 해독하면서 발견한 것은
단순한 힘이 아닌, 지식과 지혜의 가치였습니다.

엘드리치 장로는 당신의 성장을 지켜보며
미래의 마법사로서의 가능성을 확인했습니다.
리나와의 경쟁은 서로를 성장시키는
동반자 관계로 발전했고, 마스터 조르단의
엄격한 지도는 당신을 더욱 견고하게 만들었습니다.

이제 당신은 진정한 마법사가 되었습니다.
하지만 이것은 끝이 아닌 새로운 시작입니다.
마법의 세계는 무한한 가능성으로 가득하고,
당신 앞에는 더욱 흥미로운 모험이 기다리고 있습니다.

당신의 여정을 함께해주셔서 감사합니다.`,
  endingType: 'good',
};

// 5. 메인 스크린 컴포넌트 함수 정의
const EndingScreen = () => {
  // 5.1. Hooks 선언
  const navigation = useNavigation<EndingScreenNavigationProp>();
  const { theme, mode } = useTheme();

  // 5.2. 데이터 (현재는 Mock 데이터 사용)
  const endingData = MOCK_ENDING_DATA;

  // 5.3. 이벤트 핸들러 및 유틸리티 함수 (useCallback으로 래핑)
  const handleGameSummary = useCallback(() => {
    navigation.navigate('Result', {
      choiceId: 'ending-summary',
      consequences: [],
    });
  }, [navigation]);

  const handleTitleScreen = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleNewGame = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  // 5.4. 스타일 정의 (theme 객체 활용)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gameOverTitle: {
      backgroundColor: theme.colors.elevation1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 20,
      paddingHorizontal: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    gameOverText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      letterSpacing: 2,
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    storyOutputContainer: {
      flex: 1,
    },
    storyOutputContent: {
      paddingBottom: 20,
    },
    illustrationArea: {
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      minHeight: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.elevation1,
      ...Platform.select({
        ios: {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    illustrationText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    textOutputArea: {
      borderRadius: 16,
      padding: 24,
      backgroundColor: theme.colors.elevation1,
      ...Platform.select({
        ios: {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    storyText: {
      fontSize: 16,
      lineHeight: 28,
      color: theme.colors.text,
      textAlign: 'left',
      letterSpacing: -0.2,
    },
    navigationButtons: {
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    navigationButton: {
      backgroundColor: theme.colors.elevation1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    navigationButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });

  // 5.5. JSX 반환
  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        {/* GAME OVER 타이틀 */}
        <View style={styles.gameOverTitle}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
        </View>

        {/* 일러스트와 스토리 텍스트가 결합된 스크롤 영역 */}
        <View style={styles.mainContent}>
          <ScrollView 
            style={styles.storyOutputContainer}
            contentContainerStyle={styles.storyOutputContent}
            showsVerticalScrollIndicator={true}
          >
            {/* 일러스트 영역 */}
            <View style={styles.illustrationArea}>
              <Text style={styles.illustrationText}>{endingData.illustration}</Text>
            </View>

            {/* 스토리 텍스트 영역 */}
            <View style={styles.textOutputArea}>
              <Text style={styles.storyText}>{endingData.story}</Text>
            </View>
          </ScrollView>
        </View>

        {/* 네비게이션 버튼들 */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={handleGameSummary}
            activeOpacity={0.7}
          >
            <Text style={styles.navigationButtonText}>게임 요약 화면으로</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={handleTitleScreen}
            activeOpacity={0.7}
          >
            <Text style={styles.navigationButtonText}>타이틀 화면으로</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={handleNewGame}
            activeOpacity={0.7}
          >
            <Text style={styles.navigationButtonText}>새로운 게임 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GlassmorphismBackground>
  );
};

export default EndingScreen; 