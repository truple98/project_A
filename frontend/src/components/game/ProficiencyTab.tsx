import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../theme/ThemeContext';
import { Skill } from '../../types/story';
import { getSkillTypeColor, getSkillTypeIcon } from '../../utils/gameUtils';

interface ProficiencyTabProps {
  skills: Skill[];
}

const ProficiencyTab: React.FC<ProficiencyTabProps> = ({ skills }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
      }}>
        {skills.map((skill) => {
          const progress = skill.experience / (skill.experience + skill.experienceToNext);
          
          return (
                        <View
              key={skill.id}
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
                backgroundColor: getSkillTypeColor(skill.type) + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Icon 
                  name={getSkillTypeIcon(skill.type)} 
                  size={20} 
                  color={getSkillTypeColor(skill.type)} 
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
                  {skill.name}
                </Text>
                
                <Text style={[
                  {
                    color: theme.colors.primary,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }
                ]}>
                  Lv.{skill.level}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ProficiencyTab; 