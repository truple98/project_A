import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';
import GlassmorphismBackground from '../components/GlassmorphismBackground';
import GlassmorphismCard from '../components/GlassmorphismCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { theme, mode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '모험가123',
    email: 'adventure@example.com',
    level: 25,
    experience: 15750,
    totalPlayTime: '48시간 32분',
    gamesPlayed: 127,
    victoriesCount: 89,
    achievementsUnlocked: 23,
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('저장 완료', '계정 정보가 성공적으로 저장되었습니다.');
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말로 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '로그아웃', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  const profileSections = [
    {
      title: '게임 통계',
      items: [
        { label: '레벨', value: userInfo.level.toString(), icon: 'trending-up' },
        { label: '경험치', value: userInfo.experience.toLocaleString(), icon: 'star' },
        { label: '총 플레이 시간', value: userInfo.totalPlayTime, icon: 'clock' },
        { label: '플레이한 게임', value: userInfo.gamesPlayed.toString(), icon: 'gamepad-variant' },
      ]
    },
    {
      title: '성과',
      items: [
        { label: '승리 횟수', value: userInfo.victoriesCount.toString(), icon: 'trophy' },
        { label: '달성한 업적', value: userInfo.achievementsUnlocked.toString(), icon: 'medal' },
        { label: '승률', value: `${Math.round((userInfo.victoriesCount / userInfo.gamesPlayed) * 100)}%`, icon: 'chart-line' },
      ]
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: 60,
      paddingBottom: 24,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      marginTop: 16,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 16,
      letterSpacing: -0.3,
    },
    profileCard: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    avatarContainer: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.4)',
      borderRadius: 44,
      width: 88,
      height: 88,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    username: {
      fontSize: 28,
      fontWeight: '700',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    email: {
      fontSize: 16,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 20,
      letterSpacing: -0.2,
    },
    editButton: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      paddingHorizontal: 24,
      paddingVertical: 12,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    editButtonText: {
      color: mode === 'dark' ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    infoSection: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 20,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    infoList: {
      gap: 12,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      padding: 16,
    },
    infoIcon: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
      borderRadius: 24,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 14,
      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      marginBottom: 4,
      letterSpacing: -0.1,
    },
    infoValue: {
      fontSize: 18,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      letterSpacing: -0.3,
    },
    editForm: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)',
      borderRadius: 16,
      padding: 20,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 8,
      letterSpacing: -0.2,
    },
    textInput: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
    },
    formButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      gap: 12,
    },
    formButton: {
      flex: 1,
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
      borderRadius: 12,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: mode === 'dark' ? 0.25 : 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    formButtonLabel: {
      color: mode === 'dark' ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    primaryFormButton: {
      backgroundColor: mode === 'dark' ? '#5A9FFF' : '#4285F4',
    },
    primaryFormButtonLabel: {
      color: '#ffffff',
    },
    actionButtons: {
      marginTop: 8,
      marginBottom: 32,
    },
    actionButton: {
      borderRadius: 16,
      marginBottom: 12,
      ...Platform.select({
        ios: {
          shadowColor: mode === 'dark' ? '#000000' : '#4285F4',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === 'dark' ? 0.3 : 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    actionButtonLabel: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    logoutButton: {
      backgroundColor: '#d9534f',
    },
    logoutButtonLabel: {
      color: '#ffffff',
    },
    backButton: {
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
    },
    backButtonLabel: {
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
  });

  return (
    <GlassmorphismBackground isDark={mode === 'dark'}>
      <View style={styles.container}>
        {/* Header */}
        <GlassmorphismCard
          isDark={mode === 'dark'}
          opacity={0.15}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>계정 정보</Text>
        </GlassmorphismCard>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.section}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Icon
                  name="account"
                  size={44}
                  color={mode === 'dark' ? '#ffffff' : '#000000'}
                />
              </View>
              <Text style={styles.username}>{userInfo.username}</Text>
              <Text style={styles.email}>{userInfo.email}</Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditing(!isEditing)}
              >
                <Text style={styles.editButtonText}>
                  {isEditing ? '편집 취소' : '프로필 편집'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {isEditing ? (
            /* Edit Form */
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>프로필 편집</Text>
              <View style={styles.editForm}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>사용자명</Text>
                  <TextInput
                    value={userInfo.username}
                    onChangeText={(text) => setUserInfo({...userInfo, username: text})}
                    style={styles.textInput}
                    mode="outlined"
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    textColor={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>이메일</Text>
                  <TextInput
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                    style={styles.textInput}
                    mode="outlined"
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    keyboardType="email-address"
                    textColor={mode === 'dark' ? '#ffffff' : '#000000'}
                  />
                </View>
                <View style={styles.formButtons}>
                  <Button 
                    onPress={() => setIsEditing(false)}
                    mode="contained"
                    style={styles.formButton}
                    labelStyle={styles.formButtonLabel}
                  >
                    취소
                  </Button>
                  <Button 
                    onPress={handleSave}
                    mode="contained"
                    style={[styles.formButton, styles.primaryFormButton]}
                    labelStyle={styles.primaryFormButtonLabel}
                  >
                    저장
                  </Button>
                </View>
              </View>
            </View>
          ) : (
            /* Info Sections */
            profileSections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.infoSection}>
                  <View style={styles.infoList}>
                    {section.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles.infoItem}>
                        <View style={styles.infoIcon}>
                          <Icon
                            name={item.icon}
                            size={24}
                            color={mode === 'dark' ? '#ffffff' : '#000000'}
                          />
                        </View>
                        <View style={styles.infoContent}>
                          <Text style={styles.infoLabel}>{item.label}</Text>
                          <Text style={styles.infoValue}>{item.value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button 
              onPress={handleLogout}
              mode="contained"
              style={[styles.actionButton, styles.logoutButton]}
              labelStyle={[styles.actionButtonLabel, styles.logoutButtonLabel]}
            >
              로그아웃
            </Button>
            <Button 
              onPress={() => navigation.goBack()}
              mode="contained"
              style={[styles.actionButton, styles.backButton]}
              labelStyle={[styles.actionButtonLabel, styles.backButtonLabel]}
            >
              뒤로가기
            </Button>
          </View>
        </ScrollView>
      </View>
    </GlassmorphismBackground>
  );
};

export default AccountScreen; 