import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismCard from '../../components/GlassmorphismCard';
import GlassmorphismHeader from '../../components/GlassmorphismHeader';
import { RootStackParamList } from '../../types';

type TermsOfServiceScreenNavigationProp = StackNavigationProp<any, any>;

const TermsOfServiceScreen = () => {
  const navigation = useNavigation<TermsOfServiceScreenNavigationProp>();
  const { theme } = useTheme();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader 
          title="이용약관" 
          subtitle="서비스 이용에 관한 약관입니다"
          onBackPress={handleGoBack}
        />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassmorphismCard style={styles.contentCard}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제1조 (목적)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              이 약관은 Binary Studio(이하 "회사")가 제공하는 TRPG 모바일 게임 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제2조 (정의)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. "서비스"란 회사가 제공하는 TRPG 모바일 게임 및 관련 서비스를 의미합니다.{'\n'}
              2. "이용자"란 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.{'\n'}
              3. "계정"이란 이용자의 식별과 서비스 이용을 위하여 이용자가 선정하고 회사가 승인하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제3조 (약관의 효력 및 변경)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.{'\n'}
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.{'\n'}
              3. 약관이 변경되는 경우, 회사는 변경사항을 시행일자 7일 전부터 공지사항을 통해 공지합니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제4조 (서비스의 제공)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 회사는 다음과 같은 서비스를 제공합니다:{'\n'}
              - TRPG 모바일 게임 서비스{'\n'}
              - 게임 데이터 저장 및 동기화 서비스{'\n'}
              - 게임 관련 정보 제공 서비스{'\n'}
              2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.{'\n'}
              3. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경하거나 중단할 수 있습니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제5조 (이용자의 의무)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 이용자는 다음 행위를 하여서는 안 됩니다:{'\n'}
              - 서비스의 정상적인 운영을 방해하는 행위{'\n'}
              - 다른 이용자의 개인정보를 수집, 저장, 공개하는 행위{'\n'}
              - 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통하는 행위{'\n'}
              - 기타 불법적이거나 부당한 행위{'\n'}
              2. 이용자는 관계법령, 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항을 준수하여야 합니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제6조 (개인정보보호)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다.{'\n'}
              2. 이용자는 개인정보처리방침에 따라 자신의 개인정보에 대한 열람, 정정, 삭제를 요구할 수 있습니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제7조 (책임제한)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.{'\n'}
              2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.{'\n'}
              3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제8조 (분쟁해결)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.{'\n'}
              2. 회사와 이용자 간에 발생한 전자상거래 분쟁에 관하여는 소비자분쟁조정위원회의 조정에 따를 수 있습니다.
            </Text>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              제9조 (재판권 및 준거법)
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.textSecondary }]}>
              1. 회사와 이용자 간에 발생한 분쟁에 관하여는 대한민국 법을 적용합니다.{'\n'}
              2. 회사와 이용자 간에 제기된 소송에는 대한민국 법원의 관할법원에 따릅니다.
            </Text>

            <Text style={[styles.lastUpdated, { color: theme.colors.textSecondary }]}>
              시행일자: 2024년 1월 1일
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
    paddingTop: 20,
  },
  contentCard: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  lastUpdated: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default TermsOfServiceScreen; 