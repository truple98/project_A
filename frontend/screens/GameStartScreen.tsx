import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, Paragraph, TextInput, RadioButton, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type GameStartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameStart'>;

const GameStartScreen = () => {
  const navigation = useNavigation<GameStartScreenNavigationProp>();
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [selectedDifficulty, setSelectedDifficulty] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);

  const characterClasses = [
    { id: 'warrior', name: 'Warrior', emoji: '⚔️', description: 'Strong melee fighter' },
    { id: 'mage', name: 'Mage', emoji: '🔮', description: 'Powerful spellcaster' },
    { id: 'archer', name: 'Archer', emoji: '🏹', description: 'Skilled ranged fighter' },
    { id: 'rogue', name: 'Rogue', emoji: '🗡️', description: 'Stealthy assassin' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Relaxed gameplay' },
    { id: 'normal', name: 'Normal', description: 'Balanced challenge' },
    { id: 'hard', name: 'Hard', description: 'Intense challenge' },
  ];

  const handleStartGame = async () => {
    if (!characterName.trim()) {
      // TODO: 에러 메시지 표시
      return;
    }

    setIsLoading(true);
    
    // TODO: 실제 게임 시작 로직 구현
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Story', { nodeId: 'start' });
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getSelectedClass = () => characterClasses.find(c => c.id === selectedClass);
  const getSelectedDifficulty = () => difficulties.find(d => d.id === selectedDifficulty);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Title style={styles.title}>Start New Adventure</Title>
          <Paragraph style={styles.subtitle}>
            Create your character and begin your journey
          </Paragraph>
        </View>

        {/* 캐릭터 이름 입력 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Character Name</Title>
            <TextInput
              label="Enter your character's name"
              value={characterName}
              onChangeText={setCharacterName}
              mode="outlined"
              style={styles.input}
              maxLength={20}
            />
          </Card.Content>
        </Card>

        {/* 캐릭터 클래스 선택 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Choose Your Class</Title>
            <RadioButton.Group onValueChange={setSelectedClass} value={selectedClass}>
              {characterClasses.map((charClass) => (
                <View key={charClass.id} style={styles.radioItem}>
                  <RadioButton.Item
                    label={
                      <View style={styles.radioLabel}>
                        <Text style={styles.radioEmoji}>{charClass.emoji}</Text>
                        <View style={styles.radioText}>
                          <Text style={styles.radioTitle}>{charClass.name}</Text>
                          <Text style={styles.radioDescription}>{charClass.description}</Text>
                        </View>
                      </View>
                    }
                    value={charClass.id}
                    style={styles.radioButton}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* 난이도 선택 */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Difficulty</Title>
            <RadioButton.Group onValueChange={setSelectedDifficulty} value={selectedDifficulty}>
              {difficulties.map((difficulty) => (
                <View key={difficulty.id} style={styles.radioItem}>
                  <RadioButton.Item
                    label={
                      <View style={styles.radioLabel}>
                        <View style={styles.radioText}>
                          <Text style={styles.radioTitle}>{difficulty.name}</Text>
                          <Text style={styles.radioDescription}>{difficulty.description}</Text>
                        </View>
                      </View>
                    }
                    value={difficulty.id}
                    style={styles.radioButton}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* 선택된 옵션 요약 */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Character Summary</Title>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>
                  {characterName || 'Not set'}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Class:</Text>
                <View style={styles.summaryValueContainer}>
                  <Text style={styles.summaryEmoji}>
                    {getSelectedClass()?.emoji}
                  </Text>
                  <Text style={styles.summaryValue}>
                    {getSelectedClass()?.name}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Difficulty:</Text>
                <Chip 
                  mode="outlined" 
                  style={styles.difficultyChip}
                  textStyle={styles.difficultyChipText}
                >
                  {getSelectedDifficulty()?.name}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.backButton}
            contentStyle={styles.buttonContent}
          >
            Back
          </Button>
          <Button
            mode="contained"
            onPress={handleStartGame}
            loading={isLoading}
            disabled={isLoading || !characterName.trim()}
            style={styles.startButton}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? 'Starting...' : 'Start Adventure'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  card: {
    margin: 20,
    marginTop: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333333',
  },
  input: {
    marginBottom: 8,
  },
  radioItem: {
    marginBottom: 8,
  },
  radioButton: {
    marginVertical: 4,
  },
  radioLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  radioText: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  radioDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  summaryCard: {
    margin: 20,
    marginTop: 10,
    elevation: 4,
    backgroundColor: '#f8f9fa',
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  summaryValue: {
    fontSize: 16,
    color: '#666666',
  },
  summaryValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  difficultyChip: {
    backgroundColor: '#6200ee',
  },
  difficultyChipText: {
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 10,
    borderColor: '#6200ee',
  },
  startButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#6200ee',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default GameStartScreen; 