import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Avatar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleStartNewGame = () => {
    navigation.navigate('GameStart');
  };

  const handleContinueGame = () => {
    // TODO: 이어하기 로직 구현
    navigation.navigate('Story', { nodeId: 'continue' });
  };

  const handleViewCharacter = () => {
    navigation.navigate('Character');
  };

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar.Text size={50} label="AD" style={styles.avatar} />
            <View style={styles.userText}>
              <Title style={styles.welcomeText}>다시 오신 것을 환영합니다,</Title>
              <Text style={styles.username}>모험가님</Text>
            </View>
          </View>
        </View>

        {/* 게임 상태 카드 */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <Title style={styles.statusTitle}>현재 상태</Title>
            <View style={styles.statusGrid}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>레벨</Text>
                <Text style={styles.statusValue}>5</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>체력</Text>
                <Text style={styles.statusValue}>85/100</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>마나</Text>
                <Text style={styles.statusValue}>60/80</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>경험치</Text>
                <Text style={styles.statusValue}>1,250</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* 메인 메뉴 */}
        <View style={styles.menuSection}>
          <Title style={styles.sectionTitle}>게임 메뉴</Title>
          
          <Card style={styles.menuCard} onPress={handleStartNewGame}>
            <Card.Content style={styles.menuCardContent}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🎮</Text>
              </View>
              <View style={styles.menuText}>
                <Title style={styles.menuTitle}>새 게임 시작</Title>
                <Paragraph style={styles.menuDescription}>새로운 모험을 시작합니다</Paragraph>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.menuCard} onPress={handleContinueGame}>
            <Card.Content style={styles.menuCardContent}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>▶️</Text>
              </View>
              <View style={styles.menuText}>
                <Title style={styles.menuTitle}>이어하기</Title>
                <Paragraph style={styles.menuDescription}>이전 모험을 이어서 진행합니다</Paragraph>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.menuCard} onPress={handleViewCharacter}>
            <Card.Content style={styles.menuCardContent}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>👤</Text>
              </View>
              <View style={styles.menuText}>
                <Title style={styles.menuTitle}>캐릭터 정보</Title>
                <Paragraph style={styles.menuDescription}>내 캐릭터 정보를 확인합니다</Paragraph>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.menuCard} onPress={handleViewHistory}>
            <Card.Content style={styles.menuCardContent}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>📚</Text>
              </View>
              <View style={styles.menuText}>
                <Title style={styles.menuTitle}>히스토리</Title>
                <Paragraph style={styles.menuDescription}>과거 모험 기록을 확인합니다</Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* FAB */}
      <FAB
        style={styles.fab}
        icon="cog"
        onPress={handleOpenSettings}
        label="설정"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#ffffff',
    marginRight: 15,
  },
  userText: {
    flex: 1,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
  },
  username: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusCard: {
    margin: 20,
    marginTop: -20,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333333',
  },
  menuCard: {
    marginBottom: 12,
    elevation: 2,
  },
  menuCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default HomeScreen; 