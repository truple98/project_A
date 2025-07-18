import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';
import { StatusEffect } from '../../types/story';

interface StatusTabProps {
  statusEffects: StatusEffect[];
}

const StatusTab: React.FC<StatusTabProps> = ({ statusEffects }) => {
  const { theme, mode } = useTheme();
  
  const getStatusColor = (type: string) => {
    switch (type) {
      case 'buff': return mode === 'dark' ? '#66BB6A' : '#4CAF50';
      case 'debuff': return mode === 'dark' ? '#EF5350' : '#F44336';
      case 'neutral': return mode === 'dark' ? '#9E9E9E' : '#757575';
      default: return theme.colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'enhancement': return mode === 'dark' ? '#42A5F5' : '#2196F3';
      case 'personality': return mode === 'dark' ? '#AB47BC' : '#9C27B0';
      case 'disease': return mode === 'dark' ? '#FF7043' : '#FF5722';
      case 'temporary': return mode === 'dark' ? '#FFA726' : '#FF9800';
      default: return theme.colors.textSecondary;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statusCard: {
      backgroundColor: theme.colors.elevation1,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      width: '30%',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 80,
    },
    statusIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    statusName: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    statusValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

    return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.statusGrid}>
        {statusEffects.map((effect) => (
          <View key={effect.id} style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Icon 
                name={effect.icon} 
                size={20} 
                color={getStatusColor(effect.type)} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statusName}>{effect.name}</Text>
              <Text style={styles.statusValue}>x{effect.intensity}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default StatusTab; 