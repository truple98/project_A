import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, Paragraph, ProgressBar, Chip } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type StoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

const StoryScreen = () => {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { nodeId } = route.params;

  const [currentStory, setCurrentStory] = useState({
    title: 'The Beginning',
    content: 'You find yourself standing at the entrance of an ancient forest. The trees loom tall and mysterious, their branches whispering secrets in the wind. A path leads deeper into the darkness, while another winds around the edge of the forest. Your heart races with anticipation as you consider your next move.',
    choices: [
      { id: '1', text: 'Enter the forest and follow the dark path', nextNodeId: 'forest' },
      { id: '2', text: 'Walk around the forest edge', nextNodeId: 'edge' },
      { id: '3', text: 'Examine the entrance more carefully', nextNodeId: 'examine' },
    ]
  });

  const [characterStats, setCharacterStats] = useState({
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 80,
    experience: 1250,
    level: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  useEffect(() => {
    // TODO: 실제 스토리 노드 로딩 로직 구현
    console.log('Loading story node:', nodeId);
  }, [nodeId]);

  const handleChoice = async (choiceId: string) => {
    setSelectedChoice(choiceId);
    setIsLoading(true);

    // TODO: 실제 선택지 처리 로직 구현
    setTimeout(() => {
      setIsLoading(false);
      // 임시로 Result 화면으로 이동
      navigation.navigate('Result', { 
        choiceId, 
        consequences: [
          { type: 'EXPERIENCE', value: 50, description: 'Gained 50 experience points' },
          { type: 'HEALTH', value: -5, description: 'Lost 5 health points' }
        ] 
      });
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getHealthPercentage = () => characterStats.health / characterStats.maxHealth;
  const getManaPercentage = () => characterStats.mana / characterStats.maxMana;

  return (
    <View style={styles.container}>
      {/* 헤더 - 캐릭터 상태 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.characterInfo}>
            <Text style={styles.characterName}>Adventurer</Text>
            <Text style={styles.characterLevel}>Level {characterStats.level}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>HP</Text>
              <ProgressBar 
                progress={getHealthPercentage()} 
                color="#ff4444" 
                style={styles.progressBar}
              />
              <Text style={styles.statValue}>
                {characterStats.health}/{characterStats.maxHealth}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>MP</Text>
              <ProgressBar 
                progress={getManaPercentage()} 
                color="#4444ff" 
                style={styles.progressBar}
              />
              <Text style={styles.statValue}>
                {characterStats.mana}/{characterStats.maxMana}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 스토리 카드 */}
        <Card style={styles.storyCard}>
          <Card.Content>
            <Title style={styles.storyTitle}>{currentStory.title}</Title>
            <Paragraph style={styles.storyContent}>
              {currentStory.content}
            </Paragraph>
          </Card.Content>
        </Card>

        {/* 선택지 */}
        <View style={styles.choicesContainer}>
          <Title style={styles.choicesTitle}>What will you do?</Title>
          
          {currentStory.choices.map((choice) => (
            <Card 
              key={choice.id} 
              style={[
                styles.choiceCard,
                selectedChoice === choice.id && styles.selectedChoiceCard
              ]}
              onPress={() => handleChoice(choice.id)}
            >
              <Card.Content>
                <Text style={styles.choiceText}>{choice.text}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* 로딩 상태 */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Processing your choice...</Text>
          </View>
        )}

        {/* 하단 버튼 */}
        <View style={styles.bottomButtons}>
          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.backButton}
            disabled={isLoading}
          >
            Back to Menu
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
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  characterLevel: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  statsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  statItem: {
    marginBottom: 8,
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'right',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  storyCard: {
    margin: 20,
    marginTop: 10,
    elevation: 4,
  },
  storyTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333333',
  },
  storyContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  choicesContainer: {
    paddingHorizontal: 20,
  },
  choicesTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333333',
  },
  choiceCard: {
    marginBottom: 12,
    elevation: 2,
  },
  selectedChoiceCard: {
    borderColor: '#6200ee',
    borderWidth: 2,
    backgroundColor: '#f0f0ff',
  },
  choiceText: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    fontStyle: 'italic',
  },
  bottomButtons: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    borderColor: '#6200ee',
  },
});

export default StoryScreen; 