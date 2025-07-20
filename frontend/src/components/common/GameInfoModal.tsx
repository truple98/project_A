import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'sub';
  status: 'active' | 'completed' | 'failed';
  progress: number;
  maxProgress: number;
  rewards?: string[];
}



interface MetPerson {
  id: string;
  name: string;
  relationship: number;
  maxRelationship: number;
  lastMet: string;
  description: string;
  location: string;
  importance: 'main' | 'sub' | 'background';
}

interface StoryNode {
  id: string;
  title: string;
  type: 'story' | 'choice' | 'consequence';
  status: 'visited' | 'current' | 'locked';
  timestamp: string;
  choices?: string[];
  consequences?: string[];
}

interface GameInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  quests: Quest[];
  metPeople: MetPerson[];
  storyFlow: StoryNode[];
}

const GameInfoModal: React.FC<GameInfoModalProps> = ({
  isVisible,
  onClose,
  quests,
  metPeople,
  storyFlow,
}) => {
  const { theme, mode } = useTheme();

  if (!isVisible) return null;

  const getQuestStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'active':
        return mode === 'dark' ? '#42A5F5' : '#2196F3';
      case 'failed':
        return mode === 'dark' ? '#EF5350' : '#F44336';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getQuestStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'active':
        return '진행중';
      case 'failed':
        return '실패';
      default:
        return '알 수 없음';
    }
  };



  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'visited':
        return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'current':
        return mode === 'dark' ? '#42A5F5' : '#2196F3';
      case 'locked':
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={[
        styles.modalContainer,
        { backgroundColor: theme.colors.surface }
      ]}>
        <View style={styles.header}>
          <Text style={[
            styles.modalTitle,
            { 
              color: theme.colors.text,
              fontSize: theme.typography.sizes.xl,
              fontWeight: theme.typography.weights.bold,
            }
          ]}>게임 정보</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 퀘스트 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>퀘스트</Text>
            <View style={styles.questsContainer}>
              {quests.map((quest) => (
                <View key={quest.id} style={[
                  styles.questCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.questHeader}>
                    <View style={styles.questTypeContainer}>
                      <Icon 
                        name={quest.type === 'main' ? 'flag' : 'flag-outline'} 
                        size={16} 
                        color={theme.colors.primary} 
                      />
                      <Text style={[
                        styles.questType,
                        { color: theme.colors.primary }
                      ]}>
                        {quest.type === 'main' ? '메인 퀘스트' : '서브 퀘스트'}
                      </Text>
                    </View>
                    <Text style={[
                      styles.questStatus,
                      { color: getQuestStatusColor(quest.status) }
                    ]}>
                      {getQuestStatusText(quest.status)}
                    </Text>
                  </View>
                  <Text style={[
                    styles.questTitle,
                    { color: theme.colors.text }
                  ]}>{quest.title}</Text>
                  <Text style={[
                    styles.questDescription,
                    { color: theme.colors.textSecondary }
                  ]}>{quest.description}</Text>
                  {quest.status === 'active' && (
                    <View style={styles.progressContainer}>
                      <View style={[
                        styles.progressBar,
                        { backgroundColor: theme.colors.elevation2 }
                      ]}>
                        <View style={[
                          styles.progressFill,
                          { 
                            backgroundColor: theme.colors.primary,
                            width: `${(quest.progress / quest.maxProgress) * 100}%`
                          }
                        ]} />
                      </View>
                      <Text style={[
                        styles.progressText,
                        { color: theme.colors.textSecondary }
                      ]}>
                        {quest.progress}/{quest.maxProgress}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>



          {/* 만난 사람들 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>만난 사람들</Text>
            <View style={styles.metPeopleContainer}>
              {metPeople.map((person) => (
                <View key={person.id} style={[
                  styles.personCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.personHeader}>
                    <Text style={[
                      styles.personName,
                      { color: theme.colors.text }
                    ]}>{person.name}</Text>
                    <Text style={[
                      styles.personLastMet,
                      { color: theme.colors.textSecondary }
                    ]}>{person.lastMet}</Text>
                  </View>
                  <Text style={[
                    styles.personDescription,
                    { color: theme.colors.textSecondary }
                  ]}>{person.description}</Text>
                  <View style={styles.personInfo}>
                    <Text style={[
                      styles.personLocation,
                      { color: theme.colors.textSecondary }
                    ]}>{person.location}</Text>
                    <View style={styles.relationshipContainer}>
                      <Text style={[
                        styles.relationshipLabel,
                        { color: theme.colors.textSecondary }
                      ]}>관계도</Text>
                      <View style={[
                        styles.relationshipBar,
                        { backgroundColor: theme.colors.elevation2 }
                      ]}>
                        <View style={[
                          styles.relationshipFill,
                          { 
                            backgroundColor: mode === 'dark' ? '#66BB6A' : '#4CAF50',
                            width: `${(person.relationship / person.maxRelationship) * 100}%`
                          }
                        ]} />
                      </View>
                      <Text style={[
                        styles.relationshipValue,
                        { color: theme.colors.text }
                      ]}>{person.relationship}/{person.maxRelationship}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* 흐름도 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>흐름도</Text>
            <View style={styles.storyFlowContainer}>
              {storyFlow.map((node, index) => (
                <View key={node.id} style={styles.storyNodeContainer}>
                  <View style={[
                    styles.storyNode,
                    { backgroundColor: theme.colors.elevation1 }
                  ]}>
                    <View style={styles.nodeHeader}>
                      <Icon 
                        name={node.type === 'story' ? 'book-open' : node.type === 'choice' ? 'help-circle' : 'lightning-bolt'} 
                        size={16} 
                        color={getNodeStatusColor(node.status)} 
                      />
                      <Text style={[
                        styles.nodeTitle,
                        { 
                          color: getNodeStatusColor(node.status),
                          fontWeight: node.status === 'current' ? theme.typography.weights.semibold : '400',
                        }
                      ]}>{node.title}</Text>
                      <Text style={[
                        styles.nodeTime,
                        { color: theme.colors.textSecondary }
                      ]}>{node.timestamp}</Text>
                    </View>
                    {node.choices && node.choices.length > 0 && (
                      <View style={styles.nodeChoices}>
                        {node.choices.map((choice, choiceIndex) => (
                          <Text key={choiceIndex} style={[
                            styles.nodeChoice,
                            { color: theme.colors.textSecondary }
                          ]}>• {choice}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                  {index < storyFlow.length - 1 && (
                    <View style={[
                      styles.nodeConnector,
                      { backgroundColor: theme.colors.elevation2 }
                    ]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    bottom: 50,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    letterSpacing: -0.3,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  questsContainer: {
    gap: 12,
  },
  questCard: {
    borderRadius: 12,
    padding: 16,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questType: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  questStatus: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  questDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },

  metPeopleContainer: {
    gap: 12,
  },
  personCard: {
    borderRadius: 12,
    padding: 16,
  },
  personHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  personLastMet: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  personDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  personInfo: {
    gap: 8,
  },
  personLocation: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  relationshipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relationshipLabel: {
    minWidth: 60,
    fontSize: 14,
    letterSpacing: -0.2,
  },
  relationshipBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  relationshipFill: {
    height: '100%',
    borderRadius: 3,
  },
  relationshipValue: {
    minWidth: 50,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  storyFlowContainer: {
    gap: 8,
  },
  storyNodeContainer: {
    alignItems: 'center',
  },
  storyNode: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    letterSpacing: -0.2,
  },
  nodeTime: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  nodeChoices: {
    marginTop: 8,
  },
  nodeChoice: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
    letterSpacing: -0.1,
  },
  nodeConnector: {
    width: 2,
    height: 16,
    marginVertical: 4,
  },
});

export default GameInfoModal; 