import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';

interface TokenDisplayProps {
  current: number;
  max: number;
  icon: string;
  color: string;
  label: string;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ current, max, icon, color, label }) => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    tokenContainer: {
      alignItems: 'center',
    },
    tokenHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    tokenLabel: {
      marginLeft: 4,
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: -0.1,
    },
    tokenGrid: {
      flexDirection: 'row',
      gap: 3,
    },
    token: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,
    },
  });
  
  return (
    <View style={styles.tokenContainer}>
      <View style={styles.tokenHeader}>
        <Icon name={icon} size={14} color={color} />
        <Text style={[
          styles.tokenLabel,
          { color: theme.colors.textSecondary }
        ]}>{label}</Text>
      </View>
      <View style={styles.tokenGrid}>
        {Array.from({ length: max }, (_, index) => (
          <View
            key={index}
            style={[
              styles.token,
              {
                backgroundColor: index < current ? color : theme.colors.elevation2,
                borderColor: color,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default TokenDisplay; 