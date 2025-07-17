import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';

interface PlayerInfo {
  name: string;
  daysPassed: number;
  energy: number;
  maxEnergy: number;
  motivation: number;
  maxMotivation: number;
  stress: number;
  maxStress: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'sub';
  status: 'active' | 'completed' | 'failed';
  progress: number;
  maxProgress: number;
}

interface NPC {
  id: string;
  name: string;
  relationship: number;
  maxRelationship: number;
  lastMet: string;
  description: string;
}

interface DialogueRecord {
  id: string;
  timestamp: string;
  npcName: string;
  content: string;
  playerChoice: string;
  consequence: string;
}

interface GameInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  playerInfo: PlayerInfo;
  tasks: Task[];
  npcs: NPC[];
  dialogueHistory: DialogueRecord[];
}

const GameInfoModal: React.FC<GameInfoModalProps> = ({
  isVisible,
  onClose,
  playerInfo,
  tasks,
  npcs,
  dialogueHistory,
}) => {
  const { theme, mode } = useTheme();

  if (!isVisible) return null;

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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
          {/* 플레이어 정보 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>플레이어 정보</Text>
            <View style={[
              styles.playerCard,
              { backgroundColor: theme.colors.elevation1 }
            ]}>
              <Text style={[
                styles.playerName,
                { 
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.lg,
                  fontWeight: theme.typography.weights.bold,
                }
              ]}>{playerInfo.name}</Text>
              <Text style={[
                styles.playerDays,
                { 
                  color: theme.colors.primary,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.medium,
                }
              ]}>{playerInfo.daysPassed}일차</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary }
                  ]}>에너지</Text>
                  <View style={[
                    styles.statBar,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#FFA726' : '#FF9800',
                        width: `${(playerInfo.energy / playerInfo.maxEnergy) * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { color: theme.colors.text }
                  ]}>{playerInfo.energy}/{playerInfo.maxEnergy}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary }
                  ]}>동기부여</Text>
                  <View style={[
                    styles.statBar,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#66BB6A' : '#4CAF50',
                        width: `${(playerInfo.motivation / playerInfo.maxMotivation) * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { color: theme.colors.text }
                  ]}>{playerInfo.motivation}/{playerInfo.maxMotivation}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary }
                  ]}>스트레스</Text>
                  <View style={[
                    styles.statBar,
                    { backgroundColor: theme.colors.elevation2 }
                  ]}>
                    <View style={[
                      styles.statFill,
                      { 
                        backgroundColor: mode === 'dark' ? '#EF5350' : '#F44336',
                        width: `${(playerInfo.stress / playerInfo.maxStress) * 100}%`
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.statValue,
                    { color: theme.colors.text }
                  ]}>{playerInfo.stress}/{playerInfo.maxStress}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 임무 정보 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>임무</Text>
            <View style={styles.tasksContainer}>
              {tasks.map((task) => (
                <View key={task.id} style={[
                  styles.taskCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.taskHeader}>
                    <View style={styles.taskTypeContainer}>
                      <Icon 
                        name={task.type === 'main' ? 'flag' : 'flag-outline'} 
                        size={16} 
                        color={theme.colors.primary} 
                      />
                      <Text style={[
                        styles.taskType,
                        { color: theme.colors.primary }
                      ]}>
                        {task.type === 'main' ? '메인' : '서브'}
                      </Text>
                    </View>
                    <Text style={[
                      styles.taskStatus,
                      { color: getStatusColor(task.status) }
                    ]}>
                      {getStatusText(task.status)}
                    </Text>
                  </View>
                  <Text style={[
                    styles.taskTitle,
                    { color: theme.colors.text }
                  ]}>{task.title}</Text>
                  <Text style={[
                    styles.taskDescription,
                    { color: theme.colors.textSecondary }
                  ]}>{task.description}</Text>
                  {task.status === 'active' && (
                    <View style={styles.progressContainer}>
                      <View style={[
                        styles.progressBar,
                        { backgroundColor: theme.colors.elevation2 }
                      ]}>
                        <View style={[
                          styles.progressFill,
                          { 
                            backgroundColor: theme.colors.primary,
                            width: `${(task.progress / task.maxProgress) * 100}%`
                          }
                        ]} />
                      </View>
                      <Text style={[
                        styles.progressText,
                        { color: theme.colors.textSecondary }
                      ]}>
                        {task.progress}/{task.maxProgress}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* NPC 정보 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>만난 사람들</Text>
            <View style={styles.npcsContainer}>
              {npcs.map((npc) => (
                <View key={npc.id} style={[
                  styles.npcCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.npcHeader}>
                    <Text style={[
                      styles.npcName,
                      { color: theme.colors.text }
                    ]}>{npc.name}</Text>
                    <Text style={[
                      styles.npcLastMet,
                      { color: theme.colors.textSecondary }
                    ]}>{npc.lastMet}</Text>
                  </View>
                  <Text style={[
                    styles.npcDescription,
                    { color: theme.colors.textSecondary }
                  ]}>{npc.description}</Text>
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
                          width: `${(npc.relationship / npc.maxRelationship) * 100}%`
                        }
                      ]} />
                    </View>
                    <Text style={[
                      styles.relationshipValue,
                      { color: theme.colors.text }
                    ]}>{npc.relationship}/{npc.maxRelationship}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* 대화 기록 */}
          <View style={styles.section}>
            <Text style={[
              styles.sectionTitle,
              { 
                color: theme.colors.text,
                fontSize: theme.typography.sizes.lg,
                fontWeight: theme.typography.weights.semibold,
              }
            ]}>대화 기록</Text>
            <View style={styles.dialogueContainer}>
              {dialogueHistory.map((dialogue) => (
                <View key={dialogue.id} style={[
                  styles.dialogueCard,
                  { backgroundColor: theme.colors.elevation1 }
                ]}>
                  <View style={styles.dialogueHeader}>
                    <Text style={[
                      styles.dialogueNpc,
                      { color: theme.colors.primary }
                    ]}>{dialogue.npcName}</Text>
                    <Text style={[
                      styles.dialogueTime,
                      { color: theme.colors.textSecondary }
                    ]}>{dialogue.timestamp}</Text>
                  </View>
                  <Text style={[
                    styles.dialogueContent,
                    { color: theme.colors.text }
                  ]}>{dialogue.content}</Text>
                  <View style={styles.choiceContainer}>
                    <Text style={[
                      styles.choiceLabel,
                      { color: theme.colors.textSecondary }
                    ]}>내 선택:</Text>
                    <Text style={[
                      styles.choiceText,
                      { color: theme.colors.text }
                    ]}>{dialogue.playerChoice}</Text>
                  </View>
                  {dialogue.consequence && (
                    <View style={styles.consequenceContainer}>
                      <Text style={[
                        styles.consequenceLabel,
                        { color: theme.colors.textSecondary }
                      ]}>결과:</Text>
                      <Text style={[
                        styles.consequenceText,
                        { color: mode === 'dark' ? '#66BB6A' : '#4CAF50' }
                      ]}>{dialogue.consequence}</Text>
                    </View>
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
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
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
    paddingTop: 20,
    paddingBottom: 16,
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
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  playerCard: {
    borderRadius: 12,
    padding: 16,
  },
  playerName: {
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  playerDays: {
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  statsContainer: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    minWidth: 60,
    fontSize: 14,
    letterSpacing: -0.2,
  },
  statBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  statFill: {
    height: '100%',
    borderRadius: 3,
  },
  statValue: {
    minWidth: 50,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  tasksContainer: {
    gap: 12,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskType: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  taskStatus: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  taskDescription: {
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
  npcsContainer: {
    gap: 12,
  },
  npcCard: {
    borderRadius: 12,
    padding: 16,
  },
  npcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  npcName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  npcLastMet: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  npcDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: -0.2,
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
  dialogueContainer: {
    gap: 12,
  },
  dialogueCard: {
    borderRadius: 12,
    padding: 16,
  },
  dialogueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dialogueNpc: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  dialogueTime: {
    fontSize: 12,
    letterSpacing: -0.1,
  },
  dialogueContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  choiceContainer: {
    marginBottom: 8,
  },
  choiceLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  choiceText: {
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: -0.2,
  },
  consequenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consequenceLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
    letterSpacing: -0.1,
  },
  consequenceText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

export default GameInfoModal; 