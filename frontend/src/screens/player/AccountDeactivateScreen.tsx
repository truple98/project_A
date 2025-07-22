import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROUTES } from '../../constants/routes';
import GlassmorphismBackground from '../../components/GlassmorphismBackground';
import GlassmorphismHeader from '../../components/GlassmorphismHeader';
import { useTheme } from '../../theme/ThemeContext';

const DEACTIVATE_TERMS = `1. 계정 탈퇴 시 개인정보 및 게임 데이터는 모두 삭제됩니다.\n2. 결제한 상품 및 보유 아이템은 복구되지 않으며, 환불이 불가합니다.\n3. 커뮤니티 활동(게시글, 댓글 등)은 탈퇴 후에도 유지될 수 있습니다.\n4. 탈퇴 후 30일간 재로그인 시 탈퇴 신청이 철회됩니다.\n5. 30일이 경과하면 모든 정보가 영구적으로 삭제됩니다.`;
const DEACTIVATE_NOTICE = `회원님의 정보는 30일간 보관 후 영구 말소됩니다.\n30일 이내 재로그인 시 탈퇴 신청이 철회됩니다.`;

const AccountDeactivateScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email || '');
  const [step, setStep] = useState(1); // 1: 약관, 2: 안내, 3: 이메일 인증
  const [inputEmail, setInputEmail] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 1단계: 약관 동의
  const handleAgreeTerms = useCallback(() => setStep(2), []);
  // 2단계: 안내 동의
  const handleAgreeNotice = useCallback(() => setStep(3), []);
  // 3단계: 이메일 입력 변경
  const handleEmailChange = useCallback((text: string) => setInputEmail(text), []);
  // 3단계: 이메일 일치 여부
  const isEmailValid = inputEmail.trim().toLowerCase() === userEmail.trim().toLowerCase();
  // 3단계: 탈퇴 버튼 클릭
  const handleDeactivate = useCallback(() => setShowConfirmModal(true), []);
  // 최종 확인 모달: 확인
  const handleConfirmDeactivate = useCallback(() => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  }, []);
  // 최종 확인 모달: 취소
  const handleCancelDeactivate = useCallback(() => setShowConfirmModal(false), []);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.APP.TITLE as any }],
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigation]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 100, // 하단 버튼 영역 확보
    },
    bottomButtonArea: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 24,
      paddingBottom: 24,
      backgroundColor: 'transparent',
    },
    sectionCard: {
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
      textAlign: 'center',
    },
    sectionText: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.colors.text,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 12,
      marginBottom: 4,
    },
    emailBox: {
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      backgroundColor: theme.colors.elevated,
    },
    emailText: {
      fontSize: 15,
      color: theme.colors.text,
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 15,
      marginBottom: 16,
      backgroundColor: '#FFF',
      borderColor: theme.colors.border,
    },
    purchaseButton: {
      borderRadius: 16,
      padding: 20,
      marginTop: 24,
      alignItems: 'center',
    },
    purchaseButtonText: {
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
      color: '#FFF',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
      borderRadius: 16,
      padding: 28,
      width: '80%',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: theme.colors.surface,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
      textAlign: 'center',
    },
    modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 12,
      gap: 12,
    },
    modalButton: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    modalButtonText: {
      color: '#FFF',
      fontSize: 15,
      fontWeight: '600',
    },
  }), [theme]);

  return (
    <GlassmorphismBackground>
      <View style={styles.container}>
        <GlassmorphismHeader title="계정 탈퇴" onBackPress={() => navigation.goBack()} />
        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {step === 1 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>계정 탈퇴 약관</Text>
                <Text style={styles.sectionText}>{DEACTIVATE_TERMS}</Text>
              </View>
            )}
            {step === 2 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>정보 보관 및 말소 안내</Text>
                <Text style={styles.sectionText}>{DEACTIVATE_NOTICE}</Text>
              </View>
            )}
            {step === 3 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>이메일 인증 및 탈퇴 확정</Text>
                <Text style={styles.label}>현재 계정 이메일</Text>
                <View style={styles.emailBox}>
                  <Text style={styles.emailText}>{userEmail}</Text>
                </View>
                <Text style={styles.label}>이메일 주소를 정확히 입력하세요</Text>
                <TextInput
                  style={[styles.input, { borderColor: isEmailValid ? theme.colors.primary : theme.colors.border }]}
                  placeholder="이메일 주소 입력"
                  value={inputEmail}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            )}
          </ScrollView>
          {step === 1 && (
            <TouchableOpacity style={[styles.purchaseButton, { backgroundColor: theme.colors.primary, marginTop: 'auto', marginBottom: 12, width: '100%' }]} onPress={handleAgreeTerms}>
              <Text style={styles.purchaseButtonText}>동의합니다</Text>
            </TouchableOpacity>
          )}
          {step === 2 && (
            <TouchableOpacity style={[styles.purchaseButton, { backgroundColor: theme.colors.primary, marginTop: 'auto', marginBottom: 12, width: '100%' }]} onPress={handleAgreeNotice}>
              <Text style={styles.purchaseButtonText}>동의합니다</Text>
            </TouchableOpacity>
          )}
          {step === 3 && (
            <TouchableOpacity
              style={[styles.purchaseButton, { backgroundColor: isEmailValid ? theme.colors.error : '#BDBDBD', marginTop: 'auto', marginBottom: 12, width: '100%' }]}
              onPress={handleDeactivate}
              disabled={!isEmailValid}
            >
              <Text style={styles.purchaseButtonText}>계정 탈퇴하기</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* 최종 확인 모달 */}
        <Modal visible={showConfirmModal} transparent animationType="fade" onRequestClose={handleCancelDeactivate}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}> 
              <Text style={styles.modalTitle}>정말로 계정을 탈퇴하시겠습니까?</Text>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme.colors.error }]} onPress={handleConfirmDeactivate}>
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#BDBDBD' }]} onPress={handleCancelDeactivate}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* 탈퇴 완료 모달 */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}> 
              <Text style={styles.modalTitle}>탈퇴가 완료되었습니다.</Text>
            </View>
          </View>
        </Modal>
      </View>
    </GlassmorphismBackground>
  );
};

export default AccountDeactivateScreen; 