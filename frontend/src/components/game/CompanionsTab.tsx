import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import { Companion } from '../../types/story';
import { getCompanionStatusColor } from '../../utils/gameUtils';

interface CompanionsTabProps {
  companions: Companion[];
}

const CompanionsTab: React.FC<CompanionsTabProps> = ({ companions }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      }}>
        {companions.map((companion) => (
          <View
            key={companion.id}
            style={[
              {
                backgroundColor: theme.colors.elevation1,
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                width: '30%',
                flexDirection: 'row',
                alignItems: 'center',
                minHeight: 80,
              }
            ]}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
              <Icon 
                name="account" 
                size={20} 
                color={theme.colors.primary} 
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={[
                {
                  color: theme.colors.text,
                  fontSize: 12,
                  fontWeight: '600',
                  marginBottom: 4,
                }
              ]}>
                {companion.name}
              </Text>
              
              <Text style={[
                {
                  color: theme.colors.primary,
                  fontSize: 14,
                  fontWeight: 'bold',
                }
              ]}>
                {Math.floor(Math.random() * 3) + 1}/3
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CompanionsTab; 