import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import { InventoryItem } from '../../types/story';
import { getRarityColor, getItemTypeIcon } from '../../utils/gameUtils';

interface InventoryTabProps {
  items: InventoryItem[];
}

const InventoryTab: React.FC<InventoryTabProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      }}>
        {items.map((item) => (
          <View
            key={item.id}
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
              backgroundColor: getRarityColor(item.rarity) + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
              <Icon 
                name={getItemTypeIcon(item.type)} 
                size={20} 
                color={getRarityColor(item.rarity)} 
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
                {item.name}
              </Text>
              
              <Text style={[
                {
                  color: theme.colors.primary,
                  fontSize: 14,
                  fontWeight: 'bold',
                }
              ]}>
                x{item.quantity}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default InventoryTab; 